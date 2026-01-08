import React from 'react';

const ListItem = ({ repoName, views, contributors, children }) => {
  return (
    <div className="list-item">
      {children} {/* Renders the icon passed to it */}
      <div className="list-text-content">
        <p className="list-repo-name">{repoName}</p>
        <div className="list-stats">
          <span className="text-secondary font-keylinx">{views} views</span>
          <div className="list-stat-item">
            <svg className="stat-icon" viewBox="0 0 20 17" fill="currentColor">
              {/* SVG path for the small contributors icon */}
              <path d="M10.1062 2.73922L7.08125 5.18922...Z" />
            </svg>
            <span className="text-secondary font-keylinx">{contributors} Contributors</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;