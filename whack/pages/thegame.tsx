import { useEffect, useRef } from 'react';
import WhackAMole from '@/components/WhackAMole';
import Link from 'next/link'
import '../app/globals.css';

const TheGamePage: React.FC = () => {
    useEffect(() => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
        const playAudio = () => {
          const source = audioContext.createBufferSource();
          fetch('/backgroundPlay.mp3')
            .then(response => response.arrayBuffer())
            .then(buffer => audioContext.decodeAudioData(buffer))
            .then(decodedData => {
              source.buffer = decodedData;
              source.connect(audioContext.destination);
              source.start(0);
            })
            .catch(error => {
              console.error('Error loading or playing audio:', error.message);
            });
        };
    
        // Play audio automatically
        playAudio();
    
        return () => {
          audioContext.close();
        };
      }, []);

    return (
        <main>
          <div className="flex flex-col items-center self-center justify-between bg">
          <WhackAMole></WhackAMole>
          </div>
        </main>
      )
};

export default TheGamePage;