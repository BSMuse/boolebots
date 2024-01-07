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
import BotSelectModal from './components/BotSelectModal/BotSelectModal';
// import BotConfigBox from './components/BotConfigBox/BotConfigBox';

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
				<BotSelectModal/>
				{/* <BotConfigBox /> */}
			</GameProvider>
		</div>
	);
}

export default App;
