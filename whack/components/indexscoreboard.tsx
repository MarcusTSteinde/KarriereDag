import React, { useEffect, useState } from 'react';
import '../styles/ihs.css';
import Link from 'next/link';
// Define the type for each score object
interface Score {
    id: string;
    nickname: string;
    score: number;
}

const IndexScoreboard: React.FC = () => {
    const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    // Fetch scores from the provided API endpoint
    const fetchScores = async () => {
      try {
        const response = await fetch('https://boopabug.azurewebsites.net/api/players');

        const data: Score[] = await response.json();

        const sortedScores = data.sort((a, b) => b.score - a.score);

        const top3Scores = sortedScores.slice(0, 3);
        setScores(top3Scores);
        
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.id}>
              <td>{index + 1}</td>
              <td>{score.nickname}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href='/highscores'>
      <button 
        className="buttonbox">
          See Scoreboard
        </button>
        </Link>
    </div>
  );
};

export default IndexScoreboard;