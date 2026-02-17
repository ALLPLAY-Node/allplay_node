import { ReviewRepository } from "../repositories/review.repository.js";
import { PresignedURLService } from "./presignedURL.service.js";
export class ReviewService {
    reviewRepository = new ReviewRepository();
    presignedURLService = new PresignedURLService();
    // 리뷰 조회 시 S3 key로 프리사인드 URL 발급
    async getFacilityReviewWithPresignedUrl(facilityId, cursor) {
        const reviews = await this.reviewRepository.getFacilityReview(facilityId, cursor);
        for (const review of reviews) {
            if (review.photos) {
                for (const photo of review.photos) {
                    if (photo.photo_url) {
                        // photo_url이 S3 key라고 가정
                        photo.photo_url = await this.presignedURLService.getPresignedURL("reviews", // domain/folder
                        "GET", photo.photo_url.split("/").pop() ?? photo.photo_url, "image/png");
                    }
                }
            }
        }
        return reviews;
    }
}
//# sourceMappingURL=review.service.js.map