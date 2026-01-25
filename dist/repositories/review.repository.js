import { prisma } from "../db.config.js";
export const addReview = async (review, facilityId, userId) => {
    const data = await prisma.$transaction(async (tx) => {
        const reviewData = await tx.review.create({
            data: {
                text: review.text,
                facility_id: facilityId,
                user_id: userId,
                created_at: new Date(),
            },
        });
        if (review.photoUrl) {
            for (const url of review.photoUrl) {
                await tx.reviewPhotos.create({
                    data: {
                        review_id: reviewData.id,
                        photo_url: url,
                        uploaded_at: new Date(),
                    },
                });
            }
        }
        return reviewData;
    });
    return data;
};
//# sourceMappingURL=review.repository.js.map