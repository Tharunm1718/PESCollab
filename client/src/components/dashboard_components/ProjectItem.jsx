import { useNavigate } from 'react-router-dom';
import { ProjectIcon } from './Icons'; 

const ProjectItem = ({ project_id, repoName, views, contributors, mode }) => {
  const navigate = useNavigate();
 function handleOpenProject() {
  {mode==="PROJECTS" ? navigate(`/projects/${ project_id}`) : mode==="USER_PROJECTS" ? navigate(`/projects/${ project_id}`) : navigate(`/profileview/${ project_id}`)}
  }

  return (
    <div className="project-card-item">
      <div className="project-card-row">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', minWidth: 0, flex: 1 }}>
          <ProjectIcon />
          <div className="list-text-content">
            <p className="list-repo-name">{repoName}</p>
            <div className="list-stats">
              <span className="text-secondary font-keylinx" style={mode === "MEMBERS" ? { fontFamily: "Inter" , fontSize:"14px" , fontWeight:"bold"} : {}}>{mode === "MEMBERS" ? `${views}` : `${views} views`}</span>
              <div className="list-stat-item">
                <svg className="stat-icon" viewBox="0 0 20 17" fill="currentColor">
                  <path d="M10.1062 2.73922L7.08125 5.18922...Z" />
                </svg>
                <span className="text-secondary font-keylinx">{mode === "MEMBERS" ? `${contributors}` : `${contributors} Contributors`}</span>
              </div>
            </div>
          </div>
        </div>
        <button className="open-project-btn" onClick={handleOpenProject}>{mode ==="MEMBERS" ? `view profile` : `Open Project`}</button>
      </div>
    </div>
  );
};

export default ProjectItem;