import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Divider,
  Textarea,
  Image,
  ButtonGroup,
} from "@chakra-ui/react";
import ForumGuideline from "../ForumGuideline";
import PersonalNavigator from "../PersonalNavigator";
import ButtonGroupComponent from "../ButtonGroupComponent";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";
// import colors from "./Colors";
// import Tabs from "./CommunityForum/TabComponent/Tabs";

function PostTab() {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [tags, setTags] = useState([]);
  // const [postImage, setPostImage] = useState();
  // const [imageUrls, setImageUrl] = useState([]);

  const therapistData = localStorage.getItem("therapist");
  // Parse the retrieved string back into an object
  const [therapistLocal, setTherapistLocal] = useState(
    JSON.parse(therapistData)
  );
  const [therapistId, setTherapistId] = useState(therapistLocal._id);
  console.log("therapist id: ", therapistId);

  // console.log("THERAPIST LOCAL: ", therapistLocal);
  const [postData, setPostData] = useState({
    title: postTitle,
    body: postBody,
    therapistId: therapistId,
    // tags: postTags,
  });
  const postTags = useSelector((state) => {
    return state.postTags.value;
  });
  console.log("post tags from sotre: ", postTags);

  // const therapistQuery = useQuery(
  //   ["therapist", therapistLocal._id],
  //   async () => {
  //     // You can make an axios request to fetch the therapist data based on therapistLocal._id
  //     const response = await axios.get(`/therapist/${therapistLocal._id}`);
  //     return response.data; // Assuming the response contains therapist data
  //   }
  // );
  // const therapistQuery = useQuery({
  //   queryKey: [therapistLocal._id],
  //   queryFn: () => wait(1000).then(() => therapistLocal._id),
  // });
  const uploadData = () => {
    setPostData({
      title: postTitle,
      body: postBody,
      therapistId: therapistId,
      tags: postTags,
    });
    console.log("post data: ", postData);
  };

  useEffect(() => {
    try {
      console.log("post data: ", postData);
      const response = axios.post("/posts", postData);
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  }, [postData]);

  const handleTitle = (event) => {
    setPostTitle(event.target.value);
    console.log("title: ", postTitle);
  };

  const handleBody = (event) => {
    setPostBody(event.target.value);
    console.log("body: ", postBody);
  };

  return (
    <div className="forum">
      <div className="ask-question">
        <h2
          style={{
            fontSize: "large",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Ask Question
        </h2>
        <Input
          placeholder="Title"
          size="sm"
          onChange={handleTitle}
          value={postTitle}
        />
        <Textarea
          placeholder="Post Body"
          size="lg"
          onChange={handleBody}
          value={postBody}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
        />
        <ButtonGroup gap="4">
          {/* <p>hello</p>
          {postTags.map((tag, id) => {
            console.log("tag: ", tag);
            console.log("button tag: ", tag.buttonTag);
          return (
          <Button colorScheme={tag.buttonColor} key={id}>
            {tag.buttonTag}
          </Button>
          ); })} */}
        </ButtonGroup>
        <ButtonGroupComponent />
        <Divider className="divider" />
        <div className="button-container">
          <Button onClick={uploadData} colorScheme="green" size="sm">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostTab;
