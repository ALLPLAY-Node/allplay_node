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

export const facilityDto = (body: FacilityDto): FacilityDto => {
  return {
    facilityName: body.facilityName,
    sportType: body.sportType,
    city: body.city,
    district: body.district,
    address: body.address,
    operatingHours: body.operatingHours,
    imageUrl: body.imageUrl,
    introduction: body.introduction,
    information: body.information,
    usageGuide: body.usageGuide,
    contact: body.contact,
    homepageUrl: body.homepageUrl,
    cost: body.cost,
  };
};

export const facilityResponseDto = (facility: any) => {
  return {
    id: facility.id.toString(),
    sportType: facility.sport?.sport_type ?? "",
    facilityName: facility.name ?? "",
    isPublic: facility.is_public ?? false,
    city: facility.region?.city ?? "",
    district: facility.region?.district ?? "",
    address: facility.address ?? "",
    cost: facility.cost ?? undefined,
    operatingHours: facility.operating_hours ?? "",
    imageUrl:
      facility.photos?.map((p: any) => p.facility_photo_url).filter(Boolean) ??
      [],
    introduction: facility.introduction ?? "",
    information: facility.information ?? "",
    usageGuide: facility.usage_guide ?? "",
    contact: facility.contact_number ?? "",
    homepageUrl: facility.url ?? "",
  };
};

export interface FacilityReviewDto {
  text: string;
  photoUrl?: string[] | undefined;
}

export const facilityReviewDto = (body: FacilityReviewDto) => {
  return {
    text: body.text,
    photoUrl: body.photoUrl,
  };
};
