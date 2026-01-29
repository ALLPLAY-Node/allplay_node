import { addClub, updateClub, findClubs, findClubById, } from "../repositories/club.repository.js";
import { findRegionByCityAndDistrict } from "../repositories/region.repository.js";
import { findSportByName } from "../repositories/sport-type.repository.js";
import { getClubLeaderByClubId, clubLeave, } from "../repositories/club-user.repository.js";
import { joinClub, isApplied, findJoinRequests, joinRequestApprove, } from "../repositories/join-request.repository.js";
import { addClubPhotos } from "../repositories/clubPhoto.repository.js";
import { Age, Level } from "@prisma/client";
import { RegionNotFoundError, SportNotFoundError, ClubLeaderNotFoundError, ClubNotAuthorizedError, AlreadyAppliedError, JoinRequestNotFoundError, AlreadyClubLeaderError, NotClubUserError, } from "../errors.js";
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
    if (clubData.imageURL) {
        await addClubPhotos(clubData.imageURL, club.id);
    }
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
export const getClubs = async (regionId, ageGroup, keyword, sportId, cursor) => {
    const clubs = await findClubs(regionId, ageGroup, keyword, sportId, cursor);
    let hasNext;
    if (clubs.length > 10) {
        clubs.pop();
        hasNext = true;
    }
    else {
        hasNext = false;
    }
    return { clubs, hasNext };
};
export const getClub = async (clubId) => {
    const club = await findClubById(clubId);
    return club;
};
export const clubJoin = async (userId, clubId) => {
    const isApply = await isApplied(userId, clubId);
    if (isApply) {
        throw new AlreadyAppliedError("already applied", { userId, clubId });
    }
    const clubLeader = await getClubLeaderByClubId(BigInt(clubId));
    if (!clubLeader) {
        throw new ClubLeaderNotFoundError("Club leader not found", {});
    }
    if (clubLeader.user_id === BigInt(userId)) {
        throw new AlreadyClubLeaderError("already club leader", {});
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
export const approveJoinRequest = async (requestId, userId, clubId, status) => {
    const clubLeader = await getClubLeaderByClubId(BigInt(clubId));
    if (!clubLeader) {
        throw new ClubLeaderNotFoundError("Club leader not found", {});
    }
    if (clubLeader.user_id !== BigInt(userId)) {
        throw new ClubNotAuthorizedError("not authorized to update this club", {});
    }
    const data = await joinRequestApprove(requestId, clubId, userId, status);
    if (!data) {
        throw new JoinRequestNotFoundError("Join request not found", {});
    }
    return data;
};
export const leaveClub = async (userId, clubId) => {
    const clubLeader = await getClubLeaderByClubId(BigInt(clubId));
    if (!clubLeader) {
        throw new ClubLeaderNotFoundError("Club leader not found", {});
    }
    if (clubLeader.user_id === BigInt(userId)) {
        throw new Error("club leader cannot leave club");
    }
    const data = await clubLeave(BigInt(userId), BigInt(clubId));
    if (!data) {
        throw new NotClubUserError("not club user", { userId, clubId });
    }
    return data;
};
//# sourceMappingURL=club.service.js.map