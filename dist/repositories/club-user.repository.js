import { prisma } from "../db.config.js";
export const getClubLeaderByClubId = async (clubId) => {
    return await prisma.userClubs.findFirst({
        where: {
            club_id: clubId,
            is_leader: true,
        },
    });
};
//# sourceMappingURL=club-user.repository.js.map