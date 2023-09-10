// //backend imports
// import axios from 'axios';
// import therapistBaseurl from "../utils/axios";
// //front end imports
// import React, { useState, useEffect } from "react";
// import { Formik, Field, Form } from "formik";
// import { Link } from "react-router-dom";
// import * as Yup from "yup";
// import colors from "./Colors";
// import {
//     Box,
//     Flex,
//     Alert,
//     AlertIcon,
//     Text,
//     Select,
//     Button,
//     Stack,
//     FormErrorMessage,
//     Image,
//     VStack,
//     FormControl,
//     FormLabel,
//     Input,
//     Checkbox,
// } from "@chakra-ui/react";
// import {
//     ref,
//     uploadBytes,
//     getDownloadURL,
//     listAll,
//     list,
// } from "firebase/storage";
// import { storage } from "../utils/firebase";
// import { v4 } from "uuid";
// import Multiple from "./Multiple";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function Signup() {
//     const [data, setData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",   
//         Dateofbirth: new Date(),
//         gender: "",
//         picture: "",
//         specialization: "",
//         experience: "",
//         SessionCharges: "",
//         Start_DateTime: "",
//         End_DateTime: "",
//         downloadURL: []
//     })
//     const [currentStep, setCurrentStep] = useState(0)
//     const nextStep = (newData) => {
//         setData(prev => ({ ...prev, ...newData }))
//         setCurrentStep(prev => prev + 1)
//     }
//     const prevStep = (newData) => {
//         setData(prev => ({ ...prev, ...newData }))
//         setCurrentStep(prev => prev - 1)
//     }
//     const steps = [<StepOne next={nextStep} data={data} />, <StepTwo next={nextStep} prev={prevStep} data={data} />]

//     console.log("data", data)
//     return (
//         <div>
//             {steps[currentStep]}
//         </div>
//     );

// }

// const StepOne = (props) => {
//     const handleSubmit = (values) => {
//         props.next(values)
//     }
//     return (
//         <Formik initialValues={props.data} onSubmit={handleSubmit}>{({ values, dirty, isValid, handleChange, setFieldValue, errors, touched, isSubmitting }) => (
//             <Form>
//                 <p>First Name</p>
//                 <Field name="firstName"></Field>
//                 <p>Last Name</p>
//                 <Field name="lastName"></Field>
//                 <p>Email</p>
//                 <Field name="email"></Field>
//                 <p>Date of Birth</p>
//                 <Button type="submit">Next</Button>
//             </Form>

//         )}</Formik>
//     )
// }

// const StepTwo =(props) => {
//     const handleSubmit = (values) => {
//         props.next(values)
//         console.log(values);
//     }
//     return (
//         <Formik initialValues={props.data} onSubmit={handleSubmit}>
//             {
//                 ({ values, dirty, isValid, handleChange, setFieldValue, errors, touched, isSubmitting }) => (
//                     <Form>
//                         <Form>
//                         <p>Password</p>
//                         <Field name="password"></Field>
//                         <p>Confirm Password</p>
//                         <Field name="confirmPassword"></Field>
//                         <Button type="submit">Next</Button>
//                         </Form>
//                     </Form>
//                 )
//             }
//         </Formik>
//     )
// }
// import React, { useState } from 'react';
// import { Document, Paragraph, Packer } from 'docx';
// //import { saveAs } from 'file-saver';

// function MyComponent() {
//   const [extractedText, setExtractedText] = useState('');

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const buffer = e.target.result;
//       const doc = new Document(buffer);
//       const paragraphs = doc.getParagraphs();
//       const text = paragraphs.map((p) => p.text).join('\n');
//       setExtractedText(text);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div>
//       <h1>Extract Data from Word Document</h1>
//       <input type="file" accept=".docx" onChange={handleFileChange} />
//       <br />
//       <br />
//       <textarea rows="10" value={extractedText} readOnly />
//     </div>
//   );
// }
// import React from 'react';
// import { Formik, Form, Field } from 'formik';
// import pdfjs from 'pdfjs-dist';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// function extractTextFromPdf(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       try {
//         const buffer = event.target.result;
//         const doc = await pdfjs.getDocument({ data: buffer }).promise;
//         const numPages = doc.numPages;
//         let text = '';
//         for (let i = 1; i <= numPages; i++) {
//           const page = await doc.getPage(i);
//           const content = await page.getTextContent();
//           text += content.items.map((item) => item.str).join('');
//         }
//         resolve(text);
//       } catch (error) {
//         reject(error);
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   });
// }

