import { ClubRepository } from "../repositories/club.repository.js";
import { RegionRepository } from "../repositories/region.repository.js";
import { SportTypeRepository } from "../repositories/sport-type.repository.js";
import { ClubUserRepository } from "../repositories/club-user.repository.js";
import { JoinRequestRepository } from "../repositories/join-request.repository.js";
import { addClubPhotos } from "../repositories/clubPhoto.repository.js";
import { Age } from "@prisma/client";
import { RegionNotFoundError, SportNotFoundError, ClubLeaderNotFoundError, ClubNotAuthorizedError, AlreadyAppliedError, JoinRequestNotFoundError, AlreadyClubLeaderError, NotClubUserError, ClubLeaderCannotLeaveError, } from "../errors.js";
var Status;
(function (Status) {
    Status["APPROVED"] = "APPROVED";
    Status["REJECTED"] = "REJECTED";
})(Status || (Status = {}));
export class ClubService {
    clubRepository = new ClubRepository();
    regionRepository = new RegionRepository();
    sportTypeRepository = new SportTypeRepository();
    clubUserRepository = new ClubUserRepository();
    joinRequestRepository = new JoinRequestRepository();
    clubAdd = async (clubData, userId) => {
        const region = await this.regionRepository.findRegionByCityAndDistrict(clubData.city, clubData.district);
        if (!region) {
            throw new RegionNotFoundError("Region not found", clubData);
        }
        const sport = await this.sportTypeRepository.findSportByName(clubData.sportType);
        if (!sport) {
            throw new SportNotFoundError("Sport type not found", clubData);
        }
        const club = await this.clubRepository.addClub(clubData, userId, region.id, sport.id);
        if (clubData.imageURL) {
            await addClubPhotos(clubData.imageURL, club.id);
        }
        return club;
    };
    clubUpdate = async (clubData, userId, clubId) => {
        const region = await this.regionRepository.findRegionByCityAndDistrict(clubData.city, clubData.district);
        if (!region) {
            throw new RegionNotFoundError("Region not found", clubData);
        }
        const sport = await this.sportTypeRepository.findSportByName(clubData.sportType);
        if (!sport) {
            throw new SportNotFoundError("Sport type not found", clubData);
        }
        const clubLeader = await this.clubUserRepository.getClubLeaderByClubId(BigInt(clubId));
        if (!clubLeader) {
            throw new ClubLeaderNotFoundError("Club leader not found", clubData);
        }
        if (clubLeader.user_id !== BigInt(userId)) {
            throw new ClubNotAuthorizedError("not authorized to update this club", clubData);
        }
        const updatedClub = await this.clubRepository.updateClub(clubData, clubId, region.id, sport.id);
        return updatedClub;
    };
    getClubs = async (regionId, ageGroup, keyword, sportId, cursor) => {
        const clubs = await this.clubRepository.findClubs(regionId, ageGroup, keyword, sportId, cursor);
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
    getClub = async (clubId) => {
        const club = await this.clubRepository.findClubById(clubId);
        return club;
    };
    clubJoin = async (userId, clubId) => {
        const isApply = await this.joinRequestRepository.isApplied(userId, clubId);
        if (isApply) {
            throw new AlreadyAppliedError("already applied", { userId, clubId });
        }
        const clubLeader = await this.clubUserRepository.getClubLeaderByClubId(BigInt(clubId));
        if (!clubLeader) {
            throw new ClubLeaderNotFoundError("Club leader not found", {});
        }
        if (clubLeader.user_id === BigInt(userId)) {
            throw new AlreadyClubLeaderError("already club leader", {});
        }
        const joinRequest = await this.joinRequestRepository.joinClub(userId, clubId);
        return joinRequest;
    };
    getJoinRequests = async (userId, clubId) => {
        const clubLeader = await this.clubUserRepository.getClubLeaderByClubId(BigInt(clubId));
        if (!clubLeader) {
            throw new ClubLeaderNotFoundError("Club leader not found", {});
        }
        if (clubLeader.user_id !== BigInt(userId)) {
            throw new ClubNotAuthorizedError("not authorized to manage join requests", {});
        }
        const joinRequests = await this.joinRequestRepository.findJoinRequests(clubId);
        return joinRequests;
    };
    approveJoinRequest = async (requestId, userId, clubId, status) => {
        const clubLeader = await this.clubUserRepository.getClubLeaderByClubId(BigInt(clubId));
        if (!clubLeader) {
            throw new ClubLeaderNotFoundError("Club leader not found", {});
        }
        if (clubLeader.user_id !== BigInt(userId)) {
            throw new ClubNotAuthorizedError("not authorized to update this club", {});
        }
        const data = await this.joinRequestRepository.joinRequestApprove(requestId, clubId, status);
        if (!data) {
            throw new JoinRequestNotFoundError("Join request not found", {});
        }
        return data;
    };
    leaveClub = async (userId, clubId) => {
        const clubLeader = await this.clubUserRepository.getClubLeaderByClubId(BigInt(clubId));
        if (!clubLeader) {
            throw new ClubLeaderNotFoundError("Club leader not found", {});
        }
        if (clubLeader.user_id === BigInt(userId)) {
            throw new ClubLeaderCannotLeaveError("club leader cannot leave club", {});
        }
        const data = await this.clubUserRepository.clubLeave(BigInt(userId), BigInt(clubId));
        if (!data) {
            throw new NotClubUserError("not club user", { userId, clubId });
        }
        return data;
    };
}
//# sourceMappingURL=club.service.js.map