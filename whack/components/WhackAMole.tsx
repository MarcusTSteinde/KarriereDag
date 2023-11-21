"use client"
import React, { useState, useEffect } from 'react';
import Score from './Score';

const WhackAMole = () => {
    const [score, setScore] = useState<number>(0);
    const [moles, setMoles] = useState<boolean[]>(Array(9).fill(false));
    const [timeLeft, setTimeLeft] = useState<number>(30);
    const [isPowerUpActive, setIsPowerUpActive] = useState<boolean>(false);
    const [powerUpUsed, setPowerUpUsed] = useState<boolean>(false);
    // Hide a specific mole
    const hideMole = (index: number) => {
        setMoles(currentMoles => currentMoles.map((mole, moleIndex) => moleIndex === index ? false : mole));
    };
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space' && !isPowerUpActive && !powerUpUsed) {
                setIsPowerUpActive(true);
                setPowerUpUsed(true); // Mark the power-up as used
    
                // Power-up duration in real-time
                setTimeout(() => {
                    setIsPowerUpActive(false);
                }, 5000); // 5 seconds in real-time
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPowerUpActive, powerUpUsed]);

    // Show a random mole
    useEffect(() => {
        let moleTimers: NodeJS.Timeout[] = [];

        if (timeLeft > 0) {
            const availableHoles = moles
            .map((mole, index) => mole === false ? index : null)
            .filter((index): index is number => index !== null);
            const randomDelay = isPowerUpActive ? (Math.random() * (550 - 200) + 200) *2 : Math.random() * (550 - 200) + 200; // Random delay between 300 to 750ms
            const randomIndex = availableHoles[Math.floor(Math.random() * availableHoles.length)];

            moleTimers = moles.map((_, index) => {
                
                return setTimeout(() => {
                    setMoles(currentMoles => {
                        if (timeLeft <= 0) return currentMoles; // Don't show new moles if time is up
                        const newMoles = [...currentMoles];
                        newMoles[randomIndex] = true;

                        // Hide this mole after some time
                        setTimeout(() => hideMole(randomIndex),  isPowerUpActive ?  1000 : 2000);
                        return newMoles;
                    });
                }, randomDelay); // Randomize appearance time
            });
        }

        return () => {
            moleTimers.forEach(clearTimeout);
        };
    }, [timeLeft, moles]);

    // Update timer every sec
    useEffect(() => {
        const timerInterval = isPowerUpActive ? 2000 : 1000; // 2 seconds if power-up is active, otherwise 1 second
    
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, timerInterval);
    
        return () => clearInterval(timer);
    }, [timeLeft, isPowerUpActive]);
    // Handle mole whack
    const handleWhack = (index: number) => {
        if (moles[index]) {
            setScore(prevScore => prevScore + 1);
            hideMole(index);
        }
    };

    return (
        <div>
            <Score currentScore={score} />
            <div>Time Left: {timeLeft}</div>
            <div>Energy Drinks Left: {powerUpUsed ? 0 : 1}</div>
            <div className="game-grid page">
                {moles.map((mole, index) => (
                    <div key={index} className={`mole-hole ${mole ? 'mole-visible' : ''}`} onClick={() => handleWhack(index)}>
                        {/* Mole image or div here */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhackAMole;
