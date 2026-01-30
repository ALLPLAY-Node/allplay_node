import { prisma } from "../db.config.js";
export class ReviewRepository {
    addReview = async (review, facilityId, userId) => {
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
    getFacilityReview = async (facilityId, cursor) => {
        const data = await prisma.review.findMany({
            where: {
                id: {
                    gt: cursor,
                },
                facility_id: facilityId,
            },
            include: {
                photos: true,
            },
            take: 11,
            orderBy: {
                id: "asc",
            },
        });
        return data;
    };
}
//# sourceMappingURL=review.repository.js.map