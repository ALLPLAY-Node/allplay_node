import { type Users } from '@prisma/client';
import { type GoogleAuthDto } from '../dtos/auth.dto.js';
export declare class AuthRepository {
    findByGoogleId(googleId: string): Promise<Users | null>;
    createUser(data: GoogleAuthDto): Promise<Users>;
}
//# sourceMappingURL=auth.repository.d.ts.map