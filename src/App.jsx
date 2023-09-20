import { ChakraProvider, Button, Divider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import LandingPage from "./components/LandingPage";
import SignUpform from "./components/Signup";
import Signin from "./components/Signin";
import AboutUs from "./components/landingPageComponents/AboutUs";
import Pricing from "./components/landingPageComponents/Pricing";
import FAQs from "./components/landingPageComponents/FAQs";
import ForgotPassword from "./components/ForgotPassword";
import ViewTherapistProfile from "./components/ViewTherapistPofile";
import Dashboard from "./components/Dashboard";
import Multi from "./components/Multiple";
import Test from "./components/Sidebar";
import Picture from "./components/Picture";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import Profile from "./components/PhyscologicalProfile";
import Forum from "./components/Forum";
import PostQuestion from "./components/PostQuestion";
import PostTab from "./components/CommunityForum/TabComponent/PostTab";
import Tabs from "./components/CommunityForum/TabComponent/Tabs";
import Post from "./components/CommunityForum/Post";

axios.defaults.baseURL = "http://localhost:8080/api/v1/therapist";
// "https://mind-care.up.railway.app/api/v1/therapist"

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUpform />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/settings" element={<EditProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/therapistprofile" element={<ViewTherapistProfile />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/postquestion" element={<PostQuestion />} />
          <Route path="/postTab" element={<PostTab />} />
          <Route path="/tabs" element={<Tabs />} />
        </Routes>
      </Router>
      {/* <LandingPage/>    */}
      {/* <Multi/> */}
      {/* <Signin/> */}
      {/* <SignUpform/>   */}
      {/* <Formik/> */}
      {/* <ForgotPassword/>   */}
      {/* <Test/>       */}
    </ChakraProvider>
  );
}
export default App;
