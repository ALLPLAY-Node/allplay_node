import { Age } from "@prisma/client";
import type { ClubRequest } from "../dtos/club.dto.js";
import type { ClubListData, ClubResponseData } from "../dtos/club.dto.js";
export declare class ClubRepository {
    addClub: (clubData: ClubRequest, userId: number, regionId: bigint, sportTypeId: bigint) => Promise<{
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
    updateClub: (clubData: ClubRequest, clubId: number, regionId: bigint, sportTypeId: bigint) => Promise<{
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
    findClubs: (regionId: string | null, ageGroup: Age | null, keyword: string | null, sportId: string | null, cursor: string | null) => Promise<ClubListData[]>;
    findClubById: (clubId: number) => Promise<ClubResponseData | null>;
}
//# sourceMappingURL=club.repository.d.ts.map