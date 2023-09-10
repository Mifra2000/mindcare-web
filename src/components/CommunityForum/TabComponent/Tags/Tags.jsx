import React from "react";

// import { ButtonGroup, Button} from "@chakra-ui/react";

function Tags() {
  return (
    <div className="button-group">
      <h6>Filter by tags</h6>

      <button className="button">Featured</button>
      <button className="button">Recent</button>
      <button className="button">Trending</button>
    </div>
  );
}

export default Tags;
