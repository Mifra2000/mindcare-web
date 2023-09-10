// import { useState } from "react";
// import { useFormik } from "formik";
// import { FormControl, FormLabel, Input } from "@chakra-ui/react";
// import pdfjsLib from "pdfjs-dist";

// const MyForm = () => {
//   const [pdfText, setPdfText] = useState("");

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       age: "",
//       address: "",
//       // other form fields here
//     },
//     onSubmit: (values) => {
//       // handle form submit here
//       console.log(values)
//     },
//   });

//   const handlePdfFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileReader = new FileReader();
//       fileReader.onload = async () => {
//         const pdfData = new Uint8Array(fileReader.result);
//         const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
//         const maxPages = pdf.numPages;
//         let pdfText = "";
//         for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
//           const page = await pdf.getPage(pageNum);
//           const pageText = await page.getTextContent();
//           const pageString = pageText.items.map((item) => item.str).join(" ");
//           pdfText += pageString + "\n";
//         }
//         setPdfText(pdfText);
//         formik.setValues({
//           ...formik.values,
//           name: extractName(pdfText),
//           age: extractAge(pdfText),
//           address: extractAddress(pdfText),
//           // set other form fields here
//         });
//       };
//       fileReader.readAsArrayBuffer(file);
//     }
//   };

//   const extractName = (pdfText) => {
//     const nameRegex = /Name:\s*(.*)\s*Age:/;
//     const match = pdfText.match(nameRegex);
//     return match ? match[1] : "";
//   };
  
//   const extractAge = (pdfText) => {
//     const ageRegex = /Age:\s*(\d+)/;
//     const match = pdfText.match(ageRegex);
//     return match ? match[1] : "";
//   };
  
//   const extractAddress = (pdfText) => {
//     const addressRegex = /Address:\s*(.*)\s*Phone:/;
//     const match = pdfText.match(addressRegex);
//     return match ? match[1] : "";
//   };
  
//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <FormControl id="pdf-file">
//         <FormLabel>PDF File</FormLabel>
//         <Input type="file" onChange={handlePdfFileChange} />
//       </FormControl>

//       <FormControl id="name">
//         <FormLabel>Name</FormLabel>
//         <Input type="text" {...formik.getFieldProps("name")} />
//       </FormControl>

//       <FormControl id="age">
//         <FormLabel>Age</FormLabel>
//         <Input type="text" {...formik.getFieldProps("age")} />
//       </FormControl>

//       <FormControl id="address">
//         <FormLabel>Address</FormLabel>
//         <Input type="text" {...formik.getFieldProps("address")} />
//       </FormControl>

//       {/* other form fields here */}

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// // export default MyForm;
// import { useState } from 'react';
// import { Document } from 'docx';
// import { useFormik } from 'formik';

// export default function MyComponent() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   }

//   const handleFormSubmit = (values) => {
    
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = async () => {
//         const doc = new Document(reader.result);
//         const fullNameParagraph = doc.getParagraphByText('Full Name');
//         const fullName = fullNameParagraph.text.replace('Full Name: ', '');

//         formik.setFieldValue('fullName', fullName);
//         console.log(fullName)
//         formik.submitForm();
//       };
//       reader.readAsArrayBuffer(file);
//     }
//     console.log(values)
//   }

//   const formik = useFormik({
//     initialValues: {
//       fullName: '',
//     },
//     onSubmit: values => {
//       console.log(values);
//     },
//   });

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <input type="file" onChange={handleFileChange} />
//       <input type="text" name="fullName" value={formik.values.fullName} onChange={formik.handleChange} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
// // export default MyForm;
// import { useState } from 'react';
// import WordExtractor from 'word-extractor';
// import { useFormik } from 'formik';

// function MyComponent() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   }

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       const extractor = new WordExtractor();
//       const extractedData = await extractor.extract(file);
//       const fullName = extractedData['Full Name'];

//       formik.setValues({ ...formik.values, fullName });
//       formik.submitForm();
//     }
//   }

//   const formik = useFormik({
//     initialValues: {
//       fullName: '',
//     },
//     onSubmit: values => {
//       console.log(values);
//     },
//   });

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <input type="file" onChange={handleFileChange} />
//       <input type="text" name="fullName" value={formik.values.fullName} onChange={formik.handleChange} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
// export default MyComponent