import React from 'react';

const LeaderboardItem = ({ rank, name, score }) => {
  return (
    <div className="leaderboard-item">
      <div className="rank-dot">
        <div className="rank-dot-inner"></div>
      </div>
      <span className="rank-number">{rank.toString().padStart(2, '0')}</span>
      <div className="leaderboard-avatar-container">
        <svg className="leaderboard-avatar-icon" viewBox="0 0 17 17" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M4.85417 3.94269C4.85417 2.97576 5.23828 2.04843 5.92201 1.3647C6.60573 0.680973 7.53306 0.29686 8.5 0.29686C9.46694 0.29686 10.3943 0.680973 11.078 1.3647C11.7617 2.04843 12.1458 2.97576 12.1458 3.94269C12.1458 4.90963 11.7617 5.83696 11.078 6.52069C10.3943 7.20441 9.46694 7.58853 8.5 7.58853C7.53306 7.58853 6.60573 7.20441 5.92201 6.52069C5.23828 5.83696 4.85417 4.90963 4.85417 3.94269ZM4.85417 9.41144C3.6455 9.41144 2.48633 9.89158 1.63167 10.7462C0.777017 11.6009 0.296875 12.7601 0.296875 13.9687C0.296875 14.6939 0.58496 15.3894 1.09775 15.9022C1.61055 16.415 2.30605 16.7031 3.03125 16.7031H13.9688C14.694 16.7031 15.3895 16.415 15.9022 15.9022C16.415 15.3894 16.7031 14.6939 16.7031 13.9687C16.7031 12.7601 16.223 11.6009 15.3683 10.7462C14.5137 9.89158 13.3545 9.41144 12.1458 9.41144H4.85417Z" />
        </svg>
      </div>
      <span className="leaderboard-name">{name}</span>
      <div className="leaderboard-stats">
        <div className="leaderboard-count">{score}</div>
        <div className="leaderboard-label">Contributions</div>
      </div>
    </div>
  );
};

export default LeaderboardItem;