import type { Request, Response, NextFunction } from "express";
import {
  facilityAdd,
  facilityReviewAdd,
} from "../services/facility.service.js";
import { facilityDto, facilityReviewDto } from "../dtos/facility.dto.js";
import { StatusCodes } from "http-status-codes";

export const createFacility = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const operatorId = BigInt(req.user!.id);
  const facility = await facilityAdd(facilityDto(req.body), operatorId);
  res.status(StatusCodes.OK).success("시설이 성공적으로 등록되었습니다.", {
    id: facility.id.toString(),
    facilityName: facility.name,
    createdAt: facility.created_at,
  });
};

export const createFacilityReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const facilityId = Number(req.params.facilityId);
  const review = await facilityReviewAdd(
    facilityReviewDto(req.body),
    BigInt(facilityId),
    BigInt(req.user!.id),
  );
  res.status(StatusCodes.OK).success("시설이 성공적으로 등록되었습니다.", {
    id: review.id.toString(),
    userId: review.user_id.toString(),
    facilityId: review.facility_id.toString(),
    text: review.text,
    createdAt: review.created_at,
  });
};
