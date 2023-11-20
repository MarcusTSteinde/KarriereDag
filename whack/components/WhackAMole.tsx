"use client"
import React, { useState, useEffect } from 'react';
import Score from './Score';

const WhackAMole = () => {
    const [score, setScore] = useState<number>(0);
    const [moles, setMoles] = useState<boolean[]>(Array(9).fill(false));

    const showMole = () => {
        const randomIndex = Math.floor(Math.random() * moles.length);
        const newMoles = moles.slice();
        newMoles[randomIndex] = true;
        setMoles(newMoles);
    
        setTimeout(() => {
            const newMoles = moles.slice();
            newMoles[randomIndex] = false;
            setMoles(newMoles);
        }, 1000); // Hide the mole after 1 second
    };
    
    useEffect(() => {
        const interval = setInterval(showMole, 1500); // Show a mole every 1.5 seconds
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [moles]);
    

    const handleWhack = (index: number) => {
        if (moles[index]) {
            setScore(score + 1);
            const newMoles = moles.slice();
            newMoles[index] = false;
            setMoles(newMoles);
        }
    };
    
    return (
        <div>
        <Score currentScore={score} />
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