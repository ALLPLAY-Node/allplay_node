import { Gender } from "@prisma/client";

// 응답: 유저 정보 변환
export const userResponseDTO = (user: any) => {
  return {
    id: user.id.toString(),
    email: user.email,
    name: user.name,
    birth: user.birth ? user.birth.toISOString().split("T")[0] : null,
    gender: user.gender,
    profilePhotoUrl: user.profile_photo_url || "",
    introduce: user.introduce || "",
    region: user.Region
      ? {
          city: user.Region.city,
          district: user.Region.district,
        }
      : null,
  };
};

// 응답: 탈퇴 유저 정보
export const userQuitResponseDTO = (user: any) => {
  return {
    userId: user.id.toString(),
    status: user.status ? "ACTIVE" : "INACTIVE",
    inactiveDate: user.inactive_date ? user.inactive_date.toISOString() : null,
  };
};

// 요청: 유저 수정 데이터 변환
export const updateUserBodyDTO = (body: any) => {
  return {
    name: body.name,
    phone_number: body.phoneNumber,
    introduce: body.introduce,
    profile_photo_url: body.profilePhotoUrl,
    region_id: body.regionId ? BigInt(body.regionId) : undefined,
    birth: body.birth ? new Date(body.birth) : undefined,
    gender: body.gender ? (body.gender as Gender) : undefined,
  };
};

// 응답: 리뷰 목록 변환
export const reviewResponseDTO = (reviews: any[]) => {
  return reviews.map((review) => ({
    id: review.id,
    text: review.text,
  }));
};

// 응답: 동호회 목록 변환
export const clubListDTO = (userClubs: any[]) => {
  return userClubs.map((club) => ({}));
};
