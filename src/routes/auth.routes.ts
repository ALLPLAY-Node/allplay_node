import { Router } from "express";
import passport from "passport";
import { AuthController } from "../controllers/auth.controller.js";

const router = Router();
const authController = new AuthController();

// 1. 구글 로그인 시작 (사용자가 이 주소를 클릭하면 구글 로그인창으로 이동)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// 2. 구글 로그인 완료 후 콜백 (구글이 사용자를 이 주소로 다시 보냄)
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  authController.googleCallback,
);

// 나머지 로그아웃, 토큰 재발급은 그대로 유지
router.get("/logout", authController.logout);
router.post("/refresh", authController.refresh);

export default router;
