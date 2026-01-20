import { addClub, updateClub } from "../repositories/club.repository.js";
import { findRegionByCityAndDistrict } from "../repositories/region.repository.js";
import { findSportByName } from "../repositories/sport-type.repository.js";
import { getClubLeaderByClubId } from "../repositories/club-user.repository.js";
import {
  joinClub,
  isApplied,
} from "../repositories/join-request.repository.js";
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

export const clubAdd = async (clubData: clubRequest, userId: number) => {
  const region = await findRegionByCityAndDistrict(
    clubData.city,
    clubData.district,
  );
  if (!region) {
    throw new Error("Region not found");
  }
  const sport = await findSportByName(clubData.sportType);
  if (!sport) {
    throw new Error("Sport type not found");
  }
  const club = await addClub(clubData, userId, region.id, sport.id);
  return club;
};

export const clubUpdate = async (
  clubData: clubRequest,
  userId: number,
  clubId: number,
) => {
  const region = await findRegionByCityAndDistrict(
    clubData.city,
    clubData.district,
  );
  if (!region) {
    throw new Error("Region not found");
  }
  const sport = await findSportByName(clubData.sportType);
  if (!sport) {
    throw new Error("Sport type not found");
  }
  const clubLeader = await getClubLeaderByClubId(BigInt(clubId));
  if (!clubLeader) {
    throw new Error("Club leader not found");
  }
  if (clubLeader.user_id !== BigInt(userId)) {
    throw new Error("not authorized to update this club");
  }
  const updatedClub = await updateClub(clubData, clubId, region.id, sport.id);
  return updatedClub;
};

export const clubJoin = async (userId: number, clubId: number) => {
  const isApply = await isApplied(userId, clubId);
  if (isApply) {
    throw new Error("already applied");
  }
  const joinRequest = await joinClub(userId, clubId);
  return joinRequest;
};
