import type { FacilityDto, FacilityReviewDto } from "../dtos/facility.dto.js";
import type { Review } from "../dtos/review.dto.js";
import { RegionRepository } from "../repositories/region.repository.js";
import { SportTypeRepository } from "../repositories/sport-type.repository.js";
import { FacilityRepository } from "../repositories/facility.repository.js";
import { ReviewRepository } from "../repositories/review.repository.js";
import {
  RegionNotFoundError,
  SportNotFoundError,
  FailToAddReviewError,
  FacilityNotFoundError,
} from "../errors.js";

export class FacilityService {
  private regionRepository = new RegionRepository();
  private sportTypeRepository = new SportTypeRepository();
  private facilityRepository = new FacilityRepository();
  private reviewRepository = new ReviewRepository();

  // S3 URL에서 key만 추출하는 함수
  extractS3Key = function (url: string): string {
    const match = url.match(/amazonaws\.com\/(.+)$/);
    return match ? match[1]! : url;
  };

  facilityAdd = async (facility: FacilityDto, operator_id: bigint) => {
    const region = await this.regionRepository.findRegionByCityAndDistrict(
      facility.city,
      facility.district,
    );
    if (!region) {
      throw new RegionNotFoundError("Region not found", {});
    }
    const sport = await this.sportTypeRepository.findSportByName(
      facility.sportType,
    );
    if (!sport) {
      throw new SportNotFoundError("Sport type not found", {});
    }
    let facilityToSave = { ...facility };
    if (Array.isArray(facility.imageURL)) {
      facilityToSave.imageURL = facility.imageURL.map((url) =>
        this.extractS3Key(url),
      );
    }
    const data = await this.facilityRepository.addFacility(
      facilityToSave,
      operator_id,
      region.id,
      sport.id,
    );
    return data;
  };

  facilityReviewAdd = async (
    review: FacilityReviewDto,
    facilityId: bigint,
    userId: bigint,
  ) => {
    const facility = await this.facilityRepository.getFacilityById(facilityId);
    if (!facility) {
      throw new FacilityNotFoundError(
        "Facility not found",
        facilityId.toString(),
      );
    }

    let reviewToSave = { ...review };
    if (Array.isArray(review.photoUrl)) {
      reviewToSave.photoUrl = review.photoUrl.map((url) =>
        this.extractS3Key(url),
      );
    }
    const data = await this.reviewRepository.addReview(
      reviewToSave,
      facilityId,
      userId,
    );
    if (!data) {
      throw new FailToAddReviewError("Fail to add review", {});
    }
    return data;
  };

  facilityReviewGet = async (
    facilityId: bigint,
    cursor: bigint,
  ): Promise<{ data: Review[]; hasNext: boolean }> => {
    const data = await this.reviewRepository.getFacilityReview(
      facilityId,
      cursor,
    );
    let hasNext = false;
    if (data.length > 10) {
      data.pop();
      hasNext = true;
    }
    return { data, hasNext };
  };

  facilityGet = async (facilityId: bigint) => {
    const data = await this.facilityRepository.getFacilityById(facilityId);
    if (data === null) {
      throw new FacilityNotFoundError(
        "Facility not found",
        facilityId.toString(),
      );
    }
    return data;
  };

  facilityListGet = async (
    cursor: number,
    regionId: number | null,
    isReservable: boolean | null,
    isPublic: boolean | null,
    isFree: boolean | null,
    keyword: string | null,
    sportId: number | null,
  ) => {
    const data = await this.facilityRepository.getFacilityList(
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
}
