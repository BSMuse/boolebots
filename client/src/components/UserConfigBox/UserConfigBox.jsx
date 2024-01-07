import React from 'react';
import OpaqueBackground from '../OpaqueBackground/OpaqueBackground';
import BotConfigBox from "../BotConfigBox/BotConfigBox"
import Button from '../Button/Button';
import styles from './UserConfigBox.module.css';

const UserConfigPanel = () => {

	return (
		<div className={styles.wrapper}>
			<OpaqueBackground>
					<BotConfigBox formId={1}/>
					<BotConfigBox formId={2}/>
				<Button />
			</OpaqueBackground>
		</div>
	);
};

export default UserConfigPanel;