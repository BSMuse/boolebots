import React from 'react';
import styles from './GitIcon.module.css';

const GitIcon = () => {
	return (
		<div className={styles.container}>
            <a href="https://github.com/BSMuse/boolebots" target="_blank" rel="noreferrer">
                <div className={styles.icon} />
            </a>
        </div>
	);
};

export default GitIcon;