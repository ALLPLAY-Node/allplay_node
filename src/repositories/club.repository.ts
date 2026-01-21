import { prisma } from "../db.config.js";
import { Age, Level } from "@prisma/client";

interface clubRequest {
  clubName: string;
  sportType: string;
  city: string;
  district: string;
  ageGroup: Age;
  imageURL?: string[];
  maxMembers: number;
  activityFrequency: string;
  level: Level;
  description: string;
  joinRequirement: string;
  contact: string;
  hompageUrl?: string;
}

export const addClub = async (
  clubData: clubRequest,
  userId: number,
  regionId: bigint,
  sportTypeId: bigint,
) => {
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

export const updateClub = async (
  clubData: clubRequest,
  clubId: number,
  regionId: bigint,
  sportTypeId: bigint,
) => {
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

export const findClubs = async (
  regionId: any,
  ageGroup: any,
  keyword: any,
  sportId: any,
  cursor: any,
): Promise<any[]> => {
  const clubs = await prisma.clubs.findMany({
    where: {
      ...(cursor ? { id: { gt: Number(cursor) } } : {}),
      ...(regionId ? { region_id: BigInt(regionId as string) } : {}),
      ...(ageGroup ? { age: ageGroup as Age } : {}), // Age enum 매칭
      ...(keyword ? { name: { contains: keyword as string } } : {}),
      ...(sportId ? { sport_type_id: BigInt(sportId as string) } : {}),
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

export const findClubById = async (clubId: number) => {
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
