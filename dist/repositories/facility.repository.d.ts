import type { FacilityDto } from "../dtos/facility.dto.js";
export declare const addFacility: (facility: FacilityDto, operator_id: bigint, region_id: bigint, sport_type_id: bigint) => Promise<{
    id: bigint;
    name: string | null;
    sport_type: bigint;
    address: string | null;
    cost: string | null;
    introduction: string | null;
    information: string | null;
    usage_guide: string | null;
    contact_number: string | null;
    url: string | null;
    link: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    operating_hours: string | null;
    operator_id: bigint;
    region_id: bigint;
}>;
//# sourceMappingURL=facility.repository.d.ts.map