import { useInteractiveCard } from "./useInteractiveEffects";
import ProjectItem from "./ProjectItem";

function CommunityFileList({ mode, data }) {
  const cardRef = useInteractiveCard();

  return (
    <div className="interactive-container" ref={cardRef}>
      <div className="file-list-container-2 glass-card community-filelist" style={mode === "USER_PROJECTS" ? { minHeight: "55vh", maxHeight: "55vh" } : {}}>
        {mode === "USER_PROJECTS" ? <p className="file-list-subheading">My Projects</p> : <p className="file-list-subheading">PES COMMUNITY</p>}

        {mode === "USER_PROJECTS" &&
          data.projects.map((project) => (
            <ProjectItem
              key={project.id}
              project_id={project.id}
              repoName={project.title}
              views={project.views || 0}
              contributors={
                data.contributionCounts[project.id] || 0
              }
              mode={mode}
            />
          ))}

        {mode === "PROJECTS" && 
          data.projects.map((project) => (
            <ProjectItem
              key={project.id}
              project_id={project.id}
              repoName={project.title}
              views={project.views || 0}
              contributors={
                data.contributionCounts[project.id] || 0
              }
              mode={mode}
              name={project.students.name}
            />
          ))}

        {mode === "MEMBERS" &&
          data.members.map((member) => (
            <ProjectItem
              key={member.usn || member.id}
              project_id={member.usn || member.id}
              repoName={member.name}
              views={member.email}
              contributors={member.usn}
              mode={mode}
            />
          ))}
      </div>
    </div>
  );
}

export default CommunityFileList;
