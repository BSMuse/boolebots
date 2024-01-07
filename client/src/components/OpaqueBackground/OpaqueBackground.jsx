import React from 'react';
import styles from './OpaqueBackground.module.css';

const OpaqueBackground = ({ children, style }) => {
	return (
		<div className={styles.wrapper} style={style} data-testid="opaque-background-wrapper">
			<div className={styles.container} data-testid="opaque-background-container">
				{children}
			</div>
		</div>
	);
};

export default OpaqueBackground;
