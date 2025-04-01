// [2025-03-31] 회원 정보 타입 정의
export interface Member {
  id: number;        // 사용자 ID
  email: string;     // 이메일
  nickname: string;  // 닉네임
}

// 닉네임 조회 응답 타입
export interface NicknameResponse {
  nickname: string;
}

// 구글 로그인 응답 타입
export interface GoogleLoginResponse extends Member {
  accessToken: string;  // JWT 액세스 토큰
  refreshToken: string; // JWT 리프레시 토큰
}

// 토큰 응답 타입
export interface TokenResponse {
  accessToken: string;  // JWT 액세스 토큰
  refreshToken: string; // JWT 리프레시 토큰
}

