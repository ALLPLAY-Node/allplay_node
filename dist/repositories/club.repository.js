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
                homepage_url: clubData.homepageUrl ?? null,
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
                homepage_url: clubData.homepageUrl ?? null,
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
            ...(regionId ? { region_id: BigInt(regionId) } : {}),
            ...(ageGroup ? { age: ageGroup } : {}), // Age enum 매칭
            ...(keyword ? { name: { contains: keyword } } : {}),
            ...(sportId ? { sport_type_id: BigInt(sportId) } : {}),
        },
        include: {
            region: true,
            sport_type: true,
            photos: true,
            _count: { select: { members: true } },
        },
        take: 11,
        orderBy: {
            id: "asc",
        },
    });
    return clubs;
};
export const findClubById = async (clubId) => {
    const club = await prisma.clubs.findUnique({
        where: {
            id: BigInt(clubId),
        },
        include: {
            region: true,
            members: {
                where: {
                    is_leader: true,
                },
                select: {
                    user: {
                        select: {
                            name: true,
                            introduce: true,
                        },
                    },
                },
            },
            photos: true,
            _count: { select: { members: true } },
        },
    });
    return club;
};
//# sourceMappingURL=club.repository.js.map