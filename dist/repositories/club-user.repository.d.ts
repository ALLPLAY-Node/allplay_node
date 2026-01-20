export declare const getClubLeaderByClubId: (clubId: bigint) => Promise<{
    id: bigint;
    created_at: Date | null;
    updated_at: Date | null;
    is_leader: boolean | null;
    club_id: bigint;
    user_id: bigint;
} | null>;
//# sourceMappingURL=club-user.repository.d.ts.map