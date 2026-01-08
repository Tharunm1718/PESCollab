import { useParams } from "react-router-dom";
import Header from "./Header";
import FileList from "./FileList";
import { useEffect, useState } from "react";

function SingleProjectSection() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [Contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/projectfiles/${id}`,
          { credentials: "include" }
        );

        const data = await response.json();

        if (data.success) {
          setProject(data.project);
          setFiles(data.files);
          setContributions(data.contributions);
        }
        console.log("Fetched project data:", data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (id) fetchProjectDetails();
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div className="right-section">
      <div className="rectangle-bg">
        <Header title="PROJECT DETAILS" />
        <div className="divider-line"></div>
        <div className="project-info">
          <p className="project-title">{project.title}</p>
        </div>
        <FileList
          files={files}
          subtitle="Project Files"
        />

        <FileList
          files={Contributions}
          subtitle="Issues and Contributions"
          description={project.description}
        />
      </div>
    </div>
  );
}

export default SingleProjectSection;
