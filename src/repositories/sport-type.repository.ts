import { prisma } from "../db.config.js";

export const findSportByName = async (sportType: string) => {
  const sport = await prisma.sportType.findFirst({
    where: { sport_type: sportType },
  });
  return sport;
};
