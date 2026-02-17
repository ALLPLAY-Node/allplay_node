import { IdInvalidError } from "../errors.js";
import { facilityDto, facilityReviewDto, facilityResponseDto, } from "../dtos/facility.dto.js";
import { reviewDto } from "../dtos/review.dto.js";
import { StatusCodes } from "http-status-codes";
import { FacilityService } from "../services/facility.service.js";
export class FacilityController {
    facilityService = new FacilityService();
    createFacility = async (req, res, next) => {
        const operatorId = BigInt(req.user.id);
        const facility = await this.facilityService.facilityAdd(facilityDto(req.body), operatorId);
        res.status(StatusCodes.OK).success("시설이 성공적으로 등록되었습니다.", {
            id: facility.id.toString(),
            facilityName: facility.name,
            createdAt: facility.created_at,
        });
    };
    createFacilityReview = async (req, res, next) => {
        const facilityId = Number(req.params.facilityId);
        if (!Number.isInteger(facilityId)) {
            return next(new IdInvalidError("시설 ID가 유효하지 않습니다.", facilityId));
        }
        const review = await this.facilityService.facilityReviewAdd(facilityReviewDto(req.body), BigInt(facilityId), BigInt(req.user.id));
        res.status(StatusCodes.OK).success("리뷰가 성공적으로 등록되었습니다.", {
            id: review.id.toString(),
            userId: review.user_id.toString(),
            facilityId: review.facility_id.toString(),
            text: review.text,
            createdAt: review.created_at,
        });
    };
    getFacilityReview = async (req, res, next) => {
        const facilityId = Number(req.params.facilityId);
        const cursor = Number(req.query.cursor) || 0;
        const { ReviewService } = await import("../services/review.service.js");
        const reviewService = new ReviewService();
        const reviews = await reviewService.getFacilityReviewWithPresignedUrl(BigInt(facilityId), BigInt(cursor));
        // photos 필드를 photoUrl 배열로 변환
        const reviewDtos = reviews.map((review) => ({
            ...review,
            photos: Array.isArray(review.photos)
                ? review.photos.map((photo) => photo.photo_url).filter((url) => !!url)
                : [],
        }));
        res.status(StatusCodes.OK).success("", {
            data: reviewDtos,
            hasNext: reviews.length > 10,
            cursor: reviews.length > 0
                ? (reviews[reviews.length - 1]?.id?.toString() ?? cursor.toString())
                : cursor.toString(),
        });
    };
    getFacility = async (req, res, next) => {
        const facilityId = Number(req.params.facilityId);
        const facility = await this.facilityService.facilityGet(BigInt(facilityId));
        const { getPresignedUrls } = await import("../services/presignedURL.util.js");
        const facilityData = facilityResponseDto(facility);
        facilityData.imageUrl = await getPresignedUrls(facilityData.imageUrl, "facilities");
        res.status(StatusCodes.OK).success("", facilityData);
    };
    getFacilityList = async (req, res, next) => {
        const cursor = req.query.cursor ? Number(req.query.cursor) : 0;
        const regionId = req.query.regionId ? Number(req.query.regionId) : null;
        const isReservable = req.query.isReservable === "true"
            ? true
            : req.query.isReservable === "false"
                ? false
                : null;
        const isPublic = req.query.isPublic === "true"
            ? true
            : req.query.isPublic === "false"
                ? false
                : null;
        const isFree = req.query.isFree === "true"
            ? true
            : req.query.isFree === "false"
                ? false
                : null;
        const keyword = typeof req.query.keyword === "string" ? req.query.keyword : null;
        const sportId = req.query.sportId ? Number(req.query.sportId) : null;
        const facilities = await this.facilityService.facilityListGet(cursor, regionId, isReservable, isPublic, isFree, keyword, sportId);
        const { getPresignedUrls } = await import("../services/presignedURL.util.js");
        const items = await Promise.all(facilities.data.map(async (facility) => {
            const dto = facilityResponseDto(facility);
            dto.imageUrl = await getPresignedUrls(dto.imageUrl, "facilities");
            return dto;
        }));
        res.status(StatusCodes.OK).success("", {
            items,
            hasNext: facilities.hasNext,
            cursor: facilities.data.length > 0
                ? facilities.data[facilities.data.length - 1].id.toString()
                : "0",
        });
    };
}
//# sourceMappingURL=facility.controller.js.map