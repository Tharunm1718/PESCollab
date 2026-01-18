import { useState } from 'react';
import Header from './Header';
import { GlobalEffects } from './useInteractiveEffects'; //
import DropZone from "./DropZone.jsx";
import FileList from "./FileList.jsx";
import { useNavigate } from 'react-router-dom';

function CreateProjectSection({ mode, projectId }) {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");


  const handleFilesAdded = (newFiles) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleCreateProject = async () => {
    if (mode !== "Contribute" && (!projectName || !description)) {
      alert("Please fill in the project name and description.");
      return;
    }
    else if (mode === "Contribute" && !projectName) {
      alert("Please fill in the project name.");
      return;
    }

    try {
      const formData = new FormData();
      const token = localStorage.getItem("token");

      if (mode === "Contribute") {
        formData.append("title", projectName);
      } else {
        formData.append("title", projectName);
        formData.append("description", description);
      }

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      let response;

      if (mode !== "Contribute") {
        response = await fetch(" http://localhost:3000/createproject", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData,
          credentials: "include",
        });
      } else {
        response = await fetch(
          ` http://localhost:3000/contribute/${projectId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: formData,
            credentials: "include",
          }
        );
      }

      const result = await response.json();

      if (result.success) {
        setProjectName("");
        setDescription("");
        setSelectedFiles([]);

        alert(
          mode === "Contribute"
            ? "Contribution submitted successfully!"
            : "Project created successfully!"
        );

        navigate("/yourprojects");
      } else {
        alert("Error: " + result.message);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };


  return (
    <div className="right-section">
      <div className="rectangle-bg">
        <GlobalEffects />

        <Header title="YOUR PROJECTS" />
        <div className="divider-line"></div>

        <div className="form-group">
          <label className="form-label">Enter Your Project Name</label>
          <input
            type="text"
            className="form-input"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          {mode === "Contribute" ? null : <>
            <label className="form-label">Enter Project Issue</label>
            <textarea
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            /></>}
        </div>

        <DropZone onFilesAdded={handleFilesAdded} />

        <FileList files={selectedFiles} onRemoveFile={handleRemoveFile} title="CreateProjectSec" subtitle="Selected Files" />

        <div className="create-project-btn-container">
          <button
            className="create-project-btn btn-gradient"
            onClick={handleCreateProject}
            disabled={selectedFiles.length === 0}
          >
            Create Project
          </button>
          <button
            className="cancel-project-btn btn-destructive"
            onClick={() => {
              setProjectName("");
              setDescription("");
              setSelectedFiles([]);
              navigate("/yourprojects");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectSection;