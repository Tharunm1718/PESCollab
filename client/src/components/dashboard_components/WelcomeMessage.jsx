import React from 'react';

const WelcomeMessage = ({ name }) => {
  return (
    <div className="welcome-text">
      <div className="text-hello">hello!!</div>
      <div className="text-name">{name}</div>
    </div>
  );
};

export default WelcomeMessage;