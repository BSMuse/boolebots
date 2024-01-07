import React, { useState, useEffect } from 'react';
import IntroModal from './IntroModal'; 

function IntroModalWrapper() {
  const [introModalLoaded, setIntroModalLoaded] = useState(false);

  useEffect(() => {
      setIntroModalLoaded(true);
  }, []);

  return (
    <>
      {introModalLoaded && <IntroModal />}
    </>
  );
}

export default IntroModalWrapper;