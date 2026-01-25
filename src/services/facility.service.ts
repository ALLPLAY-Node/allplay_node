import type { FacilityDto, FacilityReviewDto } from "../dtos/facility.dto.js";
import { findRegionByCityAndDistrict } from "../repositories/region.repository.js";
import { findSportByName } from "../repositories/sport-type.repository.js";
import { addFacility } from "../repositories/facility.repository.js";
import { addReview } from "../repositories/review.repository.js";
import {
  RegionNotFoundError,
  SportNotFoundError,
  FailToAddReviewError,
} from "../errors.js";

export const facilityAdd = async (
  facility: FacilityDto,
  operator_id: bigint,
) => {
  const region = await findRegionByCityAndDistrict(
    facility.city,
    facility.district,
  );
  if (!region) {
    throw new RegionNotFoundError("Region not found", facility);
  }
  const sport = await findSportByName(facility.sportType);
  if (!sport) {
    throw new SportNotFoundError("Sport type not found", facility);
  }
  const data = await addFacility(facility, operator_id, region.id, sport.id);
  return data;
};

export const facilityReviewAdd = async (
  review: FacilityReviewDto,
  facilityId: bigint,
  userId: bigint,
) => {
  const data = await addReview(review, facilityId, userId);
  if (!data) {
    throw new FailToAddReviewError("Fail to add review", review);
  }
  return data;
};
