import React, { useState, useEffect, useContext } from 'react';
import OpaqueBackground from '../OpaqueBackground/OpaqueBackground';
import BotConfigBox from "../BotConfigBox/BotConfigBox"
import Button from '../Button/Button';
import { GameContext } from '../../context/GameContext/GameContext';
import styles from './UserConfigBox.module.css';
import startSound from "../../audio/start-sound.wav"

const UserConfigPanel = () => {
	const { pause } = useContext(GameContext);
	const [hasPlayedSound, setHasPlayedSound] = useState(false);

	useEffect(() => {
		if (pause === false) {
		  setHasPlayedSound(false);
		}
	  }, [pause]);

	return (
		<div className={styles.wrapper}>
			<OpaqueBackground>
					<BotConfigBox formId={1}/>
					<BotConfigBox formId={2}/>
				<Button />
			</OpaqueBackground>
			{hasPlayedSound && (
        		<audio autoPlay>
          			<source src={startSound} type="audio/wav" />
          			Your browser does not support the audio element.
        		</audio>
      )}
		</div>
	);
};

export default UserConfigPanel;