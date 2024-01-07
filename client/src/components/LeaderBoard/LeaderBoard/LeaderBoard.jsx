import React, { useState, useEffect, useContext }  from 'react';
import styles from './LeaderBoard.module.css'
import BotStatistics from '../BotStatistics/BotStatistics';
import { GameContext } from '../../../context/GameContext/GameContext';
import OpaqueBackground from '../../OpaqueBackground/OpaqueBackground';

const LeaderBoard = () => {
  const { bots, userBots } = useContext(GameContext);
  const [uniqueBots, setUniqueBots] = useState([])

  useEffect(() => {
    setUniqueBots(userBots)
  }, [])

  const storeBot = () => {
    bots.forEach(bot => {
      //for the first round when unique bots array is still empty, we copy all the bots
      if (uniqueBots.length === 0) {

        setUniqueBots(prevUniqueBots => [...prevUniqueBots, bot]);
      } 
      else {
      // every next round we check for the matching names/indexes in bots array
        const botIndex = uniqueBots.findIndex(el => el.name === bot.name);
        if (botIndex !== -1) {
          console.log(`bot already exists at index ${botIndex}`);
          const updatedBot = {
            name: bot.name,
            wins: bot.wins+uniqueBots[botIndex].wins,
            losses: bot.losses+uniqueBots[botIndex].losses,
          };
          //only update the bot that needs tally increment
          setUniqueBots(prevUniqueBots => [
            ...prevUniqueBots.slice(0, botIndex),
            updatedBot,
            ...prevUniqueBots.slice(botIndex + 1),
          ]);
        } else {
          //if no matching names, we add Bot straight to a UniqueBots array
          setUniqueBots(prevUniqueBots => [...prevUniqueBots, bot]);
        }
      }
    });
  };

  useEffect(() => {
    storeBot()
  }, [bots])

  return (
    <div className={styles.wrapper}>
      <OpaqueBackground>
        <div className={styles.inner_wrapper}>
          <h3 className={styles.container__title}>Leaders</h3>
          <div className={styles.container}>
              <div className={styles.container__headings}>
                  <h4>User</h4>
                  <h4>Wins</h4>
                  <h4>Losses</h4>
              </div>
              <BotStatistics bots={uniqueBots}/>
          </div>
        </div>
      </OpaqueBackground>
    </div>
  )
}

export default LeaderBoard;
