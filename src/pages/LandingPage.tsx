import { useState } from "react";
import RegisterModal from "../features/Landing/RegisterModal";
import ShieldIcon from "../assets/ShieldLogo.png";
import WaveIcon from "../assets/LandingVector.png";
// import { useDetectClose } from "../hooks/useDetectClose";

function LandingPage() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <div className="w-[90%] max-w-[1440px] min-h-screen mx-auto flex flex-col items-center justify-center relative overflow-hidden p-4">
      <div className="flex flex-col items-center justify-center w-full h-full bg-white relative">
        {/* Content Wrapper */}
        <div className="relative z-[2] flex flex-col items-center text-center w-full max-w-[1440px] px-4 md:px-12">
          <img
            src={ShieldIcon}
            alt="Shield"
            className="w-[50px] h-[66px] md:w-[75px] md:h-[100px] bg-center bg-no-repeat"
          />
          <img
            src={WaveIcon}
            alt="Wave"
            className="w-[200px] md:w-[300px] h-auto bg-center bg-no-repeat mb-1.5 -mt-3"
          />

          {/* Main Text */}
          <div className="mb-[20px] md:mb-[36px] text-center">
            <h2
              className="text-3xl md:text-5xl font-pre-semibold leading-tight tracking-[-0.75px]"
              style={{
                background:
                  "linear-gradient(90deg, #191FD9 0%, #3E6FFA 34%, #7953FF 61%, #2F007B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              대장부로 투명하게
            </h2>
            <h3 className="text-2xl md:text-5xl font-pre-semibold text-[#121212] mb-[12px] md:mb-[20px] leading-tight tracking-[-0.75px]">
              계좌를 연결하고 거래 내역을 공유해요
            </h3>
            <p className="text-base md:text-lg text-[#595959] font-pre-regular tracking-[-0.75px] px-4 md:px-0">
              모든 거래 내역이 투명하게 공개되어 누구나 안심하고 확인할 수
              있어요.
              <br className="hidden md:block" />
              조작 불가능한 거래 내역으로 안전하게 관리하세요. 지금 바로
              시작해보세요!
            </p>
          </div>

          {/* Button */}
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="w-[160px] md:w-[200px] h-[36px] md:h-[40px] rounded-full bg-gradient-to-r from-[#7953FF] to-[#4E00CB] text-white text-16 md:text-20 font-pre-semibold cursor-pointer transition-all duration-300 hover:opacity-75 shadow-md text-[#FFFFFF] shadow-[#4A3AFF]/30 tracking-[-0.75px]"
          >
            시작하기
          </button>
        </div>
      </div>

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <RegisterModal onClose={() => setIsRegisterModalOpen(false)} />
      )}
    </div>
  );
}

export default LandingPage;
