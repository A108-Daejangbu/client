import { create } from "zustand";
import type { Member, NicknameResponse } from "../types/Member";
import axios from "axios";

// API 요청을 위한 기본 URL 설정
const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

interface MemberStore {
  // 상태
  member: Member | null;        // 현재 로그인한 사용자 정보
  isLoading: boolean;          // API 요청 중 상태
  error: string | null;        // 에러 메시지

  // API 연동 메서드들
  getMyNickname: () => Promise<string>;
  deleteMember: () => Promise<void>;
  logout: () => Promise<void>;

  // 상태 관리 메서드들
  setMember: (member: Member | null) => void;
  setError: (error: string | null) => void;
}

export const useMemberStore = create<MemberStore>((set) => ({
  // 초기 상태
  member: null,
  isLoading: false,
  error: null,

  // 닉네임 조회
  getMyNickname: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<NicknameResponse>(`/member/manager/get-my-nickname`);
      return response.data.nickname;
    } catch (error) {
      set({ error: "닉네임 조회 중 오류가 발생했습니다." });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // 회원 탈퇴
  deleteMember: async () => {
    try {
      set({ isLoading: true, error: null });
      await api.post(`/member/delete`);
      set({ member: null });
    } catch (error) {
      set({ error: "회원 탈퇴 중 오류가 발생했습니다." });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await api.post(`/member/manager/logout`);
      set({ member: null });
    } catch (error) {
      set({ error: "로그아웃 중 오류가 발생했습니다." });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // 상태 관리 메서드들
  setMember: (member) => set({ member }),
  setError: (error) => set({ error }),
}));


