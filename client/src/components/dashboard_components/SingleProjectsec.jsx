import { useParams } from "react-router-dom";
import Header from "./Header";
import FileList from "./FileList";
import { useEffect, useState } from "react";
import Loader from "../Loader";

function SingleProjectSection({ title }) {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [Contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          ` https://pes-collab-3jcl.vercel.app/projectfiles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          credentials: "include"
        }
        );

        const data = await response.json();

        if (data.success) {
          setProject(data.project);
          setFiles(data.files);
          setContributions(data.contributions);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProjectDetails();
  }, [id]);

  if (loading || !project) {
    return (
      <div className="right-section">
        <div className="rectangle-bg">
          <Loader size="medium" />
        </div>
      </div>
    );
  }

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
          title={title}
          subtitle="Issues and Contributions"
          description={project.description}
          project_id={id}
        />
      </div>
    </div>
  );
}

export default SingleProjectSection;
