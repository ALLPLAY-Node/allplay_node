import { Age, Level } from "@prisma/client";
export interface ClubRequest {
    clubName: string;
    sportType: string;
    city: string;
    district: string;
    ageGroup: Age;
    imageURL: string[];
    maxMembers: number;
    activityFrequency: string;
    level: Level;
    description: string;
    joinRequirement: string;
    contact: string;
    homepageUrl: string;
}
export interface ClubListData {
    id: bigint | string;
    name: string | null;
    photos: {
        club_photo_url: string | null;
    }[];
    summary: string | null;
    join_requirement: string | null;
    region: {
        city: string | null;
        district: string | null;
    } | null;
    capacity: number | null;
    _count: {
        members: number;
    };
}
export declare const clubListDtos: (data: ClubListData[]) => {
    id: string;
    clubName: string | null;
    clubPhotoURL: {
        club_photo_url: string | null;
    }[];
    description: string | null;
    joinRequirement: string | null;
    region: string;
    maxMembers: number | null;
    currentMembers: number;
}[];
export interface JoinRequestData {
    id: bigint;
    club_id: bigint;
    user_id: bigint;
    created_at: Date | null;
}
export declare const joinRequestDtos: (data: JoinRequestData[]) => {
    id: string;
    clubId: string;
    userId: string;
    applicationDate: Date | null;
}[];
export interface ClubResponseData {
    id: bigint;
    name: string | null;
    photos: {
        club_photo_url: string | null;
    }[];
    members: {
        user: {
            name: string | null;
            introduce: string | null;
        };
    }[];
    region: {
        city: string | null;
        district: string | null;
    } | null;
    level: Level | null;
    capacity: number | null;
    _count: {
        members: number;
    };
    join_requirement: string | null;
    contact_number: string | null;
    homepage_url: string | null;
}
export declare const clubResponseDto: (data: ClubResponseData) => {
    id: string;
    clubName: string | null;
    clubPhotoURL: {
        club_photo_url: string | null;
    }[];
    operator: {
        name: string | null;
        introduce: string | null;
    } | undefined;
    region: string;
    level: import("@prisma/client").$Enums.Level | null;
    maxMembers: number | null;
    currentMembers: number;
    joinRequirement: string | null;
    contact: string | null;
    homepageURL: string | null;
};
//# sourceMappingURL=club.dto.d.ts.map