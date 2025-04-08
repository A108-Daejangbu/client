import { getScoreInfo, SCORE_CONFIG } from "../../../utils/score";

const ScoreDisplay: React.FC<{ score: number }> = ({ score }) => {
    const { title, status } = getScoreInfo(score);
    return (
      <div className="relative z-10 text-center" style={{ padding: `0 ${SCORE_CONFIG.PADDING}px` }}>
        <div className="text-[18px] font-pre-bold text-[#242C6C] pt-[30px]">대장 지수</div>
        <div className="text-[46px] font-pre-bold text-[#242C6C] leading-[1.2]">{score}</div>
        <div className="text-14 text-gray200">{title}</div>
        <div className="text-12 text-gray200 mt-0.5 whitespace-pre-line">{status}</div>
      </div>
    );
  };

  export default ScoreDisplay