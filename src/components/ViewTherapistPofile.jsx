import { Box, Heading, Text, Center, Stack, Image } from "@chakra-ui/react";
import Navbar from './EditProfile/ViewProfileNavbar'
import { useLocation } from 'react-router-dom';
//import {Link} from 'react-router-v6'
const RegistrationPreview = () => {
  // const location = useLocation();
  // //console.log('Local State',location)
  // const therapistJson = location.state
  
  // // const therapist = location.state ? location.state.therapist : null;
  // //console.log('Therapist Data :', therapistJson.picture);

  // console.log(therapistJson)

  const therapistData = localStorage.getItem('therapist');

  // Parse the retrieved string back into an object
  const therapistJson = JSON.parse(therapistData);
    
  return (
    <>
      <Navbar />
      <Center minH="50vh">
        <Box
          maxW="600px"
          w="full"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mx="auto"
          mt="4"
          marginBottom={'2%'}
        >
          <Image src={therapistJson.picture} alt="User Avatar" marginLeft={'35%'} borderRadius={'50%'} height={'30vh'} width={'30vh'} />

          <Box p="6">
            <Stack spacing="4">
              <Heading as="h2" size="lg">
                {therapistJson.firstName} {therapistJson.lastName}
              </Heading>

              <Text>
                <strong style={{marginRight:'1%'}}>Email:</strong> {therapistJson.email}
              </Text>

              <Text>
              <strong style={{marginRight:'1%'}}>Date of Birth:</strong> {therapistJson.dateofBirth}
              </Text>

              <Text>
              <strong style={{marginRight:'1%'}}>Gender:</strong> {therapistJson.gender}
              </Text>

              <Text>
              <strong style={{marginRight:'1%'}}>Specialization:</strong> {therapistJson.specialization}
              </Text>

              <Text>
              <strong style={{marginRight:'1%'}}>Experience:</strong> {therapistJson.experience}
              </Text>

              <Text>
              <strong style={{marginRight:'1%'}}>Session Charges:</strong> {therapistJson.SessionCharges}
              </Text>

              <Text>
              <strong style={{marginRight:'1%'}}>Availability:</strong> {therapistJson.Start_DateTime} - {therapistJson.End_DateTime}
              </Text>

            </Stack>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default RegistrationPreview;
