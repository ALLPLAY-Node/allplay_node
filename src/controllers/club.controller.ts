import type { Request, Response, NextFunction } from "express";
import { clubAdd, clubUpdate, clubJoin } from "../services/club.service.js";
import { clubDtos } from "../dtos/club.dto.js";
import { StatusCodes } from "http-status-codes";

export const handleClubAdd = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = (req as any).user.id;
  const clubs = await clubAdd(clubDtos(req.body), userId);
  res.status(StatusCodes.OK).success("동호회가 성공적으로 등록되었습니다", {
    Id: clubs.id,
    clubName: clubs.name,
    createdAt: clubs.created_at,
  });
};

export const handleClubUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = (req as any).user.id;
  const clubs = await clubUpdate(
    clubDtos(req.body),
    userId,
    Number(req.params.clubId),
  );
  res
    .status(StatusCodes.OK)
    .success("동호회 정보가 성공적으로 수정되었습니다", {
      Id: clubs.id,
      clubName: clubs.name,
      createdAt: clubs.created_at,
    });
};

export const handleClubJoin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = (req as any).user.id;
  const joinRequest = await clubJoin(userId, Number(req.params.clubId));
  res.status(StatusCodes.OK).success("가입 신청 완료", {
    clubId: joinRequest.club_id,
    userId: joinRequest.user_id,
    createdAt: joinRequest.created_at,
  });
};
