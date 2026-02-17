import { PresignedURLService } from "./presignedURL.service.js";
const presignedURLService = new PresignedURLService();
export async function getPresignedUrls(keys, folder, contentType = "image/png") {
    const urls = [];
    for (const key of keys) {
        if (key) {
            urls.push(await presignedURLService.getPresignedURL(folder, "GET", key.split("/").pop() ?? key, contentType));
        }
    }
    return urls;
}
//# sourceMappingURL=presignedURL.util.js.map