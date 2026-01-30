import type { Request, Response, NextFunction } from "express";
import { ClubService } from "../services/club.service.js";
import {
  joinRequestDtos,
  clubListDtos,
  clubResponseDto,
} from "../dtos/club.dto.js";
import { ClubNotFoundError } from "../errors.js";
import { StatusCodes } from "http-status-codes";

export class ClubController {
  private clubService = new ClubService();

  clubAdd = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userId = (req as any).user.id;
    const club = await this.clubService.clubAdd(req.body, userId);
    res.status(StatusCodes.OK).success("동호회가 성공적으로 등록되었습니다", {
      id: club.id.toString(),
      clubName: club.name,
      createdAt: club.created_at,
    });
  };

  clubUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userId = (req as any).user.id;
    const club = await this.clubService.clubUpdate(
      req.body,
      userId,
      Number(req.params.clubId),
    );
    res
      .status(StatusCodes.OK)
      .success("동호회 정보가 성공적으로 수정되었습니다", {
        id: club.id.toString(),
        clubName: club.name,
        createdAt: club.created_at,
      });
  };

  getClubs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const regionId = req.query.regionId;
    const ageGroup = req.query.ageGroup;
    const keyword = req.query.keyword;
    const sportId = req.query.sportId;
    const cursor = req.query.cursor;
    const data = await this.clubService.getClubs(
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
      cursor: clubs[len]?.id.toString() ?? null,
      hasNext: data.hasNext,
    });
  };

  getClub = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const clubId = Number(req.params.clubId);
    const club = await this.clubService.getClub(clubId);
    if (!club) {
      throw new ClubNotFoundError("동호회를 찾을 수 없습니다", { clubId });
    }
    res.status(StatusCodes.OK).success("동호회 정보", clubResponseDto(club));
  };

  clubJoin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userId = (req as any).user.id;
    const joinRequest = await this.clubService.clubJoin(
      userId,
      Number(req.params.clubId),
    );
    res.status(StatusCodes.OK).success("가입 신청 완료", {
      clubId: joinRequest.club_id.toString(),
      userId: joinRequest.user_id.toString(),
      createdAt: joinRequest.created_at,
    });
  };

  getJoinRequests = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userId = (req as any).user.id;
    const items = await this.clubService.getJoinRequests(
      userId,
      Number(req.params.clubId),
    );
    res
      .status(StatusCodes.OK)
      .success("가입 신청 목록", joinRequestDtos(items));
  };

  approveJoinRequest = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userId = (req as any).user.id;
    const joinRequest = await this.clubService.approveJoinRequest(
      Number(req.params.requestId),
      userId,
      Number(req.params.clubId),
      req.body.status,
    );
    if (joinRequest && req.body.status === "APPROVED") {
      res.status(StatusCodes.OK).success("가입 신청 승인", {});
    } else if (joinRequest && req.body.status === "REJECTED") {
      res.status(StatusCodes.OK).success("가입 신청 거절", {});
    }
  };

  leaveClub = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userId = (req as any).user.id;
    const clubId = Number(req.params.clubId);
    await this.clubService.leaveClub(userId, clubId);
    res.status(StatusCodes.OK).success("탈퇴 완료", {});
  };
}
