import React from "react";
import Tags from "./TabComponent/Tags/Tags";
import ActivityTags from "./TabComponent/Tags/ActivityTags";
import DateTags from "./TabComponent/Tags/DateTags";
function ForumTagsBar() {
  return (
    <div className="forum-guidelines">
      <h2>Forum</h2>
      <Tags />
      <ActivityTags />
      <DateTags />
    </div>
  );
}

export default ForumTagsBar;
