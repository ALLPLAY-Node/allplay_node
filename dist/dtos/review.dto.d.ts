interface ReviewPhoto {
    photo_id: bigint;
    review_id: bigint;
    photo_url: string | null;
    uploaded_at: Date | null;
}
export interface Review {
    id: bigint;
    user_id: bigint;
    facility_id: bigint;
    text: string | null;
    photos: ReviewPhoto[];
    created_at: Date | null;
    updated_at: Date | null;
}
export declare const reviewDto: (reviews: Review[]) => {
    id: string;
    userId: string;
    facilityId: string;
    photoUrl: string[];
    text: string | null;
    createdAt: Date | null;
}[];
export {};
//# sourceMappingURL=review.dto.d.ts.map