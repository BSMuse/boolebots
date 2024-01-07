import React, { useState, useContext, useEffect } from 'react';
import styles from './Input.module.css';
import { GameContext } from '../../context/GameContext/GameContext';
import ColorPicker from '../ColorPicker/ColorPicker';

const Input = (props) => {
	const { userBots } = useContext(GameContext);
	const userBotNames = userBots.map((bot) => bot.name.toLowerCase())

	const handleInputChange = (event) => { 
		const inputValue = event.target.value; 
		if(inputValue.length > 9) {
			alert('Name is too long! Try something shorter.')
		} else if (userBotNames.includes(inputValue.toLowerCase()) ){
			alert('Name exists! Try another.')
		} else {
			props.onChange(inputValue);
		}
	};

	return (
		<div>
			<label htmlFor="input" className={styles.label}>
				<p>Name</p>
				<ColorPicker label="Color" value={props.color} onChange={props.setColor} />
			</label>
			<input className={styles.input} name="input" type="text" value={props.value} onChange={handleInputChange} required />
		</div>
	);
};

export default Input;
