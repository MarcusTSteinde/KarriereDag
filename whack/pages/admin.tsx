import React, { useState } from 'react';
import '../styles/hs.css';
import Link from 'next/link'
import AdminScoreboard from '@/components/adminscoreboard';


const AdminPage: React.FC = () => {
    const [deleting, setDeleting] = useState(false);

  const handleDeleteAllPlayers = async () => {
    try {
      setDeleting(true);

      const response = await fetch('https://boopabug.azurewebsites.net/api/players/delete-all-players', {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('All players deleted successfully');
        window.location.reload();
      } else {
        console.error('Failed to delete all players:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred during the delete operation:', error);
    } finally {
      setDeleting(false);
    }
  };{handleDeleteAllPlayers}

  return (
    <main>
      <div className='backbuttonbox'>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <p className="text-blue-500 hover:underline cursor-pointer">x</p>
        </Link>
      </div>

      <img src="/highscores.svg" alt="header high scores" />
      
      <div className="table-container">
        <AdminScoreboard/>
      </div>

      <div className='deletebutton'>
        <p onClick={handleDeleteAllPlayers}>Delete All Players</p>
      </div>
      
    </main>
  );
};

export default AdminPage;