// function PdfForm() {
//   return (
//     <div>
//       <h1>Extract Text from PDF Document</h1>
//       <Formik
//         initialValues={{ file: null, text: '' }}
//         onSubmit={async (values) => {
//           try {
//             const text = await extractTextFromPdf(values.file);
//             values.text = text;
//           } catch (error) {
//             console.error(error);
//           }
//         }}
//       >
//         {({ values, setFieldValue }) => (
//           <Form>
//             <input name="file" type="file" onChange={(event) => setFieldValue('file', event.currentTarget.files[0])} />
//             <br />
//             <br />
//             <button type="submit">Extract Text</button>
//             <br />
//             <br />
//             <Field as="textarea" name="text" rows="10" value={values.text} readOnly />
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import pdfjsLib from 'pdfjs-dist';

// function App() {
//   const [text, setText] = useState('');

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     const fileReader = new FileReader();

//     fileReader.onloadend = async () => {
//       const arrayBuffer = fileReader.result;
//       const pdf = await pdfjsLib.getDocument({ data: arrayBuffer });
//       const page = await pdf.getPage(1);
//       const content = await page.getTextContent();
//       const text = content.items.map((item) => item.str).join(' ');
//       setText(text);
//     };

//     fileReader.readAsArrayBuffer(file);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <p>{text}</p>
//     </div>
//   );
// }

// export default App;

/// working code
// import React, { useState } from 'react';

// const App = () => {
//   const [fileName, setFileName] = useState('');
//   const [fileContent, setFileContent] = useState('');

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsText(file);
//     reader.onload = () => {
//       setFileName(file.name);
//       setFileContent(reader.result);
//     };
//     reader.onerror = () => {
//       console.log('file error', reader.error);
//     };
//   };

//   return (
//     <div>
//       <h1>File Reader</h1>
//       <input type="file" onChange={handleFileChange}></input>
//       <br />
//       <p>{fileName}</p>
//       <p>{fileContent}</p>
//     </div>
//   );
// };

// export default App;

/////////////////
// import { useCallback, useEffect, useState } from 'react';
// import { createWorker } from 'tesseract.js';
// import './App.css';

// function App() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [textResult, setTextResult] = useState("");

//   const worker = createWorker();

//   const convertImageToText = useCallback(async () => {
//     if(!selectedImage) return;
//     await worker.load();
//     await worker.loadLanguage("eng");
//     await worker.initialize("eng");
//     const { data } = await worker.recognize(selectedImage);
//     setTextResult(data.text);
//   }, [worker, selectedImage]);

//   useEffect(() => {
//     convertImageToText();
//   }, [selectedImage, convertImageToText])

//   const handleChangeImage = e => {
//     if(e.target.files[0]) {
//       setSelectedImage(e.target.files[0]);
//     } else {
//       setSelectedImage(null);
//       setTextResult("")
//     }
//   }

//   return (
//     <div className="App">
//       <h1>ImText</h1>
//       <p>Gets words in image!</p>
//       <div className="input-wrapper">
//         <label htmlFor="upload">Upload Image</label>
//         <input type="file" id="upload" accept='image/*' onChange={handleChangeImage} />
//       </div>

//       <div className="result">
//         {selectedImage && (
//           <div className="box-image">
//             <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
//           </div>
//         )}
//         {textResult && (
//           <div className="box-p">
//             <p>{textResult}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
// import React, { useState } from "react";
// import mammoth from "mammoth";

// function App() {
//   const [text, setText] = useState("");

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     const fileReader = new FileReader();
//     fileReader.onload = async (event) => {
//       const arrayBuffer = event.target.result;
//       const result = await mammoth.extractRawText({ arrayBuffer });
//       setText(result.value);
//     };
//     fileReader.readAsArrayBuffer(file);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <pre>{text}</pre>
//     </div>
//   );
// }

// export default App;




import React, { useState } from "react";
import PDFParser from "pdf2json";
import { Button } from "@chakra-ui/react";

const Pdf2JsonExample = () => {
  const [pdfText, setPdfText] = useState("");

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];

    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const pdfText = pdfParser.getRawTextContent();
      setPdfText(pdfText);
    });

    pdfParser.loadPDF(file);
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handlePdfUpload} />
      <Button mt={4} onClick={() => console.log(pdfText)}>
        Extract Text
      </Button>
      <div>
        <pre>{pdfText}</pre>
      </div>
    </div>
  );
};

export default Pdf2JsonExample;
