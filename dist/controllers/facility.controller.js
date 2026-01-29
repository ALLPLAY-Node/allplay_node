import { facilityAdd, facilityReviewAdd, facilityReviewGet, facilityGet, facilityListGet, } from "../services/facility.service.js";
import { facilityDto, facilityReviewDto, facilityResponseDto, } from "../dtos/facility.dto.js";
import { reviewDto } from "../dtos/review.dto.js";
import { StatusCodes } from "http-status-codes";
export const createFacility = async (req, res, next) => {
    const operatorId = BigInt(req.user.id);
    const facility = await facilityAdd(facilityDto(req.body), operatorId);
    res.status(StatusCodes.OK).success("시설이 성공적으로 등록되었습니다.", {
        id: facility.id.toString(),
        facilityName: facility.name,
        createdAt: facility.created_at,
    });
};
export const createFacilityReview = async (req, res, next) => {
    const facilityId = Number(req.params.facilityId);
    const review = await facilityReviewAdd(facilityReviewDto(req.body), BigInt(facilityId), BigInt(req.user.id));
    res.status(StatusCodes.OK).success("시설이 성공적으로 등록되었습니다.", {
        id: review.id.toString(),
        userId: review.user_id.toString(),
        facilityId: review.facility_id.toString(),
        text: review.text,
        createdAt: review.created_at,
    });
};
export const getFacilityReview = async (req, res, next) => {
    const facilityId = Number(req.params.facilityId);
    const cursor = Number(req.query.cursor) || 0;
    const reviews = await facilityReviewGet(BigInt(facilityId), BigInt(cursor));
    res.status(StatusCodes.OK).success("", {
        data: reviewDto(reviews.data),
        hasNext: reviews.hasNext,
        cursor: reviews.data.length > 0
            ? reviews.data[reviews.data.length - 1].id.toString()
            : "",
    });
};
export const getFacility = async (req, res, next) => {
    const facilityId = Number(req.params.facilityId);
    const facility = await facilityGet(BigInt(facilityId));
    res.status(StatusCodes.OK).success("", facilityResponseDto(facility));
};
export const getFacilityList = async (req, res, next) => {
    console.log("getFacilityList Query Params:", req.query);
    const cursor = Number(req.query.cursor) || 0;
    const regionId = Number(req.query.regionId) || null;
    const isResevable = req.query.isResevable === "true"
        ? true
        : req.query.isResevable === "false"
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
    const sportType = Number(req.query.sportId) || null;
    const facilities = await facilityListGet(cursor, regionId, isResevable, isPublic, isFree, keyword, sportType);
    res.status(StatusCodes.OK).success("", {
        data: facilities.data.map(facilityResponseDto),
        hasNext: facilities.hasNext,
        cursor: facilities.data.length > 0
            ? facilities.data[facilities.data.length - 1].id.toString()
            : "0",
    });
};
//# sourceMappingURL=facility.controller.js.map