import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useInteractiveCard } from './useInteractiveEffects';

export default function DropZone({ onFilesAdded }) {
  const fileInputRef = useRef(null);
  const cardRef = useInteractiveCard();
  const [isDragging, setIsDragging] = useState(false);


  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      onFilesAdded(selectedFiles);
      setTimeout(() => {
        fileInputRef.current.value = "";
      }, 0);

    }
  };

  const handleAddFilesClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      onFilesAdded(droppedFiles);
    }
  };

  return (

    <div className="interactive-container" ref={cardRef}>
      <div
        className={`drop-zone glass-card ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="drop-zone-content">
          <p className="drop-zone-text">DRAG AND DROP THE FILES HERE</p>
          <div>
            <input
              type="file"
              multiple
              className="hidden-input"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <button
              type="button"
              className="btn btn-sm btn-gradient"
              onClick={handleAddFilesClick}
            >
              <Upload className="btn-icon-sm" />
              Add Files
            </button>
          </div>
        </div>

        {isDragging && (
          <div className="drop-zone-overlay" style={{ display: 'flex' }}>
            <p>Drop files here</p>
          </div>
        )}
      </div>
    </div>
  );
}