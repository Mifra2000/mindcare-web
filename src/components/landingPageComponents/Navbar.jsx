import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import colors from "../Colors";
import IndexPage from './IndexPage'
import BK from './BookAppointment'
import Stats from './Stats'
import Pricing from'./Pricing'
import FAQs from './FAQs'
import AboutUs from './AboutUs'
import {
  Box,
  Flex,
  Avatar,Spinner,
  HStack,Image,
  IconButton,
  Button,
  Menu,Stack,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = ['About Us', 'Pricing','FAQs', 'Support'];

const NavLink = ({ children, onClick }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    onClick={onClick}>
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
    const [isLoading, setIsLoading] = useState(true);
  //for spinner
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onToggle();
  };

  return (
    <>
      <Box  px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={onToggle}
          />
          <HStack spacing={8} alignItems={'center'}>
          <div>
             {isLoading && <Spinner size="lg" />}
            <Stack flexDirection={'row'}>
             <Image
            src="https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2Fbrain.png?alt=media&token=b9f9b1e6-d4d9-46c4-8440-fc51f7c33e75"
            alt="Logo"
            height="50px"
            marginTop={'1%'}
            width="55px"          
            onLoad={handleImageLoad}            
            style={{ display: isLoading ? "none" : "block" }}
          />
          <span style={{marginTop:'12%',color:colors.secondary,fontWeight:'700'}}>Mind Care</span>  
          </Stack>
          </div>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link} onClick={() => scrollToSection(link.toLowerCase())} color={colors.secondary}>
                  {link}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Link to="/signin">
            <Button color={colors.secondary} variant="ghost" mr={4}>
              Sign In
            </Button>
            </Link>
            <Link to="/signup">
            <Button 
                          display={{ base: "none", md: "inline-flex" }}
              fontSize={"md"}
              fontWeight={'500'}
              color={"white"}
              bg={colors.secondary}
              href={"#"}
              _hover={{
                bg: colors.primary,
                color: colors.secondary
              }}>
              Sign Up
            </Button>
            </Link>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Flex flexDir="column" alignItems="center">
              {Links.map((link) => (
                <NavLink
                  key={link}
                  onClick={() => scrollToSection(link.toLowerCase())}
                  mb={2}
                >
                  {link}
                </NavLink>
              ))}
            </Flex>
          </Box>
        ) : null}
      </Box>
      <Divider/>
    </>
  );
};

const App = () => {
  return (
    <div>
      <Navbar />
      <div  style={{ height: 'auto' }}>
        <IndexPage/>
      </div>
      <div style={{ height: 'auto' }}>
        <BK/>
      </div>
      <div style={{ height: 'auto'}}>
        <Stats/>
      </div>
      <div id="pricing" style={{ height: 'auto'}}>
        <Pricing/>
      </div>
      <div id="faqs" style={{ height: 'auto'}}>
        <FAQs/>
      </div>
      <div id="about us" style={{ height: 'auto'}}>
        <AboutUs/>
      </div>
    </div>
  );
};

export default App;


// import React, { useState, useEffect } from "react";
// import colors from "../Colors";
// import { Link } from "react-router-dom"
// import {
//   Box,
//   Flex,Spinner,
//   Text,
//   IconButton,
//   Button,
//   Stack,
//   Collapse,
//   Icon,Image,
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   useColorModeValue,
//   useBreakpointValue,
//   useDisclosure
// } from "@chakra-ui/react"
// import {
//   HamburgerIcon,
//   CloseIcon,
//   ChevronDownIcon,
//   ChevronRightIcon
// } from "@chakra-ui/icons"

// export default function WithSubnavigation() {
//   const { isOpen, onToggle } = useDisclosure()
//   const [isLoading, setIsLoading] = useState(true);
//   //for spinner
//   const handleImageLoad = () => {
//     setIsLoading(false);
//   };
//   return (
//     <Box width={'100%'}>
//       <Flex
//         bg={useColorModeValue("white", "gray.800")}
//         color={useColorModeValue("gray.600", "white")}
//         minH={"60px"}
//         py={{ base: 2 }}
//         px={{ base: 4 }}
//         borderBottom={1}
//         borderStyle={"solid"}
//         borderColor={useColorModeValue("gray.200", "gray.900")}
//         align={"center"}
//       >
//         <Flex
//           flex={{ base: 1, md: "auto" }}
//           ml={{ base: -2 }}
//           display={{ base: "flex", md: "none" }}
          
//         >
//           <IconButton
//             onClick={onToggle}
//             icon={
//               isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
//             }
//             variant={"ghost"}
//             aria-label={"Toggle Navigation"}
//           />
//         </Flex>
//         <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
//           <Text
//             textAlign={useBreakpointValue({ base: "center", md: "left" })}
//             fontFamily={"inter"}
//             style={{ fontWeight: "bolder" }}
//             color={useColorModeValue("gray.800", "white")}
//           >
//             <Stack flexDirection={'row'} >
//             <div>
//              {isLoading && <Spinner size="lg" />}
//             <Image
//             src="https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2Fbrain.png?alt=media&token=b9f9b1e6-d4d9-46c4-8440-fc51f7c33e75"
//             alt="Logo"
//             height="50px"
//             marginTop={'1%'}
//             width="55px"          
//             onLoad={handleImageLoad}
            
//             style={{ display: isLoading ? "none" : "block" }}
//           />
//           </div>
//         <span style={{marginTop:'10%',color:colors.secondary}}>Mind Care</span>        
//         </Stack>
//           </Text>        
//           <Flex display={{ base: "none", md: "flex" }} ml={20}>
//             <DesktopNav />
//           </Flex>
//         </Flex>

