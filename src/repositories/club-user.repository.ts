import { prisma } from "../db.config.js";

export const getClubLeaderByClubId = async (clubId: bigint) => {
  return await prisma.userClubs.findFirst({
    where: {
      club_id: clubId,
      is_leader: true,
    },
  });
};
