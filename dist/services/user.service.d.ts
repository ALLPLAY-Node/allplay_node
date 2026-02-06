export declare const getProfile: (userId: number) => Promise<{
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
export declare const updateProfile: (userId: number, body: any) => Promise<{
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
export declare const quitService: (userId: number) => Promise<({
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
export declare const getClubs: (userId: number) => Promise<never[]>;
export declare const getReviews: (userId: number, reviewId?: number) => Promise<{
    id: bigint;
    user_id: bigint;
    created_at: Date | null;
    updated_at: Date | null;
    facility_id: bigint;
    text: string | null;
}[]>;
export declare const editReview: (userId: number, reviewId: number, text: string) => Promise<{
    id: bigint;
    user_id: bigint;
    created_at: Date | null;
    updated_at: Date | null;
    facility_id: bigint;
    text: string | null;
}>;
//# sourceMappingURL=user.service.d.ts.map