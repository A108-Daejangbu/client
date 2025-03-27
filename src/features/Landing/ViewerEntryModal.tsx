import React, { useRef, useEffect, useState } from 'react';
import '../../styles/global.css';
import LoginLogo from '../../assets/LoginLogo.png';
import useDetectClose from '../../hooks/useDetectClose';

interface ViewerEntryModalProps {
  onClose: () => void;
}

const ViewerEntryModal = ({ onClose }: ViewerEntryModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useDetectClose(modalRef, true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 비밀번호 검증 로직 추가
    console.log('Password submitted:', password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef} 
        className="bg-white rounded-2xl w-full max-w-[280px] md:max-w-[360px] relative flex flex-col tracking-[-0.75px] p-4 md:p-6"
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-2 md:top-4 right-2 md:right-4 text-gray hover:text-black"
        >
          ✕
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-pre-bold mb-3 md:mb-6 text-center">
            <span className="text-blue">입장 비밀번호</span>를<br />
            입력해주세요
          </h2>
          <div className="flex items-center justify-center mb-3 md:mb-6">
            <img src={LoginLogo} alt="Logo" className="w-20 h-16 md:w-28 md:h-24" />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full px-1 md:px-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full py-2 px-3 border border-[#e0e0e0] rounded-lg mb-2 md:mb-3 focus:outline-none focus:border-blue-500 text-sm"
          />
          <button 
            type="submit"
            className="w-full py-2 px-3 bg-gradient-to-r from-[#7953FF] to-[#4E00CB] text-white rounded-lg font-pre-medium hover:opacity-90 transition-all duration-300 text-sm"
          >
            입장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewerEntryModal;
