import { addClub, updateClub } from "../repositories/club.repository.js";
import { findRegionByCityAndDistrict } from "../repositories/region.repository.js";
import { findSportByName } from "../repositories/sport-type.repository.js";
import { getClubLeaderByClubId } from "../repositories/club-user.repository.js";
import { Age, Level } from "@prisma/client";
export const clubAdd = async (clubData, userId) => {
    const region = await findRegionByCityAndDistrict(clubData.city, clubData.district);
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
export const clubUpdate = async (clubData, userId, clubId) => {
    const region = await findRegionByCityAndDistrict(clubData.city, clubData.district);
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
//# sourceMappingURL=club.service.js.map