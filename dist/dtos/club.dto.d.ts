import { Age, Level } from "@prisma/client";
export interface clubRequest {
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
    hompageUrl: string;
}
export declare const clubDtos: (data: clubRequest) => {
    clubName: string;
    sportType: string;
    city: string;
    district: string;
    ageGroup: import("@prisma/client").$Enums.Age;
    imageURL: string[];
    maxMembers: number;
    activityFrequency: string;
    level: import("@prisma/client").$Enums.Level;
    description: string;
    joinRequirement: string;
    contact: string;
    hompageUrl: string;
};
export declare const clubListDtos: (data: any) => {
    id: any;
    clubName: any;
    clubPhotoURL: any;
    description: any;
    joinRequirement: any;
    region: string;
    maxMembers: any;
    currentMembers: any;
}[];
export declare const joinRequestDtos: (data: any) => {
    id: any;
    clubId: any;
    userId: any;
    applicationDate: any;
}[];
export declare const clubResponseDto: (data: any) => {
    id: any;
    clubName: any;
    clubPhotoURL: any;
    operator: any;
    region: string;
    level: any;
    maxMembers: any;
    currentMembers: any;
    joinRequirement: any;
    contact: any;
    hompageURL: any;
};
//# sourceMappingURL=club.dto.d.ts.map