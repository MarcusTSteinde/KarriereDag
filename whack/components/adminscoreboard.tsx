import React, { useEffect, useState } from 'react';
import '../styles/hs.css';

interface Score {
    id: string;
    nickname: string;
    score: number;
    phoneNumber: string;
}

const AdminScoreboard: React.FC = () => {
    const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    // Fetch scores from the provided API endpoint
    const fetchScores = async () => {
      try {
        const response = await fetch('https://boopabug.azurewebsites.net/api/players');
        
        const data: Score[] = await response.json();

        const allScores = data.sort((a, b) => b.score - a.score);
        setScores(allScores);
        
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
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.id}>
              <td>{index + 1}</td>
              <td>{score.nickname}</td>
              <td>{score.score}</td>
              <td>{score.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminScoreboard;