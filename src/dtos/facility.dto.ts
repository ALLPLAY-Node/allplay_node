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

export const facilityDto = (body: FacilityDto) => {
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
