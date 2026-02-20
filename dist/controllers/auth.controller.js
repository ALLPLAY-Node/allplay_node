import { AuthService } from "../services/auth.service.js";
export class AuthController {
    authService = new AuthService();
    // 로그인 성공 후 실행되는 콜백 로직
    googleCallback = async (req, res) => {
        const user = req.user; // Passport가 넣어준 유저 정보
        // 우리 서비스 전용 JWT 발급
        const tokens = this.authService.generateTokens(user.id.toString());
        //프론트엔드로 토큰과 함께 리다이렉트
        const frontendUrl = `https://allsplay.netlify.app/login/success?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
        res.redirect(frontendUrl);
    };
    // GET /auth/refresh
    refresh = async (req, res) => {
        try {
            const { refreshToken } = req.body;
            const result = await this.authService.refresh(refreshToken);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(401).json({ message: "Invalid refresh token" });
        }
    };
    // GET /auth/logout
    logout = async (req, res) => {
        // 클라이언트측 토큰 삭제로 처리하거나, 필요시 서버 세션/레디스 무효화
        res.status(200).json({ message: "Logout success" });
    };
}
//# sourceMappingURL=auth.controller.js.map