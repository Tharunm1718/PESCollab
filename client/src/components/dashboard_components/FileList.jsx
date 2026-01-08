import FileItem from "./FileItem.jsx";
import { useInteractiveCard } from "./useInteractiveEffects";

export default function FileList({
  files = [],
  onRemoveFile,
  title,
  subtitle,
  description,
}) {
  const cardRef = useInteractiveCard();

  const normalizedItems = files.map((item) => {
    if (subtitle === "Issues and Contributions") {
      return {
        label: item.title,        
        downloadId: item.id, 
        contributorName: item.students?.name,
        contributorEmail: item.students?.email 
      };
    }

    return {
      label: item.name || item,  
    };
  });

  return (
    <div className="file-list-section">
      {subtitle === "Selected Files" ? (
        <h2 className="file-list-heading">Uploaded Files</h2>
      ) : (
        <div style={{ marginTop: "2vh" }} />
      )}

      <div className="interactive-container" ref={cardRef}>
        <div className="file-list-container glass-card">
          {subtitle === "Project Files" && (
            <p className="file-list-subheading">Project Files</p>
          )}

          {subtitle === "Issues and Contributions" && (
            <>
              <div className="IssuesSection">
                <p className="file-list-subheading">
                  Issues and Contributions
                </p>
                {description && (
                  <p className="description">{description}</p>
                )}
              </div>
              <div className="divider_line" />
              <p className="attachments">Attachments</p>
            </>
          )}

          {normalizedItems.length === 0 ? (
            <div id="no-files-placeholder">
              <p>No items available</p>
            </div>
          ) : (
            normalizedItems.map((item, index) => (
              <FileItem
                key={index}
                label={item.label}
                downloadId={item.downloadId}
                subtitle={subtitle}
                title={title}
                contributorName={item.contributorName}
                contributorEmail={item.contributorEmail}
                onDelete={
                  onRemoveFile ? () => onRemoveFile(index) : undefined
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
