import Link from 'next/link';
import '../styles/gamedone.css';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const TimesUpPage: React.FC = () => {
    const [playerScore, setPlayerScore] = useState<number | null>(null);

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');

    if (nickname) {
      fetch(`https://boopabug.azurewebsites.net/api/players/${nickname}`)
        .then((response) => response.json())
        .then((data) => {
          setPlayerScore(data.score);
        })
        .catch((error) => {
          console.error('Error fetching user score:', error);
        });
    }
  }, []);

    return (
        <main>
            <img src="/timesup.svg" alt="" />
            <p>Bippeti bappeti BOOP,</p>
            <p style={{ color: 'yellow', fontSize: '25px' }}>Your score is: {playerScore !== null ? playerScore : 'Loading...'},</p>
            <p>whoop whoop!</p>
            <div className='buttonbox'>
                <div className='seeresultsbutton'>
                    <Link href="/highscores" style={{ textDecoration: 'none' }}>
                        <p className="text-blue-500 hover:underline cursor-pointer">See Results</p>
                    </Link>
                </div>
                <div className='homebutton'>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <p className="text-blue-500 hover:underline cursor-pointer">Home Page</p>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default TimesUpPage;