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
    extractS3Key: (url: string) => string;
    clubAdd: (clubData: ClubRequest, userId: number) => Promise<{
        name: string | null;
        id: bigint;
        created_at: Date | null;
        updated_at: Date | null;
        region_id: bigint;
        contact_number: string | null;
        capacity: number | null;
        activity_frequency: string | null;
        join_requirement: string | null;
        summary: string | null;
        level: import("@prisma/client").$Enums.Level | null;
        age: import("@prisma/client").$Enums.Age | null;
        homepage_url: string | null;
        sport_type_id: bigint;
    }>;
    clubUpdate: (clubData: ClubRequest, userId: number, clubId: number) => Promise<{
        name: string | null;
        id: bigint;
        created_at: Date | null;
        updated_at: Date | null;
        region_id: bigint;
        contact_number: string | null;
        capacity: number | null;
        activity_frequency: string | null;
        join_requirement: string | null;
        summary: string | null;
        level: import("@prisma/client").$Enums.Level | null;
        age: import("@prisma/client").$Enums.Age | null;
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
        user_id: bigint;
        created_at: Date | null;
        club_id: bigint;
    }>;
    getJoinRequests: (userId: number, clubId: number) => Promise<{
        id: bigint;
        user_id: bigint;
        created_at: Date | null;
        club_id: bigint;
    }[]>;
    approveJoinRequest: (requestId: number, userId: number, clubId: number, status: Status) => Promise<boolean>;
    leaveClub: (userId: number, clubId: number) => Promise<true>;
    getClubMembers: (clubId: number, userId: number) => Promise<({
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
export {};
//# sourceMappingURL=club.service.d.ts.map