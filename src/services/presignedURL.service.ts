import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-northeast-2", // 네 리전
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

type Operation = "PUT" | "GET";

const BUCKET_NAME = "my-bucket"; // 버킷 고정

export const getPresignedURL = async (
  domain: string, // 폴더 이름
  operation: Operation,
  fileName: string,
  fileType: string,
): Promise<string> => {
  if (!domain || !operation || !fileName || !fileType) {
    throw new Error("Missing required parameters");
  }

  const key = `${domain}/${fileName}`; // 버킷 안 폴더 포함 Key

  let command;
  if (operation === "PUT") {
    command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });
  } else if (operation === "GET") {
    command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
  } else {
    throw new Error("Invalid operation. Must be PUT or GET");
  }

  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  return url;
};
