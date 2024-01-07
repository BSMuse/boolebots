import React, { useState, useEffect, useContext } from 'react';
import styles from './BotConfigBox.module.css';
import BotSelectModal from '../BotSelectModal/BotSelectModal';
import { GameContext } from '../../context/GameContext/GameContext';

const BotConfigBox = (props) => {
	const [visible, changeVisibility] = useState(false);
	const { bots } = useContext(GameContext); 
	const [chosenBot, setChosenBot] = useState(null)
	
	const handleSelectBtn = () => {
		changeVisibility(prevState => !prevState)
		setChosenBot(null)
		console.log('boxconfig', props.formId)
	} 

	useEffect(() => {
		setChosenBot(bots.find((bot) => bot.formId === props.formId)) 
		console.log(bots)
		console.log('forId in config', props.formId)
		console.log(`chosenBot for ${props.formId}`,chosenBot)
	},[bots])
	  

	return (
		<>
			{visible && <BotSelectModal formId={props.formId} visible={visible} changeVisibility={changeVisibility}/>}
			<div className={styles.wrapper}>
				<div className={styles.botConfigContainer}>
					{!chosenBot ? <button onClick={handleSelectBtn}>Pick Your Bot</button> : 
					<div className={styles.readyContainer}>  
							<button className={styles.roundButton} onClick={handleSelectBtn}>X</button>
						<span style={{ backgroundColor: chosenBot.color }}>{chosenBot.name}</span> 
						<p>IS READY!</p>
					</div> 
					}
				</div>
			</div>
		</>
	);
};

export default BotConfigBox;
