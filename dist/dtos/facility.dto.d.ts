export interface FacilityDto {
    facilityName: string;
    sportType: string;
    city: string;
    district: string;
    address: string;
    operatingHours: string;
    imageUrl?: string[] | undefined;
    introduction: string;
    information: string;
    usageGuide: string;
    contact: string;
    homepageUrl: string;
    cost?: string | undefined;
}
export declare const facilityDto: (body: FacilityDto) => FacilityDto;
export declare const facilityResponseDto: (facility: any) => {
    id: any;
    sportType: any;
    facilityName: any;
    isPublic: any;
    city: any;
    district: any;
    address: any;
    cost: any;
    operatingHours: any;
    imageUrl: any;
    introduction: any;
    information: any;
    usageGuide: any;
    contact: any;
    homepageUrl: any;
};
export interface FacilityReviewDto {
    text: string;
    photoUrl?: string[] | undefined;
}
export declare const facilityReviewDto: (body: FacilityReviewDto) => {
    text: string;
    photoUrl: string[] | undefined;
};
//# sourceMappingURL=facility.dto.d.ts.map