// import { getScoreInfo } from "../../../utils/score";

const ScoreDisplay: React.FC<{ score: number }> = ({ score }) => {
    // const { title, status, color } = getScoreInfo(score);
    return (
      <div className="relative z-10 text-center md:py-2"> 
        <div className="text-[12px] md:text-16 font-pre-bold text-[#242C6C] pt-[30px] pb-0">대장 신뢰 지수</div>
        <div className="text-[40px] font-pre-bold text-[#242C6C] leading-[1.2] pb-0">{score}</div>
        {/* <div className="text-10 md:text-12 text-gray200"
        style={{color: color}}>{title}</div> */}
        {score >= 70 ? <div className="text-[#757380] font-pre-regular text-12">
          <div>장부 관리 Good!</div>
          <div>투명한 대장부에 한 걸음 더!</div>
        </div> : score >= 40 ? <div className="text-[#757380] font-pre-regular text-12">
          <div>나쁘지 않아요!</div>
          <div>더 깔끔한 장부를 위해 한 걸음 더!</div>
        </div> : <div className="text-[#757380] font-pre-regular text-12">
          <div><span className="text-[#FF0000]">위험 수준</span>입니다.</div>
          <div>누락사항을 즉시 확인해주세요.</div>
          </div>}
        {/* <div className="text-8 md:text-12 mt-0.5 whitespace-pre-line">{status}</div> */}
      </div>
    );
  };

  export default ScoreDisplay