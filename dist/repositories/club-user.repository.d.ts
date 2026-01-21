export declare const getClubLeaderByClubId: (clubId: bigint) => Promise<{
    id: bigint;
    created_at: Date | null;
    updated_at: Date | null;
    club_id: bigint;
    user_id: bigint;
    is_leader: boolean | null;
} | null>;
export declare const clubLeave: (userId: bigint, clubId: bigint) => Promise<boolean>;
//# sourceMappingURL=club-user.repository.d.ts.map