import { Download } from "lucide-react"

const Card = ({ title, description, language, views, contributors, handshakeIcon, downloadIcon, onClick, mode, id }) => {

  const handleDownloadClick = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to download this project.");
      return;
    }
    try {
      const response = await fetch(
        ` http://localhost:3000/project/${id}/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        alert("Failed to download project files.");
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `project-${id}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("An error occurred while downloading project files.");
    }
  };

  return (
    <div className="project-card" onClick={onClick}>
      <div className="card-header">
        <h3 className="card-title" title={title}>{mode === "teammates" ? `${title} Team` : title}</h3>
        {mode !== "teammates" &&
          <a
            href="#"
            className="card-download-btn"
            onClick={handleDownloadClick}
            onMouseDown={(e) => e.stopPropagation()}
          >

            <Download className="download-icon" />
            <span>Download</span>
          </a>
        }


      </div>

      <p className="card-description" title={description}>
        {description || 'No description available'}
      </p>

      <div className="card-footer">
        {language && (
          <div className="card-stat">
            <div className="language-indicator"></div>
            <span>{language}</span>
          </div>
        )}
        <div className="card-stat">
          <span>{views || 0} views</span>
        </div>
        <div className="card-stat">
          {handshakeIcon && (
            <img src={handshakeIcon} alt="Contributors" className="stat-icon" />
          )}
          <span>{contributors || 0} Contributors</span>
        </div>
      </div>
    </div >
  );
};

export default Card;
