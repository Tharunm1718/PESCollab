import { useState } from 'react';
import Header from './Header';
import { GlobalEffects } from './useInteractiveEffects'; //
import DropZone from "./DropZone.jsx";
import FileList from "./FileList.jsx";
import { useNavigate } from 'react-router-dom';

function CreateProjectSection() {
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
    if (!projectName || !description) {
      alert("Please fill in the project name and description.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', projectName);
      formData.append('description', description);

      selectedFiles.forEach((file) => {
        formData.append('files', file); 
      });

      const response = await fetch("http://localhost:3000/createproject", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        setProjectName("");
        setDescription("");
        setSelectedFiles([]);
        alert("Project created successfully!");
        navigate("/yourprojects");
      } else {
        alert("Error: " + result.message);
      }

    } catch (error) {
      console.error("Error creating project:", error);
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
          <label className="form-label">Enter Project Issue</label>
          <textarea
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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