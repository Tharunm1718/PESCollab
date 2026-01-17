import React from 'react';
import { useInteractiveCard } from './useInteractiveEffects';
import { Navigate, useNavigate } from "react-router-dom"; 

const InfoCard = ({ title, cardContainerClass, cardClass, children }) => {
  const navigate = useNavigate(); 
  const cardRef = useInteractiveCard();

  const handleViewAll = () => {
    title === "Your PROJECTS" ? navigate('/yourprojects') : null;
  }

  return (
    
    <div className={`interactive-container ${cardContainerClass}`} ref={cardRef}> 
    
      <div className={`glass-card ${cardClass}`}>
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">{title}</h3>
            <button className="view-all-btn" onClick={handleViewAll}>View All</button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;