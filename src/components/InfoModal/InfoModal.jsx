import React from "react";
import styles from "./InfoModal.module.css";

function InfoModal({ isVisible, onClose }) {
  const closeModal = () => {
    onClose();
  };

  return (
    isVisible && (
      <div className={styles.infoContainer}>
        <div className={styles.circle} onClick={closeModal} >
            <img src="/public/close_icon.png" alt={`Info`} onClick={closeModal} />
        </div>
        <div className={styles.textWrapper}>
            <h1>What is BooleBots?</h1>
            <br/>
            <p>
                BooleBots is a game that is not only fun, but is also an aid in helping to understand basic Boolean logic.
            </p>
            <br/>
            <p>
                This game has an arena of 8x8 game tiles in which your bots move at random speeds and trajectories.
                The bots can be assigned boolean values of 0 or 1 and boolean operations - AND, OR, NOR, XOR. 
            </p>
            <br/>
            <p>
                When a bot collides with another,
                who ever collides first has their operator used in the calculation to determine which bot is victorious based on the bots boolean value. 

            </p>
            <br/>
            <p>
                If their combined value under their operator equals to 1, they win!
                If not, they tie and they push off each other and change their trajectory.
                If they hit the walls of the grid, they also bounce off and change both their trajectory and their boolean value.
            </p>
            <br/>
            <p>Explore and have fun!</p>
        </div>
      </div>
    )
  );
}

export default InfoModal;
