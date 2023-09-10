import React, { useState } from "react";
import PostTab from "./PostTab";
import ImageTab from "./ImageTab";
import ForumGuideline from "../ForumGuideline";
import PersonalNavigator from "../PersonalNavigator";

function Tabs() {
  const [activeTab, setActiveTab] = useState("Post Tab");
  const handlePostTab = () => {
    setActiveTab("Post Tab");
  };

  const handleImageTab = () => {
    setActiveTab("Image Tab");
  };
  return (
    <div className="forum">
      <ForumGuideline />
      <div className="tabs">
        <ul className="nav">
          <li
            className={activeTab === "Post Tab" ? "active" : ""}
            onClick={handlePostTab}
          >
            Post
          </li>
          <li
            className={activeTab === "Image Tab" ? "active" : ""}
            onClick={handleImageTab}
          >
            Image
          </li>
        </ul>
        <div className="outlet">
          {activeTab === "Post Tab" ? <PostTab /> : <ImageTab />}
        </div>
      </div>
      <PersonalNavigator />
    </div>
  );
}

export default Tabs;
