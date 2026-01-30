import { prisma } from "../db.config.js";

export class RegionRepository {
  findRegionByCityAndDistrict = async (city: string, district: string) => {
    const region = await prisma.region.findFirst({
      where: { city, district },
    });
    return region;
  };
}
