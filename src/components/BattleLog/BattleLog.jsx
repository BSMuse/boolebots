import React, { useRef, useEffect, useContext } from 'react';
import { GameContext } from '../../context/GameContext/GameContext';
import styles from './BattleLog.module.css';

function BattleLog() {
  const { logsBots } = useContext(GameContext);

  // creating reference for wrapper to adjust scroll
  const scrollableElement = useRef(null);

  // makes the scroll bar head to bottom on first render and with every new log in array so user doesn't have to scroll down for new result
  useEffect(() => {
    if (scrollableElement.current) {
      scrollableElement.current.scrollTop = scrollableElement.current.scrollHeight - scrollableElement.current.clientHeight;
    }
  }, [logsBots.length]);

  // maps logs to wrapper
	const renderLogs = () => {
		if (!Array.isArray(logsBots)) {
			return null;
		} else {
			const uniqueLogs = [];
			const botMessages = logsBots.filter((bot) => {
				// Check if the bot's movementId already exists in uniqueLogs
				const isDuplicate = uniqueLogs.some((prevBot) => {
					return prevBot.movementId === bot.movementId;
				});
	
				if (isDuplicate) {
					return false;
				}
	
				uniqueLogs.push(bot); // Add the bot to uniqueLogs
				return true;
			}).map((bot, index) => {
				let botResult = '';
				let botComputation = '';
	
				if (bot.gameStatus === 'winner') {
					botResult = `${bot.name} wins!`;
					botComputation = `Operator: ${bot.operator} & Value: ${bot.binaryValue}`;
				} else if (bot.gameStatus === 'loser') {
					botResult = `${bot.name} loses!`;
					botComputation = `Operator: ${bot.operator} & Value: ${bot.binaryValue}`;
				} else if (bot.gameStatus === 'wall') {
					botResult = `${bot.name} crashed into that wall!`;
					botComputation = `New Direction: ${bot.direction} & New Value: ${bot.binaryValue}`;
				} else if (bot.gameStatus === 'tie') {
					botResult = `${bot.name} tied!`;
					botComputation = `Operator: ${bot.operator} & Value: ${bot.binaryValue}`;
				}
	
				return (
					<p key={index} className={styles.status_txt}>
						<p>{botResult}</p>
						<p>{botComputation}</p>
						<p></p>
					</p>
				);
			});

	
			return (
				<div className={styles.container}>
					{botMessages}
				</div>
			);
		}
	};

  return  (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>Battle Log</p>
      </div>
      <div className={styles.logs} ref={scrollableElement}>
        {renderLogs()}
      </div>
    </div>
  );
}

export default BattleLog;