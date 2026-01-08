import React from 'react';
import { useInteractiveCard } from './useInteractiveEffects';
import { Navigate, useNavigate } from "react-router-dom"; 

const InfoCard = ({ title, cardContainerClass, cardClass, children }) => {
  const navigate = useNavigate(); 
  const cardRef = useInteractiveCard(); // <-- Use the hook

  return (
    // Attach the ref to the container
    <div className={`interactive-container ${cardContainerClass}`} ref={cardRef}> 
      <div className={`glass-card ${cardClass}`}>
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">{title}</h3>
            <button className="view-all-btn" onClick={() => navigate('/yourprojects')}>View All</button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;