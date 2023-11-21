import React, { useEffect, useState } from 'react';
import styles from '../styles/hs.css';

const Scoreboard: React.FC = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Fetch scores from the provided API endpoint
    const fetchScores = async () => {
      try {
        const response = await fetch('https://boopabug.azurewebsites.net/api/players');
        const data = await response.json();

        const sortedScores = data.sort((a, b) => b.score - a.score);

        setScores(sortedScores);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className={styles.main}>
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
    </div>
  );
};

export default Scoreboard;