export declare class ClubUserRepository {
    getClubLeaderByClubId: (clubId: bigint) => Promise<{
        id: bigint;
        user_id: bigint;
        created_at: Date | null;
        updated_at: Date | null;
        club_id: bigint;
        is_leader: boolean | null;
    } | null>;
    clubLeave: (userId: bigint, clubId: bigint) => Promise<boolean>;
    getClubMembers: (clubId: bigint) => Promise<({
        user: {
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
        };
    } & {
        id: bigint;
        user_id: bigint;
        created_at: Date | null;
        updated_at: Date | null;
        club_id: bigint;
        is_leader: boolean | null;
    })[]>;
}
//# sourceMappingURL=club-user.repository.d.ts.map