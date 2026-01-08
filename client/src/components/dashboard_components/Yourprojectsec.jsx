import Header from './Header';
import { GlobalEffects } from './useInteractiveEffects';
import CardGrid from './CardGrid';
import { Navigate, useNavigate } from "react-router-dom";
const YourProjectSection = () => {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate("/uploadproject");
  };

  return (
    <div className="right-section">
      <div className="rectangle-bg">
        <GlobalEffects />    
        <div className="divider-line"></div>
        <Header title="YOUR PROJECTS" />
        <div className="sub-header">
          <input type="text" placeholder="Search Projects..." className="search-bar" />
          <button className="create-button" onClick={handleCreateProject}>Create Project</button>
        </div>
        <CardGrid />
      </div>
    </div>
  );
};

export default YourProjectSection;