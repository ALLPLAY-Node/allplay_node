import { Age, Level } from "@prisma/client";
interface clubRequest {
    clubName: string;
    sportType: string;
    city: string;
    district: string;
    ageGroup: Age;
    imageURL?: string[];
    maxMembers: number;
    activityFrequency: string;
    level: Level;
    description: string;
    joinRequirement: string;
    contact: string;
    hompageUrl?: string;
}
export declare const addClub: (clubData: clubRequest, userId: number, regionId: bigint, sportTypeId: bigint) => Promise<{
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
export declare const updateClub: (clubData: clubRequest, clubId: number, regionId: bigint, sportTypeId: bigint) => Promise<{
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
export declare const findClubs: (regionId: any, ageGroup: any, keyword: any, sportId: any, cursor: any) => Promise<any[]>;
export {};
//# sourceMappingURL=club.repository.d.ts.map