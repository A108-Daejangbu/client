import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemberStore } from '../stores/useMemberStore';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useMemberStore();

  const handleBackToHome = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      // 로그아웃 실패시에도 홈으로는 이동
      console.error('로그아웃 실패:', error);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[480px] flex flex-col items-center">
        {/* Error Display */}
        <div className="w-full text-center mb-12">
          <h1 className="font-pre-bold text-[80px] text-main200 leading-none mb-2">
            Error
          </h1>
          <div className="w-full h-[2px] bg-gradient-to-r from-purple to-blue mb-6" />
          <h2 className="font-pre-medium text-20 text-main200/70">
            이런! 문제가 발생했어요.
          </h2>
        </div>

        {/* Error Message */}
        <p className="font-pre-medium text-16 text-main200/60 text-center mb-12 
                    max-w-[400px] leading-relaxed">
          페이지에 문제가 발생했습니다.
        </p>

        {/* Button */}
        <button
          onClick={handleBackToHome}
          className="group relative px-8 py-4 bg-gradient-to-r from-purple to-blue rounded-xl
                   font-pre-bold text-16 text-white overflow-hidden
                   transition-all duration-300 hover:shadow-lg
                   hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative z-10">시작화면으로 돌아가기</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue to-purple 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
