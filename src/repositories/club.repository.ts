import { prisma } from "../db.config.js";
import { Age } from "@prisma/client";
import type { ClubRequest } from "../dtos/club.dto.js";

export const addClub = async (
  clubData: ClubRequest,
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

export const updateClub = async (
  clubData: ClubRequest,
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
        homepage_url: clubData.homepageUrl ?? null,
        region_id: regionId,
        sport_type_id: sportTypeId,
        updated_at: new Date(),
      },
    });

    return club;
  });
};

import type { ClubListData, ClubResponseData } from "../dtos/club.dto.js";

export const findClubs = async (
  regionId: string | null,
  ageGroup: Age | null,
  keyword: string | null,
  sportId: string | null,
  cursor: string | null,
): Promise<ClubListData[]> => {
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

export const findClubById = async (
  clubId: number,
): Promise<ClubResponseData | null> => {
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

  return club as unknown as ClubResponseData | null;
};
