import { Gender } from "@prisma/client";
// 응답: 유저 정보
export const userResponseDTO = (user) => {
    return {
        id: user.id.toString(),
        email: user.email, // Team schema: email
        name: user.name,
        birth: user.birth ? user.birth.toISOString().split("T")[0] : null,
        gender: user.gender,
        profilePhotoUrl: user.profile_photo_url || "",
        introduce: user.introduce || "",
        region: user.region
            ? {
                city: user.region.city,
                district: user.region.district,
            }
            : null,
    };
};
// 응답: 동호회 목록
export const clubListDTO = (userClubs) => {
    return {
        items: userClubs.map((uc) => ({
            id: uc.club.id.toString(),
            name: uc.club.name,
            level: uc.club.level, // Enum 그대로 전달
            region: uc.club.region
                ? `${uc.club.region.city} ${uc.club.region.district}`
                : "지역 정보 없음",
        })),
    };
};
// 응답: 리뷰 목록
export const reviewResponseDTO = (reviews) => {
    return {
        items: reviews.map((r) => ({
            id: r.id.toString(),
            facilityName: r.facility.name,
            text: r.text,
            createdAt: r.created_at ? r.created_at.toISOString().split("T")[0] : null,
        })),
    };
};
// 응답: 탈퇴 결과
export const userQuitResponseDTO = (user) => {
    return {
        userId: user.id.toString(),
        status: user.status ? "ACTIVE" : "INACTIVE",
        inactiveDate: user.inactive_date ? user.inactive_date.toISOString() : null,
    };
};
// 요청: 유저 수정 데이터 변환
export const updateUserBodyDTO = (body) => {
    return {
        name: body.name,
        phone_number: body.phoneNumber,
        introduce: body.introduce,
        profile_photo_url: body.profilePhotoUrl,
        region_id: body.regionId ? BigInt(body.regionId) : undefined,
        birth: body.birth ? new Date(body.birth) : undefined,
        gender: body.gender, // Enum 타입 캐스팅
    };
};
//# sourceMappingURL=user.dto.js.map