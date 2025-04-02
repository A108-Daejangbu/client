import React from 'react';
import HighImportant from '../../assets/HighImportance.png';
import LowImportant from '../../assets/LowImportance.png';

interface ScoreComponentProps {
  score: number;
  transactions?: number;
}

interface ScoreInfo {
  title: string;
  status: string;
  color: string;
}

const SCORE_CONFIG = {
  ANGLE: 230,
  START_ANGLE: -115,
  BORDER_WIDTH: 12,
  SIZE: 180,
  PADDING: 30,
} as const;

const getScoreInfo = (score: number): ScoreInfo => {
  if (score >= 70) {
    return {
      title: "완벽에 가까워요!",
      status: "이대로만 유지하세요!",
      color: '#3E6FFA'
    };
  } else if (score >= 40) {
    return {
      title: "나쁘지 않아요!",
      status: "더 깔끔한 장부를 위해 한 걸음 더!",
      color: '#FA893E'
    };
  }
  return {
    title: "위험 수준!",
    status: "누락된 부분을 빠르게 확인하세요!",
    color: '#FF5353'
  };
};

const ProgressBar: React.FC<{ score: number }> = ({ score }) => {
  const { color } = getScoreInfo(score);
  const progressAngle = (score / 100) * SCORE_CONFIG.ANGLE;
  
  const colorWithOpacity = (opacity: number) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div 
      className="absolute"
      style={{
        width: SCORE_CONFIG.SIZE,
        height: SCORE_CONFIG.SIZE,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* 배경 트랙 */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          transform: `rotate(${SCORE_CONFIG.START_ANGLE}deg)`,
          background: `conic-gradient(
            rgba(148, 148, 148, 0.1) 0deg ${SCORE_CONFIG.ANGLE}deg,
            transparent ${SCORE_CONFIG.ANGLE}deg 360deg
          )`,
          clipPath: 'circle(50%)'
        }}
      />

      {/* 진행도 */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          transform: `rotate(${SCORE_CONFIG.START_ANGLE}deg)`,
          background: `conic-gradient(
            ${colorWithOpacity(0.4)} 0deg,
            ${colorWithOpacity(1)} ${progressAngle}deg,
            transparent ${progressAngle}deg 360deg
          )`,
          clipPath: 'circle(50%)',
          opacity: score > 0 ? 1 : 0
        }}
      />

      {/* 내부 원 */}
      <div 
        className="absolute rounded-full bg-white"
        style={{
          inset: `${SCORE_CONFIG.BORDER_WIDTH}px`,
        }}
      />
    </div>
  );
};

const ScoreDisplay: React.FC<{ score: number }> = ({ score }) => {
  const { title, status } = getScoreInfo(score);
  return (
    <div className="relative z-10 text-center" style={{ padding: `0 ${SCORE_CONFIG.PADDING}px` }}>
      <div className="text-[18px] font-pre-bold text-[#242C6C] pt-[30px]">대장 지수</div>
      <div className="text-[46px] font-pre-bold text-[#242C6C] leading-[1.2]">{score}</div>
      <div className="text-14 text-gray200">{title}</div>
      <div className="text-14 text-gray200 mt-0.5 whitespace-pre-line">{status}</div>
    </div>
  );
};

const TransactionInfo: React.FC<{ score: number; transactions: number }> = ({ score, transactions }) => (
  <div className="flex items-center px-4 py-2 w-full">
    <div className="flex items-center justify-center gap-1.5">
      <img src={score < 40 ? HighImportant : LowImportant} alt="!" className="w-4 h-4" />
      <span className="text-14 text-gray200">미증빙 거래내역 : {transactions}건</span>
    </div>
  </div>
);

const ScoreComponent: React.FC<ScoreComponentProps> = ({ score, transactions = 0 }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div 
        className="relative flex items-center justify-center"
        style={{
          width: SCORE_CONFIG.SIZE,
          height: SCORE_CONFIG.SIZE
        }}
      >
        <ProgressBar score={score} />
        <ScoreDisplay score={score} />
      </div>
      <TransactionInfo score={score} transactions={transactions} />
    </div>
  );
};

export default ScoreComponent;
