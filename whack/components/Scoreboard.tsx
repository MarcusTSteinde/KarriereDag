import React, { useEffect, useState } from 'react';

const Scoreboard: React.FC = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Fetch scores from the provided API endpoint
    const fetchScores = async () => {
      try {
        const response = await fetch('https://boopabug.azurewebsites.net/api/players');
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []); // Run this effect only once on component mount

  return (
    <div>
      <h2>Scoreboard</h2>
      <ul>
        {scores.map((score) => (
          <li key={score.id} className=''>{score.nickname} {score.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;