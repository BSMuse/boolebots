import React, { useState, useEffect, useRef } from "react";
import styles from './IntroModal.module.css';
import InfoModal from "../InfoModal/InfoModal";
import backgroundMusic from "../../audio/Low-fi_Relaxo_-_Drhapso.mp3"

function IntroModal() {
  const [visible, changeVisibility] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
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
      clearTimeout(timeoutId.current);
    };
  }, []);

  const botsImageArray = Array.from({ length: 11 }, (_, index) => `/bot-${index + 1}.png`);

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
            <div className={styles.titleContainer}>
              <img src="/title.png" alt="Title" className={styles.title} />
            </div>
            <div className={styles.slidesContainer}>
              {botsImageArray.map((src, index) => (
                <div
                  key={index}
                  ref={el => slidesRef.current[index] = el}
                  className={`${styles.mySlides} ${styles.fade}`}
                  style={{ display: index === 0 ? "block" : "none" }} 
                >
                  <img src={src} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </div>{
            <div className={styles.formContainer}>
              <input 
                type="email" 
                id="email" 
                placeholder="Email address" 
                // value={email} 
                // onChange={handleEmailChange} 
              />
              <input 
                type="password" 
                id="password" 
                placeholder="Password" 
                // value={password} 
                // onChange={handlePasswordChange} 
              />
              <button type="button" onClick={null} >Log In</button>
              <button type="button" onClick={null} >Sign Up</button>
            </div>}
            <div className={styles.info}>
              <p
                onClick={openInfoModal} 
                title="Click me!">
                  What is this game about?
              </p>
              <img src="/info_icon.png" 
              alt="Info" 
              onClick={openInfoModal} 
              title="Click me!"
              />
            </div>
          </div> 
        </div>
      )}
      {infoModalVisible && <InfoModal isVisible={infoModalVisible} onClose={closeInfoModal}  />}
    </>
  );
}

export default IntroModal;
