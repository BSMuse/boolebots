import React, { useState, useContext, useEffect } from "react";
import UserSelection from "../UserSelection/UserSelection";
import DeleteBotModal from "../DeleteBotModal/DeleteBotModal";
import { GameContext } from "../../context/GameContext/GameContext";
import Bot from "../../context/GameContext/Bot"
import styles from './BotSelectModal.module.css';


function BotSelectModal(props) {
  const [makingBot, changeMakingStatus] = useState(false) 
  const [name, setName] = useState('New Bot');
	const [speed, setSpeed] = useState(50);
	const [value, setValue] = useState(null);
	const [direction, setDirection] = useState(null);
	const [operator, setOperator] = useState(null);
	const [color, setColor] = useState('#AE1919')
  const botsImageArray = Array.from({ length: 11 }, (_, index) => `/bot-${index + 1}.png`);
  const [botIndex, setBotIndex] = useState(0);
  const [openDeleteModal, setDeleteModal] = useState(false)   
  const { bots, addBot, userBots, setUserBots } = useContext(GameContext);
  const selectBot = (userBots[botIndex]) 

  const makeBot = () => {
    changeMakingStatus(prevStat => !prevStat)
    setBotIndex(0)
  }

  const handleDeleteBtn = () => {
    setDeleteModal(true)
    console.log('selectBot', selectBot)
  } 

  const handleLeftSelect = () => {
    makingBot ? setBotIndex(prevIndex => (prevIndex - 1 + botsImageArray.length) % botsImageArray.length) 
    : setBotIndex(prevIndex => (prevIndex - 1 + userBots.length) % userBots.length);
  };

  const handleRightSelect = () => {
    makingBot ? setBotIndex(prevIndex => (prevIndex + 1) % botsImageArray.length)
    : setBotIndex(prevIndex => (prevIndex + 1) % userBots.length);
  };

  const closeModal = () => {
    props.changeVisibility(false);
  } 

  const handleReadyButton = () => {
    const currentDirection = makingBot ? direction : selectBot.direction
    if (bots.length > 0 && bots[0].direction === currentDirection) {
      alert('Your bots are going the same direction!');
      console.log(selectBot.direction)
    } else {
      if (makingBot) {
        const newUserBot = {    
          name: name,
          speed: speed,
          value: value,
          direction: direction,
          operator: operator,
          color: color,
          image_id: botIndex,
          user_id: 1,
          wins: 0,
          losses: 0,
          is_active: false,
        };
  
        const gameBot = new Bot();
        gameBot.setName(name);
        gameBot.setColor(color);
        gameBot.setFormId(props.formId);
        gameBot.setImage(botsImageArray[botIndex]);
        gameBot.setSpeed(Number(speed));
        gameBot.setBinaryValue(value);
        gameBot.setDirection(direction);
        gameBot.setCoordinates();
        gameBot.setOperator(operator);
  
        if (Object.values(newUserBot).every(value => value !== undefined && value !== null)) {
          setUserBots(prevState => [...prevState, newUserBot]);
          addBot(gameBot);
          closeModal();
        } else {
          alert('Please fill in all values!');
        }
      } else { 
        const gameBot = new Bot();
        gameBot.setName(selectBot.name);
        gameBot.setColor(selectBot.color);
        gameBot.setFormId(props.formId);
        gameBot.setImage(botsImageArray[selectBot.image_id]);
        gameBot.setSpeed(Number(selectBot.speed));
        gameBot.setBinaryValue(selectBot.value);
        gameBot.setDirection(selectBot.direction);
        gameBot.setCoordinates();
        gameBot.setOperator(selectBot.operator);
        addBot(gameBot);
        closeModal();
      } 
    }
  };
  

  useEffect(() => {
    if(userBots.length === 0) {
      changeMakingStatus(true)
    }
  },[userBots])


  return (
    <>
      {props.visible && (
        <div className={styles.overlay}>
          <div className={styles.BotSelectModal}>
            <div className={styles.titleContainer}>
              <button className={styles.readyButton} onClick={handleReadyButton}>READY FOR BATTLE!</button>
              {(makingBot && userBots.length > 0) && <button className={styles.arrowBackButton} title="Go back to selection" onClick={makeBot}></button>}
            </div>
            <div className={styles.midContainer}>
              <button className={`${styles.button} ${styles.leftbtn}`} onClick={handleLeftSelect}></button>
              <div className={styles.slidesContainer}>
                <h3 className={styles.name} style={{ backgroundColor: (makingBot ? color : userBots[botIndex].color) }}>
                  {makingBot ? name : userBots[botIndex].name}
                </h3>
                {(!makingBot && !openDeleteModal) && <button className={styles.roundButton} onClick={handleDeleteBtn}>X</button>}
                {
                  <div className={styles.mySlides}>
                    <img className={styles.fade} src={makingBot ? botsImageArray[botIndex] : botsImageArray[userBots[botIndex].image_id]}/>
                  </div>
                }
              </div>
              <button className={`${styles.button} ${styles.rightbtn}`} onClick={handleRightSelect}></button>
            </div>
            {!makingBot && (
              <div className={styles.statsContainer}>
                <p>Value: {userBots[botIndex].value}</p>
                <p>Speed: {userBots[botIndex].speed}</p>
                <p>Operator: {userBots[botIndex].operator}</p>
                <p>Direction: {userBots[botIndex].direction}</p>
              </div>
            )}
            {!makingBot && <button className={styles.newbotbtn} onClick={makeBot}>Create a New Bot?</button>}
            {makingBot && 
              <div className={styles.selectionContainer}>
                <UserSelection
                  name={name}
                  setName={setName}
                  speed={speed}
                  setSpeed={setSpeed}
                  value={value}
                  setValue={setValue}
                  direction={direction}
                  setDirection={setDirection}
                  operator={operator}
                  setOperator={setOperator}
                  color={color}
                  setColor={setColor}
                />
              </div>
            }
            { openDeleteModal && <DeleteBotModal open = {openDeleteModal} setDeleteModal = {setDeleteModal} selectBot = {selectBot} setBotIndex = {setBotIndex} changeMakingStatus = {changeMakingStatus}/> }
          </div>
        </div>
      )}
    </>
  );  
}

export default BotSelectModal;
