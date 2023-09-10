import React, { useState, useEffect } from "react";
import { Input, Button, Divider, Textarea, Image } from "@chakra-ui/react";
import ForumGuideline from "./CommunityForum/ForumGuideline";
import PersonalNavigator from "./CommunityForum/PersonalNavigator";
import ButtonGroupComponent from "./CommunityForum/ButtonGroupComponent";
import { storage } from "../utils/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import colors from "./Colors";
import Tabs from "./CommunityForum/TabComponent/Tabs";

function PostQuestion() {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postImage, setPostImage] = useState();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrl] = useState([]);

  // const [imageListRef, setImageListRef] = useState([]);
  // try {
  // setImageListRef(ref(storage, "Therapist/forum/"));
  // } catch (error) {
  // console.error("Error creating imageListRef:", error);
  // }

  const [postData, setPostData] = useState({
    title: postTitle,
    body: postBody,
  });

  const uploadData = () => {
    setPostData({
      title: postTitle,
      body: postBody,
    });
    console.log("post data: ", postData);
  };

  useEffect(() => {
    console.log("post data - useeffect: ", postData);
  }, [postData]);

  const handleTitle = (event) => {
    setPostTitle(event.target.value);
    console.log("title: ", postTitle);
  };

  const handleBody = (event) => {
    setPostBody(event.target.value);
    console.log("body: ", postBody);
  };
  const imageListRef = ref(storage, "Therapist/forum/");

  const uploadFile = () => {
    console.log("inside uploadFile");
    if (imageUpload == null) return;
    console.log("ffffff");
    const imageRef = ref(storage, `Therapist/forum/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        // setFieldValue('picture',url)
        console.log("Image upload success!");
      });
    });
  };
  return (
    <div className="forum">
      <ForumGuideline />
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
        <Tabs />

        <Input
          placeholder="Title"
          size="sm"
          onChange={handleTitle}
          value={postTitle}
        />
        <Image
          src={imageUrls}
          width={"120px"}
          height={"120px"}
          borderRadius={"50%"}
          border={"1px solid black"}
        ></Image>
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
            values.picture = imageUrls;
          }}
        />

        <Textarea
          placeholder="Post Body"
          // size="lg"
          // onChange={handleBody}
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
            // value  s.picture = imageUrls;
          }}
          value={postBody}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
        />
        <ButtonGroupComponent />
        <Divider className="divider" />
        <div className="button-container">
          <Button onClick={uploadFile} colorScheme="green" size="sm">
            Add Image
          </Button>
          <Button onClick={uploadData} colorScheme="green" size="sm">
            Post
          </Button>
        </div>
      </div>

      <PersonalNavigator />
    </div>
  );
}

export default PostQuestion;
