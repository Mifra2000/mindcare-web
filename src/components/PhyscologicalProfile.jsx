import Mood from "./ClientFolder/Moods";
import MoodTable from "./ClientFolder/MoodTable";
import Navbar from './ClientFolder/Navbar'
import Graphs from './Graphs'
import colors from "./Colors";
import {
  Box,
  Flex,
  Grid,
  Tag,
  GridItem,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import Test from "./Sidebar"
import { useLocation } from "react-router-dom";
export default function Simple() {
  const location = useLocation();
  //console.log('Local State',location)
  const therapistJson = location.state
  
  // const therapist = location.state ? location.state.therapist : null;
  //console.log('Therapist Data :', therapistJson.picture);

  console.log('settings screen',therapistJson)

  return (
    <>
      {/* navbar */}
      <Navbar/>
      <Box p={4}>
        <Text fontSize={20} fontWeight={"500"} marginLeft={'2%'}>
          Client Name: Mahnoor Hashmi
        </Text>
        <Grid templateColumns="repeat(5, 1fr)" gap={6} marginLeft={'2%'}>
          {/* <GridItem
            w="100%"
            h="10"
            height={"auto"}
            padding={3}
            borderRadius={"10"}
          >
            <Text textAlign={"center"} fontWeight={"bolder"}>
              {" "}
              Daily Check Ins
            </Text>
            <Mood />
          </GridItem> */}

          <GridItem
            w="100%"
            h="10"
            boxShadow={'lg'}
            height={"auto"}            
            padding={3}
            borderRadius={"10"}
          >
            <Text textAlign={"center"} fontWeight={"bolder"} fontSize={18}>
              {" "}
              Anxiety Test Score
            </Text>
            <Text textAlign={"center"} fontWeight={"600"}>
              {" "}
              Total Score:31
            </Text>
            <HStack spacing={4} marginLeft={'20%'} marginTop={'6%'}>
              <Tag size={"lg"} variant="solid" backgroundColor={colors.primary}>
                Mild Anxiety
              </Tag>
            </HStack>
          </GridItem>
          
          <GridItem
            w="100%"
            h="10"
            boxShadow={'lg'}
            height={"auto"}            
            padding={3}
            borderRadius={"10"}                        
          >
            <Text fontSize={18} fontWeight={"700"} textAlign={"center"}>
              {" "}
              Depression Test Score
            </Text>
            <Text textAlign={"center"} fontWeight={"600"}>
              {" "}
              Total Score : 29
            </Text>
            <HStack spacing={4} marginLeft={'20%'} marginTop={'6%'}>
              <Tag size={"lg"} variant="solid" backgroundColor="#E53E3E">
                Mild Depression
              </Tag>
            </HStack>
          </GridItem>
          
          <GridItem
            w="100%"
            h="10"
            height={"auto"}
            padding={3}
            borderRadius={"10"}
            colSpan={2}
            boxShadow={'lg'}>
          <Text fontSize={18} fontWeight={"700"} textAlign={"center"}>
              Frequent Emotions
            </Text>
            <Text textAlign={"center"} fontWeight={'600'}>
              <p>Top 3 emotions experienced in this period</p>
            </Text>
            <HStack spacing={4} marginLeft={'25%'} marginTop={"3%"} >
              <Tag size={"lg"} variant="solid" colorScheme="teal" width={'auto'} textAlign={'center'}>
                Sad
              </Tag>
              <Tag size={"lg"} variant="solid" colorScheme="teal" width={'auto'}>
                Optimistic
              </Tag>
              <Tag size={"lg"} variant="solid" colorScheme="teal" width={'auto'}>
                Relaxed
              </Tag>
            </HStack>

          </GridItem>
        </Grid>
      </Box>
      <Box>
        <Grid templateColumns="repeat(4, 1fr)" gap={1}>
          <GridItem
            colSpan={2}
            w="100%"
            h="10"
            height={"auto"}
            
            margin={"4"}
            borderRadius={"10"}
          >
            <Text fontWeight={"700"} fontSize={25} marginLeft={"4%"}>
              Daily Logs
            </Text>
            <Text marginLeft={"4%"} fontWeight={'500'}>Mood Check In are displayed here</Text>
            <MoodTable />
          </GridItem>
          <GridItem marginTop={'12%'}>
          <Text fontWeight={"700"} fontSize={20} marginLeft={"18%"}>Weekly Clients Graph</Text>
            <Graphs />
          </GridItem>
          <GridItem marginTop={'12%'}>
          <Text fontWeight={"700"} fontSize={20} marginLeft={"18%"}>Weekly Clients Graph</Text>
            <Graphs />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
