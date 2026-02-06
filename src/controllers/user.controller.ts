import { type Request, type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as userSer from "../services/user.service.js";
import {
  userResponseDTO,
  userQuitResponseDTO,
  reviewResponseDTO,
} from "../dtos/user.dto.js";

// 내 정보 조회
export const handleGetMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) throw new Error("로그인 필요");

    const user = await userSer.getProfile(userId);
    res
      .status(StatusCodes.OK)
      .json({ resultType: "SUCCESS", success: userResponseDTO(user) });
  } catch (error) {
    next(error);
  }
};

// 내 정보 수정
export const handleUpdateMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.id;
    const updatedUser = await userSer.updateProfile(userId, req.body);
    res
      .status(StatusCodes.OK)
      .json({ resultType: "SUCCESS", success: userResponseDTO(updatedUser) });
  } catch (error) {
    next(error);
  }
};

// 회원 탈퇴
export const handleUserQuit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.id;
    const quitUser = await userSer.quitService(userId);
    res
      .status(StatusCodes.OK)
      .json({ resultType: "SUCCESS", success: userQuitResponseDTO(quitUser) });
  } catch (error) {
    next(error);
  }
};

// 내 동호회 조회
export const handleGetMyClubs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.id;
    const clubs = await userSer.getClubs(userId);
    res.status(StatusCodes.OK).json({ resultType: "SUCCESS", success: clubs });
  } catch (error) {
    next(error);
  }
};

// 내 리뷰 조회
export const handleGetMyReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.id;
    const reviewId = req.params.reviewId
      ? Number(req.params.reviewId)
      : undefined;

    if (req.params.reviewId && isNaN(Number(req.params.reviewId))) {
      throw new Error("Invalid Review ID");
    }

    const reviews = await userSer.getReviews(userId, reviewId);
    res
      .status(StatusCodes.OK)
      .json({ resultType: "SUCCESS", success: reviewResponseDTO(reviews) });
  } catch (error) {
    next(error);
  }
};

// 내 리뷰 수정
export const handleUpdateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.id;
    const reviewId = Number(req.params.reviewId);
    const { text } = req.body;

    if (isNaN(reviewId)) throw new Error("Invalid Review ID");
    if (!text) throw new Error("내용 없음");

    const updatedReview = await userSer.editReview(userId, reviewId, text);
    res
      .status(StatusCodes.OK)
      .json({ resultType: "SUCCESS", success: updatedReview });
  } catch (error) {
    next(error);
  }
};
