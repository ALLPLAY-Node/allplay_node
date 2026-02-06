export declare const findUserWithRegion: (userId: number) => Promise<({
    region: {
        id: bigint;
        city: string | null;
        district: string | null;
    };
} & {
    id: bigint;
    email: string | null;
    name: string | null;
    phone_number: string | null;
    password: string | null;
    birth: Date | null;
    gender: import("@prisma/client").$Enums.Gender | null;
    profile_photo_url: string | null;
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
    id: bigint;
    email: string | null;
    name: string | null;
    phone_number: string | null;
    password: string | null;
    birth: Date | null;
    gender: import("@prisma/client").$Enums.Gender | null;
    profile_photo_url: string | null;
    introduce: string | null;
    status: boolean | null;
    inactive_date: Date | null;
    privacy_agreement: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
    region_id: bigint;
}>;
export declare const findUserClubs: (userId: number, isLeader?: boolean) => Promise<({
    club: {
        region: {
            id: bigint;
            city: string | null;
            district: string | null;
        };
    } & {
        id: bigint;
        name: string | null;
        created_at: Date | null;
        updated_at: Date | null;
        region_id: bigint;
        capacity: number | null;
        activity_frequency: string | null;
        join_requirement: string | null;
        summary: string | null;
        level: import("@prisma/client").$Enums.Level | null;
        age: import("@prisma/client").$Enums.Age | null;
        contact_number: string | null;
        homepage_url: string | null;
        sport_type_id: bigint;
    };
} & {
    id: bigint;
    created_at: Date | null;
    updated_at: Date | null;
    club_id: bigint;
    user_id: bigint;
    is_leader: boolean | null;
})[]>;
export declare const findUserReviews: (userId: number, reviewId?: number) => Promise<({
    facility: {
        id: bigint;
        name: string | null;
        created_at: Date | null;
        updated_at: Date | null;
        region_id: bigint;
        link: string | null;
        url: string | null;
        contact_number: string | null;
        sport_type: bigint;
        address: string | null;
        cost: string | null;
        introduction: string | null;
        information: string | null;
        usage_guide: string | null;
        operating_hours: string | null;
        is_public: boolean | null;
        apply_method: string | null;
        operator_id: bigint;
    };
} & {
    id: bigint;
    created_at: Date | null;
    updated_at: Date | null;
    user_id: bigint;
    facility_id: bigint;
    text: string | null;
})[]>;
export declare const updateReviewRaw: (reviewId: number, text: string) => Promise<{
    id: bigint;
    created_at: Date | null;
    updated_at: Date | null;
    user_id: bigint;
    facility_id: bigint;
    text: string | null;
}>;
export declare const deactivateUserRaw: (userId: number) => Promise<{
    id: bigint;
    email: string | null;
    name: string | null;
    phone_number: string | null;
    password: string | null;
    birth: Date | null;
    gender: import("@prisma/client").$Enums.Gender | null;
    profile_photo_url: string | null;
    introduce: string | null;
    status: boolean | null;
    inactive_date: Date | null;
    privacy_agreement: bigint | null;
    created_at: Date | null;
    updated_at: Date | null;
    region_id: bigint;
}>;
//# sourceMappingURL=user.repository.d.ts.map