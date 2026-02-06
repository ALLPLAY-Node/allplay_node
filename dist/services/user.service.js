import * as userRepo from "../repositories/user.repository.js";
import { updateUserBodyDTO } from "../dtos/user.dto.js";
import { IdInvalidError, FacilityNotFoundError } from "../errors.js";
export const getProfile = async (userId) => {
    const user = await userRepo.findUserWithRegion(userId);
    if (!user)
        throw new Error("User not found"); // 목록에 없으면 일반 에러 사용
    return user;
};
export const updateProfile = async (userId, body) => {
    const user = await userRepo.findUserWithRegion(userId);
    if (!user)
        throw new Error("User not found");
    const updateData = updateUserBodyDTO(body);
    const updatedUser = await userRepo.updateUserRaw(userId, updateData);
    return updatedUser;
};
export const getClubs = async (userId, isLeader) => {
    return await userRepo.findUserClubs(userId, isLeader);
};
export const getReviews = async (userId, reviewId) => {
    const reviews = await userRepo.findUserReviews(userId, reviewId);
    if (reviewId && reviews.length === 0) {
        throw new Error("Review not found");
    }
    return reviews;
};
export const editReview = async (reviewId, text) => {
    return await userRepo.updateReviewRaw(reviewId, text);
};
export const quitService = async (userId) => {
    const user = await userRepo.findUserWithRegion(userId);
    if (!user)
        throw new Error("User not found");
    return await userRepo.deactivateUserRaw(userId);
};
//# sourceMappingURL=user.service.js.map