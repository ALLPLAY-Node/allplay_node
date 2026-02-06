import type { GoogleAuthDto, TokenResponseDto } from '../dtos/auth.dto.js';
export declare class AuthService {
    private authRepository;
    private JWT_SECRET;
    googleLogin(data: GoogleAuthDto): Promise<TokenResponseDto>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    generateTokens(userId: string): {
        accessToken: string;
        refreshToken: string;
    };
}
//# sourceMappingURL=auth.service.d.ts.map