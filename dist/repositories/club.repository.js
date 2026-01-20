import { prisma } from "../db.config.js";
import { Age, Level } from "@prisma/client";
export const findRegionByCityAndDistrict = async (city, district) => {
    const region = await prisma.region.findFirst({
        where: { city, district },
    });
    return region;
};
export const findSportByName = async (sportType) => {
    const sport = await prisma.sportType.findFirst({
        where: { sport_type: sportType },
    });
    return sport;
};
export const addClub = async (clubData, userId, regionId, sportTypeId) => {
    return await prisma.$transaction(async (tx) => {
        const club = await tx.clubs.create({
            data: {
                name: clubData.clubName,
                age: clubData.ageGroup,
                capacity: clubData.maxMembers,
                activity_frequency: clubData.activityFrequency,
                join_requirement: clubData.joinRequirement,
                summary: clubData.description,
                level: clubData.level,
                contact_number: clubData.contact,
                homepage_url: clubData.hompageUrl ?? null,
                region_id: regionId,
                sport_type_id: sportTypeId,
                created_at: new Date(),
            },
        });
        await tx.userClubs.create({
            data: {
                user_id: BigInt(userId),
                club_id: club.id,
                is_leader: true,
                created_at: new Date(),
            },
        });
        return club;
    });
};
//# sourceMappingURL=club.repository.js.map