import React from "react";

function LandingPage() {
  return (
    <div className="app w-full max-w-[1440px] h-[calc(100vh)] mx-auto flex flex-col items-center justify-center relative overflow-x-hidden">
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-white to-[#f5f5ff] relative overflow-hidden w-full">
        {/* Background Wave */}
        <div 
          className="absolute bottom-0 left-0 w-full h-full z-[1] opacity-30 bg-no-repeat bg-bottom"
          style={{ backgroundImage: "url('/wave-bg.svg')" }}
        />

        {/* Content Wrapper */}
        <div className="content flex flex-col items-center text-center z-[2] px-12 md:px-[50px] w-full max-w-[1440px]">
          {/* Title */}
          <h1 
            className="text-5xl font-pre-bold mb-12 leading-normal py-1"
            style={{
              background: "linear-gradient(90deg, #4169E1, #9370DB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Daejangbu
          </h1>

          {/* Shield Icon */}
          <div 
            className="w-20 h-20 mb-5 bg-no-repeat bg-center"
            style={{ backgroundImage: "url('/shield-icon.svg')" }}
          />

          {/* Wave Icon */}
          <div 
            className="w-[180px] h-[30px] mb-5 bg-no-repeat bg-center"
            style={{ backgroundImage: "url('/wave-icon.svg')" }}
          />

          {/* Main Text */}
          <div className="mb-10">
            <h2 className="text-[26px] text-[#6269e3] mb-2.5 font-pre-medium">
              투명한 공급 관리,
            </h2>
            <h3 className="text-[32px] font-pre-bold text-[#333] mb-5">
              계좌를 연결하고 거래를 공개해요
            </h3>
            <p className="text-base text-[#666] leading-relaxed max-w-[600px] font-pre-light">
              모든 거래 내역이 투명하게 공개되어 누구나 안심하고 확인할 수 있어요.
              <br />
              블록체인을 활용해 조작 불가능한 거래 내역으로 안전하게 관리하세요. 지금 바로 시작해볼까요?
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-5 mt-5">
            <button className="px-8 py-3 rounded-full border border-[#6269e3] bg-white text-[#6269e3] text-base cursor-pointer transition-all duration-300 hover:bg-[#f0f0ff] font-pre-medium">
              로그인하기
            </button>
            <button className="px-8 py-3 rounded-full border-none bg-gradient-to-r from-[#6269e3] to-[#9370DB] text-white text-base cursor-pointer transition-all duration-300 hover:opacity-90 font-pre-medium">
              회원가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
