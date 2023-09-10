import React, { useState } from "react";
//import { css } from "@emotion/react";
import colors from "../Colors";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Divider,
} from "@chakra-ui/react";
function FAQs() {
  return (
    <>
    <div className="parentDiv">
      <div
        className="columns"
        style={{  marginTop: "1%" ,width:'auto',marginTop:'5%',marginBottom:'5%'}}>
      <Text
        fontSize="52"
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          marginTop: "5%",
          marginBottom: "0",
          color: colors.secondary,          
        }}
      >
        Frequently Asked Questions
      </Text>
      <p
        style={{
          textAlign: "center",
          marginRight: "20%",
          marginLeft: "20%",
          marginTop: "2%",
          marginBottom:"2%",
          fontSize:'17px',
          fontWeight:'600'
        }}
      >
        Mind Care FAQ:provide answers to common questions about mental health
        services provided by Mind Care. Mind Care's FAQ,help to provide clarity
        and transparency to clients seeking mental health support
      </p>
      <Accordion
        style={{ marginRight: "25%", marginLeft: "25%",marginBottom:'2%', color: colors.secondary }}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Q1: What is MindCare?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Q2: Who can benefit from Mind Care's services?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Q3: What types of therapy does Mind Care offer?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Q4: How do I sechedule an appointment with Mind Care?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Q5: How much does therapy cost at Mind Care?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
     </div>
    </div>
    <Divider/>
    </>
  );
}

export default FAQs;
