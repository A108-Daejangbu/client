import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

const axiosClient = axios.create({
  baseURL: API_BASE_URL, // 모든 API 요청의 기본 URL을 지정합니다.
  withCredentials: true, // 요청 시 쿠키와 인증 정보를 포함시킵니다.
});

export default axiosClient;
