import express from "express";
import {
  handleGetMe,
  handleUpdateMe,
  handleUserQuit,
  handleGetMyClubs,
  handleGetMyReviews,
  handleUpdateReview,
} from "../controllers/user.controller.js";
import { isLogin } from "../middleware/auth.js";

const router = express.Router();

// 로그인 인증 미들웨어 적용
router.use(isLogin);

// 내 정보 조회, 수정, 탈퇴
router.get("/me", handleGetMe);
router.put("/me", handleUpdateMe);
router.delete("/me", handleUserQuit);

// 동호회 조회
router.get("/me/clubs/managed", handleGetMyClubs);
router.get("/me/clubs", handleGetMyClubs);

// 리뷰 조회, 수정
router.get("/me/reviews", handleGetMyReviews);
router.get("/me/reviews/:reviewId", handleGetMyReviews);
router.put("/me/reviews/:reviewId", handleUpdateReview);

export default router;
