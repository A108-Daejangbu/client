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
    "/manage",
    "/main",
    "/report",
    "/viewer/main",
    "/viewer/report",
    "/account",
  ];

  // 현재 경로가 정의된 라우트에 없거나 /error인 경우 에러 페이지로 간주
  const isErrorPage =
    (!definedRoutes.includes(location.pathname) && 
    !location.pathname.startsWith('/main/') && 
    !location.pathname.startsWith('/report/') &&
    !location.pathname.startsWith('/viewer/')) ||
    location.pathname === "/error";

  // 사용자 타입 확인
  const isViewer = location.pathname.startsWith('/viewer/');
  const isManager = !isViewer && (location.pathname.startsWith('/main/') || 
                                location.pathname.startsWith('/report/') || 
                                location.pathname === '/manage');

  return (
    <>
      {!isLandingPage && !isViewerLandingPage && !isErrorPage && (
        <Header userType={isViewer ? "viewer" : isManager ? "manager" : undefined} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/viewerLanding/:accountId" element={<ViewerLandingPage />} />
        
        {/* Manager Routes */}
        <Route path="/main/:accountId" element={<MainPage />} />
        <Route path="/report/:accountId" element={<ReportPage />} />
        <Route path="/manage" element={<ManagePage />} />
        
        {/* Viewer Routes */}
        <Route path="/viewer/main/:accountId" element={<MainPage />} />
        <Route path="/viewer/report/:accountId" element={<ReportPage />} />
        
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
