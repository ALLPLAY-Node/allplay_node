import { addClub, findRegionByCityAndDistrict, findSportByName, } from "../repositories/club.repository.js";
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
//# sourceMappingURL=club.service.js.map