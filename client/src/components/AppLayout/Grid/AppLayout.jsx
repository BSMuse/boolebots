import React, { useState, useRef, useEffect } from 'react'
import styles from './AppLayout.module.css'

const AppLayout = () => {
  const [containerSize, setContainerSize] = useState({ height: 0, width: 0 });

  const containerRef = useRef(null);
  const squareRef = useRef(null);

  useEffect(() => {
    const reportContainerSize = () => {
      const containerHeight = containerRef.current.offsetHeight;
      const containerWidth = containerRef.current.offsetWidth;
      setContainerSize({ height: containerHeight, width: containerWidth });
    };

    reportContainerSize();
    window.addEventListener('resize', reportContainerSize);

    return () => {
      window.removeEventListener('resize', reportContainerSize);
    };
  }, []);
  
  useEffect(() => {
      let n = Math.min(containerSize.height, containerSize.width);
      squareRef.current.style.height = `${n}px`;
      squareRef.current.style.width = `${n}px`;
  });


  return (
    <div className={styles.container}>
        <div ref={containerRef}  className={styles.container__arena}>
          <div ref={squareRef}  className={styles.container__arena_square}>responsive arena that keeps 1:1 ratio</div>
        </div>
        <div className={styles.container__leaderboard}>LeaderBoard</div>
        <div className={styles.container__boolean}>Boolean</div>
        <div className={styles.container__users}>Users</div>
        <div className={styles.container__log}>Battle log</div>
    </div>
  )
}

export default AppLayout
