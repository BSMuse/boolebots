import React from 'react';
import { createContext, useState } from 'react';

const GameContext = createContext();

const GameProvider = ({ children }) => {
	// State for game state
	const [gameState, setGameState] = useState(false);

	// State for bots
	const [bots, setBots] = useState([]);

	const [logsBots, setLogBots] = useState([])

	const [pause, setPause] = useState(false)

	// Function to add a new bot (id generated outside)
	const addBot = (bot) => {
		const existingBotIndex = bots.findIndex((b) => b.formId === bot.formId);

		if (existingBotIndex !== -1) {
			// Replace the existing bot with the new bot
			setBots((prevBots) => {
				const newBots = [...prevBots];
				newBots[existingBotIndex] = bot;
				return newBots;
			});
		} else {
			// Add the new bot
			setBots((prevBots) => [...prevBots, bot]);
		}
	};

	// Function to remove a bot
	const removeBot = (botId) => {
		setBots((prevBots) => prevBots.filter((bot) => bot.id !== botId));
	};

	// Updated checkOutcome to determine if bots are in the same spot and returns id instead of Name.
	const checkOutcome = (bot1, bot2) => {
		// Determine the earliest timestamp
		const { rowIndex: rowIndex1, columnIndex: columnIndex1 } = bot1.coordinates;
		const { rowIndex: rowIndex2, columnIndex: columnIndex2 } = bot2.coordinates;
		if (rowIndex1 === rowIndex2 && columnIndex1 === columnIndex2) {
			const earliestTimestamp = Math.min(bot1.timestamp, bot2.timestamp);

			//bot1 moved first, it's assigned as firstBot
			const firstBot = bot1.timestamp === earliestTimestamp ? bot1 : bot2;
			//bot1 is assigned to the firstBot, then second bot is bot2
			const secondBot = bot1.timestamp === earliestTimestamp ? bot2 : bot1;

			// Calculate the result based on the operator
			let result;
			if (firstBot.operator === 'AND') {
				result = firstBot.binaryValue && secondBot.binaryValue;
			} else if (firstBot.operator === 'OR') {
				result = firstBot.binaryValue || secondBot.binaryValue;
			} else if (firstBot.operator === 'NOR') {
				result = !(firstBot.binaryValue || secondBot.binaryValue);
			} else if (firstBot.operator === 'XOR') {
				result = firstBot.binaryValue !== secondBot.binaryValue;
				// If the binary values are different, the result is true (1),
				// if they are the same, the result is false (0).
			} else {
				result = null; //default result
			}

	return result ? firstBot.id : 'tie';
		} else {
			return null;
		}
	};

	// Defining the context values
	const contextValue = {
		gameState,
		setGameState,
		bots,
		setBots,
		logsBots, 
		setLogBots,
		addBot,
		removeBot,
		checkOutcome,
		pause, 
		setPause
	};

	// Provide the context value to children components
	return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export { GameContext, GameProvider };
