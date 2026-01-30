import { Request, Response } from "express";
import * as userSer from "../services/user.service";

// 내 정보 조회
export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = 1; // 테스트용 고정 ID
        const result = await userSer.getProfile(userId);
        res.status(200).json({ resultType: "SUCCESS", success: result });
    } catch (e: any) {
        res.status(400).json({ resultType: "FAIL", error: e.message });
    }
};

// 동호회 목록 조회 (경로에 따라 가입/운영 구분)
export const getMyClubs = async (req: Request, res: Response) => {
    try {
        const userId = 1;
        const isLeader = req.path.includes("managed");
        const result = await userSer.getClubs(userId, isLeader);
        res.status(200).json({ resultType: "SUCCESS", success: result });
    } catch (e: any) {
        res.status(400).json({ resultType: "FAIL", error: e.message });
    }
};

// 리뷰 목록 및 상세 조회
export const getMyReviews = async (req: Request, res: Response) => {
    try {
        const userId = 1;
        const reviewId = req.params.reviewId ? Number(req.params.reviewId) : undefined;
        const result = await userSer.getReviews(userId, reviewId);
        res.status(200).json({ resultType: "SUCCESS", success: result });
    } catch (e: any) {
        res.status(400).json({ resultType: "FAIL", error: e.message });
    }
};