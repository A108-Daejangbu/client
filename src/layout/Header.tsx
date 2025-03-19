import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // 현재 경로와 일치하는지 확인하여 색상 변경
  const isCurrentPage = (path: string) => location.pathname === path;

  return (
    <header className="header">
      <div className="flex space-x-8">
        <span
          onClick={() => handleNavigate("/")}
          className={`font-pre-medium text-14 cursor-pointer  ${
            isCurrentPage("/") ? "text-purple-600" : "text-black"
          }`}
        >
          장부 현황
        </span>
        <span
          onClick={() => handleNavigate("/report")}
          className={`font-pre-medium text-14 cursor-pointer ${
            isCurrentPage("/report") ? "text-purple-600" : "text-black"
          }`}
        >
          보고서
        </span>
        <span
          onClick={() => handleNavigate("/manage")}
          className={`font-pre-medium text-14 cursor-pointer ${
            isCurrentPage("/manage") ? "text-purple-600" : "text-black"
          }`}
        >
          내 정보 관리
        </span>
      </div>

      <div className="flex absolute left-1/2 transform -translate-x-1/2 ">
        <img src={Logo} alt="logo" className="h-8" />
      </div>

      <div className="flex space-x-8">
        <span className="font-pre-medium text-14">이름</span>{" "}
        <button className="font-pre-medium text-14 cursor-pointer">
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Header;
