import React, {useContext} from "react"; 
import styles from './DeleteBotModal.module.css'; 
import { GameContext } from "../../context/GameContext/GameContext";

function DeleteBotModal(props) {
  const { userBots, setUserBots } = useContext(GameContext)

  const handleCloseClick = () => {
    props.setDeleteModal(false)
  } 

  const handleDeleteClick = () => {
    const botToDelete = props.selectBot;
    
    setUserBots((currentBots) => {
        const newBots = currentBots.filter((bot) => bot.name !== botToDelete.name); 

        newBots.length === 0 && props.changeMakingStatus(true)
        
        // Update botIndex after deletion
        props.setBotIndex((prevIndex) => {
            // If the deleted bot was the last in the list, decrement the index
            if (prevIndex >= newBots.length) {
                return Math.max(prevIndex - 1, 0); // Ensures the index doesn't go below 0
            }
            // Otherwise, return the current index or the next bot
            return prevIndex;
        });

        return newBots;
    });

    props.setDeleteModal(false);
}

return (
  <div className={styles.deleteContainer}>
    {props.open && 
    <div className={styles.deleteModal}>
      <p>Delete this bot?</p>
      <div className={styles.buttonContainer}>
        <button onClick={handleDeleteClick}>YES</button>
        <button onClick={handleCloseClick}>NO</button>
      </div>
    </div>}
  </div>
)
} 

export default DeleteBotModal;