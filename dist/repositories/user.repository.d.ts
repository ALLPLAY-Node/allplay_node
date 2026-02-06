export declare const findUserWithRegion: (userId: number) => Promise<({
    region: {
        id: bigint;
        city: string | null;
        district: string | null;
    };
} & {
    name: string | null;
    id: bigint;
    phone_number: string | null;
    user_id: string | null;
    password: string | null;
    birth: Date | null;
    gender: import("@prisma/client").$Enums.Gender | null;
    profile_photo_url: string | null;
    email: string | null;
    introduce: string | null;
    status: boolean | null;
    inactive_date: Date | null;
    privacy_agreement: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
    region_id: bigint;
}) | null>;
export declare const updateUserRaw: (userId: number, data: any) => Promise<{
    region: {
        id: bigint;
        city: string | null;
        district: string | null;
    };
} & {
    name: string | null;
    id: bigint;
    phone_number: string | null;
    user_id: string | null;
    password: string | null;
    birth: Date | null;
    gender: import("@prisma/client").$Enums.Gender | null;
    profile_photo_url: string | null;
    email: string | null;
    introduce: string | null;
    status: boolean | null;
    inactive_date: Date | null;
    privacy_agreement: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
    region_id: bigint;
}>;
export declare const updateUserStatus: (userId: number) => Promise<{
    name: string | null;
    id: bigint;
    phone_number: string | null;
    user_id: string | null;
    password: string | null;
    birth: Date | null;
    gender: import("@prisma/client").$Enums.Gender | null;
    profile_photo_url: string | null;
    email: string | null;
    introduce: string | null;
    status: boolean | null;
    inactive_date: Date | null;
    privacy_agreement: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
    region_id: bigint;
}>;
export declare const findUserClubs: (userId: number) => Promise<never[]>;
export declare const findUserReviews: (userId: number, reviewId?: number) => Promise<{
    id: bigint;
    user_id: bigint;
    created_at: Date | null;
    updated_at: Date | null;
    facility_id: bigint;
    text: string | null;
}[]>;
export declare const updateReviewRaw: (reviewId: number, text: string) => Promise<{
    id: bigint;
    user_id: bigint;
    created_at: Date | null;
    updated_at: Date | null;
    facility_id: bigint;
    text: string | null;
}>;
//# sourceMappingURL=user.repository.d.ts.map