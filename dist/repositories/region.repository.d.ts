export declare class RegionRepository {
    findRegionByCityAndDistrict: (city: string, district: string) => Promise<{
        id: bigint;
        city: string | null;
        district: string | null;
    } | null>;
}
//# sourceMappingURL=region.repository.d.ts.map