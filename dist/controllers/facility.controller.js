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
        const reviews = await this.facilityService.facilityReviewGet(BigInt(facilityId), BigInt(cursor));
        res.status(StatusCodes.OK).success("", {
            data: reviewDto(reviews.data),
            hasNext: reviews.hasNext,
            cursor: reviews.data.length > 0
                ? reviews.data[reviews.data.length - 1].id.toString()
                : cursor.toString(),
        });
    };
    getFacility = async (req, res, next) => {
        const facilityId = Number(req.params.facilityId);
        const facility = await this.facilityService.facilityGet(BigInt(facilityId));
        res.status(StatusCodes.OK).success("", facilityResponseDto(facility));
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
        res.status(StatusCodes.OK).success("", {
            data: facilities.data.map(facilityResponseDto),
            hasNext: facilities.hasNext,
            cursor: facilities.data.length > 0
                ? facilities.data[facilities.data.length - 1].id.toString()
                : "0",
        });
    };
}
//# sourceMappingURL=facility.controller.js.map