import { PresignedURLService } from "../services/presignedURL.service.js";
import { StatusCodes } from "http-status-codes";
export class PresignedURLController {
    presignedURLService = new PresignedURLService();
    handlePresignedURL = async (req, res, next) => {
        try {
            const { domain, operation, fileName, fileType } = req.body;
            const ALLOWED_DOMAINS = [
                "reviews",
                "facilities",
                "clubs",
                "user-profile",
            ];
            if (typeof domain !== "string" || !ALLOWED_DOMAINS.includes(domain)) {
                return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json({ message: "Invalid domain parameter." });
            }
            const presignedURL = await this.presignedURLService.getPresignedURL(domain, operation, fileName, fileType);
            res.status(StatusCodes.OK).success("발급 완료", {
                url: presignedURL,
                method: operation,
                headers: {
                    "Content-Type": fileType,
                },
                expiresIn: 300,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=presignedURL.controller.js.map