import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stack, Avatar, AvatarBadge, IconButton } from "@chakra-ui/react";
import { FaRegBell } from "react-icons/fa";

function PersonalNavigator() {
  const therapistData = localStorage.getItem("therapist");

  // Parse the retrieved string back into an object
  const [therapistLocal, setTherapistLocal] = useState(
    JSON.parse(therapistData)
  );
  const [therapistPicture, setTherapistPicture] = useState(
    therapistLocal.picture
  );
  return (
    <div className="drawer">
      <div className="tray">
        <IconButton
          aria-label="notifications"
          icon={<FaRegBell />}
          variant="ghost"
          colorScheme="gray"
          mr={3}
          fontSize={"25"}
        />

        <Link to={"/therapistprofile"}>
          <Avatar
            size={"md"}
            src={therapistLocal.picture}
            style={{ justifyContent: "flex-end" }}
          >
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </Link>
      </div>

      <h5>PERSONAL NAVIGATOR</h5>
      <Stack
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Link
          style={{ marginBottom: "7%", fontSize: "smaller" }}
          to="/dashboard"
        >
          Your questions
        </Link>
        <Link style={{ marginBottom: "7%", fontSize: "smaller" }} to="/profile">
          Your answers
        </Link>
        <Link style={{ marginBottom: "7%", fontSize: "smaller" }} to="">
          Your likes and votes
        </Link>
        <Link style={{ marginBottom: "7%", fontSize: "smaller" }} to="">
          Your bookmarks
        </Link>
      </Stack>
    </div>
  );
}

export default PersonalNavigator;
