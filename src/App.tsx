import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './styles/global.css';

import MainPage from "./pages/MainPage";
import ReportPage from "./pages/ReportPage";
// import ManagePage from "./pages/ManagePage";
import LandingPage from "./pages/LandingPage";
import Header from "./layout/Header";
import AccountPage from "./pages/AccountPage";

// Header를 조건부로 렌더링하는 컴포넌트
const AppLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  
  return (
    <>
      {!isLandingPage && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/report" element={<ReportPage />} />
        {/* <Route path="/manage" element={<ManagePage />} /> */}
        <Route path="/account" element={<AccountPage />} />
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
