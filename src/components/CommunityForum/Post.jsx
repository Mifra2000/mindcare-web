import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  ButtonGroup,
  Button,
  Avatar,
  AvatarBadge,
  Link,
} from "@chakra-ui/react";
import axios from "axios";

// import { FaRegBell, FaCog } from "react-icons/fa";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

function Post() {
  const therapistData = localStorage.getItem("therapist");
  // Parse the retrieved string back into an object
  const [therapistLocal, setTherapistLocal] = useState(
    JSON.parse(therapistData)
  );
  const [therapistPicture, setTherapistPicture] = useState(
    therapistLocal.picture
  );
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    axios.get("/posts").then((response) => {
      setPostData(response.data.data);
      console.log("resposne data: ", response.data.data);
      console.log("tags: ", response.data.data.tags);
    });
  }, []);
  return (
    <div>
      {postData.map((post) => {
        return (
          <Card key={post._id} style={{ margin: 10 }}>
            <CardHeader
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link
                to={"/therapistprofile"}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Avatar
                  size={"md"}
                  src={therapistLocal.picture}
                  style={{ justifyContent: "flex-end" }}
                >
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
                <p style={{ marginTop: "1rem" }}>@mifrawaseem</p>
              </Link>
              <ButtonGroup gap="4">
                {post.tags.map((tag) => {
                  if (tag == "Anxiety") {
                    return (
                      <Button key={tag} colorScheme="purple" size="sm">
                        {tag}
                      </Button>
                    );
                  } else if (tag == "Depression") {
                    return (
                      <Button key={tag} colorScheme="pink" size="sm">
                        {tag}
                      </Button>
                    );
                  } else if (tag == "Advice") {
                    return (
                      <Button key={tag} colorScheme="orange" size="sm">
                        {tag}
                      </Button>
                    );
                  }
                  // return (
                  //   <Button colorScheme="pink" size="sm">
                  //     {tag}
                  //   </Button>
                  // );
                })}

                {/* <Button colorScheme="purple" size="sm">
                  Anxiety
                </Button> */}
              </ButtonGroup>
            </CardHeader>
            <CardBody>
              <Text style={{ fontWeight: "bold" }}>{post.title}</Text>
              <Text>{post.body}</Text>
            </CardBody>
            <CardFooter>{/* <FaRegBell /> */}</CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default Post;
