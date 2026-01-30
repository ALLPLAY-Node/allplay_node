import { prisma } from "../db.config.js";
export class RegionRepository {
    findRegionByCityAndDistrict = async (city, district) => {
        const region = await prisma.region.findFirst({
            where: { city, district },
        });
        return region;
    };
}
//# sourceMappingURL=region.repository.js.map