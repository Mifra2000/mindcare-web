import React from 'react';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function EmailForm() {
  const validationSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    body: Yup.string().required('Body is required'),
    recipient: Yup.string()
      .email('Invalid email address')
      .required('Recipient email is required'),
  });

  const formik = useFormik({
    initialValues: {
      subject: '',
      body: '',
      recipient: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const emailData = {
        subject: values.subject,
        body: values.body,
        recipient: values.recipient,
      };

      try {
        await axios.post('/api/send-email', emailData);
        alert('Email sent!');
      } catch (err) {
        console.error(err);
        alert('Error sending email.');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl isInvalid={formik.errors.subject && formik.touched.subject}>
        <FormLabel>Subject:</FormLabel>
        <Input
          type="text"
          id="subject"
          name="subject"
          value={formik.values.subject}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormErrorMessage>{formik.errors.subject}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={formik.errors.body && formik.touched.body}>
        <FormLabel>Body:</FormLabel>
        <Textarea
          id="body"
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormErrorMessage>{formik.errors.body}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={formik.errors.recipient && formik.touched.recipient}
      >
        <FormLabel>Recipient:</FormLabel>
        <Input
          type="email"
          id="recipient"
          name="recipient"
          value={formik.values.recipient}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormErrorMessage>{formik.errors.recipient}</FormErrorMessage>
      </FormControl>

      <Button mt={4} type="submit" disabled={!formik.isValid}>
        Send Email
      </Button>
    </form>
  );
}
export default EmailForm