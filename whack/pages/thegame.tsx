import { useEffect } from 'react';
import WhackAMole from '@/components/WhackAMole';
import Link from 'next/link'
import '../app/globals.css';

const TheGamePage: React.FC = () => {
    return (
        <main>
          <div className="flex flex-col items-center self-center justify-between bg">
          <WhackAMole></WhackAMole>
          </div>
        </main>
      )
};

export default TheGamePage;