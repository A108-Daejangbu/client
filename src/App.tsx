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
import EmptyAccount from "./features/Manage/EmptyAccount";

// Header를 조건부로 렌더링하는 컴포넌트
const AppLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isViewerLandingPage = location.pathname === "/viewerLanding";
  
  // 실제 구현시에는 로그인 상태와 사용자 이름을 상태 관리 라이브러리나 context에서 가져와야 합니다
  const isLoggedIn = false; // 예시 값
  // const isLoggedIn = true; // 예시 값
  const userName = "홍길동"; // 예시 값

  return (
    <>
      {!isLandingPage && !isViewerLandingPage && (
        <Header isLoggedIn={isLoggedIn} userName={userName} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/viewerLanding" element={<ViewerLandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/empty" element={<EmptyAccount />} />
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
