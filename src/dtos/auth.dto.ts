export interface GoogleAuthDto {
    email: string;
    name: string;
    googleId: string; // 스키마의 user_id 필드에 매핑할 용도
    profilePhotoUrl?: string;
}

export interface TokenResponseDto {
    accessToken: string;
    refreshToken: string;
    isNewUser: boolean;
}