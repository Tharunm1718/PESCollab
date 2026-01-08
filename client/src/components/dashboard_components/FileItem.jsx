import { Download, File, Trash2, GitCompareArrows } from "lucide-react";

export default function FileItem({
  label,
  onDelete,
  title,
  subtitle,
  downloadId,
  contributorName,
  contributorEmail,
}) {
  if (!label) return null;

  const handleDownload = () => {
    if (!downloadId) return;
    window.location.href =
      `http://localhost:3000/contributions/${downloadId}/download`;
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
                <span className="contributor-name">{contributorName}</span>
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