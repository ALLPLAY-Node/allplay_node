import { prisma } from "../db.config.js";
import { Age, Level } from "@prisma/client";
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
export const updateClub = async (clubData, clubId, regionId, sportTypeId) => {
    return await prisma.$transaction(async (tx) => {
        const club = await tx.clubs.update({
            where: {
                id: BigInt(clubId),
            },
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
                updated_at: new Date(),
            },
        });
        return club;
    });
};
//# sourceMappingURL=club.repository.js.map