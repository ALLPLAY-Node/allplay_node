export declare class JoinRequestRepository {
    isApplied: (userId: number, clubId: number) => Promise<boolean>;
    joinClub: (userId: number, clubId: number) => Promise<{
        id: bigint;
        created_at: Date | null;
        club_id: bigint;
        user_id: bigint;
    }>;
    findJoinRequests: (clubId: number) => Promise<{
        id: bigint;
        created_at: Date | null;
        club_id: bigint;
        user_id: bigint;
    }[]>;
    deleteJoinRequest: (requestId: number) => Promise<boolean>;
    joinRequestApprove: (requestId: number, clubId: number, status: string) => Promise<boolean>;
}
//# sourceMappingURL=join-request.repository.d.ts.map