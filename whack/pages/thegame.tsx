import { useEffect } from 'react';
import WhackAMole from '@/components/WhackAMole';
import Link from 'next/link'
import '../app/globals.css';

const TheGamePage: React.FC = () => {
    useEffect(() => {
        // Create an audio element using the Audio constructor
        const audioElement: HTMLAudioElement = new Audio('/backgroundPlay.mp3');

        const playAudio = () => {
            if (audioElement.paused) {
                audioElement.play()
                    .then(() => {
                        console.log('Audio playback started successfully.');
                    })
                    .catch((error) => {
                        console.error('Error starting audio playback:', error.message);
                    });
            }
        };

        playAudio();

        return () => {
            audioElement.pause();
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