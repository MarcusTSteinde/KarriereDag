"use client"
import React, { useState, useEffect } from 'react';
import Score from './Score';

const WhackAMole = () => {
    const [score, setScore] = useState<number>(0);
    const [moles, setMoles] = useState<boolean[]>(Array(9).fill(false));
    const [timeLeft, setTimeLeft] = useState<number>(30);
    const [isPowerUpActive, setIsPowerUpActive] = useState<boolean>(false);
    const [powerUpUsed, setPowerUpUsed] = useState<boolean>(false);
    const [bombIndex, setBombIndex] = useState<number>(-1);
    const [lives, setLives] = useState<number>(3);
    ///********************************* MOLE LOGIC ********************************* 

    // Hide a specific mole
    const hideMole = (index: number) => {
        setMoles(currentMoles => currentMoles.map((mole, moleIndex) => moleIndex === index ? false : mole));
    };

    // Show a random mole
    useEffect(() => {
        const showMole = () => {
            if (timeLeft > 0) {
                // Filter to find unoccupied holes (not currently showing a mole and not the bomb's location)
                const availableHoles = moles
                    .map((mole, index) => !mole && index !== bombIndex ? index : null)
                    .filter((index): index is number => index !== null);
    
                if (availableHoles.length > 0) {
                    const randomIndex = availableHoles[Math.floor(Math.random() * availableHoles.length)];
                    setMoles(currentMoles => {
                        const newMoles = [...currentMoles];
                        newMoles[randomIndex] = true;
    
                        // Hide this mole after a delay
                        setTimeout(() => hideMole(randomIndex), isPowerUpActive ? 2000 : 1000);
                        return newMoles;
                    });
                }
            }
        };
    
        const moleInterval = isPowerUpActive ? (Math.random() * (550 - 200) + 200) * 2 : Math.random() * (550 - 200) + 200;
        const timer = setInterval(showMole, moleInterval);
    
        return () => clearInterval(timer);
    }, [ moles, bombIndex]);
    //Handles the mole whacking
    const handleWhack = (index: number) => {
        if (index === bombIndex) {
            // Player clicked on a bomb
            setBombIndex(-1)
            setLives(prevLives => prevLives - 1);
            // Optionally, add logic to handle the game ending if lives reach 0
            if (lives - 1 <= 0) {
                // Handle game over (e.g., stop the game, show a message)
            }
        } else if (moles[index]) {
            // Player clicked on a mole
            setScore(prevScore => prevScore + 10);
            hideMole(index);
        }
    };

    /// ******************************************* POWERUP LOGIC ********************************* 
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

    /// ******************************************* BOMB LOGIC ********************************* 
    // Bomb appearance interval
    useEffect(() => {
        const handleBomb = () => {
            console.log("handleBomb called");
            if (timeLeft > 0) {
                const availableSpots = moles
                    .map((mole, index) => (!mole && index !== bombIndex) ? index : null)
                    .filter((index): index is number => index !== null);
        
                    if (availableSpots.length > 0) {
                        const randomIndex = availableSpots[Math.floor(Math.random() * availableSpots.length)];
                        console.log("Showing bomb at index:", randomIndex); // Log the bomb index
                        setBombIndex(randomIndex); // Show the bomb
            
                        setTimeout(() => {
                            console.log("Hiding bomb from index:", randomIndex); // Log hiding the bomb
                            setBombIndex(-1); // Hide the bomb
                        }, 1500);
                    }
            }
        };
        const bombTimer = setInterval(handleBomb, 3000); // Every 3 seconds

        // Cleanup function
        return () => {
            console.log("Clearing bomb interval");
            clearInterval(bombTimer);
        };
    }, [bombIndex]); // Include timeLeft in dependencies

    /// ******************************************** TIMER LOGIC ********************************************

      useEffect(() => {
        const timerInterval = isPowerUpActive ? 2000 : 1000; // 2 seconds if power-up is active, otherwise 1 second
    
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, timerInterval);
    
        return () => clearInterval(timer);
    }, [timeLeft, isPowerUpActive]);

    return (
        <div>
            <Score currentScore={score} />
            <div>Time Left: {timeLeft}</div>
            <div>Energy Drinks Left: {powerUpUsed ? 0 : 1}</div>
            <div>Lives Left: {lives}</div>
            <div className="game-grid page">
                {moles.map((mole, index) => (
                     <div key={index} className={`mole-hole ${mole ? 'mole' : ''} ${index === bombIndex ? 'bomb' : ''}`} onClick={() => handleWhack(index)}>
                 </div>
                ))}
            </div>
        </div>
    );
};

export default WhackAMole;
