import { Age } from "@prisma/client";
import type { ClubRequest } from "../dtos/club.dto.js";
export declare const clubAdd: (clubData: ClubRequest, userId: number) => Promise<{
    id: bigint;
    name: string | null;
    contact_number: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    region_id: bigint;
    capacity: number | null;
    activity_frequency: string | null;
    join_requirement: string | null;
    summary: string | null;
    level: import("@prisma/client").$Enums.Level | null;
    age: import("@prisma/client").$Enums.Age | null;
    homepage_url: string | null;
    sport_type_id: bigint;
}>;
export declare const clubUpdate: (clubData: ClubRequest, userId: number, clubId: number) => Promise<{
    id: bigint;
    name: string | null;
    contact_number: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    region_id: bigint;
    capacity: number | null;
    activity_frequency: string | null;
    join_requirement: string | null;
    summary: string | null;
    level: import("@prisma/client").$Enums.Level | null;
    age: import("@prisma/client").$Enums.Age | null;
    homepage_url: string | null;
    sport_type_id: bigint;
}>;
import type { ClubListData, ClubResponseData } from "../dtos/club.dto.js";
export declare const getClubs: (regionId: string | null, ageGroup: Age | null, keyword: string | null, sportId: string | null, cursor: string | null) => Promise<{
    clubs: ClubListData[];
    hasNext: boolean;
}>;
export declare const getClub: (clubId: number) => Promise<ClubResponseData | null>;
export declare const clubJoin: (userId: number, clubId: number) => Promise<{
    id: bigint;
    created_at: Date | null;
    user_id: bigint;
    club_id: bigint;
}>;
export declare const getJoinRequests: (userId: number, clubId: number) => Promise<{
    id: bigint;
    created_at: Date | null;
    user_id: bigint;
    club_id: bigint;
}[]>;
declare enum Status {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare const approveJoinRequest: (requestId: number, userId: number, clubId: number, status: Status) => Promise<boolean>;
export declare const leaveClub: (userId: number, clubId: number) => Promise<true>;
export {};
//# sourceMappingURL=club.service.d.ts.map