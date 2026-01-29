import { prisma } from "../db.config.js";

export const getClubLeaderByClubId = async (clubId: bigint) => {
  return await prisma.userClubs.findFirst({
    where: {
      club_id: clubId,
      is_leader: true,
    },
  });
};

export const clubLeave = async (userId: bigint, clubId: bigint) => {
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
