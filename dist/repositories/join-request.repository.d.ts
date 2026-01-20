export declare const isApplied: (userId: number, clubId: number) => Promise<boolean>;
export declare const joinClub: (userId: number, clubId: number) => Promise<{
    id: bigint;
    created_at: Date | null;
    club_id: bigint;
    user_id: bigint;
}>;
//# sourceMappingURL=join-request.repository.d.ts.map