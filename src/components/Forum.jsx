import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonalNavigator from "./CommunityForum/PersonalNavigator";
import ForumTagsBar from "./CommunityForum/ForumTagsBar";
import Post from "./CommunityForum/Post";

import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";

function Forum() {
  const [searchPost, setSearchPost] = useState("");

  return (
    <div className="forum">
      <ForumTagsBar />
      <div className="forum-posts-container">
        <div className="link-search">
          <div>
            <Link to="/tabs" className="post-link">
              Post a Question +
            </Link>
          </div>

          <InputGroup borderRadius={5} width={60} size="sm">
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.600" />}
            />
            <Input
              type="text"
              placeholder="Search posts"
              border="1px solid #949494"
              value={searchPost}
              onChange={(e) => {
                var lowerCase = e.target.value.toLowerCase();
                setSearchPost(lowerCase);
              }}
            />
          </InputGroup>
        </div>
        <Post />
      </div>

      <PersonalNavigator />
    </div>
  );
}

export default Forum;
