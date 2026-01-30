import express from "express";
import { PresignedURLController } from "../controllers/presignedURL.controller.js";

const presignedUrlRouter = express.Router();
const presignedUrlController = new PresignedURLController();

presignedUrlRouter.post(
  "/presigned-url",
  presignedUrlController.handlePresignedURL,
);

export default presignedUrlRouter;
