import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  ButtonGroup,
  Button,
  Avatar,
  AvatarBadge,
  Link,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Comment from "../CommunityForum/Comment";
import SinglePost from "../CommunityForum/SinglePost";

function Post() {
  const therapistLocal = JSON.parse(localStorage.getItem("therapist"));
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    axios.get("/posts").then((response) => {
      console.log("post: ", response.data.data);
      setPostData(response.data.data);
      // initializeVoteStates(response.data.data);
    });
  }, []);

  return (
    <div>
      {postData.map((post) => {
        return <SinglePost key={post._id} post={post} />;
      })}
    </div>
  );
}

export default Post;
