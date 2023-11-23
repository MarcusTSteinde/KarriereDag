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
                setScores(sortedScores);

                // For manually testing
                localStorage.setItem('nickname', 'annette');

            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchScores();
    }, []);

    const top10Scores = scores.slice(0, 10);
    const userScoreIndex = scores.findIndex(score => score.nickname === userNickname);
    const isUserInTop10 = userScoreIndex < 10;

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
                    {top10Scores.map((score, index) => (
                        <tr key={score.id} style={{ color: score.nickname === userNickname ? 'rgb(237, 255, 31)' : 'inherit' }}>
                            <td>{index + 1}</td>
                            <td>{score.nickname}</td>
                            <td>{score.score}</td>
                        </tr>
                    ))}
                    {!isUserInTop10 && userScoreIndex >= 10 && (
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                    )}
                    {!isUserInTop10 && userScoreIndex !== -1 && (
                        <tr style={{ color: userNickname === userNickname ? 'rgb(237, 255, 31)' : 'inherit' }}>
                            <td>{userScoreIndex + 1}</td>
                            <td>{userNickname}</td>
                            <td>{scores[userScoreIndex].score}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Scoreboard;