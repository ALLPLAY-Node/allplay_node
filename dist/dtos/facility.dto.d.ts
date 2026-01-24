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
export declare const facilityDto: (body: FacilityDto) => {
    facilityName: string;
    sportType: string;
    city: string;
    district: string;
    address: string;
    operatingHours: string;
    imageUrl: string[] | undefined;
    introduction: string;
    information: string;
    usageGuide: string;
    contact: string;
    homepageUrl: string;
    cost: string | undefined;
};
//# sourceMappingURL=facility.dto.d.ts.map