// src/components/Card.jsx
import React from 'react';

const Card = ({ title, description, language, views, contributors, handshakeIcon, downloadIcon , onClick}) => {
  return (
    <div className="project-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <a href="#" className="card-download-btn">
          <img src={downloadIcon} alt="Download" className="download-icon" />
          <span>Download Project</span>
        </a>
      </div>

      <p className="card-description">{description}</p>

      <div className="card-footer">
        <div className="card-stat">
          <div className="language-indicator"></div>
          <span>{language}</span>
        </div>
        <div className="card-stat">
          <span>{views} views</span>
        </div>
        <div className="card-stat">
          <img src={handshakeIcon} alt="Contributors" className="stat-icon" />
          <span>{contributors} Contributors</span>
        </div>
      </div>
    </div>
  );
};

// Prop types remain the same

export default Card;