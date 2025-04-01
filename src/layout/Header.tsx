import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useHeaderType } from "../hooks/useHeaderType";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
}

const Header = ({ isLoggedIn = false, userName = "" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const headerType = useHeaderType(isLoggedIn);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // 현재 경로와 일치하는지 확인하여 색상 변경
  const isCurrentPage = (path: string) => location.pathname === path;

  // 로그아웃 아이콘
  const LogoutIcon = () => (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );

  // 햄버거 메뉴 아이콘
  const MenuIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  // 계정 관련 헤더
  if (headerType === "account") {
    return (
      <header className="header flex justify-between items-center">
        <div className="flex absolute left-1/2 transform -translate-x-1/2">
          <img src={Logo} alt="logo" className="h-7 md:h-10" />
        </div>
        <div className="flex items-center space-x-2 md:space-x-4 ml-auto">
          <span className="font-pre-medium text-13 md:text-16 truncate max-w-[80px] md:max-w-none">
            {userName}님
          </span>
          <button
            className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="로그아웃"
          >
            <LogoutIcon />
          </button>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="header flex justify-between items-center">
        {/* 모바일 햄버거 메뉴 */}
        <button
          className="md:hidden p-1.5 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon />
        </button>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex space-x-12">
          {headerType === "manager" && (
            <>
              <span
                onClick={() => handleNavigate("/main")}
                className={`font-pre-medium text-16 cursor-pointer hover:text-purple-600 transition-colors ${
                  isCurrentPage("/main")
                    ? "text-purple-600 font-bold border-b-2 border-purple-600"
                    : "text-gray-700"
                }`}
              >
                장부 현황
              </span>
              <span
                onClick={() => handleNavigate("/report")}
                className={`font-pre-medium text-16 cursor-pointer hover:text-purple-600 transition-colors ${
                  isCurrentPage("/report")
                    ? "text-purple-600 font-bold border-b-2 border-purple-600"
                    : "text-gray-700"
                }`}
              >
                보고서
              </span>
              <span
                onClick={() => handleNavigate("/manage")}
                className={`font-pre-medium text-16 cursor-pointer hover:text-purple-600 transition-colors ${
                  isCurrentPage("/manage")
                    ? "text-purple-600 font-bold border-b-2 border-purple-600"
                    : "text-gray-700"
                }`}
              >
                내 정보 관리
              </span>
            </>
          )}
          {headerType === "viewer" && (
            <>
              <span
                onClick={() => handleNavigate("/main")}
                className={`font-pre-medium text-16 cursor-pointer hover:text-purple-600 transition-colors ${
                  isCurrentPage("/main")
                    ? "text-purple-600 font-bold border-b-2 border-purple-600"
                    : "text-gray-700"
                }`}
              >
                장부 현황
              </span>
              <span
                onClick={() => handleNavigate("/report")}
                className={`font-pre-medium text-16 cursor-pointer hover:text-purple-600 transition-colors ${
                  isCurrentPage("/report")
                    ? "text-purple-600 font-bold border-b-2 border-purple-600"
                    : "text-gray-700"
                }`}
              >
                보고서
              </span>
            </>
          )}
        </div>

        {/* 로고 */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img src={Logo} alt="logo" className="h-7 md:h-10" />
        </div>

        {/* 사용자 정보 영역 */}
        {headerType === "manager" && (
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="font-pre-medium text-13 md:text-16 truncate max-w-[80px] md:max-w-none">
              {userName}님
            </span>
            <button
              className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="로그아웃"
            >
              <LogoutIcon />
            </button>
          </div>
        )}
      </header>

      {/* 모바일 메뉴 드롭다운 */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="flex flex-col py-2">
            {headerType === "manager" && (
              <>
                <span
                  onClick={() => handleNavigate("/main")}
                  className={`py-3 px-6 font-pre-medium text-14 ${
                    isCurrentPage("/main")
                      ? "text-purple-600 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  장부 현황
                </span>
                <span
                  onClick={() => handleNavigate("/report")}
                  className={`py-3 px-6 font-pre-medium text-14 ${
                    isCurrentPage("/report")
                      ? "text-purple-600 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  보고서
                </span>
                <span
                  onClick={() => handleNavigate("/manage")}
                  className={`py-3 px-6 font-pre-medium text-14 ${
                    isCurrentPage("/manage")
                      ? "text-purple-600 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  내 정보 관리
                </span>
              </>
            )}
            {headerType === "viewer" && (
              <>
                <span
                  onClick={() => handleNavigate("/main")}
                  className={`py-3 px-6 font-pre-medium text-14 ${
                    isCurrentPage("/main")
                      ? "text-purple-600 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  장부 현황
                </span>
                <span
                  onClick={() => handleNavigate("/report")}
                  className={`py-3 px-6 font-pre-medium text-14 ${
                    isCurrentPage("/report")
                      ? "text-purple-600 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  보고서
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
