import React from 'react';
import '../styles/hs.css';
import Link from 'next/link'
import AdminScoreboard from '@/components/adminscoreboard';

const AdminPage: React.FC = () => {
  return (
    <main>
      <div className='backbuttonbox'>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <p className="text-blue-500 hover:underline cursor-pointer">x</p>
        </Link>
      </div>

      <img src="/highscores.svg" alt="header high scores" />
      
      <div className="table-container">
        <AdminScoreboard />
      </div>
      
    </main>
  );
};

export default AdminPage;