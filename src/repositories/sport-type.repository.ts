import { prisma } from "../db.config.js";

export class SportTypeRepository {
  findSportByName = async (sportType: string) => {
    const sport = await prisma.sportType.findFirst({
      where: { sport_type: sportType },
    });
    return sport;
  };
}
