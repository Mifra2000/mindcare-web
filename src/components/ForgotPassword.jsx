import { Formik, Field } from "formik";
import React, { useState } from "react";
import colors from "./Colors";
import {
  Box, FormErrorMessage,
  Flex,
  Text,
  Button,
  Stack, Spinner,
  Image,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import * as Yup from "yup";
export default function ForgotPassword() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const handleSubmit = () => {

  }
  const [isLoading, setIsLoading] = useState(true);
  //for spinner
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <Flex
      bg="white"
      align="center"
      justify="center"
      h="100vh"
      width={"100vw"}
    >
      <Stack>
        <div style={{
          marginTop: "0%"        
        }}>
          {isLoading && <Spinner size="xl" marginLeft={'40%'}/>}
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2Fbrain.png?alt=media&token=b9f9b1e6-d4d9-46c4-8440-fc51f7c33e75"
            alt="Logo"
            height="75px"
            width="75px"
            marginLeft="40%"
            onLoad={handleImageLoad}
            style={{ display: isLoading ? "none" : "block" }}
          />
        </div>
        <Text
          fontSize="32"
          fontWeight="700"
          style={{ textAlign: "center", marginTop: "5%", marginBottom: "1%" }}
        >
          Forgot Password
        </Text>
        <Box bg="white" p={6} rounded="md" w={450} boxShadow={"lg"}>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched }) => (
              <form >
                <VStack spacing={4} align="flex-start">
                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel htmlFor="email" style={{ fontWeight: "400" }}>
                      You'll get an email with a reset link
                    </FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      value={values.email}
                      backgroundColor="white"
                      name="email"
                      placeholder="youremail@gmail.com"
                      type="email"
                      variant="outline"
                      style={{ marginTop: "1%", marginBottom: "2%" }}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <Button
                    type="submit"
                    backgroundColor={colors.secondary}
                    color="white"
                    width="full"
                    fontWeight="700"
                    borderRadius="10px"
                  >
                    Request Reset
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>{" "}
        </Box>
      </Stack>
    </Flex>
  );
}
