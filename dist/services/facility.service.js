import { findRegionByCityAndDistrict } from "../repositories/region.repository.js";
import { findSportByName } from "../repositories/sport-type.repository.js";
import { addFacility, getFacilityById, getFacilityList, } from "../repositories/facility.repository.js";
import { addReview, getFacilityReview, } from "../repositories/review.repository.js";
import { RegionNotFoundError, SportNotFoundError, FailToAddReviewError, FacilityNotFoundError, } from "../errors.js";
export const facilityAdd = async (facility, operator_id) => {
    const region = await findRegionByCityAndDistrict(facility.city, facility.district);
    if (!region) {
        throw new RegionNotFoundError("Region not found", {});
    }
    const sport = await findSportByName(facility.sportType);
    if (!sport) {
        throw new SportNotFoundError("Sport type not found", {});
    }
    const data = await addFacility(facility, operator_id, region.id, sport.id);
    return data;
};
export const facilityReviewAdd = async (review, facilityId, userId) => {
    const data = await addReview(review, facilityId, userId);
    if (!data) {
        throw new FailToAddReviewError("Fail to add review", {});
    }
    return data;
};
export const facilityReviewGet = async (facilityId, cursor) => {
    const data = await getFacilityReview(facilityId, cursor);
    let hasNext = false;
    if (data.length > 10) {
        data.pop();
        hasNext = true;
    }
    return { data, hasNext };
};
export const facilityGet = async (facilityId) => {
    const data = await getFacilityById(facilityId);
    if (data === null) {
        throw new FacilityNotFoundError("Facility not found", facilityId.toString());
    }
    return data;
};
export const facilityListGet = async (cursor, regionId, isResevable, isPublic, isFree, keyword, sportId) => {
    const data = await getFacilityList(cursor, regionId, isResevable, isPublic, isFree, keyword, sportId);
    let hasNext = false;
    if (data.length > 10) {
        data.pop();
        hasNext = true;
    }
    return { data, hasNext };
};
//# sourceMappingURL=facility.service.js.map