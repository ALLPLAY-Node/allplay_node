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
  joinRequestDtos,
  clubListDtos,
  clubResponseDto,
} from "../dtos/club.dto.js";
import { ClubNotFoundError } from "../errors.js";
import { StatusCodes } from "http-status-codes";

export const handleClubAdd = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = (req as any).user.id;
  const club = await clubAdd(req.body, userId);
  res.status(StatusCodes.OK).success("동호회가 성공적으로 등록되었습니다", {
    id: club.id,
    clubName: club.name,
    createdAt: club.created_at,
  });
};

export const handleClubUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = (req as any).user.id;
  const club = await clubUpdate(req.body, userId, Number(req.params.clubId));
  res
    .status(StatusCodes.OK)
    .success("동호회 정보가 성공적으로 수정되었습니다", {
      id: club.id,
      clubName: club.name,
      createdAt: club.created_at,
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
  const data = await getClubs(
    regionId as string | null,
    ageGroup as any,
    keyword as string | null,
    sportId as string | null,
    cursor as string | null,
  );
  const clubs = data.clubs;
  const len: number = clubs.length - 1;
  res.status(StatusCodes.OK).success("동호회 목록", {
    items: clubListDtos(clubs),
    cursor: clubs[len]?.id ?? null,
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
  if (!club) {
    throw new ClubNotFoundError("동호회를 찾을 수 없습니다", { clubId });
  }
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
  await leaveClub(userId, clubId);
  res.status(StatusCodes.OK).success("탈퇴 완료", {});
};
