import { useNavigate } from 'react-router-dom';
import TeammateItem from './TeammateItem';
import { useInteractiveCard } from './useInteractiveEffects'; 

const TeammatesCard = ({ teammates }) => {
  const navigate = useNavigate();
  const cardRef = useInteractiveCard(); 

  return (
    // 3. Attach ref
    <div className="interactive-container card-container-1" ref={cardRef}>
      <div className="glass-card card-1">
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">Your Teammates</h3>
            <button className="view-all-btn" onClick={() => navigate('/teammates')}>View All</button>
          </div>
          <div className="teammate-list">
            {teammates.map((mate, index) => (
              <TeammateItem key={index} name={mate.name} email={mate.email} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeammatesCard;