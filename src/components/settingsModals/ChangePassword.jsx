import React from "react";
import { Formik, Form } from "formik";
import colors from "../Colors";
import * as Yup from "yup";
import axios from 'axios'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  FormErrorMessage
} from "@chakra-ui/react";

const SignupForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required")
  });

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      onSubmit={async(values) => {
        result = await axios.post('/changePaswword',values)
        console.log(result.status);
      }}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <Stack spacing={4}>
            <FormControl isInvalid={formik.errors.email && formik.touched.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.errors.password && formik.touched.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={
                formik.errors.confirmPassword && formik.touched.confirmPassword
              }
            >
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              <FormErrorMessage>
                {formik.errors.confirmPassword}
              </FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              backgroundColor={colors.secondary}
              color={'white'}
              //isLoading={formik.isSubmitting}
              type="submit"
            >
              Change Password
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
