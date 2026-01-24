import type { Request, Response, NextFunction } from "express";
import { facilityAdd } from "../services/facility.service.js";
import { facilityDto } from "../dtos/facility.dto.js";
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
