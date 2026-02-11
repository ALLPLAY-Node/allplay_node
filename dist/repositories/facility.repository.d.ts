import type { FacilityDto } from "../dtos/facility.dto.js";
export declare class FacilityRepository {
    addFacility: (facility: FacilityDto, operator_id: bigint, region_id: bigint, sport_type_id: bigint) => Promise<{
        name: string | null;
        id: bigint;
        created_at: Date | null;
        updated_at: Date | null;
        region_id: bigint;
        sport_type: bigint;
        address: string | null;
        cost: string | null;
        introduction: string | null;
        information: string | null;
        usage_guide: string | null;
        contact_number: string | null;
        url: string | null;
        link: string | null;
        operating_hours: string | null;
        is_public: boolean | null;
        apply_method: string | null;
        operator_id: bigint;
    }>;
    getFacilityById: (facilityId: bigint) => Promise<({
        region: {
            id: bigint;
            city: string | null;
            district: string | null;
        };
        photos: {
            id: bigint;
            facility_photo_url: string | null;
            uploaded_at: Date | null;
            facility_id: bigint;
        }[];
        operator: {
            name: string | null;
            id: bigint;
            phone_number: string | null;
            user_id: string | null;
            password: string | null;
            birth: Date | null;
            gender: import("@prisma/client").$Enums.Gender | null;
            profile_photo_url: string | null;
            email: string | null;
            introduce: string | null;
            status: boolean | null;
            inactive_date: Date | null;
            privacy_agreement: bigint | null;
            created_at: Date | null;
            updated_at: Date | null;
            region_id: bigint;
        };
        sport: {
            id: bigint;
            sport_type: string | null;
        };
    } & {
        name: string | null;
        id: bigint;
        created_at: Date | null;
        updated_at: Date | null;
        region_id: bigint;
        sport_type: bigint;
        address: string | null;
        cost: string | null;
        introduction: string | null;
        information: string | null;
        usage_guide: string | null;
        contact_number: string | null;
        url: string | null;
        link: string | null;
        operating_hours: string | null;
        is_public: boolean | null;
        apply_method: string | null;
        operator_id: bigint;
    }) | null>;
    getFacilityList: (cursor: number, regionId: number | null, isReservable: boolean | null, isPublic: boolean | null, isFree: boolean | null, keyword: string | null, sportId: number | null) => Promise<({
        region: {
            id: bigint;
            city: string | null;
            district: string | null;
        };
        photos: {
            id: bigint;
            facility_photo_url: string | null;
            uploaded_at: Date | null;
            facility_id: bigint;
        }[];
        sport: {
            id: bigint;
            sport_type: string | null;
        };
    } & {
        name: string | null;
        id: bigint;
        created_at: Date | null;
        updated_at: Date | null;
        region_id: bigint;
        sport_type: bigint;
        address: string | null;
        cost: string | null;
        introduction: string | null;
        information: string | null;
        usage_guide: string | null;
        contact_number: string | null;
        url: string | null;
        link: string | null;
        operating_hours: string | null;
        is_public: boolean | null;
        apply_method: string | null;
        operator_id: bigint;
    })[]>;
}
//# sourceMappingURL=facility.repository.d.ts.map