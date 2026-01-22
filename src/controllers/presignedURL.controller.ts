import type { Request, Response, NextFunction } from "express";
import { getPresignedURL } from "../services/presignedURL.service.js";
import { StatusCodes } from "http-status-codes";

export const handlePresignedURL = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { domain, operation, fileName, fileType } = req.body;
  const presignedURL = await getPresignedURL(
    domain,
    operation,
    fileName,
    fileType,
  );
  res.status(StatusCodes.OK).success("발급 완료", {
    url: presignedURL,
    method: operation,
    headers: {
      "Content-Type": fileType,
    },
    expiresIn: 300,
  });
};
