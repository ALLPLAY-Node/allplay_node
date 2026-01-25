export const facilityDto = (body) => {
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
export const facilityResponseDto = (facility) => {
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
        imageUrl: facility.photos?.map((p) => p.facility_photo_url).filter(Boolean) ??
            [],
        introduction: facility.introduction ?? "",
        information: facility.information ?? "",
        usageGuide: facility.usage_guide ?? "",
        contact: facility.contact_number ?? "",
        homepageUrl: facility.url ?? "",
    };
};
export const facilityReviewDto = (body) => {
    return {
        text: body.text,
        photoUrl: body.photoUrl,
    };
};
//# sourceMappingURL=facility.dto.js.map