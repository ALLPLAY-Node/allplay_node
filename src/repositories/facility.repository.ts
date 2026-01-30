import { prisma } from "../db.config.js";
import type { FacilityDto } from "../dtos/facility.dto.js";

export class FacilityRepository {
  addFacility = async (
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

  getFacilityById = async (facilityId: bigint) => {
    const data = await prisma.sportFacilities.findUnique({
      where: {
        id: facilityId,
      },
      include: {
        photos: true,
        operator: true,
        region: true,
        sport: true,
      },
    });
    return data;
  };

  getFacilityList = async (
    cursor: number,
    regionId: number | null,
    isReservable: boolean | null,
    isPublic: boolean | null,
    isFree: boolean | null,
    keyword: string | null,
    sportId: number | null,
  ) => {
    const where: any = {
      id: {
        gt: BigInt(cursor),
      },
      region_id: regionId !== null ? BigInt(regionId) : undefined,
      is_public: isPublic !== null ? isPublic : undefined,
      sport_type: sportId !== null ? BigInt(sportId) : undefined,
      name: keyword ? { contains: keyword } : undefined,
      AND: [
        isReservable === true
          ? { apply_method: { not: null } }
          : isReservable === false
            ? { apply_method: null }
            : undefined,
        isFree === true
          ? { OR: [{ cost: "0" }, { cost: "" }, { cost: null }] }
          : isFree === false
            ? { cost: { notIn: ["0", ""], not: null } }
            : undefined,
      ].filter(Boolean),
    };

    const data = await prisma.sportFacilities.findMany({
      where,
      take: 11,
      include: {
        photos: true,
        region: true,
        sport: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    return data;
  };
}
