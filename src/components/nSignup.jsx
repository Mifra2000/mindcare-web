//backend imports
import axios from 'axios';
import therapistBaseurl from "../utils/axios";
//front end imports
import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import colors from "./Colors";
import {
  Box,
  Flex,
  Alert,
  AlertIcon,
  Text,
  Select,
  Button,
  Stack,useToast,
  FormErrorMessage,
  Image, Grid, GridItem,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../utils/firebase";
import { v4 } from "uuid";
import Multiple from "./Multiple";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Signup() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrl] = useState([]);
  const [imageUploads, setImageUploads] = useState([]);
  const [imageUrl, setImageUrls] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPreviousButton, setShowPreviousButton] = useState(false);

  const imageListRef = ref(storage, "Therapist/documents/");
  //for multiple pictures

  const uploadFiles = (setFieldValue) => {
    // Pass setFieldValue as a parameter
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
          // Set the formik value
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

  // const [multiplePictures, setmultiplePictures] = useState([]);
  const imagesListRef = ref(storage, "Therapist/picture/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `Therapist/picture/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        // setFieldValue('picture',url)
        console.log("Image upload success!");
      });
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
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      const latestItem = response.items[response.items.length - 1]; // Get the latest item
      getDownloadURL(latestItem).then((url) => {
        setImageUrl([url]); // Set the image URL of the latest item
      });
    });
  }, []);
  const [step, setStep] = useState(1);

  function nextStep() {
    setStep(step + 1);
  }

  function previousStep() {
    setStep(step - 1);
  }
  const toast = useToast();
  async function handleSubmit(values, { resetForm }) {
    console.log("entered values are", values);
    toast({
      title: "Signup form Submitted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // try {
    //   const response = await axios.post('/signup', values);
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
  }



  //validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    picture: Yup.array().required("Required"),
    // Dateofbirth: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    specialization: Yup.string().required("Specialization Field is required"),
    experience: Yup.string().required("Experience is required"),
    downloadURL: Yup.array().min(1, "Required").required("Required"),
  });
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
    downloadURL: [],
  }

  return (
    <>
      <Flex
        bg="white"
        align="center"
        justify="center"
        h="auto"
        paddingTop={"2%"}
        width={"100vw"}
      >
        <Stack marginBottom={"20"}>
          <Image
            src="src\assets\Images\brain.png"
            alt="Depression Image"
            height="75px"
            width="75px"
            marginTop={"0%"}
            marginLeft="48%"
          />
          <Text
            fontSize="32"
            fontWeight="700"
            style={{ textAlign: "center", marginTop: "1%", marginBottom: "1%" }}
          >
            Registration
          </Text>
          <Text style={{ textAlign: "center", marginBottom: "2%" }}>
            <span style={{ marginRight: "8px" }}>Already have an account?</span>
            <Link fontWeight="bold" to="/signin">
              Login
            </Link>
          </Text>
          <Box
            bg="white"
            p={6}
            rounded="md"
            w={'auto'}
            boxShadow={"lg"}
            height={"auto"}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            //isInitialValid={validationSchema.isValidSync(initialValues)}
            >
              {({ values, dirty, isValid, handleChange, setFieldValue, errors, touched, isSubmitting }) => (
                <Form>
                  <Grid templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)"
                  }} gap={6}>
                    <GridItem>
                      <VStack spacing={4} style={{ marginTop: "4%" }}>
                        {/* <Text style={{ fontSize: "30px", fontWeight: "500" }}>
                          Step 1
                        </Text> */}
                        <FormControl
                          isInvalid={errors.firstName && touched.firstName}
                          style={{ marginTop: "0%" }}
                        >
                          <FormLabel>First Name</FormLabel>
                          <Input
                            name="firstName"
                            value={values.firstName}
                            type="text"
                            onChange={handleChange}
                          />
                          <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={errors.lastName && touched.lastName}

                        >
                          <FormLabel>Last Name</FormLabel>
                          <Input
                            name="lastName"
                            type="text"
                            value={values.lastName}
                            onChange={handleChange}
                          />
                          <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.email && touched.email} >
                          <FormLabel>Email Address</FormLabel>
                          <Input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                          />
                          <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Date of Birth</FormLabel>
                          <DatePicker
                            selected={values.Dateofbirth}
                            dateFormat="MMMM d, yyyy"
                            className="form-control"
                            name="Dateofbirth"
                            onChange={(date) =>
                              setFieldValue(
                                "Dateofbirth",
                                date
                              )
                            }
                          />
                        </FormControl>

                      </VStack>
                    </GridItem>
                    <GridItem>
                      <VStack spacing={4}>
                        {/* <Text style={{ fontSize: "30px", fontWeight: "500" }}>
                          Step 2
                        </Text> */}

                        <Image
                          src={imageUrls}
                          width={"120px"}
                          height={"120px"}
                          borderRadius={"50%"}
                          border={"1px solid black"}
                        ></Image>
                        <FormControl
                          isInvalid={errors.picture && touched.picture}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Box>
                            <input
                              type="file"
                              accept="image/jpeg,image/jpg,image/png"
                              onChange={(event) => {
                                setImageUpload(event.target.files[0]);
                                values.picture = imageUrls;
                              }}
                            />
                          </Box>
                          <div style={{ flexDirection: "column" }}>

                            <Button
                              type="button"
                              size={'md'}
                              onClick={uploadFile}
                            >
                              Upload Image
                            </Button>
                            <FormErrorMessage marginLeft={'30%'}>{errors.picture}</FormErrorMessage>
                          </div>
                        </FormControl>
                        <FormControl
                          isInvalid={errors.password && touched.password}

                        >
                          <FormLabel>Password</FormLabel>
                          <Input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                          />
                          <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={!!(errors.confirmPassword && touched.confirmPassword)}
                        >
                          <FormLabel>Confirm Password</FormLabel>
                          <Input
                            type="password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                          />
                          <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                        </FormControl>

                      </VStack>
                    </GridItem>
                    <GridItem>
                      <VStack spacing={4} marginTop={'4%'}>
                        {/* <Text style={{ fontSize: "30px", fontWeight: "500" }}>
                          Step 3
                        </Text> */}

                        <FormControl isInvalid={errors.gender && touched.gender}>
                          <FormLabel>Gender</FormLabel>
                          <Field name="gender">
                            {({ field }) => (
                              <Select {...field}>
                                <option value="none">Select a Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Female">Other</option>
                              </Select>
                            )}
                          </Field>
                          <FormErrorMessage>{errors.gender}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={
                            errors.specialization && touched.specialization
                          }
                        >
                          <FormLabel>Specialization Field</FormLabel>
                          <Field name="specialization">
                            {({ field }) => (
                              <Select {...field}>
                                <option value="none">
                                  Select Specialization Field
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                              </Select>
                            )}
                          </Field>
                          <FormErrorMessage>
                            {errors.specialization}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={errors.experience && touched.experience}
                        >
                          <FormLabel>Experience Years</FormLabel>
                          <Input
                            type="number"
                            name="experience"
                            value={values.experience}
                            onChange={handleChange}
                            min={"1"}
                            max={"10"}
                          />
                          <FormErrorMessage>{errors.experience}</FormErrorMessage>
                        </FormControl>

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
                                size={'md'}
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

                        <Checkbox
                          size="md"
                          colorScheme="blue"
                          name="agreeTerms"
                          isChecked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                        >
                          I agree with the terms and conditions.
                        </Checkbox>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%"
                          }}
                        >
                          <div style={{ width: "20%" }}>
                            {showPreviousButton && (
                              <Button onClick={previousStep} width="100%">
                                Previous
                              </Button>
                            )}
                          </div>
                          <div style={{ width: "20%" }}>
                            <Button
                              type="submit"
                              style={{ width: "100%" }}
                              isDisabled={!termsAccepted}
                              backgroundColor={colors.secondary}
                              color="white"
                            >
                              Submit
                            </Button>
                          </div>
                        </Box>

                      </VStack>
                    </GridItem>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
