import React from 'react';
import { SCORE_CONFIG } from '../../../utils/score';
import ScoreDisplay from './ScoreDisplay';
import ProgressBar from './ProgressBar';
import TransactionInfo from './TransactionInfo';

interface ScoreComponentProps {
  score: Score;
}

const ScoreComponent: React.FC<ScoreComponentProps> = ({ score }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div 
        className="relative flex items-center justify-center"
        style={{
          width: SCORE_CONFIG.SIZE,
          height: SCORE_CONFIG.SIZE
        }}
      >
        <ProgressBar score={score.score} />
        <ScoreDisplay score={score.score} />
      </div>
      <TransactionInfo score={score} />
    </div>
  );
};

export default ScoreComponent;
