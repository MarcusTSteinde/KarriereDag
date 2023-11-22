import React from 'react';
import '../styles/htp.css';
import Link from 'next/link'

const HighScoresPage: React.FC = () => {
  return (
    <main>
      
      
      <div>
        <div className='infoboxes'>
          
          <img className='header' src="/gamerules.svg" alt="header" />

          <div className='infobox'>
            <img src="/bug.svg" alt="image" />
            <p>Each bug you BOOP (click on) earns you points. You’ve got 30 seconds to finish your mission!</p>
          </div>
          <div className='infobox'>
            <img src="/bomb.svg" alt="image" />
            <p>Beware! The bombs are lurking, and hitting them will cost you a life. You have 3!</p>
          </div>
          <div className='infobox'>
            <img src="/energy-drink.svg" alt="image" />
            <p>Grab those energy drinks to slow down time, making it easier for you to BOOP bugs without breaking a sweat.</p>
          </div>
        </div>

        <div className='buttonbox'>
          <Link href="/thegame" style={{ textDecoration: 'none' }}>
            <p>Start booping</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HighScoresPage;