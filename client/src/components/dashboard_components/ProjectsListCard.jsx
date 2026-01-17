import { useNavigate } from 'react-router-dom';
import ProjectItem from './ProjectItem';
import { useInteractiveCard } from './useInteractiveEffects'; // <-- 1. Import

const ProjectsListCard = ({ projects ,contributioncount}) => {
  const navigate = useNavigate();
  const cardRef = useInteractiveCard(); 

  return (
    // 3. Attach ref
    <div className="interactive-container card-container-4" ref={cardRef}>
      <div className="glass-card card-4">
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">PROJECTS</h3>
            <button className="view-all-btn" style={{ padding: '6px 20px' }} onClick={() => navigate('/community')}>View All</button>
          </div>
          {projects.map((project, index) => (
            <ProjectItem
              key={index}
              project_id={project.id}
              repoName={project.title}
              views={project.views || 0}
              mode={"PROJECTS"}
              contributors={contributioncount[project.id] || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsListCard;