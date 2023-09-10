import React, { useState } from "react";

function ActivityTags() {
  const [selectedButton, setSelectedButton] = useState(null);
  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };
  return (
    <div className="activity-tags">
      <h6>Filter by Activity</h6>

      <button
        className={`button ${selectedButton === "featured" ? "clicked" : ""}`}
        onClick={() => handleButtonClick("featured")}
      >
        Comments
      </button>
      <button className="button">Upvotes</button>
      <button className="button">Downvotes</button>
    </div>
  );
}

export default ActivityTags;
