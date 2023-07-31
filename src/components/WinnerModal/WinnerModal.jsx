import React, { useState, useContext, useEffect } from "react"; 
import { GameContext } from '../../context/GameContext/GameContext';
import styles from './WinnerModal.module.css';

function WinnerModal() { 
    const { winnerBot, loserBot } = useContext(GameContext);
    const [visible, changeVisibility] = useState(false);

    useEffect(() => {
        if (winnerBot) {
            changeVisibility(true);
        }
      }, [winnerBot]);

    const closeModal = ()=> {
        changeVisibility(false)
    }
   
    return (
    <>
        {visible && winnerBot && loserBot && (
        <div className={styles.overlay}>
            <div className={styles.winModal}>
                <h1>Winner!</h1>
                <div className="botContainer">
                    <img src= {winnerBot.image} alt={winnerBot.name} />
                </div>
                <h2>{winnerBot.name} destroyed {loserBot.name}</h2>
                <h3>Winner Bot Operator: {winnerBot.operator}</h3>
                <div className="value-container">
                    <p>Winner Bot Value: {winnerBot.binaryValue}</p>
                    <p>Loser Bot Value: {loserBot.binaryValue}</p>
                </div>
                <button onClick={closeModal}>Play again?</button>
            </div>
        </div>
        )}
    </>
    );
} 

export default WinnerModal