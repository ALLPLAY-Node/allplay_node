import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  private authService = new AuthService();

  // 로그인 성공 후 실행되는 콜백 로직
  googleCallback = async (req: Request, res: Response) => {
    const user = req.user as any; // Passport가 넣어준 유저 정보

    // 우리 서비스 전용 JWT 발급
    const tokens = this.authService.generateTokens(user.id.toString());

    // 프론트엔드로 토큰과 함께 리다이렉트

    const frontendUrl = `http://localhost:3000/login/success?accessToken=${tokens.accessToken}`;
    res.redirect(frontendUrl);
  };
  // GET /auth/refresh
  refresh = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      const result = await this.authService.refresh(refreshToken);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  };

  // GET /auth/logout
  logout = async (req: Request, res: Response) => {
    // 클라이언트측 토큰 삭제로 처리하거나, 필요시 서버 세션/레디스 무효화
    res.status(200).json({ message: "Logout success" });
  };
}
