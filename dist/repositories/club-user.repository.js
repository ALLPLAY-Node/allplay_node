import { prisma } from "../db.config.js";
export class ClubUserRepository {
    getClubLeaderByClubId = async (clubId) => {
        return await prisma.userClubs.findFirst({
            where: {
                club_id: clubId,
                is_leader: true,
            },
        });
    };
    clubLeave = async (userId, clubId) => {
        const data = await prisma.userClubs.deleteMany({
            where: {
                user_id: userId,
                club_id: clubId,
            },
        });
        if (data.count === 0) {
            return false;
        }
        return true;
    };
    getClubMembers = async (clubId) => {
        return await prisma.userClubs.findMany({
            where: {
                club_id: clubId,
            },
            include: {
                user: true,
            },
        });
    };
}
//# sourceMappingURL=club-user.repository.js.map