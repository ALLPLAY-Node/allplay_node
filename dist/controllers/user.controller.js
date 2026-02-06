import { StatusCodes } from "http-status-codes";
import * as userSer from "../services/user.service.js";
import { userResponseDTO, clubListDTO, reviewResponseDTO, userQuitResponseDTO, } from "../dtos/user.dto.js";
// 내 정보 조회
export const handleGetMe = async (req, res, next) => {
    try {
        const userId = 1; // 추후 토큰에서 추출
        const user = await userSer.getProfile(userId);
        res
            .status(StatusCodes.OK)
            .json({ resultType: "SUCCESS", success: userResponseDTO(user) });
    }
    catch (error) {
        next(error);
    }
};
// 내 정보 수정
export const handleUpdateMe = async (req, res, next) => {
    try {
        const userId = 1;
        const updatedUser = await userSer.updateProfile(userId, req.body);
        res
            .status(StatusCodes.OK)
            .json({ resultType: "SUCCESS", success: userResponseDTO(updatedUser) });
    }
    catch (error) {
        next(error);
    }
};
// 동호회 조회
export const handleGetMyClubs = async (req, res, next) => {
    try {
        const userId = 1;
        const isLeader = req.path.includes("managed");
        const clubs = await userSer.getClubs(userId, isLeader);
        res
            .status(StatusCodes.OK)
            .json({ resultType: "SUCCESS", success: clubListDTO(clubs) });
    }
    catch (error) {
        next(error);
    }
};
// 리뷰 조회
export const handleGetMyReviews = async (req, res, next) => {
    try {
        const userId = 1;
        const reviewId = req.params.reviewId
            ? Number(req.params.reviewId)
            : undefined;
        const reviews = await userSer.getReviews(userId, reviewId);
        res
            .status(StatusCodes.OK)
            .json({ resultType: "SUCCESS", success: reviewResponseDTO(reviews) });
    }
    catch (error) {
        next(error);
    }
};
// 리뷰 수정
export const handleUpdateReview = async (req, res, next) => {
    try {
        const reviewId = Number(req.params.reviewId);
        const { text } = req.body;
        const updatedReview = await userSer.editReview(reviewId, text);
        res.status(StatusCodes.OK).json({
            resultType: "SUCCESS",
            success: {
                reviewId: updatedReview.id.toString(),
                updatedAt: updatedReview.updated_at,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
// 회원 탈퇴
export const handleUserQuit = async (req, res, next) => {
    try {
        const userId = 1;
        const quitUser = await userSer.quitService(userId);
        res.status(StatusCodes.OK).json({
            resultType: "SUCCESS",
            message: "탈퇴 처리가 완료되었습니다.",
            success: userQuitResponseDTO(quitUser),
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=user.controller.js.map