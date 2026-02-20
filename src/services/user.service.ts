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

  // S3 URL에서 key만 추출하는 함수
  function extractS3Key(url: string): string {
    const match = url.match(/amazonaws\.com\/(.+)$/);
    return match ? match[1]! : url;
  }
  let data = updateUserBodyDTO(body);
  if (data.profile_photo_url) {
    data.profile_photo_url = extractS3Key(data.profile_photo_url);
  }
  return await userRepo.updateUserRaw(userId, data);
};

// 회원 탈퇴
export const quitService = async (userId: number) => {
  const user = await userRepo.findUserWithRegion(userId);
  if (!user) throw new Error("User not found");

  // 별칭 안 쓰고 원본 이름 그대로 호출
  await userRepo.updateUserStatus(userId);

  return await userRepo.findUserWithRegion(userId);
};

// 동호회 목록 조회
export const getClubs = async (userId: number) => {
  return await userRepo.findUserClubs(userId);
};

export const getManagedClubs = async (userId: number) => {
  return await userRepo.findUserManagedClubs(userId);
};

// 리뷰 목록 조회
export const getReviews = async (userId: number, reviewId?: number) => {
  const reviews = await userRepo.findUserReviews(userId, reviewId);

  if (reviewId && (!reviews || reviews.length === 0)) {
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
  const reviews = await userRepo.findUserReviews(userId, reviewId);

  if (!reviews || reviews.length === 0) {
    throw new Error("Review not found or permission denied");
  }

  return await userRepo.updateReviewRaw(reviewId, text);
};
