import React, { useState } from "react";

export default function TabSwitcher({ tabs = ["Tab 1", "Tab 2"], defaultTab = 0, onChange }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };

  const sliderStyle = {
    left: activeTab === 0 ? "10px" : "calc(100% - 188px)",
  };

  return (
    <div className="tab-switcher-wrapper">
      <div className="tab-container">
        <div className="tab-slider" style={sliderStyle} />
        <div className="tab-buttons-layout">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => handleTabClick(index)}
              className={`tab-button ${activeTab === index ? "active" : "inactive"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}