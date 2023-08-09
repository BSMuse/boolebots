import React, { useState, useEffect, useRef } from "react";
import styles from './IntroModal.module.css';
import InfoModal from "../InfoModal/InfoModal";
import backgroundMusic from "../../audio/Low-fi_Relaxo_-_Drhapso.mp3"

function IntroModal() {
  const [visible, changeVisibility] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const slidesRef = useRef([]);
  let slideIndex = 0;
  let timeoutId = useRef(null); // Use useRef to hold the timeoutId

  const closeModal = () => {
    changeVisibility(false);
    setIsPlaying(true);
  }

  const openInfoModal = () => {
    setInfoModalVisible(true);
  }

  const closeInfoModal = () => {
    setInfoModalVisible(false);
  };
  
  const showSlides = () => {
    slidesRef.current.forEach((slide, index) => {
      if (slide) {
        slide.style.display = index === slideIndex ? "block" : "none";
      }
    });

    slideIndex++;
    if (slideIndex >= slidesRef.current.length) {
      slideIndex = 0;
    }

    timeoutId.current = setTimeout(showSlides, 3000); // Save the timeoutId to the ref
  } 

  useEffect(() => {
    changeVisibility(true);
    showSlides();

    return () => {
      clearTimeout(timeoutId.current); // Clean up the timeout when the component is unmounted or re-rendered
    };
  }, []);

  const publicources = Array.from({ length: 11 }, (_, index) => `/public/bot-${index + 1}.png`);

  useEffect(() => {
    if (isPlaying) {
      const audio = new Audio(backgroundMusic);
      audio.loop = true;
      audio.play();
    }

    return () => {
      setIsPlaying(false);
    };
  }, [isPlaying]);

  return (
    <>
      {visible && (
        <div className={styles.overlay}>
          <div className={styles.introModal}>
            <img src="/public/title.png" alt="Title" className={styles.title} />
            <div className={styles.slidesContainer}>
              {publicources.map((src, index) => (
                <div
                  key={index}
                  ref={el => slidesRef.current[index] = el}
                  className={`${styles.mySlides} ${styles.fade}`}
                  style={{ display: index === 0 ? "block" : "none" }} 
                >
                  <img src={src} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className={styles.info}>
              <p>What is this game about?</p>
              <img src="/public/info_icon.png" 
              alt="Info" 
              onClick={openInfoModal} 
              title="Click me!"
              />
            </div>
            <button onClick={closeModal}>Ready to Play?</button>
          </div>
        </div>
      )}
      {infoModalVisible && <InfoModal isVisible={infoModalVisible} onClose={closeInfoModal}  />}
    </>
  );
}

export default IntroModal;
