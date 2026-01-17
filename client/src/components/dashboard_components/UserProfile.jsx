import React from 'react';
import { useInteractiveCard } from './useInteractiveEffects'; 
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ name }) => {
  const cardRef = useInteractiveCard(); 
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* 3. Attach ref to the button */}
      <button ref={cardRef} className="interactive-container" style={{ width: '64px', height: '64px', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }} onClick={() => navigate("/myprofile")}>
        <div className="glass-card card-6 flex-center">
          <svg className="text-primary" viewBox="0 0 24 24" fill="currentColor" style={{ width: '28px', height: '28px' }}>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </button>
      <div className="header-profile-name">{name}</div>
    </div>
  );
};

export default UserProfile;