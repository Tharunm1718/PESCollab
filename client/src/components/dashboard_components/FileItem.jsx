import { Download, File, Trash2, GitCompareArrows } from "lucide-react";

export default function FileItem({
  label,
  onDelete,
  title,
  subtitle,
  downloadId,
  contributorName,
  contributorEmail,
  onProfileClick
}) {
  if (!label) return null;
  const handleDownload = async () => {
    if (!downloadId) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to download attachments.");
      return;
    }
    try {
      const response = await fetch(
        ` https://pes-collab-server.vercel.app/contributions/${downloadId}/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        alert("Failed to download attachments.");
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contribution-${downloadId}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("An error occurred while downloading attachments.");
    }
  };

  return (
    <div className="file-item">
      <div className="file-item-info">
        {subtitle === "Issues and Contributions" ? (
          <div className="contribution-file-content">
            <GitCompareArrows className="list-icon" />
            <div className="contribution-file">
              <p className="file-item-label">{label}</p>
              <div className="contributor-details">
                <span className="contributor-name" onClick={onProfileClick}>{contributorName}</span>
                <span className="contributor-email">Email: {contributorEmail}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="file-item-content">
            <File className="file-item-icon" />
            <p className="file-item-label">{label}</p>
          </div>
        )}
      </div>

      {title === "CreateProjectSec" ? (
        <button className="file-delete-btn" onClick={onDelete}>
          <Trash2 className="file-delete-btn-icon" />
        </button>
      ) : (
        subtitle === "Issues and Contributions" &&
        downloadId && (
          <button
            className="file-download-btn"
            onClick={handleDownload}
          >
            <Download className="file-download-btn-icon" />
            Download Attachments
          </button>
        )
      )}
    </div>
  );
}
