"use client"
import React, { useState, useEffect } from 'react';
import Score from './Score';
import { useRouter } from 'next/router';

const WhackAMole = () => {
    const [score, setScore] = useState<number>(0);
    const [moles, setMoles] = useState<boolean[]>(Array(12).fill(false));
    const [timeLeft, setTimeLeft] = useState<number>(30);
    const [isPowerUpActive, setIsPowerUpActive] = useState<boolean>(false);
    const [powerUpUsed, setPowerUpUsed] = useState<boolean>(false);
    const [bombIndex, setBombIndex] = useState<number>(-1);
    const [lives, setLives] = useState<number>(3);
    const [scoreUpdated, setScoreUpdated] = useState(false);
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });
    const [lifeLost, setLifeLost] = useState(false);

    const router = useRouter();

    const triggerLifeLostAnimation = () => {
        setLifeLost(true);
        setTimeout(() => {
            setLifeLost(false);
        }, 600); // Match this duration to your CSS animation duration
    };
    // Handles the score change animation
    const triggerScoreAnimation = () => {
        setScoreUpdated(true);
        setTimeout(() => {
            setScoreUpdated(false);
        }, 600); // Duration longer than the CSS transition so it has time to revert back
    };
    const showPopUp = (x: number, y: number) => {
        const popUpWidth = 100; // Width of the pop-up
        const popUpHeight = 50; // Height of the pop-up
        const adjustedX = x - popUpWidth / 2;
        const adjustedY = y - popUpHeight;
        setPopUpPosition({ x: adjustedX, y: adjustedY });
        setPopUpVisible(true);

        setTimeout(() => {
            setPopUpVisible(false);
        }, 1000); // Hide pop-up after 1 second
    };

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

        const moleInterval = isPowerUpActive ? (Math.random() * (550 - 250) + 250) * 2 : Math.random() * (550 - 250) + 250;
        const timer = setInterval(showMole, moleInterval);

        return () => clearInterval(timer);
    }, [moles, bombIndex]);
    //Handles the mole whacking
    const handleWhack = (index: number, event: React.MouseEvent) => {
        const moleElement = event.currentTarget; // Get the clicked mole element
        const moleRect = moleElement.getBoundingClientRect();
        const moleCenterX = moleRect.left + moleRect.width / 2;
        const molePosY = moleRect.top;
        if (index === bombIndex) {
            // Player clicked on a bomb
            setBombIndex(-1)
            setLives(prevLives => prevLives - 1);
            triggerLifeLostAnimation();
            // Optionally, add logic to handle the game ending if lives reach 0
            if (lives - 1 <= 0) {
                putScore(score, false)
            }
        } else if (moles[index]) {
            // Player clicked on a mole
            showPopUp(moleCenterX, molePosY);
            setScore(prevScore => prevScore + 16);
            hideMole(index);
            triggerScoreAnimation();
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
    async function putScore(gameScore : Number, timedOut : boolean)
    {
        const nickname = localStorage.getItem("nickname")
        try {
            const response = await fetch(`https://boopabug.azurewebsites.net/api/players/update-score/${nickname}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                score: gameScore,
              }),
            });
      
            if (response.ok && timedOut) {
                router.push('/timesup');
            } 
            else if (response.ok && !timedOut) {
                router.push('/gameover');
            }
            else {
              alert(`Error during updating score: ${response.status}`);
              const errorText = await response.text();
              console.error(errorText);
            }
          } catch (error) {
            console.error("An error occurred during registration:", error);
          }
    } 
    useEffect(() => {
        const timerInterval = isPowerUpActive ? 2000 : 1000; // 2 seconds if power-up is active, otherwise 1 second

        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
                
            }
            if(timeLeft <= 0)
            {
                putScore(score, true)
            }
        }, timerInterval);

        return () => clearInterval(timer);
    }, [timeLeft, isPowerUpActive, router]);

    return (
        <div className="w-full h-full flex flex-col ">
            <div className='h-1/2 w-full flex flex-col gap-3'>

                <div className='gameUIBox w-40 flex flex-row gap-2 PressStartFont'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                    {timeLeft} sek</div>
                <div className={`gameUIBox w-32 flex flex-row gap-2 PressStartFont ${scoreUpdated ? 'score-updated' : ''}`}><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 3 6 2V1m5 2 1-1V1M9 7v11M9 7a5 5 0 0 1 5 5M9 7a5 5 0 0 0-5 5m5-5a4.959 4.959 0 0 1 2.973 1H12V6a3 3 0 0 0-6 0v2h.027A4.959 4.959 0 0 1 9 7Zm-5 5H1m3 0v2a5 5 0 0 0 10 0v-2m3 0h-3m-9.975 4H2a1 1 0 0 0-1 1v2m13-3h2.025a1 1 0 0 1 1 1v2M13 9h2.025a1 1 0 0 0 1-1V6m-11 3H3a1 1 0 0 1-1-1V6" />
                </svg> {score} </div>
                {/*   <div>Energy Drinks Left: {powerUpUsed ? 0 : 1}</div> */}
                <div className={`gameUIBox w-24 flex flex-row gap-2 PressStartFont ${lifeLost ? 'life-lost-animation' : ''}`}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                    {lives}</div>
            </div>
            <div className='h-1/2 w-full flex'>
                <div className="grid-container self-end">
                    {moles.map((mole, index) => (
                        <div key={index} className={`mole-hole ${mole ? 'mole' : ''} ${index === bombIndex ? 'bomb' : ''}`} onClick={(e) => handleWhack(index, e)}>
                        </div>
                    ))}
                </div>
            </div>
            {popUpVisible && (
                <div
                    className="pop-up show"
                    style={{
                        left: `${popUpPosition.x}px`,
                        top: `${popUpPosition.y}px`,
                    }}
                >
                    +16 pt
                </div>
            )}
            <div className="logo-container">
            </div>
        </div>
    );
};

export default WhackAMole;
