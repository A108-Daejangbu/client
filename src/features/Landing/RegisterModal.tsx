import React, { useRef, useEffect } from 'react';
import '../../styles/global.css';
import GoogleLogo from '../../assets/GoogleLogo.png';
import LoginLogo from '../../assets/LoginLogo.png';
import useDetectClose from '../../hooks/useDetectClose';

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal = ({ onClose }: RegisterModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useDetectClose(modalRef, true);

  useEffect(() => {
    if (!isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-2xl w-full max-w-[280px] relative h-[45vh] justify-center items-center flex flex-col tracking-[-0.75px]">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray hover:text-black"
        >
          ✕
        </button>
        <div>
        <h2 className="text-2xl font-pre-bold mb-8 text-center">
            <span className="text-blue">대장부</span>에 오신것을<br />
            환영합니다
          </h2>
          <div className="flex items-center justify-center mb-8">
            <img src={LoginLogo} alt="Logo" className="w-32 h-28" />
          </div>
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
              Google 계정으로 시작하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
