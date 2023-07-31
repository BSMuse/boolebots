import React, { useContext, useEffect, useState, useRef } from 'react';
import { GameContext } from '../../context/GameContext/GameContext';
import { v4 as uuidv4 } from 'uuid';
import styles from './Arena.module.css';

function Arena() {
	const { bots, setBots, setWinnerBot, setLoserBot, gameState, setGameState, checkOutcome, setLogBots, setPause, pause } = useContext(GameContext);
	const [matrix, setMatrix] = useState([]);
	const intervalIdsRef = useRef([]);

	
	const moveBot = (bot) => {
		setBots((prevBots) => {
			const updatedBots = prevBots.map((updatedBot) => {
				if (updatedBot.id === bot.id) {
					const { rowIndex, columnIndex } = updatedBot.coordinates;
					const updatedTimestamp = Date.now();
					let newRow = rowIndex;
					let newColumn = columnIndex;
	
					// Update coordinates based on direction
					switch (bot.direction) {
						case 'North':
							newRow = rowIndex - 1;
							break;
						case 'South':
							newRow = rowIndex + 1;
							break;
						case 'East':
							newColumn = columnIndex + 1;
							break;
						case 'West':
							newColumn = columnIndex - 1;
							break;
						default:
							break;
					}
	
					if (newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) {
						const updatedCoordinates = { rowIndex: newRow, columnIndex: newColumn };
	
						return { ...updatedBot, coordinates: updatedCoordinates,};
					} else {
						// Change bot's direction if it hits the wall
						let directions = ['North', 'South', 'East', 'West'];
	
						switch (`${newRow},${newColumn}`) {
							case '0,7':
								directions = ['South', 'West'];
								break;
							case '0,0':
								directions = ['South', 'East'];
								break;
							case '7,7':
								directions = ['North', 'West'];
								break;
							case '7,0':
								directions = ['North', 'East'];
								break;
							default:
								break;
						}
	
						const newDirection = directions.filter((direction) => direction !== bot.direction);
						const randomIndex = Math.floor(Math.random() * newDirection.length);
						const newBotDirection = newDirection[randomIndex];
						// experimental feature: bots change binary on wall hit, as some game states will only tie (never end)
						const newBinary = Math.round(Math.random());
						const botUpdate = { ...updatedBot, direction: newBotDirection, timestamp: updatedTimestamp, movementId: uuidv4(), binaryValue: newBinary, gameStatus: 'wall' };
						setLogBots((prevLogs) => [...prevLogs, botUpdate]);
						return botUpdate;
					}
				}
				return updatedBot;
			});
	
			const winner = checkOutcome(updatedBots[0], updatedBots[1]);
			const updatedTimestamp = Date.now();
			if (winner === 'tie') {
				const updatedBotsWithTieStatus = updatedBots.map((updatedBot) => {
						const botUpdate = { ...updatedBot, gameStatus: 'tie', movementId: uuidv4() };
						setLogBots((prevLogs) => [...prevLogs, botUpdate]);
						return botUpdate;
				});
				updateMatrix(updatedBotsWithTieStatus);
				return updatedBotsWithTieStatus;
			} else if (winner) {
				setGameState(!gameState)
				const winnerUpdated = updatedBots.map((updatedBot) => {
					if (updatedBot.id === bot.id) {
						const botUpdate = {
							...updatedBot,
							timestamp: updatedTimestamp,
							gameStatus: 'winner',
							movementId: uuidv4(),
							wins: updatedBot.wins + 1
						};
						return botUpdate;
					} else {
						const botUpdate = {
							...updatedBot,
							timestamp: updatedTimestamp,
							gameStatus: 'loser',
							movementId: uuidv4(),
							losses: updatedBot.losses + 1
						};
						return botUpdate;
					}
				});

        setLogBots((prevLogs) => [...prevLogs, ...winnerUpdated]);
        return winnerUpdated;
      } else {
        updateMatrix(updatedBots);
        return updatedBots;
      }
    });
  };

	const updateMatrix = (botArray = bots) => {
		const updatedMatrix = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));

		botArray.forEach((bot) => {
			const { rowIndex, columnIndex } = bot.coordinates;
			updatedMatrix[rowIndex][columnIndex] = (
				<div className={styles['bot-container']}>
					<p className={styles['bot-label']} style={{ backgroundColor: bot.labelColor }}>
						{bot.name}
					</p>
					<img src={bot.image} alt={bot.name} className={styles['bot-image']} />
				</div>
			);
		});

		setMatrix(updatedMatrix);
	};

	useEffect(() => {
		updateMatrix(bots);
		const moveBotWithDelay = (bot) => {
			const intervalId = setInterval(() => {
				setTimeout(() => moveBot(bot), 500);
			}, 800 - bot.speed);

			intervalIdsRef.current.push(intervalId);
		};

		const clearIntervals = () => {
			intervalIdsRef.current.forEach((intervalId) => {
				clearInterval(intervalId);
			});
			intervalIdsRef.current = [];
		};

		if (gameState) {
			bots.forEach((bot) => {
				moveBotWithDelay(bot);
			});
		}  else {
			clearIntervals();
		}

		return clearIntervals;
	}, [gameState, bots]); 

	useEffect(() => {
		if (!gameState && bots.some(bot => bot.gameStatus === 'winner') && bots.some(bot => bot.gameStatus === 'loser')) {
			const clearIntervals = () => {
				intervalIdsRef.current.forEach((intervalId) => {
					clearInterval(intervalId);
				});
				intervalIdsRef.current = [];
			};
			updateMatrix([]);
			clearIntervals();
			setWinnerBot(bots.find((bot) => bot.gameStatus === 'winner'));
    		setLoserBot(bots.find((bot) => bot.gameStatus !== 'winner'));
			setBots([])
		}
	}, [gameState])

	useEffect(() => {
		if (gameState && bots.every(bot => bot.gameStatus !== 'winner')){
			setPause(true)
			console.log(pause)
		} else if (!gameState && bots.some(bot => bot.gameStatus === 'winner')) {
			setPause(false)
			console.log(pause)
		}
	}, [gameState])


	useEffect(() => {
		if (!gameState) {
		setLogBots((prevLogs) => [...prevLogs, ...bots]);
		}
	}, [gameState])

	return (
		<div className={styles.container}>
			<div className={styles['grid-container']}>
				{matrix.map((row, rowIndex) => (
					<div key={rowIndex} className={styles.row}>
						{row.map((cell, columnIndex) => (
							<div key={columnIndex} className={styles.cell}>
								{cell}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default Arena;
