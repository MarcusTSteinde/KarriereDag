import React from 'react';
import Scoreboard from '@/components/Scoreboard';
import '../styles/hs.css';
import Link from 'next/link'

const HighScoresPage: React.FC = () => {
  return (
    <main>
      <h1>High Scores Page</h1>
      <Scoreboard />

      <Link href="/">
        <p className="text-blue-500 hover:underline cursor-pointer">Back to front page</p>
      </Link>
    </main>
  );
};

export default HighScoresPage;
