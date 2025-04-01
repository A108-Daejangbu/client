import { useRef, useEffect } from "react";
import "../../styles/global.css";
import GoogleLogo from "../../assets/GoogleLogo.png";
import LoginLogo from "../../assets/LoginLogo.png";
import useDetectClose from "../../hooks/useDetectClose";

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

  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/google`;
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
            <span className="text-blue">대장부</span>에 오신것을
            <br />
            환영합니다
          </h2>
          <div className="flex items-center justify-center mb-3 md:mb-6">
            <img
              src={LoginLogo}
              alt="Logo"
              className="w-20 h-16 md:w-28 md:h-24"
            />
          </div>
        </div>

        <div className="w-full px-1 md:px-4">
          <button
            onClick={loginWithGoogle}
            className="w-full py-2 px-3 border border-[#e0e0e0] rounded-lg flex items-center justify-center gap-2 md:gap-3 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow"
          >
            <img
              src={GoogleLogo}
              alt="Google"
              className="w-4 h-4 md:w-5 md:h-5"
            />
            <span className="font-pre-medium text-[#333] text-sm">
              Google 계정으로 시작하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
