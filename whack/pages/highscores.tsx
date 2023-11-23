import React, { useEffect, useState } from 'react';
import Scoreboard from '@/components/Scoreboard';
import '../styles/hs.css';
import Link from 'next/link';

const HighScoresPage: React.FC = () => {
  const [userNickname, setUserNickname] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user nickname from local storage on the client side
    setUserNickname(typeof window !== 'undefined' ? localStorage.getItem('nickname') : null);
  }, []);

  return (
    <main>
      <div className='backbuttonbox'>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <p className="text-blue-500 hover:underline cursor-pointer">x</p>
        </Link>
      </div>

      <img src="/highscores.svg" alt="header high scores" />
      
      <Scoreboard />

      <div className='buttonbox'>
        <div className='homebutton'>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <p className="text-blue-500 hover:underline cursor-pointer">Home Page</p>
          </Link>
        </div>
        {userNickname && (
          <div className='playagainbutton'>
            <Link href="/thegame" style={{ textDecoration: 'none' }}>
              <p className="text-blue-500 hover:underline cursor-pointer">Play Again</p>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default HighScoresPage;