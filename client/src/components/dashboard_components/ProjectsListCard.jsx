import React from 'react';
import ProjectItem from './ProjectItem';
import { useInteractiveCard } from './useInteractiveEffects'; // <-- 1. Import

const ProjectsListCard = ({ projects }) => {
  const cardRef = useInteractiveCard(); // <-- 2. Call hook

  return (
    // 3. Attach ref
    <div className="interactive-container card-container-4" ref={cardRef}>
      <div className="glass-card card-4">
        <div className="card-content">
          <div className="card-header">
            <h3 className="card-title">PROJECTS</h3>
            <button className="view-all-btn" style={{ padding: '6px 20px' }}>View All</button>
          </div>
          {projects.map((project, index) => (
            <ProjectItem
              key={index}
              repoName={project.repoName}
              views={project.views}
              contributors={project.contributors}
              mode={"PROJECTS"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsListCard;