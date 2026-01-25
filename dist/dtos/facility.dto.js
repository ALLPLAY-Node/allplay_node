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
export const facilityReviewDto = (body) => {
    return {
        text: body.text,
        photoUrl: body.photoUrl,
    };
};
//# sourceMappingURL=facility.dto.js.map