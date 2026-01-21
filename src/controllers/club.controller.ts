import type { Request, Response, NextFunction } from "express";
import {
  clubAdd,
  clubUpdate,
  clubJoin,
  getJoinRequests,
  approveJoinRequest,
  leaveClub,
  getClubs,
  getClub,
} from "../services/club.service.js";
import {
  clubDtos,
  joinRequestDtos,
  clubListDtos,
  clubResponseDto,
} from "../dtos/club.dto.js";
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

export const handleGetClubs = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const regionId = req.query.regionId;
  const ageGroup = req.query.ageGroup;
  const keyword = req.query.keyword;
  const sportId = req.query.sportId;
  const cursor = req.query.cursor;
  const data = await getClubs(regionId, ageGroup, keyword, sportId, cursor);
  const len: number = data.clubs.length - 1;
  res.status(StatusCodes.OK).success("동호회 목록", {
    items: clubListDtos(data.clubs),
    cursor: len >= 0 ? data.clubs[len].id : null,
    hasNext: data.hasNext,
  });
};

export const handleGetClub = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const clubId = Number(req.params.clubId);
  const club = await getClub(clubId);
  res.status(StatusCodes.OK).success("동호회 정보", clubResponseDto(club));
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

export const handleGetJoinRequests = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = (req as any).user.id;
  const items = await getJoinRequests(userId, Number(req.params.clubId));
  res.status(StatusCodes.OK).success("가입 신청 목록", joinRequestDtos(items));
};

export const handleApproveJoinRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = (req as any).user.id;
  const status = req.body.status;
  const joinRequest = await approveJoinRequest(
    Number(req.params.requestId),
    userId,
    Number(req.params.clubId),
    status,
  );
  if (joinRequest && status === "APPROVED") {
    res.status(StatusCodes.OK).success("가입 신청 승인", {});
  } else if (joinRequest && status === "REJECTED") {
    res.status(StatusCodes.OK).success("가입 신청 거절", {});
  }
};

export const handleLeaveClub = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = (req as any).user.id;
  const clubId = Number(req.params.clubId);
  const data = await leaveClub(userId, clubId);
  res.status(StatusCodes.OK).success("탈퇴 완료", {});
};
