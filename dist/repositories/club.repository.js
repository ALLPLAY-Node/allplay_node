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
export const findClubs = async (regionId, ageGroup, keyword, sportId, cursor) => {
    const clubs = await prisma.clubs.findMany({
        where: {
            ...(cursor ? { id: { gt: Number(cursor) } } : {}),
            ...(regionId ? { region_id: regionId } : {}),
            ...(ageGroup ? { age: ageGroup } : {}),
            ...(keyword ? { name: { contains: keyword } } : {}),
            ...(sportId ? { sport_type_id: sportId } : {}),
        },
        include: {
            region: true,
            sport_type: true,
            photos: true,
        },
        take: 11,
        orderBy: {
            id: "asc",
        },
    });
    return clubs;
};
//# sourceMappingURL=club.repository.js.map