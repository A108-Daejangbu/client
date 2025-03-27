import React, { useState } from "react";
import ShieldIcon from "../assets/ShieldLogo.png";
import WaveIcon from "../assets/LandingVector.png";
import ViewerEntryModal from "../features/Landing/ViewerEntryModal";
// import { useDetectClose } from "../hooks/useDetectClose";


function ViewerLandingPage() {
  const [isViewerEntryModalOpen, setIsViewerEntryModalOpen] = useState(false);

  return (
    <div className="w-[90%] max-w-[1440px] h-[90vh] mx-auto flex flex-col items-center justify-center relative overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-full bg-white relative">


        {/* Content Wrapper */}
        <div className="relative z-[2] flex flex-col items-center text-center w-[90%] max-w-[1440px] px-4 md:px-12">

          <img src={ShieldIcon} alt="Shield" className="w-[75px] h-[100px] bg-center bg-no-repeat"/>
          <img src={WaveIcon} alt="Wave" className="w-[300px] h-[30px] bg-center bg-no-repeat mb-1.5 -mt-3" />


          {/* Main Text */}
          <div className="mb-[36px] text-center">
            <h2 
              className="text-5xl font-pre-semibold leading-tight tracking-[-0.75px]"
              style={{
                background: "linear-gradient(90deg, #191FD9 0%, #3E6FFA 34%, #7953FF 61%, #2F007B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              대장부로 투명하게
            </h2>
            <h3 className="text-5xl font-pre-semibold text-[#121212] mb-[20px] leading-tight tracking-[-0.75px]">
              총무님이 공유한 거래내역을 확인해보세요
            </h3>
            <p className="text-lg text-[#595959] font-pre-regular tracking-[-0.75px]">
                모든 거래 내역이 투명하게 공개되어 누구나 안심하고 확인할 수 있어요.
                <br />
                조작 불가능한 거래 내역으로 안전하게 관리하세요. 지금 바로 시작해보세요!
            </p>
          </div>

          {/* Button */}
          <button 
            onClick={() => setIsViewerEntryModalOpen(true)}  
            className="w-[200px] h-[40px] rounded-full bg-gradient-to-r from-[#7953FF] to-[#4E00CB] text-white text-20 font-pre-semibold cursor-pointer transition-all duration-300 hover:opacity-75 shadow-md text-[#FFFFFF] shadow-[#4A3AFF]/30 tracking-[-0.75px]"
          >
            입장하기
          </button>
        </div>
      </div>


      {/* Viewer Entry Modal */}
      {isViewerEntryModalOpen && (
        <ViewerEntryModal 
          onClose={() => setIsViewerEntryModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ViewerLandingPage;
