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
import { DeleteIcon } from "@chakra-ui/icons";
import moment from "moment";

import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
} from "react-icons/bi";
import { PolygonSettings } from "@syncfusion/ej2-react-pdfviewer";

function Post() {
  const therapistLocal = JSON.parse(localStorage.getItem("therapist"));
  const [postData, setPostData] = useState([]);
  const [voteStates, setVoteStates] = useState({});
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

  useEffect(() => {
    axios.get("/posts").then((response) => {
      console.log("post: ", response.data.data);
      setPostData(response.data.data);
      initializeVoteStates(response.data.data);
    });
  }, []);

  const dateConversion = (createdAt) => {
    const date = new Date(createdAt); // Create a Date object from the ISO string
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    )}`;
    console.log(formattedDate);
    return formattedDate;
  };

  const addUpvote = async (postId) => {
    console.log("HWyyyyy");
    const post = postData.find((data) => {
      return postId === data._id;
    });
    console.log("post selectedd: ", post);
    if (post.upvotes.length != 0) {
      console.log("mifra");
      const found = post.upvotes.find((post) => {
        return post.postId == postId;
      });
      console.log("found: ", found);
      if (!found) {
        console.log("else iff");
        const postSelected = {
          therapistId: post.therapistId._id,
          postId: post._id,
          upvoteState: true,
        };
        axios.post(`/upvote-post/${postId}`, postSelected).then((response) => {
          const updatedPost = response.data;
          console.log("updated post: ", updatedPost);
          setVoteStates((prevVoteStates) => ({
            ...prevVoteStates,
            [postId]: { upvote: false, downvote: true },
          }));
        });
      }
      post.downvotes.map((post) => {
        console.log("gg");
        if (post.postId == postId) {
          console.log("upvote post id: ", post._id);
          axios
            .delete(`/downvote-post/${postId}/${post._id}`)
            .then((response) => {
              const deletedPost = response.data;
              console.log("post deleted: ", deletedPost);
              setVoteStates((prevVoteStates) => ({
                ...prevVoteStates,
                [postId]: { upvote: false, downvote: false },
              }));
            });
        }
      });
    } else if (post.upvotes.length == 0) {
      console.log("else iff");
      const postSelected = {
        therapistId: post.therapistId._id,
        postId: post._id,
        upvoteState: true,
      };
      axios.post(`/upvote-post/${postId}`, postSelected).then((response) => {
        const updatedPost = response.data;
        console.log("updated post: ", updatedPost);
        setVoteStates((prevVoteStates) => ({
          ...prevVoteStates,
          [postId]: { upvote: false, downvote: true },
        }));
      });
    }
    //  else {
    //   console.log("elseeeeeee");
    //   const found = post.upvotes.find((post) => {
    //     return post.postId == postId;
    //   });
    //   console.log("found: ", found);
    //   post.upvotes.map((post) => {
    //     if (post._id != postId) {
    //       const postSelected = {
    //         therapistId: post.therapistId._id,
    //         postId: post._id,
    //         upvoteState: true,
    //       };
    //       axios
    //         .post(`/upvote-post/${postId}`, postSelected)
    //         .then((response) => {
    //           const updatedPost = response.data;
    //           console.log("updated post: ", updatedPost);
    //           setVoteStates((prevVoteStates) => ({
    //             ...prevVoteStates,
    //             [postId]: { upvote: false, downvote: true },
    //           }));
    //         });
    //     }
    //   });
    // }

    // await axios
    //   .post(`/upvote-post/${postId}`, postSelected)
    //   .then((response) => {
    //     const updatedPost = response.data;
    //     console.log("updated post: ", updatedPost);
    //     setVoteStates((prevVoteStates) => ({
    //       ...prevVoteStates,
    //       [postId]: { upvote: true, downvote: false },
    //     }));
    //   });
  };

  const removeUpvote = async (postId) => {
    console.log("updated post: Oa");
    const post = postData.find((data) => {
      console.log("postData: ", postData);
      return postId === data._id;
    });
    console.log("post selected: ", post);
    console.log("therapist id: ", post.therapistId._id);
    console.log("upvoted post inside addDownvote function: ", post.upvotes);

    post.upvotes.map((post) => {
      console.log("gg");
      if (post.postId == postId) {
        console.log("upvote post id: ", post._id);
        axios.delete(`/upvote-post/${postId}/${post._id}`).then((response) => {
          const deletedPost = response.data;
          console.log("post deleted: ", deletedPost);
          setVoteStates((prevVoteStates) => ({
            ...prevVoteStates,
            [postId]: { upvote: false, downvote: false },
          }));
        });
      }
    });
  };

  const addDownvote = async (postId) => {
    console.log("HWyyyyy");
    const post = postData.find((data) => {
      return postId === data._id;
    });
    console.log("post selectedd: ", post);
    if (post.downvotes.length != 0) {
      console.log("mifra");
      const found = post.downvotes.find((post) => {
        return post.postId == postId;
      });
      console.log("found: ", found);
      if (!found) {
        console.log("else iff");
        const postSelected = {
          therapistId: post.therapistId._id,
          postId: post._id,
          downvoteState: true,
        };
        axios
          .post(`/downvote-post/${postId}`, postSelected)
          .then((response) => {
            const updatedPost = response.data;
            console.log("updated post: ", updatedPost);
            setVoteStates((prevVoteStates) => ({
              ...prevVoteStates,
              [postId]: { upvote: false, downvote: true },
            }));
          });
      }
      post.upvotes.map((post) => {
        console.log("gg");
        if (post.postId == postId) {
          console.log("downvote post id: ", post._id);
          axios
            .delete(`/upvote-post/${postId}/${post._id}`)
            .then((response) => {
              const deletedPost = response.data;
              console.log("post deleted: ", deletedPost);
              setVoteStates((prevVoteStates) => ({
                ...prevVoteStates,
                [postId]: { upvote: false, downvote: false },
              }));
            });
        }
      });
    } else if (post.downvotes.length == 0) {
      console.log("else iff");
      const postSelected = {
        therapistId: post.therapistId._id,
        postId: post._id,
        downvoteState: true,
      };
      axios.post(`/downvote-post/${postId}`, postSelected).then((response) => {
        const updatedPost = response.data;
        console.log("updated post: ", updatedPost);
        setVoteStates((prevVoteStates) => ({
          ...prevVoteStates,
          [postId]: { upvote: false, downvote: true },
        }));
      });
    }
  };

  const removeDownvote = async (postId) => {
    const post = postData.find((data) => {
      console.log("postData: ", postData);
      return postId === data._id;
    });
    console.log("post selected: ", post);
    console.log("therapist id: ", post.therapistId._id);
    console.log("upvoted post inside addDownvote function: ", post.downvotes);

    post.downvotes.map((post) => {
      console.log("gg");
      if (post.postId == postId) {
        console.log("downvote post id: ", post._id);
        axios
          .delete(`/downvote-post/${postId}/${post._id}`)
          .then((response) => {
            const deletedPost = response.data;
            console.log("post deleted: ", deletedPost);
            setVoteStates((prevVoteStates) => ({
              ...prevVoteStates,
              [postId]: { upvote: false, downvote: false },
            }));
          });
      }
    });
  };

  const initializeVoteStates = (data) => {
    const initialStates = {};

    data.forEach((post) => {
      console.log("post upvote: ", post.upvotes);
      const isUpvoted = post.upvotes.find((upvote) => {
        console.log("upvote: ", upvote);
        return upvote.therapistId === therapistLocal._id;
      });
      console.log("upvote state: ", isUpvoted);
      const isDownvoted = post.downvotes.find(
        (downvote) => downvote.therapistId === therapistLocal._id
      );

      initialStates[post._id] = {
        upvote: isUpvoted,
        downvote: isDownvoted,
      };
    });

    setVoteStates(initialStates);
  };

  const deletePost = (postId) => {
    axios
      .delete(`/posts/${postId}`)
      .then(() => {
        setPostData((prevData) =>
          prevData.filter((post) => post._id !== postId)
        );
        delete voteStates[postId];
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {postData.map((post) => {
        const { upvote, downvote } = voteStates[post._id] || {
          upvote: false,
          downvote: false,
        };
        return (
          <Card key={post._id} style={{ margin: 10 }}>
            <CardHeader
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link to={"/therapistprofile"}>
                <Avatar size={"md"} src={post.therapistId.picture}>
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
                <p style={{ marginTop: "1rem" }}>
                  {post.therapistId.firstName} {post.therapistId.lastName}
                </p>
              </Link>
              <ButtonGroup gap="4">
                {post.tags.map((tag) => (
                  <Button
                    key={tag}
                    colorScheme={
                      tag === "Anxiety"
                        ? "purple"
                        : tag === "Depression"
                        ? "pink"
                        : tag === "Advice"
                        ? "orange"
                        : "gray"
                    }
                    size="sm"
                  >
                    {tag}
                  </Button>
                ))}
              </ButtonGroup>
            </CardHeader>
            <CardBody>
              <Text style={{ fontWeight: "bold" }}>{post.title}</Text>
              <Text>{post.body}</Text>
              <Text>{dateConversion(post.createdAt)}</Text>
            </CardBody>
            <CardFooter>
              {upvote ? (
                <BiSolidUpvote onClick={() => removeUpvote(post._id)} />
              ) : (
                <BiUpvote onClick={() => addUpvote(post._id)} />
              )}
              {downvote ? (
                <BiSolidDownvote onClick={() => removeDownvote(post._id)} />
              ) : (
                <BiDownvote onClick={() => addDownvote(post._id)} />
              )}
              {post.therapistId._id === therapistLocal._id && (
                <DeleteIcon onClick={() => deletePost(post._id)} />
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default Post;
