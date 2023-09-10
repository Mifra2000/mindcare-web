import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";

function MyForm() {
  const validationSchema = Yup.object().shape({
    Start_DateTime: Yup.date().required("Start time is required"),
    End_DateTime: Yup.date()
      .required("Close time is required")
      .min(
        Yup.ref("Start_DateTime"),
        "Close time must be after start time"
      ),
  });

  const formik = useFormik({
    initialValues: {
      Start_DateTime: "",
      End_DateTime: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChange = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <VStack spacing={4}>
        <FormControl isInvalid={formik.errors.Start_DateTime}>
          <FormLabel>Start Time</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            name="Start_DateTime"
            onChange={handleChange}
            value={formik.values.Start_DateTime}
          />
          <FormErrorMessage>{formik.errors.Start_DateTime}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={formik.errors.End_DateTime}>
          <FormLabel>Close Time</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            name="End_DateTime"
            onChange={handleChange}
            value={formik.values.End_DateTime}
          />
          <FormErrorMessage>{formik.errors.End_DateTime}</FormErrorMessage>
        </FormControl>
        <Button type="submit">Submit</Button>
      </VStack>
    </form>
  );
}
export default MyForm