import React from 'react';
import LeaderboardItem from './LeaderboardItem';
import { useInteractiveCard } from './useInteractiveEffects'; // <-- 1. Import

const LeaderboardCard = ({ leaders }) => {
  const cardRef = useInteractiveCard(); // <-- 2. Call hook

  return (
    // 3. Attach ref
    <div className="interactive-container card-container-3" ref={cardRef}>
      <div className="glass-card card-3 leaderboard-container">
        <h3 className="card-title leaderboard-title">LEADER BOARD</h3>
        <div className="leaderboard-list">
         { /* leaders.map((leader) => (
            <LeaderboardItem key={leader.rank} rank={leader.rank} name={leader.name} score={leader.score} />
          )) */ }
          <p className='update-message'> Leader board will be updated soon</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;