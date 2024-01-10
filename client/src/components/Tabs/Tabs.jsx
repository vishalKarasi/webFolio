import React, { useState } from "react";
import "./tabs.scss";
import { Link } from "react-router-dom";

function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const activeContent = tabs.find((tab) => tab.label === activeTab)?.content;

  return (
    <>
      <nav className="tabs">
        {tabs.map((tab) => (
          <Link key={tab.label} onClick={() => setActiveTab(tab.label)}>
            {tab.icon}
            <label>{tab.label}</label>
          </Link>
        ))}
      </nav>
      {activeContent && (
        <section className={`${activeTab}`}>{activeContent}</section>
      )}
    </>
  );
}

export default Tabs;
