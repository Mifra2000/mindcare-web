import React from 'react'
import Navbar from './landingPageComponents/Navbar'
import BookAppointment from "./landingPageComponents/BookAppointment";
import Stats from "./landingPageComponents/Stats";
import Pricing from "./landingPageComponents/Pricing";
import FAQs from "./landingPageComponents/FAQs";
import AboutUs from "./landingPageComponents/AboutUs";
import IndexPage from './landingPageComponents/IndexPage';
import { Divider } from '@chakra-ui/react';
function landingPage() {
  return (
    <div>
      <Navbar/>       
    </div>
  )
}

export default landingPage