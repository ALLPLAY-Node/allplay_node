import { getPresignedURL } from "../services/presignedURL.service.js";
import { StatusCodes } from "http-status-codes";
export const handlePresignedURL = async (req, res, next) => {
    const { domain, operation, fileName, fileType } = req.body;
    const ALLOWED_DOMAINS = ["reviews", "facilities", "clubs", "user-profile"];
    if (typeof domain !== "string" || !ALLOWED_DOMAINS.includes(domain)) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Invalid domain parameter." });
    }
    const presignedURL = await getPresignedURL(domain, operation, fileName, fileType);
    res.status(StatusCodes.OK).success("발급 완료", {
        url: presignedURL,
        method: operation,
        headers: {
            "Content-Type": fileType,
        },
        expiresIn: 300,
    });
};
//# sourceMappingURL=presignedURL.controller.js.map