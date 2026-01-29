export const reviewDto = (reviews) => {
    return reviews.map((review) => {
        return {
            id: review.id.toString(),
            userId: review.user_id.toString(),
            facilityId: review.facility_id.toString(),
            photoUrl: review.photos
                .map((photo) => photo.photo_url)
                .filter((url) => url !== null),
            text: review.text,
            createdAt: review.created_at,
        };
    });
};
//# sourceMappingURL=review.dto.js.map