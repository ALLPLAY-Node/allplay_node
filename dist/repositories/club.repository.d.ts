import { Age } from "@prisma/client";
import type { ClubRequest } from "../dtos/club.dto.js";
export declare const addClub: (clubData: ClubRequest, userId: number, regionId: bigint, sportTypeId: bigint) => Promise<{
    id: bigint;
    name: string | null;
    capacity: number | null;
    activity_frequency: string | null;
    join_requirement: string | null;
    summary: string | null;
    level: import("@prisma/client").$Enums.Level | null;
    age: import("@prisma/client").$Enums.Age | null;
    contact_number: string | null;
    homepage_url: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    region_id: bigint;
    sport_type_id: bigint;
}>;
export declare const updateClub: (clubData: ClubRequest, clubId: number, regionId: bigint, sportTypeId: bigint) => Promise<{
    id: bigint;
    name: string | null;
    capacity: number | null;
    activity_frequency: string | null;
    join_requirement: string | null;
    summary: string | null;
    level: import("@prisma/client").$Enums.Level | null;
    age: import("@prisma/client").$Enums.Age | null;
    contact_number: string | null;
    homepage_url: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    region_id: bigint;
    sport_type_id: bigint;
}>;
import type { ClubListData, ClubResponseData } from "../dtos/club.dto.js";
export declare const findClubs: (regionId: string | null, ageGroup: Age | null, keyword: string | null, sportId: string | null, cursor: string | null) => Promise<ClubListData[]>;
export declare const findClubById: (clubId: number) => Promise<ClubResponseData | null>;
//# sourceMappingURL=club.repository.d.ts.map