import { Formik, Field, Form } from "formik";
import React, { useState } from "react";
import colors from "./Colors";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  Box,
  Flex,
  Text,
  Button,Select,
  Stack,
  Image,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
});

const handleSubmit = (values) => {
  console.log(values); // replace with your logic for submitting the form
};

export default function SignIn() {
  return (
    <Flex
      bg="gray.100"
      align="center"
      justify="center"
      h="auto"
      paddingTop={"2%"}
      width={"100vw"}
      paddingBottom={"4%"}
    >
      <Stack>
        <Image
          src="src\assets\Images\brain.png"
          alt="Depression Image"
          height="75px"
          width="75px"
          marginLeft="40%"
        />
        <Text
          fontSize="32"
          fontWeight="700"
          style={{ textAlign: "center", marginTop: "5%", marginBottom: "1%" }}
        >
          Login in to your Account
        </Text>
        <Text style={{ textAlign: "center", marginBottom: "10%" }}>
          <span style={{ marginRight: "8px" }}>Don't have an account?</span>
          <Link fontWeight="bold" to="/signup">
            Sign Up
          </Link>
        </Text>
        <Box bg="white" p={6} rounded="md" w={450} boxShadow={"lg"}>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <FormControl
              isInvalid={errors.email && touched.email}
              marginBottom="1rem"
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={errors.password && touched.password}
              marginBottom="1rem"
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <div>
                    <Field
                      as={Checkbox}
                      id="rememberMe"
                      name="rememberMe"
                      colorScheme="purple"
                    >
                      Remember me
                    </Field>
                    <Link
                      to="/forgotpassword"
                      style={{ marginLeft: "142px", color: colors.secondary }}
                    >
                      Forgot Password?
                    </Link>
            </div>
            <Button
              mt={4}
              bg={colors.secondary}
              isLoading={false}
              color={'white'}
              type="submit"
              width="full"
            >
              Log In
            </Button>
          </Form>
        )}
      </Formik>
      
    </Box>
    </Stack>
    </Flex>
  );
}
