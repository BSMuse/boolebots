import React, {useState, useContext, useEffect} from 'react';
import { GameContext } from '../../context/GameContext/GameContext';
import styles from './Button.module.css';
import startSound from "../../audio/start-sound.wav"

const Button = ({ width, height, fontSize}) => {
	const { gameState, pause, setGameState, bots } = useContext(GameContext);
	const [hasPlayedSound, setHasPlayedSound] = useState(false);

	function handleClick() {
		if(bots.length > 1){
			setHasPlayedSound(true)
			setGameState(!gameState) 
		}
	}

	useEffect(() => {
		if (pause === false) {
		  setHasPlayedSound(false);
		}
	  }, [pause]); 

	return (
		<div className={styles.container} style={{ width, height }} onClick={handleClick}>
			<p className={styles.text} style={{ fontSize }}>
				{gameState ? 'STOP' : 'BATTLE!' }
			</p>
			{hasPlayedSound && (
        		<audio autoPlay>
          			<source src={startSound} type="audio/wav" />
          			Your browser does not support the audio element.
        		</audio>
      )}
		</div>
	);
};

export default Button;
