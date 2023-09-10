import { useLocation } from 'react-router-dom';
import Navbar from './EditProfile/Navbar'
import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import colors from './Colors'
import * as Yup from "yup";
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";
import Modals from './settingsModals/Modals'
import {
  FormControl,
  FormLabel, GridItem,
  Input,useToast,
  Select,
  FormErrorMessage,
  Stack, Grid, Text,
  Flex,
  Button, AlertDescription,
  Box,
  Image, Alert, AlertIcon
} from "@chakra-ui/react";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../utils/firebase";
import { v4 } from "uuid";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import SideBar from "./Sidebar";


const validationSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string().email('Invalid email'),
  password: Yup.string().min(8, 'Password must be at least 6 characters'),
  Dateofbirth: Yup.date(),
  gender: Yup.string(),
  picture: Yup.string(),
  specialization: Yup.string(),
  experience: Yup.string(),
  SessionCharges: Yup.string().required('Session Charges are required'),
  Start_DateTime: Yup.date().required('Start Date/Time is required'),
  End_DateTime: Yup.date().required('End Date/Time is required'),
  downloadURL: Yup.string()
});
const FormikForm = () => {
  // const location = useLocation();
  // //console.log('Local State',location)
  // const therapistJson = location.state  
  // const therapist = location.state ? location.state.therapist : null;
  //console.log('Therapist Data :', therapistJson.picture);
  const therapistData = localStorage.getItem('therapist');

  // Parse the retrieved string back into an object
  const therapistLocal = JSON.parse(therapistData);
    
  //console.log('settings screen',therapistJson)
  const initialValues = {
    firstName:`${therapistLocal.firstName}`,
    lastName: `${therapistLocal.lastName}`,
    email: `${therapistLocal.email}`,
    password: "",
    Dateofbirth:Date.now(),
    gender:`${therapistLocal.gender}`,
    picture: "therapistJson.picture",
    specialization: `${therapistLocal.specialization}`,
    experience: `${therapistLocal.experience}`,
    SessionCharges: "",
    Start_DateTime: "",
    End_DateTime: "",
    downloadURL: ""
  };



  const [showAlert, setShowAlert] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrl] = useState([]);
  //picture uploading code
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
      }).then(() => {
        //showAlert(true);
      });
    }).catch((error) => {
      console.log(error)
      //showAlert(false);
    })
  };

  // code to download image url
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      const latestItem = response.items[response.items.length - 1]; // Get the latest item
      getDownloadURL(latestItem).then((url) => {
        setImageUrl([url]); // Set the image URL of the latest item
      });
    });
  }, []);
  const toast = useToast();
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const handleSubmit =async(values,{resetForm}) => {
            console.log(values);
            const result = axios.patch('/updateProfile',values)            
            localStorage.setItem('therapist', JSON.stringify(result));
            toast({
              title: "Edit Profile Form Submitted.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            resetForm()
          }
  return (
    <>
      <Navbar />
      {/* {showAlert && (
        <Alert status="success" mb={4} display="flex">
          <AlertIcon />
          Form submitted successfully!
          <AlertDescription display="inline-block" ml={2} mr={'auto'}>
            Your form has been submitted successfully.
          </AlertDescription>
          <AiOutlineClose fontSize={20} onClick={() => setShowAlert(false)} />
        </Alert>
      )} */}
      <Grid templateColumns="1fr" gap={0} height={'auto'}> 
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur, isValid,setFieldValue }) => (
            <Form style={{ marginLeft: '5%', marginTop: '2%', }}>
              <Stack spacing={4}>
                <Stack flexDirection={'row'}>
                  {/* <SideBar /> */}
                  {/* <Text fontSize={'20'} fontWeight={'700'}>Profile</Text> */}
                </Stack>
                <Grid templateRows="repeat(5, 1fr)" gap={4} height={'120vh'}>
                  <Flex alignItems="left" width={'100%'} py={0}>             
                   <Stack marginLeft={'10%'}>
                    <Text marginLeft={'18%'} fontWeight={'600'}>Profile Picture</Text>     
                    <Image
                      src={imageUrls}
                      width={"200px"}
                      height={"175px"}
                      borderRadius={"50%"}
                      //border={"1px solid black"}
                    />
                    <FormControl
                      isInvalid={errors.picture && touched.picture}
                      width="25%" marginTop={'5%'}>
                        <Box>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={(event) => {
                          const file = event.target.files[0];
                          if (file) {
                            const imageRef = ref(
                              storage,
                              `Therapist/picture/${file.name + v4()}`
                            );
                            uploadBytes(imageRef, file).then((snapshot) => {
                              getDownloadURL(snapshot.ref).then((url) => {
                                setImageUrl(url);
                                setFieldValue("picture", url);
                                console.log("Image upload success!");
                              });
                            });
                          }
                        }}
                      />
                    </Box>
                      {/* <Button
                        mt={2}
                        width={{ base: "100%", md: "200px" }}
                        onClick={uploadFile}
                      >
                        Upload Image
                      </Button> */}
                    </FormControl>
                    </Stack>
                    <FormControl
                      isInvalid={errors.firstName && touched.firstName} width="28%" mr={2} marginTop={'6%'}>
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={handleChange}
                        value={values.firstName}
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={errors.lastName && touched.lastName} width="28%" mr={2} marginTop={'6%'}>
                      <FormLabel htmlFor="lastName">Last Name</FormLabel>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={handleChange}
                        value={values.lastName} />
                    </FormControl>
                  </Flex>

                  <Flex alignItems="left" width={'100%'} height={'5vh'}>
                    <FormControl
                      isInvalid={errors.email && touched.email}
                      width="29%"
                      mr={2}
                      marginLeft={'2%'}
                      marginTop={'2%'}
                    >
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={errors.Dateofbirth && touched.Dateofbirth}
                      width="30%"
                      marginTop={'2%'}
                    >
                      <FormLabel htmlFor="Dateofbirth">Date of Birth</FormLabel>
                      <Input
                        type="date"
                        id="Dateofbirth"
                        name="Dateofbirth"
                        onChange={handleChange}
                        value={values.Dateofbirth}
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={errors.gender && touched.gender}
                      width="28%"
                      ml={2}
                      marginTop={'2%'}
                    >
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
                    </FormControl>
                  </Flex>
                          
                  <Flex height={'5vh'} direction="column">
                    <Text marginLeft={'2%'} fontWeight={'700'} fontSize={18} color={colors.secondary}>Professional</Text>
                    <Flex alignItems="left" width={'100%'} >
                      <FormControl
                        
                        isInvalid={errors.specialization && touched.specialization} width="29%" mr={2} marginLeft={'2%'}>
                         
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
                        
                        width={'30%'} mr={2}
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
                    </Flex>
                  </Flex>
                          
                  <Flex height={'5vh'} direction="column">
                    <Text marginLeft={'2%'} fontWeight={'700'} fontSize={18} color={colors.secondary}>Working Schedule</Text>
                    <Flex alignItems="left" width={'100%'} >
                      <FormControl
                        
                        isInvalid={errors.Start_DateTime && touched.Start_DateTime} width="29%" mr={2} marginLeft={'2%'}>
                        <FormLabel>Start Time</FormLabel>
                        <Input
                          placeholder="Select Date and Time"
                          size="md"
                          type="datetime-local"
                          name="Start_DateTime"
                          onChange={handleChange}
                          value={values.Start_DateTime}
                        />
                        <FormErrorMessage>{errors.Start_DateTime}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={errors.End_DateTime && touched.End_DateTime} width="30%" mr={2}
                        >
                        <FormLabel>Close Time</FormLabel>
                        <Input
                          placeholder="Select Date and Time"
                          size="md"
                          type="datetime-local"
                          name="End_DateTime"
                          onChange={handleChange}
                          value={values.End_DateTime}
                        />
                        <FormErrorMessage>{errors.End_DateTime}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={errors.SessionCharges && touched.SessionCharges}
                        
                        width={'28%'} mr={2}
                      >
                        <FormLabel htmlFor="age">Session Charges</FormLabel>
                        <Input
                          type="text"
                          name="SessionCharges"
                          value={values.SessionCharges}
                          onChange={handleChange}
                          min={"1"}
                          max={"10"}
                        />
                        <FormErrorMessage>{errors.SessionCharges}</FormErrorMessage>
                      </FormControl>
                    </Flex>
                  </Flex>

                  <GridItem py={0} mb={0}>
                    <Text
                      fontSize="18"
                      style={{
                        textAlign: "left",
                        fontWeight: "bolder",
                        color: colors.secondary,
                        marginLeft: '2%'
                      }}
                    >
                      Account Settings
                    </Text>
                    <Stack spacing="2" flexDirection={'row'}>
                      <Modals />
                    </Stack>
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
                      <div style={{marginRight: '12%' }}>
                        <Button type="submit" size={'md'} mt={5} backgroundColor={colors.secondary} color={'white'}>Submit</Button>
                      </div>
                    </Box>
                  </GridItem>
                </Grid>
              </Stack>
            </Form>
          )}
        </Formik>
      </Grid>
    </>
  );
};

export default FormikForm;
