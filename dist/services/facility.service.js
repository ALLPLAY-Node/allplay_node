import { RegionRepository } from "../repositories/region.repository.js";
import { SportTypeRepository } from "../repositories/sport-type.repository.js";
import { FacilityRepository } from "../repositories/facility.repository.js";
import { ReviewRepository } from "../repositories/review.repository.js";
import { RegionNotFoundError, SportNotFoundError, FailToAddReviewError, FacilityNotFoundError, } from "../errors.js";
export class FacilityService {
    regionRepository = new RegionRepository();
    sportTypeRepository = new SportTypeRepository();
    facilityRepository = new FacilityRepository();
    reviewRepository = new ReviewRepository();
    facilityAdd = async (facility, operator_id) => {
        const region = await this.regionRepository.findRegionByCityAndDistrict(facility.city, facility.district);
        if (!region) {
            throw new RegionNotFoundError("Region not found", {});
        }
        const sport = await this.sportTypeRepository.findSportByName(facility.sportType);
        if (!sport) {
            throw new SportNotFoundError("Sport type not found", {});
        }
        const data = await this.facilityRepository.addFacility(facility, operator_id, region.id, sport.id);
        return data;
    };
    facilityReviewAdd = async (review, facilityId, userId) => {
        const facility = await this.facilityRepository.getFacilityById(facilityId);
        if (!facility) {
            throw new FacilityNotFoundError("Facility not found", facilityId.toString());
        }
        const data = await this.reviewRepository.addReview(review, facilityId, userId);
        if (!data) {
            throw new FailToAddReviewError("Fail to add review", {});
        }
        return data;
    };
    facilityReviewGet = async (facilityId, cursor) => {
        const data = await this.reviewRepository.getFacilityReview(facilityId, cursor);
        let hasNext = false;
        if (data.length > 10) {
            data.pop();
            hasNext = true;
        }
        return { data, hasNext };
    };
    facilityGet = async (facilityId) => {
        const data = await this.facilityRepository.getFacilityById(facilityId);
        if (data === null) {
            throw new FacilityNotFoundError("Facility not found", facilityId.toString());
        }
        return data;
    };
    facilityListGet = async (cursor, regionId, isReservable, isPublic, isFree, keyword, sportId) => {
        const data = await this.facilityRepository.getFacilityList(cursor, regionId, isReservable, isPublic, isFree, keyword, sportId);
        let hasNext = false;
        if (data.length > 10) {
            data.pop();
            hasNext = true;
        }
        return { data, hasNext };
    };
}
//# sourceMappingURL=facility.service.js.map