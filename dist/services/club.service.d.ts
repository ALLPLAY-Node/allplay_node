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
export declare const clubAdd: (clubData: clubRequest, userId: number) => Promise<{
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
export declare const clubUpdate: (clubData: clubRequest, userId: number, clubId: number) => Promise<{
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
export declare const getClubs: (regionId: any, ageGroup: any, keyword: any, sportId: any, cursor: any) => Promise<{
    clubs: any[];
    hasNext: boolean;
}>;
export declare const clubJoin: (userId: number, clubId: number) => Promise<{
    id: bigint;
    created_at: Date | null;
    club_id: bigint;
    user_id: bigint;
}>;
export declare const getJoinRequests: (userId: number, clubId: number) => Promise<{
    id: bigint;
    created_at: Date | null;
    club_id: bigint;
    user_id: bigint;
}[]>;
export declare const approveJoinRequest: (requestId: number, userId: number, clubId: number, status: string) => Promise<true>;
export declare const leaveClub: (userId: number, clubId: number) => Promise<true>;
export {};
//# sourceMappingURL=club.service.d.ts.map