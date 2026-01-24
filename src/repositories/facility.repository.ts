import { prisma } from "../db.config.js";
import type { FacilityDto } from "../dtos/facility.dto.js";

export const addFacility = async (
  facility: FacilityDto,
  operator_id: bigint,
  region_id: bigint,
  sport_type_id: bigint,
) => {
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
