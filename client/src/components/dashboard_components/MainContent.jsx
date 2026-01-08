import React from 'react';
import Header from './Header';
import BentoGrid from './BentoGrid';
import { GlobalEffects } from './useInteractiveEffects';


const MainContent = () => {
  return (
    <div className="right-section">
      <div className="rectangle-bg">
        <GlobalEffects />
        <div className="divider-line"></div>
        <Header title="HOME" />
        <BentoGrid />
      </div>
    </div>
  );
};

export default MainContent;