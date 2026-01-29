export declare const isApplied: (userId: number, clubId: number) => Promise<boolean>;
export declare const joinClub: (userId: number, clubId: number) => Promise<{
    id: bigint;
    created_at: Date | null;
    user_id: bigint;
    club_id: bigint;
}>;
export declare const findJoinRequests: (clubId: number) => Promise<{
    id: bigint;
    created_at: Date | null;
    user_id: bigint;
    club_id: bigint;
}[]>;
export declare const joinRequestApprove: (requestId: number, clubId: number, status: string) => Promise<boolean>;
//# sourceMappingURL=join-request.repository.d.ts.map