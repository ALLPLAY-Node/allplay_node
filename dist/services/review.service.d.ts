export declare class ReviewService {
    private reviewRepository;
    private presignedURLService;
    getFacilityReviewWithPresignedUrl(facilityId: bigint, cursor: bigint): Promise<({
        photos: {
            uploaded_at: Date | null;
            photo_id: bigint;
            photo_url: string | null;
            review_id: bigint;
        }[];
    } & {
        id: bigint;
        user_id: bigint;
        created_at: Date | null;
        updated_at: Date | null;
        facility_id: bigint;
        text: string | null;
    })[]>;
}
//# sourceMappingURL=review.service.d.ts.map