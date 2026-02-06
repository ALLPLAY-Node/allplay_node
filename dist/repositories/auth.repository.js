import { PrismaClient } from "@prisma/client";
import {} from "../dtos/auth.dto.js";
const prisma = new PrismaClient();
export class AuthRepository {
    // googleId를 Users 테이블의 user_id 필드에서 조회
    async findByGoogleId(googleId) {
        return await prisma.users.findFirst({
            where: { user_id: googleId },
        });
    }
    async createUser(data) {
        return await prisma.users.create({
            data: {
                user_id: data.googleId,
                email: data.email,
                name: data.name,
                profile_photo_url: data.profilePhotoUrl,
                region_id: 1n, // 스키마상 필수값이므로 기본값 설정 (BigInt는 n을 붙임)
                status: true,
            },
        });
    }
}
//# sourceMappingURL=auth.repository.js.map