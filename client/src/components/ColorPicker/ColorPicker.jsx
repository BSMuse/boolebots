import React from 'react';
import styles from './ColorPicker.module.css';

const ColorPicker = ({ value, onChange }) => {
	const handleColorPickerChange = (event) => {
		const newColor = event.target.value;
		if (newColor !== '#000000' && onChange) {
				onChange(newColor);
				console.log(newColor)
		}
};

    return (
        <div className={styles.colorPickerContainer}>
            <input 
                type="color" 
                value={value} 
                onChange={handleColorPickerChange} 
                className={styles.colorInput} 
								title='Click for Color!'
            />
        </div>
    );
};

ColorPicker.defaultProps = {
    value: '#176D99' 
};

export default ColorPicker;
