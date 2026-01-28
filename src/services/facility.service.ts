import type { FacilityDto, FacilityReviewDto } from "../dtos/facility.dto.js";
import type { Review } from "../dtos/review.dto.js";
import { findRegionByCityAndDistrict } from "../repositories/region.repository.js";
import { findSportByName } from "../repositories/sport-type.repository.js";
import {
  addFacility,
  getFacilityById,
  getFacilityList,
} from "../repositories/facility.repository.js";
import {
  addReview,
  getFacilityReview,
} from "../repositories/review.repository.js";
import {
  RegionNotFoundError,
  SportNotFoundError,
  FailToAddReviewError,
  FacilityNotFoundError,
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
    throw new RegionNotFoundError("Region not found", {});
  }
  const sport = await findSportByName(facility.sportType);
  if (!sport) {
    throw new SportNotFoundError("Sport type not found", {});
  }
  const data = await addFacility(facility, operator_id, region.id, sport.id);
  return data;
};

export const facilityReviewAdd = async (
  review: FacilityReviewDto,
  facilityId: bigint,
  userId: bigint,
) => {
  const facility = await getFacilityById(facilityId);
  if (!facility) {
    throw new FacilityNotFoundError(
      "Facility not found",
      facilityId.toString(),
    );
  }
  const data = await addReview(review, facilityId, userId);
  if (!data) {
    throw new FailToAddReviewError("Fail to add review", {});
  }
  return data;
};

export const facilityReviewGet = async (
  facilityId: bigint,
  cursor: bigint,
): Promise<{ data: Review[]; hasNext: boolean }> => {
  const data = await getFacilityReview(facilityId, cursor);
  let hasNext = false;
  if (data.length > 10) {
    data.pop();
    hasNext = true;
  }
  return { data, hasNext };
};

export const facilityGet = async (facilityId: bigint) => {
  const data = await getFacilityById(facilityId);
  if (data === null) {
    throw new FacilityNotFoundError(
      "Facility not found",
      facilityId.toString(),
    );
  }
  return data;
};

export const facilityListGet = async (
  cursor: number,
  regionId: number | null,
  isReservable: boolean | null,
  isPublic: boolean | null,
  isFree: boolean | null,
  keyword: string | null,
  sportId: number | null,
) => {
  const data = await getFacilityList(
    cursor,
    regionId,
    isReservable,
    isPublic,
    isFree,
    keyword,
    sportId,
  );
  let hasNext = false;
  if (data.length > 10) {
    data.pop();
    hasNext = true;
  }
  return { data, hasNext };
};
