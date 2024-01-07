import React from 'react';
import styles from './Slider.module.css';

const Slider = ({ label, value, onChange }) => {
	const handleSliderChange = (event) => {
		if (onChange) {
			onChange(event.target.value);
			console.log(event.target.value);
		}
	};

	return (
		<div className="range-slider">
			<p className={styles.label}>{label}</p>
			<input type="range" min="0" max="100" value={value} onChange={(e) => handleSliderChange(e)} className={styles} />
		</div>
	);
};

export default Slider;
