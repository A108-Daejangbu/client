import React from 'react';
import '../../styles/global.css';
import GoogleLogo from '../../assets/GoogleLogo.png';
import LoginLogo from '../../assets/LoginLogo.png';
interface LoginModalProps {
  onClose: () => void;
  onRegisterClick: () => void;
}

const LoginModal = ({ onClose, onRegisterClick }: LoginModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-[340px] relative h-[50vh] justify-center items-center flex flex-col tracking-[-0.75px]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray hover:text-black"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-pre-bold mb-8 text-center flex items-center justify-center gap-2">
            <span className="text-blue-500">대장부</span>
            <span>로그인</span>
        </h2>
        <div className="flex items-center justify-center mb-8">
            <img src={LoginLogo} alt="Logo" className="w-32 h-28" />
        </div>
        <div>
          <button 
            className="w-full py-2 px-4 border border-[#e0e0e0] rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow"
          >
            <img 
              src={GoogleLogo}
              alt="Google" 
              className="w-5 h-5"
            />
            <span className="font-pre-medium text-[#333] text-base">
              Google 계정으로 계속하기
            </span>
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 font-pre-medium">
            <span className="text-gray-500 text-sm">아직 회원이 아니신가요?</span>
            <button 
              onClick={onRegisterClick} 
              className="text-blue-500 font-pre-medium text-sm hover:text-blue-600"
            >
              회원가입
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
