import React from 'react';
import { useContext } from 'react';
import { GameContext } from '../../context/GameContext/GameContext';
import styles from './Button.module.css';

const Button = ({ onClick, width, height, fontSize, checkIsReady }) => {
	const { gameState, setGameState, bots } = useContext(GameContext);

	function handleClick() {
		// Adding in internal functionality to the button
		bots.length > 1 ? setGameState(!gameState) : console.log('not ready')
		if (onClick) {
			// Adding in outside functionality to the button
			onClick();
		}
	}
	return (
		<div className={styles.container} style={{ width, height }} onClick={handleClick}>
			<p className={styles.text} style={{ fontSize }}>
				{gameState ? 'STOP' : 'BATTLE!' }
			</p>
		</div>
	);
};

export default Button;
