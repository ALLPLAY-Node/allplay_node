export {};
/*

import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repositories/auth.repository.js';
import type { GoogleAuthDto, TokenResponseDto } from '../dtos/auth.dto.js';

export class AuthService {
    private authRepository = new AuthRepository();
    private JWT_SECRET = process.env.JWT_SECRET || 'your_secret';

    async googleLogin(data: GoogleAuthDto): Promise<TokenResponseDto> {
        // 1. 기존 유저 확인 (user_id로 조회)
        let user = await this.authRepository.findByGoogleId(data.googleId);
        let isNewUser = false;

        // 2. 없으면 자동 회원가입
        if (!user) {
            user = await this.authRepository.createUser(data);
            isNewUser = true;
        }

        // 3. 서비스 전용 토큰 발급 (BigInt인 id를 문자열로 변환하여 payload에 저장)
        const tokens = this.generateTokens(user.id.toString());

        return { ...tokens, isNewUser };
    }

    async refresh(refreshToken: string) {
        const payload = jwt.verify(refreshToken, this.JWT_SECRET) as { id: string };
        const accessToken = jwt.sign({ id: payload.id }, this.JWT_SECRET, { expiresIn: '1h' });
        return { accessToken };
    }

    public generateTokens(userId: string) {
        const accessToken = jwt.sign({ id: userId }, this.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: userId }, this.JWT_SECRET, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
}


*/
//# sourceMappingURL=auth.service.js.map