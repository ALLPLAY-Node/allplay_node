import * as userRepo from "../repositories/user.repository.js";
import { updateUserBodyDTO } from "../dtos/user.dto.js";

// 유저 프로필 조회
export const getProfile = async (userId: number) => {
  const user = await userRepo.findUserWithRegion(userId);
  if (!user) throw new Error("User not found");
  return user;
};

// 유저 프로필 수정
export const updateProfile = async (userId: number, body: any) => {
  const user = await userRepo.findUserWithRegion(userId);
  if (!user) throw new Error("User not found");

  const data = updateUserBodyDTO(body);
  const updatedUser = await userRepo.updateUserRaw(userId, data);
  return updatedUser;
};

// 회원 탈퇴 처리
export const quitService = async (userId: number) => {
  const user = await userRepo.findUserWithRegion(userId);
  if (!user) throw new Error("User not found");

  await userRepo.updateUserStatus(userId);
  const inactiveUser = await userRepo.findUserWithRegion(userId);
  return inactiveUser;
};

// 리뷰 조회
export const getReviews = async (userId: number, reviewId?: number) => {
  const reviews = await userRepo.findUserReviews(userId, reviewId);
  if (reviewId && reviews.length === 0) {
    throw new Error("Review not found");
  }
  return reviews;
};

// 리뷰 수정
export const editReview = async (
  userId: number,
  reviewId: number,
  text: string,
) => {
  const review = await userRepo.findUserReviews(userId, reviewId);
  if (!review || review.length === 0) {
    throw new Error("수정 권한이 없거나 리뷰가 없습니다.");
  }

  return await userRepo.updateReviewRaw(reviewId, text);
};
