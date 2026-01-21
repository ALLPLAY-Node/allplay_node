import { addClub, updateClub } from "../repositories/club.repository.js";
import { findRegionByCityAndDistrict } from "../repositories/region.repository.js";
import { findSportByName } from "../repositories/sport-type.repository.js";
import { getClubLeaderByClubId } from "../repositories/club-user.repository.js";
import { joinClub, isApplied, findJoinRequests, } from "../repositories/join-request.repository.js";
import { Age, Level } from "@prisma/client";
import { RegionNotFoundError, SportNotFoundError, ClubLeaderNotFoundError, ClubNotAuthorizedError, AlreadyAppliedError, } from "../errors.js";
export const clubAdd = async (clubData, userId) => {
    const region = await findRegionByCityAndDistrict(clubData.city, clubData.district);
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
export const clubUpdate = async (clubData, userId, clubId) => {
    const region = await findRegionByCityAndDistrict(clubData.city, clubData.district);
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
        throw new ClubNotAuthorizedError("not authorized to update this club", clubData);
    }
    const updatedClub = await updateClub(clubData, clubId, region.id, sport.id);
    return updatedClub;
};
export const clubJoin = async (userId, clubId) => {
    const isApply = await isApplied(userId, clubId);
    if (isApply) {
        throw new AlreadyAppliedError("already applied", { userId, clubId });
    }
    const joinRequest = await joinClub(userId, clubId);
    return joinRequest;
};
export const getJoinRequests = async (userId, clubId) => {
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
//# sourceMappingURL=club.service.js.map