import React, { useState, useEffect, useContext } from 'react';
import UserSelection from '../UserSelection/UserSelection';
import OpaqueBackground from '../OpaqueBackground/OpaqueBackground';
import Button from '../Button/Button';
import { GameContext } from '../../context/GameContext/GameContext';
import Bot from '../../context/GameContext/Bot';
import styles from './UserConfigBox.module.css';
import * as public from '../../imports';
import startSound from "../../audio/start-sound.wav"

const imageArray = [
	bot1,
	bot2,
	bot3,
	bot4,
	bot5,
	bot6,
	bot7,
	bot8,
	bot9,
	bot10,
	bot11
  ];

const UserConfigPanel = () => {
	const { addBot, pause } = useContext(GameContext);
	const { gameState } = useContext(GameContext);
	const [matchFound, setMatchFound] = useState(false);
	const [newBots, setNewBots] = useState([])
	const [hasPlayedSound, setHasPlayedSound] = useState(false);

const checkIsReady = () => {
  if (newBots.length > 1) {
    const isDuplicateName = newBots.some((bot, index) => {
      return newBots.findIndex((otherBot, otherIndex) => {
        return bot.name === otherBot.name && index !== otherIndex;
      }) !== -1;
    });

    const isDuplicateDirection = newBots.some((bot, index) => {
      return newBots.findIndex((otherBot, otherIndex) => {
        return bot.direction === otherBot.direction && index !== otherIndex;
      }) !== -1;
    });

    if (isDuplicateDirection || isDuplicateName) {
      // Duplicate direction or name found
      alert('Duplicate bot direction or name found!');
      return false;
    } else {
      // no duplicates found
      return true;
    }
  } else if (newBots.length === 1) {
    // not enough bots to start the game
    return false;
  }
};

	const randomBotImg = () => {
		const randomImageIndex = Math.floor(Math.random() * imageArray.length);
		const randomImage = imageArray[randomImageIndex];
		return randomImage
	}

	useEffect(() => {
	if (gameState === true && pause === false) {
		newBots.forEach(el => {
			const bot = new Bot();
			bot.setName(el.name);
			bot.setFormId(el.formId);
			bot.setImage(randomBotImg());
			bot.setSpeed(Number(el.speed));
			bot.setBinaryValue(el.value);
			bot.setDirection(el.direction);
			bot.setCoordinates(); // Call setCoordinates after setDirection
			bot.setOperator(el.operation);
			addBot(bot);
			}) 
			setHasPlayedSound(true)
		}	
	}, [gameState]);

	useEffect(() => {
		if (pause === false) {
		  setHasPlayedSound(false);
		}
	  }, [pause]);

	return (
		<div className={styles.wrapper}>
			<OpaqueBackground>
				<UserSelection formId={1} 
					newBots={newBots}
					setNewBots={setNewBots} 
					setMatchFound={setMatchFound} 
					matchFound={matchFound} 
					/>
				<UserSelection formId={2} 
					newBots={newBots}
					setNewBots={setNewBots} 
					setMatchFound={setMatchFound} 
					matchFound={matchFound} 
					/>
				<Button 
				checkIsReady={checkIsReady} />
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
