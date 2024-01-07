import React, { useState } from 'react';
import styles from './Dropdown.module.css';

const defaultOptions = ['Option 1', 'Option 2', 'Option 3'];

const Dropdown = ({ label, options = defaultOptions, value, onChange }) => {
	const [selectedOption, setSelectedOption] = useState(value);
	const handleDropdownChange = (option) => {
		setSelectedOption(option);
		onChange(option);
	};

	return (
		<div className={styles.dropdown}>
			<div className={styles.downArrow}>
				<button className={styles.dropbtn}>
					{selectedOption !== null && selectedOption !== undefined ? selectedOption : label}
					<img className={styles.image} src="./DownArrow.png" />
				</button>
			</div>
			<div className={styles.dropdownContent}>
				{options.map((option) => {
					return (
						<a key={option} onClick={() => handleDropdownChange(option)}>
							{option}
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default Dropdown;
