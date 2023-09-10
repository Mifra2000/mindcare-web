import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
const SideBar = ({ therapist }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //console.log('data', therapist)
  const btnRef = React.useRef();
  const handleLogout = () => {
    // Clear tokens from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Navigate to the signin page
    navigate("/signin");
  };
  return (
    <>
      <HamburgerIcon w={9} h={9} onClick={onOpen} fontSize="17" />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Mind Care</DrawerHeader>
          <DrawerBody>
            <Stack
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Link
                style={{ marginBottom: "7%" }}
                to="/dashboard"
                state={therapist}
              >
                Appointments
              </Link>
              <Link
                style={{ marginBottom: "7%" }}
                to="/profile"
                state={therapist}
              >
                Profiles
              </Link>
              <Link style={{ marginBottom: "7%" }} to="" state={therapist}>
                Requests
              </Link>
              <Link style={{ marginBottom: "7%" }} to="" state={therapist}>
                Messages
              </Link>
              <Link
                style={{ marginBottom: "7%" }}
                to="/forum"
                state={therapist}
              >
                Forum
              </Link>
              <Link
                style={{ marginBottom: "7%" }}
                to="/settings"
                state={therapist}
              >
                Settings
              </Link>
              <Link
                style={{ marginBottom: "7%" }}
                to="/signin"
                onClick={handleLogout}
              >
                Logout
              </Link>{" "}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default SideBar;
