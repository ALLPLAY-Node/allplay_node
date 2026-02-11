import * as userRepo from "../repositories/user.repository.js";
import { updateUserBodyDTO } from "../dtos/user.dto.js";
// 유저 프로필 조회
export const getProfile = async (userId) => {
    const user = await userRepo.findUserWithRegion(userId);
    if (!user)
        throw new Error("User not found");
    return user;
};
// 유저 프로필 수정
export const updateProfile = async (userId, body) => {
    const user = await userRepo.findUserWithRegion(userId);
    if (!user)
        throw new Error("User not found");
    const data = updateUserBodyDTO(body);
    return await userRepo.updateUserRaw(userId, data);
};
// 회원 탈퇴
export const quitService = async (userId) => {
    const user = await userRepo.findUserWithRegion(userId);
    if (!user)
        throw new Error("User not found");
    // 별칭 안 쓰고 원본 이름 그대로 호출
    await userRepo.updateUserStatus(userId);
    return await userRepo.findUserWithRegion(userId);
};
// 동호회 목록 조회
export const getClubs = async (userId) => {
    return await userRepo.findUserClubs(userId);
};
export const getManagedClubs = async (userId) => {
    return await userRepo.findUserManagedClubs(userId);
};
// 리뷰 목록 조회
export const getReviews = async (userId, reviewId) => {
    const reviews = await userRepo.findUserReviews(userId, reviewId);
    if (reviewId && (!reviews || reviews.length === 0)) {
        throw new Error("Review not found");
    }
    return reviews;
};
// 리뷰 수정
export const editReview = async (userId, reviewId, text) => {
    const reviews = await userRepo.findUserReviews(userId, reviewId);
    if (!reviews || reviews.length === 0) {
        throw new Error("Review not found or permission denied");
    }
    return await userRepo.updateReviewRaw(reviewId, text);
};
//# sourceMappingURL=user.service.js.map