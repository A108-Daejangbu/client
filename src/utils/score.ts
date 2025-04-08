export const getScoreInfo = (score: number): ScoreInfo => {
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

export const SCORE_CONFIG = {
  ANGLE: 230,
  START_ANGLE: -115,
  BORDER_WIDTH: 12,
  SIZE: 180,
  PADDING: 30,
} as const;