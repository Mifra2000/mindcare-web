import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { Table, Thead, Tbody, Tr, Th, Td, Button,FormErrorMessage,FormLabel,FormControl,Box } from "@chakra-ui/react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../utils/firebase";
import { v4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";

export default function ViewDocs() {
  const therapistData = localStorage.getItem('therapist');

  // Parse the retrieved string back into an object
  const therapist = JSON.parse(therapistData);
  const [imageUploads, setImageUploads] = useState([]);
  const [imageUrl, setImageUrls] = useState([therapist.downloadURL]);

  
    

  const deleteFile = (url) => {
    // Get the file name from the URL
    let fileName = url.split("/").pop();
    fileName = 'rating.pngb7c14ee7-2ee3-4427-92dc-b6d0d6b77b87'
    console.log(fileName)
    const afterDocuments = url.split('Therapist%2Fdocuments%2F')[1];

    // Extract substring after '?'
    const afterQuestionMark = afterDocuments.split('?')[0];
    console.log(afterQuestionMark)
    //rating.pngb7c14ee7-2ee3-4427-92dc-b6d0d6b77b87
    //Create a reference to the file
   const fileRef = ref(storage, `Therapist/documents/${afterQuestionMark}`);
    //Delete the file

    deleteObject(fileRef)
      .then(() => {
        console.log("File deleted successfully!");
        // Remove the URL from the state
        setImageUrls((prevUrls) =>
          prevUrls.filter((prevUrl) => prevUrl !== url)
        );
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });
  };

  const viewImage = (url) => {
    window.open(url, "_blank");
  };
  const uploadFiles = (setFieldValue) => {
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
          setFieldValue("downloadURL", downloadURLs);
        })
        .catch((error) => {
          console.error("Image upload error:", error);
        });
      uploadPromises.push(uploadPromise);
    }
    Promise.allSettled(uploadPromises).then(() => {
      setImageUrls(downloadURLs);
    });
  };

  useEffect(() => {
    const imageListRef = ref(storage, "Therapist/documents/");
    listAll(imageListRef, { timeCreated: "desc" })
      .then((response) => {
        const latestItems = response.items.slice(-5);
        const downloadURLPromises = latestItems.map((item) =>
          getDownloadURL(item)
        );
        return Promise.all(downloadURLPromises);
      })
      .then((urls) => {
        setImageUrls(urls);
      })
      .catch((error) => {
        console.error("Image download error:", error);
      });
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    Dateofbirth: new Date(),
    gender: "",
    picture: "",
    specialization: "",
    experience: "",
    SessionCharges: "",
    Start_DateTime: "",
    End_DateTime: "",
    downloadURL: ""
  };
  const validationSchema = Yup.object().shape({  
    downloadURL: Yup.array().min(1, "Required").required("Required"),
  });
  const handleSubmit =(values)=>{console.log(values)}
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>File Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {imageUrl.map((url, index) => {
            const fileName = decodeURIComponent(
              url.substring(url.lastIndexOf("/") + 1)
            );
            return (
              <Tr key={index}>
                <Td>{fileName}</Td>
                <Td display="flex" flexDirection="row">
                  <Button onClick={() => viewImage(url)} marginRight={'10px'}>View</Button>
                  <Button onClick={() => deleteFile(url)}>Delete</Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, setFieldValue, errors, touched }) => (
                <Form>
                                        <FormLabel style={{ marginRight: "50%" }}>
                        Upload Relevant Documents
                      </FormLabel>
                      <FormControl
                        style={{ display: "flex", alignItems: "center" }}
                        isInvalid={errors.downloadURL && touched.downloadURL}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
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
                          <div style={{ flexDirection: "column" }}>
                            <Button
                              type="button"
                              onClick={() => uploadFiles(setFieldValue)}
                            >
                              Upload Files
                            </Button>
                            <FormErrorMessage style={{ marginLeft: "30%" }}>
                              {errors.downloadURL}
                            </FormErrorMessage>
                          </div>
                        </div>
                      </FormControl>

                </Form>
              )}</Formik> 

    </>
  );
}
