import React, { useState, useEffect, useRef } from "react";
import styles from './IntroModal.module.css';
import InfoModal from "../InfoModal/InfoModal";
import backgroundMusic from "../../audio/Low-fi_Relaxo_-_Drhapso.mp3"

function IntroModal() {
  const [visible, changeVisibility] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [userDetails, changeDetails] = useState({
    email: null, 
    password: null
  })
  const [isPlaying, setIsPlaying] = useState(false);
  const slidesRef = useRef([]);
  let slideIndex = 0;
  let timeoutId = useRef(null); 

  const handleEmailChange = (event) => {
    changeDetails(prevState => ({...prevState, email: event.target.value}) )
  }

  const handlePasswordChange = (event) => {
    changeDetails(prevState => ({...prevState, password: event.target.value}) )
  }

  const isFormValid = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailIsValid = userDetails.email && emailRegex.test(userDetails.email);
    const passwordIsValid = userDetails.password && userDetails.password.length >= 8;
    return emailIsValid && passwordIsValid;
  };
  
  

  const closeModal = () => {
    changeVisibility(false);
    setIsPlaying(true);
  }

  const handleSignUp = () => {
    console.log('email:', userDetails.email, 'password:', userDetails.password)
    isFormValid() ? closeModal() : alert('Email and Password id not valid.')
  }

  const handleLogin = () => {
    console.log('email:', userDetails.email, 'password:', userDetails.password)
    isFormValid() ? closeModal() : alert('Not user account for these details.')
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
                value={userDetails.email || ''} 
                onChange={handleEmailChange} 
              />
              <input 
                type="password" 
                id="password" 
                placeholder="Password" 
                value={userDetails.password || ''} 
                onChange={handlePasswordChange} 
              />
              <button type="button" onClick={handleLogin} >Log In</button>
              <button type="button" onClick={handleSignUp} >Sign Up</button>
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
