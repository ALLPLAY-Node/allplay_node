import type { FacilityReviewDto } from "../dtos/facility.dto.js";
export declare class ReviewRepository {
    addReview: (review: FacilityReviewDto, facilityId: bigint, userId: bigint) => Promise<{
        id: bigint;
        created_at: Date | null;
        updated_at: Date | null;
        user_id: bigint;
        facility_id: bigint;
        text: string | null;
    }>;
    getFacilityReview: (facilityId: bigint, cursor: bigint) => Promise<({
        photos: {
            uploaded_at: Date | null;
            photo_id: bigint;
            photo_url: string | null;
            review_id: bigint;
        }[];
    } & {
        id: bigint;
        created_at: Date | null;
        updated_at: Date | null;
        user_id: bigint;
        facility_id: bigint;
        text: string | null;
    })[]>;
}
//# sourceMappingURL=review.repository.d.ts.map