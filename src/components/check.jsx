import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";
import { Box, Button } from "@chakra-ui/react";
import { v4 } from "uuid";
import * as Yup from "yup";

function ExampleForm() {
  const [imageUploads, setImageUploads] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleSubmit = async (values) => {
    const downloadURLs = [];

    // Upload files
    for (let i = 0; i < imageUploads.length; i++) {
      const imageUpload = imageUploads[i];
      const imageRef = ref(
        storage,
        `Therapist/documents/${imageUpload.name + v4()}`
      );

      await uploadBytes(imageRef, imageUpload)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((url) => {
          downloadURLs.push(url);
          console.log("Image upload success!");
        })
        .catch((error) => {
          console.error("Image upload error:", error);
        });
    }

    // Submit form data with image URLs
    values.downloadURL = downloadURLs;
    console.log("Submitting form data:", values);
    console.log("Image URLs:", downloadURLs);
  };

  const initialValues = { downloadURL: [] };

  const validationSchema = Yup.object({
    imageUploads: Yup.array()
      .min(1, "Please upload at least one file.")
      .required("Please upload at least one file."),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
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
            <ErrorMessage name="imageUploads">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
          </Box>
          <Box>
            <Button type="submit" size={"md"}>
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default ExampleForm;