//         <Stack
//           flex={{ base: 1, md: 0 }}
//           justify={"flex-end"}
//           direction={"row"}
//           spacing={6}
//         >
//           <Link to="/signin">
//             <Button              
//               fontSize={"lg"}
//               fontWeight={'700'}
//               variant={"link"}
//               href={"#"}
//               marginTop={"15%"}
//               color={colors.secondary}
//             >
//               Sign In
//             </Button>
//           </Link>
//           <Link to={"/signup"}>
//             <Button              
//               display={{ base: "none", md: "inline-flex" }}
//               fontSize={"md"}
//               fontWeight={'700'}
//               color={"white"}
//               bg={colors.secondary}
//               href={"#"}
//               _hover={{
//                 bg: colors.primary,
//                 color: colors.secondary
//               }}
//             >
//               Sign Up
//             </Button>
//           </Link>
//         </Stack>
//       </Flex>

//       <Collapse in={isOpen} animateOpacity>
//         <MobileNav />
//       </Collapse>
//     </Box>
//   )
// }

// const DesktopNav = () => {
//   const linkColor = useColorModeValue("gray.600", "gray.200")
//   //const linkHoverColor = useColorModeValue("blue.800", "yellow");
//   const popoverContentBgColor = useColorModeValue("white", "gray.800")

//   return (
//     <Stack direction={"row"} spacing={4} marginTop={'6%'}>
//       {NAV_ITEMS.map(navItem => (
//         <Box key={navItem.label}>
//           <Popover trigger={"hover"} placement={"bottom-start"}>
//             <PopoverTrigger>
//               <Link
//                 p={2}
//                 to={navItem.href ?? "#"}
//                 fontSize={"lg"}
//                 fontWeight={700}
//                 color={colors.secondary}
//                 _hover={{
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                 }}                
//               >
//                 {navItem.label}
//               </Link>
//             </PopoverTrigger>

//             {navItem.children && (
//               <PopoverContent
//                 border={0}
//                 boxShadow={"xl"}
//                 bg={popoverContentBgColor}
//                 p={4}
//                 rounded={"xl"}
//                 minW={"sm"}
//               >
//                 <Stack>
//                   {navItem.children.map(child => (
//                     <DesktopSubNav key={child.label} {...child} />
//                   ))}
//                 </Stack>
//               </PopoverContent>
//             )}
//           </Popover>
//         </Box>
//       ))}
//     </Stack>
//   )
// }

// const DesktopSubNav = ({ label, href, subLabel }) => {
//   return (
//     <Link
//       href={href}
//       role={"group"}
//       display={"block"}
//       p={2}
//       rounded={"md"}
//       _hover={{ bg: useColorModeValue("pink.50", "gray.900") ,textDecoration:'underline'}}
//     >
//       <Stack direction={"row"} align={"center"}>
//         <Box>
//           <Text
//             transition={"all .3s ease"}
//             _groupHover={{ color: "pink.400" }}
//             fontWeight={500}
//           >
//             {label}
//           </Text>
//           <Text fontSize={"sm"}>{subLabel}</Text>
//         </Box>
//         <Flex
//           transition={"all .3s ease"}
//           transform={"translateX(-10px)"}
//           opacity={0}
//           _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
//           justify={"flex-end"}
//           align={"center"}
//           flex={1}
//         >
//           <Icon color={colors.secondary} w={5} h={5} as={ChevronRightIcon} />
//         </Flex>
//       </Stack>
//     </Link>
//   )
// }


// const NAV_ITEMS = [
//   {
//     label: "About Us",
//     href: "/aboutus"
//   },
//   {
//     label: "Pricing",
//     href: "/pricing"
//   },
//   {
//     label: "FAQs",
//     href: "/faqs"
//   },
//   {
//     label: "Support",
//     href: "/"
//   }
// ]




// const MobileNav = () => {
//   return (
//     <Stack
//       bg={useColorModeValue("white", "gray.800")}
//       p={4}
//       display={{ md: "none" }}
//     >
//       {NAV_ITEMS.map(navItem => (
//         <MobileNavItem key={navItem.label} {...navItem} />
//       ))}
//     </Stack>
//   )
// }

// const MobileNavItem = ({ label, children, href }) => {
//   const { isOpen, onToggle } = useDisclosure()

//   return (
//     <Stack spacing={4} onClick={children && onToggle}>
//       <Flex
//         py={2}
//         as={Link}
//         href={href ?? "#"}
//         justify={"space-between"}
//         align={"center"}
//         _hover={{
//           textDecoration: "underline"
//         }}
//       >
//         <Text
//           fontWeight={600}
//           color={useColorModeValue("gray.600", "gray.200")}
//         >
//           {label}
//         </Text>
//         {children && (
//           <Icon
//             as={ChevronDownIcon}
//             transition={"all .5s ease-in-out"}
//             transform={isOpen ? "rotate(180deg)" : ""}
//             w={6}
//             h={6}
//           />
//         )}
//       </Flex>

//       <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
//         <Stack
//           mt={2}
//           pl={4}
//           borderLeft={1}
//           borderStyle={"solid"}
//           borderColor={useColorModeValue("gray.200", "gray.700")}
//           align={"start"}
//         >
//           {children &&
//             children.map(child => (
//               <Link key={child.label} py={2} href={child.href}>
//                 {child.label}
//               </Link>
//             ))}
//         </Stack>
//       </Collapse>
//     </Stack>
//   )
// }