import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import colors from "../Colors";
import { SimpleGrid, GridItem, Grid } from "@chakra-ui/react";
import {
  Box,Spinner,
  Flex,
  Center,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  IconButton,
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

function BookAppointment() {
  const [isLoading, setIsLoading] = useState(true);
  //for spinner
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <>
    <div className="parentDiv" >
        <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%", width:'auto' }}>
          <strong>
            <Text fontSize="52" style={{ textAlign: "center" }}>
              <span style={{ color: colors.secondary }}>People need </span>
              <span style={{ color: colors.primary }}>mental wellbeing </span>
              <span style={{ color: colors.secondary }}>support</span>
            </Text>
            <h1
              style={{ textAlign: "center", marginTop: "0",color:colors.secondary }}
              
            >
              now more than ever
            </h1>
          </strong>
          <p
            style={{
              textAlign: "center",
              marginRight: "15%",
              marginLeft: "15%",
              marginTop: "2%",
              fontSize:'17px',
              fontWeight:'600'
            }}
          >
            Mental health challenges can impact an individual's ability to
            function in daily life,affect relationships, and lead to a loss of
            overall productivity.Mind Care offers a range of services to support
            individuals in addressing their mental health challenges and
            improving their overall well being.
          </p>
        </div>
        <div
          className="columns"
          style={{ marginLeft: "10%", marginRight: "10%", marginTop: "2%" }}
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
              <GridItem>
              <Card maxW="100%" backgroundColor={"white"} color={colors.secondary} _hover={{
                  bg: colors.secondary,
                  color: 'white'
                }}boxShadow='lg' size={'sm'} paddingBottom={'2%'}>
                  <CardBody >
                    <Stack mt="6" spacing="3">
                      <Text
                        fontSize="17"
                        style={{ textAlign: "center", fontWeight: "bolder", }}
                      >
                        Low Mood and Wellbeing
                      </Text>
                      <Center>
                      <div>
                        {isLoading && <Spinner size="lg" marginLeft={'40%'} marginTop={'40%'}/>}
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2Fdepression.png?alt=media&token=12c115ce-ac5d-4842-a384-9b1514406e10"
                          alt="Depression Image"
                          height="120px"
                          width="100px"
                          onLoad={handleImageLoad}
                          style={{ display: isLoading ? "none" : "block" }}
                        />
                        </div>
                      </Center>
                      <p
                        color="colors.secondary"
                        style={{ fontSize: "14", textAlign: "center" ,fontWeight:"600"}}
                      >
                        A state of emotional distress
                      </p>
                      <p
                        color="colors.secondary"
                        style={{
                          fontSize: "14",
                          marginTop: "0",
                          textAlign: "center",
                          fontWeight:"600"
                        }}
                      >
                        which can impact overall
                      </p>
                      <p
                        color="colors.secondary"
                        style={{
                          fontSize: "14",
                          marginTop: "0",
                          textAlign: "center",fontWeight:"600"
                        }}
                      >
                        well-being and quality of life
                      </p>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
              <Card maxW="100%" backgroundColor={"white"} color={colors.secondary} _hover={{
                  bg: colors.secondary,
                  color: 'white'
                }}boxShadow='lg' size={'sm'} paddingBottom={'2%'}>
                  <CardBody>
                    <Stack mt="6" spacing="3">
                      <Text
                        fontSize="17"
                        style={{ textAlign: "center", fontWeight: "bolder" }}
                      >
                        Anxiety & worry
                      </Text>
                      <Center>
                      <div>
                        {isLoading && <Spinner size="lg" marginLeft={'40%'} marginTop={'40%'}/>}
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2Fnervous.png?alt=media&token=ea27bb6c-34e4-4944-8a65-0c32504b6329"
                          alt="Nervous Image"
                          height="120px"
                          width="100px"
                          onLoad={handleImageLoad}
                          style={{ display: isLoading ? "none" : "block" }}
                        />
                        </div>
                      </Center>
                      <p
                        color="colors.secondary"
                        style={{ fontSize: "14", textAlign: "center" ,fontWeight:"600"}}
                      >
                        Feelings of fear and
                      </p>
                      <p
                        color="colors.secondary"
                        style={{
                          fontSize: "14",
                          marginTop: "0",
                          textAlign: "center",
                          fontWeight:"600"
                        }}
                      >
                        apprehension that can
                      </p>
                      <p
                        color="colors.secondary"
                        style={{
                          fontSize: "14",
                          marginTop: "0",
                          textAlign: "center",
                          fontWeight:"600"
                        }}
                      >
                        interfere with daily activities
                      </p>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
              <Card maxW="100%" backgroundColor={"white"} color={colors.secondary} _hover={{
                  bg: colors.secondary,
                  color: 'white'
                }}boxShadow='lg' size={'sm'} paddingBottom={'2%'}>
                  <CardBody>
                    <Stack mt="6" spacing="3">
                      <Text
                        fontSize="17"
                        style={{ textAlign: "center", fontWeight: "bolder" }}
                      >
                        Low productivity & Output
                      </Text>
                      <Center>
                      <div>
                        {isLoading && <Spinner size="lg" marginLeft={'40%'} marginTop={'40%'}/>}
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2Flow-speed%20(1).png?alt=media&token=90e2c259-2fe0-4550-9cf3-c5f3433e1319"
                          alt="Speed Image"
                          height="120px"
                          width="100px"
                          onLoad={handleImageLoad}
                          style={{ display: isLoading ? "none" : "block" }}
                        />
                        </div>
                      </Center>
                      <p
                        color="colors.secondary"
                        style={{ fontSize: "14", textAlign: "center" ,fontWeight:"600"}}
                      >
                        A decrease in work efficiency,
                      </p>
                      <p
                        color="colors.secondary"
                        style={{
                          fontSize: "14",
                          marginTop: "0",
                          textAlign: "center",fontWeight:"600"
                        }}
                      >
                        output caused by stress,
                      </p>
                      <p
                        color="colors.secondary"
                        style={{
                          fontSize: "14",
                          marginTop: "0",
                          textAlign: "center",fontWeight:"600"
                        }}
                      >
                        burnout,mental health issues.
                      </p>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
              <Card maxW="100%" backgroundColor={"white"} color={colors.secondary} _hover={{
                  bg: colors.secondary,
                  color: 'white'
                }}boxShadow='lg' size={'sm'} paddingBottom={'2%'}>
                  <CardBody>
                    <Stack mt="6" spacing="3">
                      <Text
                        fontSize="17"
                        style={{ textAlign: "center", fontWeight: "bolder" }}
                      >
                        Stress & burnout
                      </Text>
                      <Center>
                        <div>
                        {isLoading && <Spinner size="lg" marginLeft={'40%'} marginTop={'40%'}/>}
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2Ffatigue.png?alt=media&token=fc767160-6648-4a16-9dbe-eb554a6a3efc"
                          alt="Fatigue Image"
                          height="120px"
                          width="100px"
                          onLoad={handleImageLoad}
                          style={{ display: isLoading ? "none" : "block" }}
                        />
                        </div>
                      </Center>
                      <p
                        color="colors.secondary"
                        style={{ fontSize: "14", textAlign: "center" ,fontWeight:"600"}}
                      >
                        A state of emotional, physical,
                      </p>
                      <p
                        color="colors.secondary"
                        style={{
                          fontSize: "14",
                          marginTop: "0",
                          textAlign: "center",fontWeight:"600"
                        }}
                      >
                        mental exhaustion which can
                      </p>
                      <p
                        color="colors.secondary"
                        style={{
                          fontSize: "14",
                          marginTop: "0",
                          textAlign: "center",fontWeight:"600"
                        }}
                      >
                        lead to decreased productivity
                      </p>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </Box>
          <Center>
            <Button backgroundColor={colors.primary} variant="outline" style={{
              marginTop: "20px",
              marginBottom: "7%",
            }}>
              Book Appointment
            </Button>
          </Center>
        </div>
      </div>
      <Divider/>
      </>
  );
}

export default BookAppointment;
