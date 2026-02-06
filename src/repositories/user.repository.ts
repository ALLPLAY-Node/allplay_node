import { prisma } from "../db.config.js";

// 유저 프로필 조회 (지역 정보 포함)
export const findUserWithRegion = async (userId: number) => {
  return await prisma.users.findFirst({
    where: { id: userId },
    include: { region: true }, // Region -> region으로 수정
  });
};

// 유저 정보 수정 (지역 정보 포함)
export const updateUserRaw = async (userId: number, data: any) => {
  return await prisma.users.update({
    where: { id: userId },
    data: data,
    include: { region: true }, // Region -> region으로 수정
  });
};

// 회원 탈퇴 (상태 비활성화)
export const updateUserStatus = async (userId: number) => {
  return await prisma.users.update({
    where: { id: userId },
    data: {
      status: false,
      inactive_date: new Date(),
    },
  });
};

// 동호회 목록 조회
export const findUserClubs = async (userId: number) => {
  return []; // 임시 빈 배열
};

// 리뷰 목록 조회
export const findUserReviews = async (userId: number, reviewId?: number) => {
  const whereCondition: any = { user_id: userId };

  if (reviewId) {
    whereCondition.id = reviewId;
  }

  return await prisma.review.findMany({
    where: whereCondition,
  });
};

// 리뷰 수정
export const updateReviewRaw = async (reviewId: number, text: string) => {
  return await prisma.review.update({
    where: { id: reviewId },
    data: { text: text },
  });
};
