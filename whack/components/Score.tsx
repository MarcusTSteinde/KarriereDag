import React from 'react';

interface ScoreProps {
  currentScore: number;
}

const Score: React.FC<ScoreProps> = ({ currentScore }) => {
  return (
    <div className="score-board">
      <h2>Score: {currentScore}</h2>
    </div>
  );
};

export default Score;