import React from 'react';
import Scoreboard from '@/components/Scoreboard';
import '../styles/hs.css';
import Link from 'next/link'

const HighScoresPage: React.FC = () => {
  return (
    <main>
      <div className='backbuttonbox'>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <p className="text-blue-500 hover:underline cursor-pointer">x</p>
        </Link>
      </div>

      <img src="/highscores.svg" alt="header high scores" />
      
      <Scoreboard />
      
    </main>
  );
};

export default HighScoresPage;
