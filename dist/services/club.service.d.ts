import { Age } from "@prisma/client";
import type { ClubRequest } from "../dtos/club.dto.js";
import type { ClubListData, ClubResponseData } from "../dtos/club.dto.js";
declare enum Status {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare class ClubService {
    private clubRepository;
    private regionRepository;
    private sportTypeRepository;
    private clubUserRepository;
    private joinRequestRepository;
    clubAdd: (clubData: ClubRequest, userId: number) => Promise<{
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
    }>;
    clubUpdate: (clubData: ClubRequest, userId: number, clubId: number) => Promise<{
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
    }>;
    getClubs: (regionId: string | null, ageGroup: Age | null, keyword: string | null, sportId: string | null, cursor: string | null) => Promise<{
        clubs: ClubListData[];
        hasNext: boolean;
    }>;
    getClub: (clubId: number) => Promise<ClubResponseData | null>;
    clubJoin: (userId: number, clubId: number) => Promise<{
        id: bigint;
        created_at: Date | null;
        club_id: bigint;
        user_id: bigint;
    }>;
    getJoinRequests: (userId: number, clubId: number) => Promise<{
        id: bigint;
        created_at: Date | null;
        club_id: bigint;
        user_id: bigint;
    }[]>;
    approveJoinRequest: (requestId: number, userId: number, clubId: number, status: Status) => Promise<boolean>;
    leaveClub: (userId: number, clubId: number) => Promise<true>;
}
export {};
//# sourceMappingURL=club.service.d.ts.map