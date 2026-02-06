import { Gender } from "@prisma/client";
export declare const userResponseDTO: (user: any) => {
    id: any;
    email: any;
    name: any;
    birth: any;
    gender: any;
    profilePhotoUrl: any;
    introduce: any;
    region: {
        city: any;
        district: any;
    } | null;
};
export declare const clubListDTO: (userClubs: any[]) => {
    items: {
        id: any;
        name: any;
        level: any;
        region: string;
    }[];
};
export declare const reviewResponseDTO: (reviews: any[]) => {
    items: {
        id: any;
        facilityName: any;
        text: any;
        createdAt: any;
    }[];
};
export declare const userQuitResponseDTO: (user: any) => {
    userId: any;
    status: string;
    inactiveDate: any;
};
export declare const updateUserBodyDTO: (body: any) => {
    name: any;
    phone_number: any;
    introduce: any;
    profile_photo_url: any;
    region_id: bigint | undefined;
    birth: Date | undefined;
    gender: Gender;
};
//# sourceMappingURL=user.dto.d.ts.map