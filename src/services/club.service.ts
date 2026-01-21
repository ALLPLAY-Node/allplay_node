import { addClub, updateClub } from "../repositories/club.repository.js";
import { findRegionByCityAndDistrict } from "../repositories/region.repository.js";
import { findSportByName } from "../repositories/sport-type.repository.js";
import { getClubLeaderByClubId } from "../repositories/club-user.repository.js";
import {
  joinClub,
  isApplied,
  findJoinRequests,
} from "../repositories/join-request.repository.js";
import { Age, Level } from "@prisma/client";
import {
  RegionNotFoundError,
  SportNotFoundError,
  ClubLeaderNotFoundError,
  ClubNotAuthorizedError,
  AlreadyAppliedError,
} from "../errors.js";

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
    throw new RegionNotFoundError("Region not found", clubData);
  }
  const sport = await findSportByName(clubData.sportType);
  if (!sport) {
    throw new SportNotFoundError("Sport type not found", clubData);
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
    throw new RegionNotFoundError("Region not found", clubData);
  }
  const sport = await findSportByName(clubData.sportType);
  if (!sport) {
    throw new SportNotFoundError("Sport type not found", clubData);
  }
  const clubLeader = await getClubLeaderByClubId(BigInt(clubId));
  if (!clubLeader) {
    throw new ClubLeaderNotFoundError("Club leader not found", clubData);
  }
  if (clubLeader.user_id !== BigInt(userId)) {
    throw new ClubNotAuthorizedError(
      "not authorized to update this club",
      clubData,
    );
  }
  const updatedClub = await updateClub(clubData, clubId, region.id, sport.id);
  return updatedClub;
};

export const clubJoin = async (userId: number, clubId: number) => {
  const isApply = await isApplied(userId, clubId);
  if (isApply) {
    throw new AlreadyAppliedError("already applied", { userId, clubId });
  }
  const joinRequest = await joinClub(userId, clubId);
  return joinRequest;
};

export const getJoinRequests = async (userId: number, clubId: number) => {
  const clubLeader = await getClubLeaderByClubId(BigInt(clubId));
  if (!clubLeader) {
    throw new ClubLeaderNotFoundError("Club leader not found", {});
  }
  if (clubLeader.user_id !== BigInt(userId)) {
    throw new ClubNotAuthorizedError("not authorized to update this club", {});
  }

  const joinRequests = await findJoinRequests(clubId);
  return joinRequests;
};
