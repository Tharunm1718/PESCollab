import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-container">
      <div className="search-bg"></div>
      <input type="text" className="search-input" placeholder="Search Projects..." />
      <button className="search-icon-bg">
        <svg className="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;