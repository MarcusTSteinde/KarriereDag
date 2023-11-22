import React from 'react';
import WhackAMole from '@/components/WhackAMole';
import Link from 'next/link'
import '../app/globals.css';

const TheGamePage: React.FC = () => {
  return (
    <main>
        <div className="flex flex-col items-center self-center justify-between bg"></div>
        <WhackAMole></WhackAMole>
    </main>
  );
};

export default TheGamePage;