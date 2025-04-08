import { getScoreInfo, SCORE_CONFIG } from "../../../utils/score";

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

  export default ProgressBar;