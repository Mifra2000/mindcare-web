import React, { useState, useEffect } from "react";
import { Button, Image, SimpleGrid, Box } from "@chakra-ui/react";
import { storage } from "../../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function ImageTab() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrl] = useState([]);

  const imageListRef = ref(storage, "Therapist/forum/");

  const uploadFile = () => {
    console.log("inside uploadFile");
    if (imageUpload == null) return;
    console.log("ffffff");
    const imageRef = ref(storage, `Therapist/forum/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        console.log("Image upload success!");
      });
    });
  };

  return (
    <>
      <div className="image-tab">
        {/* <SimpleGrid columns={2} spacing={10}>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
        </SimpleGrid> */}
        <Image className="image" src={imageUrls}></Image>
      </div>
      <div className="image-input-button">
        <input
          className="image-tab-input"
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <Button onClick={uploadFile} colorScheme="green">
          Upload
        </Button>
      </div>
    </>
  );
}

export default ImageTab;
