import React from 'react';
import Scoreboard from '@/components/Scoreboard';
import '../styles/hs.css';
import Link from 'next/link'

const HighScoresPage: React.FC = () => {
  return (
    <main>
      <h1>High Scores Page</h1>
      <Scoreboard />

      <Link href="/" style={{ textDecoration: 'none' }}>
        <p className="text-blue-500 hover:underline cursor-pointer">x</p>
      </Link>
    </main>
  );
};

export default HighScoresPage;
