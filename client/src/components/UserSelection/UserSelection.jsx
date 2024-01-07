import React, { useState, useEffect } from 'react';
import styles from './UserSelection.module.css';
import Input from '../Input/Input';
import Slider from '../Slider/Slider';
import Dropdown from '../Dropdown/Dropdown';

const UserSelection = (props) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div>
					<Input label="Name" value={props.name} onChange={props.setName} color={props.color} setColor={props.setColor} />
					<Slider label="Speed" value={props.speed} onChange={props.setSpeed} />
				</div>
				<div className={styles.dropdownContainer}>
					<Dropdown label="Value" options={[0, 1]} value={props.value} onChange={props.setValue} />
					<Dropdown label="Direction" options={['North', 'South', 'East', 'West']} value={props.direction} onChange={props.setDirection} />
					<Dropdown label="Operation" options={['AND', 'OR', 'NOR', 'XOR']} value={props.operator} onChange={props.setOperator} />
				</div>
			</div>
		</div>
	);
};

export default UserSelection;
