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

  return (
    <>
      {!isLandingPage && !isViewerLandingPage && <Header />}
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
