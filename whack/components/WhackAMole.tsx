"use client"
import React, { useState, useEffect } from 'react';
import Score from './Score';

const WhackAMole = () => {
    const [score, setScore] = useState<number>(0);
    const [moles, setMoles] = useState<boolean[]>(Array(9).fill(false));
    const [timeLeft, setTimeLeft] = useState<number>(30);

    // Hide a specific mole
    const hideMole = (index: number) => {
        setMoles(currentMoles => currentMoles.map((mole, moleIndex) => moleIndex === index ? false : mole));
    };

    // Show a random mole
    useEffect(() => {
        let moleTimers: NodeJS.Timeout[] = [];

        if (timeLeft > 0) {
            const randomDelay = Math.random() * (550 - 200) + 200; // Random delay between 300 to 750ms
            const randomIndex = Math.floor(Math.random() * moles.length);
            moleTimers = moles.map((_, index) => {
                
                return setTimeout(() => {
                    setMoles(currentMoles => {
                        if (timeLeft <= 0) return currentMoles; // Don't show new moles if time is up
                        const newMoles = [...currentMoles];
                        newMoles[randomIndex] = true;

                        // Hide this mole after some time
                        setTimeout(() => hideMole(randomIndex), 1000);
                        return newMoles;
                    });
                }, randomDelay); // Randomize appearance time
            });
        }

        return () => {
            moleTimers.forEach(clearTimeout);
        };
    }, [timeLeft, moles]);

    // Update timer every second
    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

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
