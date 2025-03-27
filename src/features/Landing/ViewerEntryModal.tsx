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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-8 rounded-2xl w-full max-w-[280px] relative h-[50vh] justify-center items-center flex flex-col tracking-[-0.75px]">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray hover:text-black"
        >
          ✕
        </button>
        <div>
          <h2 className="text-2xl font-pre-bold mb-8 text-center">
            <span className="text-blue">입장 비밀번호</span>를<br />
            입력해주세요
          </h2>
          <div className="flex items-center justify-center mb-8">
            <img src={LoginLogo} alt="Logo" className="w-32 h-28" />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full py-2 px-4 border border-[#e0e0e0] rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          />
          <button 
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-[#7953FF] to-[#4E00CB] text-white rounded-lg font-pre-medium hover:opacity-90 transition-all duration-300"
          >
            입장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewerEntryModal;
