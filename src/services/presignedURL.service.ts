import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  InvalidFileNameError,
  MissingRequiredParametersError,
  InvalidOperationError,
} from "../errors.js";

if (!process.env.AWS_ACCESS_KEY || !process.env.AWS_SECRET_KEY) {
  throw new Error(
    "AWS_ACCESS_KEY and AWS_SECRET_KEY environment variables must be set",
  );
}

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

type Operation = "PUT" | "GET";

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export const getPresignedURL = async (
  domain: string, // 폴더 이름
  operation: Operation,
  fileName: string,
  fileType: string,
): Promise<string> => {
  if (
    !isNonEmptyString(domain) ||
    !isNonEmptyString(fileName) ||
    !isNonEmptyString(fileType)
  ) {
    throw new MissingRequiredParametersError(
      "Missing or empty required parameters",
      {
        domain,
        fileName,
        fileType,
      },
    );
  }

  if (
    fileName.includes("..") ||
    fileName.includes("/") ||
    fileName.includes("\\")
  ) {
    throw new InvalidFileNameError("Invalid file name", {
      fileName,
    });
  }

  const key = `${domain}/${fileName}`; // 버킷 안 폴더 포함 Key

  let command;
  if (operation === "PUT") {
    command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });
  } else if (operation === "GET") {
    command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    });
  } else {
    throw new InvalidOperationError("Invalid operation. Must be PUT or GET", {
      operation,
    });
  }

  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  return url;
};
