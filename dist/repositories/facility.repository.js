import { prisma } from "../db.config.js";
export const addFacility = async (facility, operator_id, region_id, sport_type_id) => {
    return await prisma.$transaction(async (tx) => {
        const facilityData = await tx.sportFacilities.create({
            data: {
                name: facility.facilityName,
                operator_id: operator_id,
                sport_type: sport_type_id,
                region_id: region_id,
                address: facility.address,
                cost: facility.cost ?? null,
                introduction: facility.introduction,
                information: facility.information,
                usage_guide: facility.usageGuide,
                contact_number: facility.contact,
                url: facility.homepageUrl,
                operating_hours: facility.operatingHours,
                created_at: new Date(),
            },
        });
        for (const photo of facility.imageUrl ?? []) {
            await tx.facilityPhotos.create({
                data: {
                    facility_id: facilityData.id,
                    facility_photo_url: photo,
                    uploaded_at: new Date(),
                },
            });
        }
        return facilityData;
    });
};
//# sourceMappingURL=facility.repository.js.map