import React, { useEffect } from 'react';
import styles from './App.module.css';
import { GameProvider } from './context/GameContext/GameContext';
import Arena  from './components/Arena/Arena';
import LeaderBoard from './components/LeaderBoard/LeaderBoard/LeaderBoard'
import UserConfigBox from './components/UserConfigBox/UserConfigBox';
import BattleLog from './components/BattleLog/BattleLog';
import WinnerModal from './components/WinnerModal/WinnerModal';
import GitIcon from './components/GitIcon/GitIcon';
import IntroModalWrapper from './components/IntroModal/IntroModalWrapper';

function App() {
	return (
		<div className={ styles["app-container"]}>
			<IntroModalWrapper />
			<GameProvider>
				<Arena />
				<WinnerModal />
				<GitIcon />
				<LeaderBoard />
				<UserConfigBox />
				<BattleLog />
			</GameProvider>
		</div>
	);
}

export default App;
