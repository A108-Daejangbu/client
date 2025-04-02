import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./styles/global.css";

import MainPage from "./pages/MainPage";
import ReportPage from "./pages/ReportPage";
import ManagePage from "./pages/ManagePage";
import LandingPage from "./pages/LandingPage";
import Header from "./layout/Header";
import AccountPage from "./pages/AccountPage";
import ViewerLandingPage from "./pages/ViewerLandingPage";
import ErrorPage from "./pages/ErrorPage";

// Header를 조건부로 렌더링하는 컴포넌트
const AppLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isViewerLandingPage = location.pathname === "/viewerLanding";
  
  // 정의된 라우트 목록
  const definedRoutes = [
    "/",
    "/viewerLanding",
    "/main",
    "/report",
    "/manage",
    "/account"
  ];
  
  // 현재 경로가 정의된 라우트에 없거나 /error인 경우 에러 페이지로 간주
  const isErrorPage = !definedRoutes.includes(location.pathname) || location.pathname === "/error";

  // 실제 구현시에는 로그인 상태와 사용자 이름을 상태 관리 라이브러리나 context에서 가져와야 합니다
  const isLoggedIn = true; // 예시 값
  const userName = ""; // 예시 값

  return (
    <>
      {!isLandingPage && !isViewerLandingPage && !isErrorPage && (
        <Header isLoggedIn={isLoggedIn} userName={userName} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/viewerLanding" element={<ViewerLandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
