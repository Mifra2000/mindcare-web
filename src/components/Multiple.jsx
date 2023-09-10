import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik"; // Add Field import
import { Box, Button} from "@chakra-ui/react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../utils/firebase";
import { v4 } from "uuid";

export default function Signup() {
  const [imageUploads, setImageUploads] = useState([]);
  const [imageUrl, setImageUrls] = useState([]);

  const imageListRef = ref(storage, "Therapist/documents/");

  const uploadFiles = (setFieldValue) => { // Pass setFieldValue as a parameter
    if (imageUploads.length === 0) return;

    const uploadPromises = [];
    const downloadURLs = [];

    for (let i = 0; i < imageUploads.length; i++) {
      const imageUpload = imageUploads[i];
      const imageRef = ref(
        storage,
        `Therapist/documents/${imageUpload.name + v4()}`
      );

      const uploadPromise = uploadBytes(imageRef, imageUpload)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((url) => {
          downloadURLs.push(url);
          console.log("Image upload success!");
          setFieldValue("downloadURL", downloadURLs); // Set the formik value
        })
        .catch((error) => {
          console.error("Image upload error:", error);
        });
      uploadPromises.push(uploadPromise);
    }

    Promise.allSettled (uploadPromises).then(() => {
      setImageUrls(downloadURLs);      
    });
  };

  useEffect(() => {
    listAll(imageListRef)
      .then((response) => {
        const latestItems = response.items.slice(-5); // Get the last 5 items
        const downloadURLPromises = latestItems.map((item) =>
          getDownloadURL(item)
        );
        return Promise.all(downloadURLPromises);
      })
      .then((urls) => {
        setImageUrls(urls); // Set the image URLs of the last 5 items
      })
      .catch((error) => {
        console.error("Image download error:", error);
      });
  }, []);
  function handleSubmit(values, { resetForm }) {
    console.log("entered values are", values);
    // resetForm();
  }
  return (
    <Formik
      initialValues={{
        downloadURL: [] // Add the initial value for the downloadURL
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <Box>
            <Field
              type="file"
              name="imageUploads"
              multiple
              onChange={(event) => {
                const files = event.target.files;
                setImageUploads(files);
              }}
            />
          </Box>
          <Box>
            <Button type="button" onClick={() => uploadFiles(setFieldValue)}>
              Upload Files
            </Button>
            <Button type="submit">
              Submit
            </Button>
          </Box>          
        </Form>
      )}
    </Formik>
  );
}
