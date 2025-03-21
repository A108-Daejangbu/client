import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import ReportPage from "./pages/ReportPage";
import ManagePage from "./pages/ManagePage";
import Header from "./layout/Header";
import AccountPage from "./pages/AccountPage";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
};

export default App;
