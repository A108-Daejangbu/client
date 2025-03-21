import React, { useState } from "react";
import LoginModal from "../features/Landing/LoginModal";
import RegisterModal from "../features/Landing/RegisterModal";
import ShieldIcon from "../assets/ShieldLogo.png";
import WaveIcon from "../assets/LandingVector.png";


function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleLoginClick = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="w-[90%] max-w-[1440px] h-[90vh] mx-auto flex flex-col items-center justify-center relative overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-full bg-white relative">


        {/* Content Wrapper */}
        <div className="relative z-[2] flex flex-col items-center text-center w-[90%] max-w-[1440px] px-4 md:px-12">

          <img src={ShieldIcon} alt="Shield" className="w-20 h-25 bg-center bg-no-repeat"/>
          <img src={WaveIcon} alt="Wave" className="w-80 h-8 bg-center bg-no-repeat mb-1.5 -mt-3" />


          {/* Main Text */}
          <div className="mb-12 text-center">
            <h2 
              className="text-5xl font-pre-bold mb-1 leading-tight tracking-[-0.75px]"
              style={{
                background: "linear-gradient(90deg, #191FD9 0%, #3E6FFA 34%, #7953FF 61%, #2F007B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              이제 대장부로 투명하게
            </h2>
            <h3 className="text-5xl font-pre-bold text-[#121212] mb-6 leading-tight tracking-[-0.75px]">
              계좌를 연결하고 거래 내역을 공유해요
            </h3>
            <p className="text-lg text-[#595959] font-pre-medium tracking-[-0.75px]">
              모든 거래 내역이 투명하게 공개되어 누구나 안심하고 확인할 수 있어요.
              <br />
              조작 불가능한 거래 내역으로 안전하게 관리하세요. 지금 바로 시작해보세요!
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-7">
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="w-36 h-10 rounded-full border border-[#7953FF] bg-white text-[#4E00CB] text-base font-pre-medium cursor-pointer transition-all duration-300 hover:bg-[#f0f0ff] shadow-md text-[#2F007B] shadow-[#4A3AFF]/30 tracking-[-0.75px]"
            >
              로그인하기
            </button>
            <button 
              onClick={() => setIsRegisterModalOpen(true)}  
              className="w-36 h-10 rounded-full bg-gradient-to-r from-[#7953FF] to-[#4E00CB] text-white text-base font-pre-medium cursor-pointer transition-all duration-300 hover:opacity-90 shadow-md text-[#FFFFFF] shadow-[#4A3AFF]/30 tracking-[-0.75px]"
            >
              회원가입하기
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => setIsLoginModalOpen(false)}
          onRegisterClick={handleRegisterClick}
        />
      )}

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <RegisterModal 
          onClose={() => setIsRegisterModalOpen(false)}
          onLoginClick={handleLoginClick}
        />
      )}
    </div>
  );
}

export default LandingPage;
