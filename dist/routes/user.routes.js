import express from "express";
import { handleGetMe, handleUpdateMe, handleUserQuit, handleGetMyClubs, handleGetMyReviews, handleUpdateReview, } from "../controllers/user.controller.js";
const router = express.Router();
// 1. 내 정보
router.get("/me", handleGetMe);
router.put("/me", handleUpdateMe);
router.delete("/me", handleUserQuit);
// 2. 내 동호회
router.get("/me/clubs/managed", handleGetMyClubs);
router.get("/me/clubs", handleGetMyClubs);
// 3. 내 리뷰
router.get("/me/reviews", handleGetMyReviews);
router.get("/me/reviews/:reviewId", handleGetMyReviews);
router.put("/me/reviews/:reviewId", handleUpdateReview);
export default router;
//# sourceMappingURL=user.routes.js.map