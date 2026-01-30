// 유저 내 정보 조회 시 클라이언트에 보낼 응답 데이터를 가공함
export const userResponseDTO = (user: any) => {
    return {
        id: user.id.toString(),
        userId: user.email,
        name: user.name,
        birth: user.birth ? user.birth.toISOString().split('T')[0] : null,
        profilePhotoUrl: user.profile_photo_url || "",
        introduce: user.introduce || "",
        region: user.region ? {
            city: user.region.city,
            district: user.region.district
        } : null
    };
};

// 동호회 목록 조회 시 필요한 데이터만 추출하여 배열로 반환함
export const clubListDTO = (userClubs: any[]) => {
    return {
        items: userClubs.map((uc) => ({
            id: uc.club.id.toString(),
            name: uc.club.name,
            level: uc.club.level,
            region: uc.club.region ? `${uc.club.region.city} ${uc.club.region.district}` : "지역 정보 없음"
        }))
    };
};

// 리뷰 목록 조회 시 시설 이름과 사진, 내용을 포맷팅함
export const reviewResponseDTO = (reviews: any[]) => {
    return {
        items: reviews.map((r) => ({
            id: r.id.toString(),
            facilityName: r.facility.name,
            text: r.text,
            createdAt: r.created_at.toISOString().split('T')[0]
        }))
    };
};

// 개인정보 수정 요청 시 들어온 Body 데이터를 DB 타입에 맞게 변환함 (BigInt 처리 포함)
export const updateUserBodyDTO = (body: any) => {
    return {
        name: body.name,
        phone_number: body.phoneNumber,
        introduce: body.introduce,
        profile_photo_url: body.profilePhotoUrl,
        region_id: body.regionId ? BigInt(body.regionId) : undefined,
        birth: body.birth ? new Date(body.birth) : undefined,
        gender: body.gender // Enum 타입(MALE, FEMALE, NONE) 매칭
    };
};

// 회원 탈퇴 처리 후 결과를 클라이언트에게 반환함
export const userQuitResponseDTO = (user: any) => {
    return {
        userId: user.id.toString(),
        status: user.status ? "ACTIVE" : "INACTIVE",
        inactiveDate: user.inactive_date ? user.inactive_date.toISOString() : null
    };
};