import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import colors from "../Colors";
import { SimpleGrid, GridItem, Grid } from "@chakra-ui/react";
import {
  Box,
  Flex,
  Center,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  IconButton,Spinner,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  StackDivider,
  Stack,
  Collapse,
  Icon,
  Link,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Img,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { color } from "framer-motion";

function Stats() {
  const [isLoading, setIsLoading] = useState(true);
  //for spinner
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <>
    
      <div className="parentDiv" style={{marginBottom:'5%'}}>
        <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "2%",width:'auto' }}>
          <strong>
            <Text fontSize="52" style={{ textAlign: "center" }}>
              <span style={{ color: colors.secondary }}>Better </span>
              <span style={{color:colors.primary}}>mental health benefits</span>
              <span style={{ color: colors.secondary}}>,better</span>
            </Text>
            <h1 style={{ textAlign: "center", marginTop: "0",color:colors.secondary }}>outcomes</h1>
          </strong>
          <p
            style={{
              textAlign: "center",
              marginRight: "15%",
              marginLeft: "15%",
              marginTop: "2%",
              fontSize:'17px',
              fontWeight:'600'
            }}>
            Clinical data that showcases substantial improvements in the
            wellbeing, stress,and anxiety levels of members who utilise our
            programs.
          </p>
        
        <div
          className="columns"
          style={{ marginTop: "2%" }}
        >
          <Box>
            <Grid
              templateColumns={{
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={4}
            >
              <GridItem >
                <Card maxW="100%" backgroundColor={"white"} color={colors.secondary} _hover={{
                  bg: colors.secondary,
                  color: 'white'
                }}boxShadow='lg' size={'sm'} paddingBottom={'2%'}>
                  <CardBody>
                    <Stack mt="6" spacing="3">
                      <Center>
                      <div>
                        {isLoading && <Spinner size="lg" marginLeft={'40%'} marginTop={'40%'}/>}
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2Fgrowth.png?alt=media&token=d8858105-91b6-4781-8909-08bcf83fc0d3"
                          alt="Growth Image"
                          height="120px"
                          width="100px"
                          onLoad={handleImageLoad}
                          style={{ display: isLoading ? "none" : "block" }}
                        />
                        </div>
                      </Center>
                      <Text
                        fontSize="40"
                        style={{
                          textAlign: "center",
                          fontWeight: "bolder",
                          marginTop: "0",
                          marginBottom: "0",
                        }}
                      >
                        35%
                      </Text>
                      <p
                        color="blue.600"
                        style={{ fontSize: "13", textAlign: "center" ,fontWeight:'600'}}>
                        of all people signed up for the Mind Care app within the
                        first year
                      </p>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem >
              <Card maxW="100%" backgroundColor={"white"} color={colors.secondary} _hover={{
                  bg: colors.secondary,
                  color: 'white'
                }}boxShadow='lg' size={'sm'}paddingBottom={'2%'}>
                  <CardBody>
                    <Stack mt="6" spacing="3">
                      <Center>
                      <div>
                        {isLoading && <Spinner size="lg" marginLeft={'40%'} marginTop={'40%'}/>}
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2Fcolumn.png?alt=media&token=fcee5319-9b65-4910-acab-7175ac4eec9f"
                          alt="Nervous Image"
                          height="120px"
                          width="100px"
                          onLoad={handleImageLoad}
                          style={{ display: isLoading ? "none" : "block" }}
                        />
                        </div>
                      </Center>
                      <Text
                        fontSize="40"
                        style={{
                          textAlign: "center",
                          fontWeight: "bolder",
                          marginTop: "0",
                          marginBottom: "0",
                        }}
                      >
                        81%
                      </Text>
                      <p
                        color="blue.600"
                        style={{ fontSize: "13", textAlign: "center" ,fontWeight:'600'}}
                      >
                        of employees reported improved ability to regulate their
                        
                      </p>
                      
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem >
              <Card maxW="100%" backgroundColor={"white"} color={colors.secondary} _hover={{
                  bg: colors.secondary,
                  color: 'white'
                }}boxShadow='lg' size={'sm'} paddingBottom={'2%'}>
                  <CardBody>
                    <Stack mt="6" spacing="3">
                      <Center>
                      <div>
                        {isLoading && <Spinner size="lg" marginLeft={'40%'} marginTop={'40%'}/>}
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2Fline-graph.png?alt=media&token=c94c6d6b-798d-4a23-b7ad-c9b477de04d4"
                          alt="Line graph Image"
                          height="120px"
                          width="100px"
                          onLoad={handleImageLoad}
                          style={{ display: isLoading ? "none" : "block" }}
                        />
                        </div>
                      </Center>
                      <Text
                        fontSize="40"
                        style={{
                          textAlign: "center",
                          fontWeight: "bolder",
                          marginTop: "0",
                          marginBottom: "0",
                        }}
                      >
                        93%
                      </Text>
                      <p
                        color="blue.600"
                        style={{ fontSize: "14", textAlign: "center" ,fontWeight:'600'}}
                      >
                        clients experienced a decrease in anxiety levels after
                        4-6 weeks of utilisation
                      </p>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem >
              <Card maxW="100%" backgroundColor={"white"} color={colors.secondary} _hover={{
                  bg: colors.secondary,
                  color: 'white',
                }}boxShadow='lg' size={'sm'} marginBottom={'2%'} paddingBottom={'2%'}>
                  <CardBody>
                    <Stack mt="6" spacing="3">
                      <Center>
                      <div>
                        {isLoading && <Spinner size="lg" marginLeft={'40%'} marginTop={'40%'}/>}
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2Frating.png?alt=media&token=c177b1cf-e43d-4b4e-96ad-70209fa68930"
                          alt="rating Image"
                          height="120px"
                          width="100px"
                          onLoad={handleImageLoad}
                          style={{ display: isLoading ? "none" : "block" }}
                        />
                        </div>
                      </Center>
                      <Text
                        fontSize="40"
                        style={{
                          textAlign: "center",
                          fontWeight: "bolder",
                          marginTop: "0",
                          marginBottom: "0",
                        }}
                      >
                        4.5/5
                      </Text>
                      <p
                        color="blue.600"
                        style={{ fontSize: "14", textAlign: "center" ,fontWeight:'600'}}
                      >
                        user satisfaction rating across
                      </p>
                      <p
                        color="blue.600"
                        style={{
                          fontSize: "14",
                          marginTop: "0",
                          textAlign: "center",fontWeight:'600'
                        }}
                      >
                        3 million registered users on our app
                      </p>
                      <p
                        color={colors.secondary}
                        style={{
                          fontSize: "14",
                          marginTop: "0",
                          textAlign: "center",
                        }}
                      ></p>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </Box>
          <Center>
            <Button
              bg={colors.primary}
              variant="outline"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Book Appointment
            </Button>
          </Center>
        </div>
      </div>
    </div>
    <Divider/>
    </>
  );
}

export default Stats;
