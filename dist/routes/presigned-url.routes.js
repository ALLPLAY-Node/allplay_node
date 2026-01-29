import express from "express";
import { handlePresignedURL } from "../controllers/presignedURL.controller.js";
const presignedUrlRouter = express.Router();
presignedUrlRouter.post("/presigned-url", handlePresignedURL);
export default presignedUrlRouter;
//# sourceMappingURL=presigned-url.routes.js.map