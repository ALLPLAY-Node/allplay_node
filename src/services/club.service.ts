import {
  addClub,
  updateClub,
  findClubs,
} from "../repositories/club.repository.js";
import { findRegionByCityAndDistrict } from "../repositories/region.repository.js";
import { findSportByName } from "../repositories/sport-type.repository.js";
import {
  getClubLeaderByClubId,
  clubLeave,
} from "../repositories/club-user.repository.js";
import {
  joinClub,
  isApplied,
  findJoinRequests,
  joinRequestApprove,
} from "../repositories/join-request.repository.js";
import { addClubPhotos } from "../repositories/clubPhoto.repository.js";
import { Age, Level } from "@prisma/client";
import {
  RegionNotFoundError,
  SportNotFoundError,
  ClubLeaderNotFoundError,
  ClubNotAuthorizedError,
  AlreadyAppliedError,
  joinRequestNotFoundError,
  alreadyClubLeaderError,
  notClubUserError,
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
  if (clubData.imageURL) {
    await addClubPhotos(clubData.imageURL, club.id);
  }
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

export const getClubs = async (
  regionId: any,
  ageGroup: any,
  keyword: any,
  sportId: any,
  cursor: any,
): Promise<{ clubs: any[]; hasNext: boolean }> => {
  const clubs = await findClubs(regionId, ageGroup, keyword, sportId, cursor);
  let hasNext;
  if (clubs.length > 10) {
    clubs.pop();
    hasNext = true;
  } else {
    hasNext = false;
  }
  return { clubs, hasNext };
};

export const clubJoin = async (userId: number, clubId: number) => {
  const isApply = await isApplied(userId, clubId);
  if (isApply) {
    throw new AlreadyAppliedError("already applied", { userId, clubId });
  }
  const clubLeader = await getClubLeaderByClubId(BigInt(clubId));
  if (!clubLeader) {
    throw new ClubLeaderNotFoundError("Club leader not found", {});
  }
  if (clubLeader.user_id === BigInt(userId)) {
    throw new alreadyClubLeaderError("already club leader", {});
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

export const approveJoinRequest = async (
  requestId: number,
  userId: number,
  clubId: number,
  status: string,
) => {
  const clubLeader = await getClubLeaderByClubId(BigInt(clubId));
  if (!clubLeader) {
    throw new ClubLeaderNotFoundError("Club leader not found", {});
  }
  if (clubLeader.user_id !== BigInt(userId)) {
    throw new ClubNotAuthorizedError("not authorized to update this club", {});
  }

  const data: boolean = await joinRequestApprove(
    requestId,
    clubId,
    userId,
    status,
  );
  if (!data) {
    throw new joinRequestNotFoundError("Join request not found", {});
  }
  return data;
};

export const leaveClub = async (userId: number, clubId: number) => {
  const clubLeader = await getClubLeaderByClubId(BigInt(clubId));
  if (!clubLeader) {
    throw new ClubLeaderNotFoundError("Club leader not found", {});
  }
  if (clubLeader.user_id === BigInt(userId)) {
    throw new Error("club leader cannot leave club");
  }
  const data: boolean = await clubLeave(BigInt(userId), BigInt(clubId));
  if (!data) {
    throw new notClubUserError("not club user", { userId, clubId });
  }
  return data;
};
