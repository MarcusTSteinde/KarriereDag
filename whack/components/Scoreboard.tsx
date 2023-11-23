import React, { useEffect, useState } from 'react';
import styles from '../styles/hs.css';

const Scoreboard: React.FC = () => {
  const [scores, setScores] = useState([]);
  const userNickname = typeof window !== 'undefined' ? localStorage.getItem('nickname') : null;

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('https://boopabug.azurewebsites.net/api/players');
        const data = await response.json();

        const sortedScores = data.sort((a, b) => b.score - a.score);

        const top10Scores = sortedScores.slice(0, 10);
        setScores(top10Scores);

        //For manually testing
        localStorage.setItem('nickname', 'Ida');
        
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
            <tr key={score.id} style={{ color: score.nickname === userNickname ? 'rgb(216, 80, 202)' : 'inherit' }}>
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