import { useLocation } from 'react-router-dom';

type HeaderType = 'account' | 'manager' | 'viewer' | 'none';

export const useHeaderType = (isLoggedIn: boolean = false): HeaderType => {
  const location = useLocation();
  const path = location.pathname;

  // 계정 관련 페이지들
  if (['/account', '/manage', '/empty'].includes(path)) {
    return 'account';
  }

  // 메인 페이지나 리포트 페이지
  if (path.startsWith('/main') || path.startsWith('/report')) {
    return isLoggedIn ? 'manager' : 'viewer';
  }

  // 랜딩 페이지 등에서는 헤더를 보여주지 않음
  return 'none';
}; 