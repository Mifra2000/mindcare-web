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
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
import Comment from "../CommunityForum/Comment";
import Reply from "../CommunityForum/Reply";

import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
} from "react-icons/bi";

function SinglePost({ post, upvote, downvote }) {
  console.log("post single post: ", post);
  useEffect(() => {
    console.log("hello");
    console.log("posts in single post: ", post);
  }, []);
  const therapistLocal = JSON.parse(localStorage.getItem("therapist"));
  console.log("therapistlocal id: ", therapistLocal._id);
  const [postData, setPostData] = useState([]);
  const [voteStates, setVoteStates] = useState({});
  const [isReadMore, setIsReadMore] = useState(true);
  const [isReplying, setIsReplying] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

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

  const getUpvoteStatus = (post) => {
    // console.log("type: ", type);
    const result = post.upvotes.filter((upvote) => {
      return upvote.therapistId == therapistLocal._id;
    });
    console.log("-----result-----");
    console.log(result);
    if (result.length > 0) return true;
    return false;
  };

  const getDownvoteStatus = (post) => {
    const result = post.downvotes.filter((downvote) => {
      return downvote.therapistId == therapistLocal._id;
    });
    console.log("-----result-----");
    console.log(result);
    if (result.length > 0) return true;
    return false;
  };

  const getCommentUpvoteStatus = (comment) => {
    const result = comment.upvotes.filter((upvote) => {
      return upvote.therapistId == therapistLocal._id;
    });
    console.log("-----result-----");
    console.log(result);
    if (result.length > 0) return true;
    return false;
  };
  const getCommentDownvoteStatus = (comment) => {};

  const addCommentUpvote = (postId, therapistId, commentId) => {
    const commentSelected = {
      postId: postId,
      therapistId: therapistId,
      commentId: commentId,
    };
    axios
      .post(`/upvote-comments/${commentId}`, commentSelected)
      .then((response) => {
        console.log("response: ", response);
      });
  };

  const removeCommentUpvote = () => {};

  const addUpvote = async (postId, therapistId) => {
    console.log("HWyyyyy");
    const postSelected = {
      postId: postId,
      therapistId: therapistId,
    };
    axios.post(`/upvote-post/${postId}`, postSelected).then((response) => {
      console.log("response: ", response);
    });
  };

  const removeUpvote = async (postId) => {
    const upvoteId = post.upvotes.find((upvote) => {
      if (upvote.postId == postId) {
        return upvote._id;
      }
    });
    console.log("upvote Id after: ", upvoteId._id);
    axios.delete(`/upvote-post/${postId}/${upvoteId._id}`).then((response) => {
      const deletedPost = response.data;
      console.log("upvote undone: ", deletedPost);
    });
  };

  const addDownvote = async (postId, therapistId) => {
    console.log("HWyyyyy");
    const postSelected = {
      postId: postId,
      therapistId: therapistId,
    };
    axios.post(`/downvote-post/${postId}`, postSelected).then((response) => {
      console.log("response: ", response);
    });
  };

  const removeDownvote = async (postId) => {
    const downvoteId = post.downvotes.find((downvote) => {
      if (downvote.postId == postId) {
        return downvote._id;
      }
    });
    console.log("upvote Id after: ", downvoteId._id);
    axios
      .delete(`/downvote-post/${postId}/${downvoteId._id}`)
      .then((response) => {
        const deletedPost = response.data;
        console.log("downvote undone: ", deletedPost);
      });
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
  const deleteComment = (commentId) => {
    console.log("inside delete comment function");
    console.log("comment id: ", commentId);
    axios
      .delete(`/comments/${commentId}`)
      .then((response) => {
        console.log("response comments deleted: ", response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div
      style={{
        maxHeight: "550px",
        overflowY: "scroll",
      }}
    >
      <Card style={{ margin: 10 }}>
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
          {post.body.length < 300 ? (
            <Text>{post.body}</Text>
          ) : (
            <Text>
              {isReadMore ? post.body.slice(0, 300) : post.body}
              <span
                onClick={toggleReadMore}
                className="read-or-hide"
                style={{ cursor: "pointer", color: "rgb(192, 192, 192)" }}
              >
                {isReadMore ? "...read more" : " show less"}
              </span>
            </Text>
          )}
        </CardBody>
        <CardFooter style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: "0.8rem" }}>
            {dateConversion(post.createdAt)}
          </Text>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {getUpvoteStatus(post) ? (
              <BiSolidUpvote onClick={() => removeUpvote(post._id)} />
            ) : (
              <BiUpvote
                onClick={() => addUpvote(post._id, post.therapistId._id)}
              />
            )}
            {getDownvoteStatus(post) ? (
              <BiSolidDownvote onClick={() => removeDownvote(post._id)} />
            ) : (
              <BiDownvote
                onClick={() => addDownvote(post._id, post.therapistId._id)}
              />
            )}
            {post.therapistId._id === therapistLocal._id && (
              <DeleteIcon onClick={() => deletePost(post._id)} />
            )}
            <Comment
              postId={post._id}
              therapistId={therapistLocal._id}
              // body={post.comments.body}
            />
          </div>
        </CardFooter>
        <div>
          {/* <Comment
            postId={post._id}
            therapistId={post.therapistId._id}
            // body={post.comments.body}
          /> */}
          <div>
            {/* {post.comments.map((comment) => {
              return <Text key={comment._id}>{comment}</Text>;
            })} */}
            {post.comments.map((comment) => {
              console.log("therapist name: ", comment);
              return (
                <div>
                  <Card
                    style={{
                      width: "95%",
                      display: "flex",
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem",
                      padding: "0.5rem",
                    }}
                    key={comment._id}
                  >
                    <CardHeader
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link to={"/therapistprofile"}>
                        <Avatar size={"md"} src={comment.therapistId.picture}>
                          <AvatarBadge boxSize="1.25em" bg="green.500" />
                        </Avatar>
                        <p style={{ marginTop: "1rem" }}>
                          {comment.therapistId.firstName}{" "}
                          {comment.therapistId.lastName}
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
                      <Text>{comment.body}</Text>
                    </CardBody>
                    <CardFooter>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        {getCommentUpvoteStatus(comment) ? (
                          <BiSolidUpvote
                            onClick={() => removeCommentUpvote(post._id)}
                          />
                        ) : (
                          <BiUpvote
                            onClick={() =>
                              addCommentUpvote(
                                post._id,
                                post.therapistId._id,
                                comment._id
                              )
                            }
                          />
                        )}
                        {getCommentDownvoteStatus(post) ? (
                          <BiSolidDownvote
                            onClick={() => removeDownvote(post._id)}
                          />
                        ) : (
                          <BiDownvote
                            onClick={() =>
                              addDownvote(post._id, post.therapistId._id)
                            }
                          />
                        )}
                      </div>
                      <DeleteIcon onClick={() => deleteComment(comment._id)} />
                      <Reply
                        commentId={comment._id}
                        postId={post._id}
                        therapistId={therapistLocal._id}
                      />
                    </CardFooter>
                    <div style={{ width: "95%" }}>
                      {comment.replies.map((reply) => {
                        return (
                          <Card style={{ marginBottom: "0.5rem" }}>
                            <CardHeader
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Link to={"/therapistprofile"}>
                                <Avatar
                                  size={"md"}
                                  src={reply.therapistId.picture}
                                >
                                  <AvatarBadge
                                    boxSize="1.25em"
                                    bg="green.500"
                                  />
                                </Avatar>
                                <p style={{ marginTop: "1rem" }}>
                                  {reply.therapistId.firstName}{" "}
                                  {reply.therapistId.lastName}
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
                              <Text>reply: {reply.body}</Text>
                            </CardBody>
                            <CardFooter>
                              <DeleteIcon
                                onClick={() => deleteComment(reply._id)}
                              />

                              <Reply
                                commentId={comment._id}
                                postId={post._id}
                                therapistId={therapistLocal._id}
                              />
                            </CardFooter>
                          </Card>
                        );
                      })}
                    </div>
                  </Card>
                  {/* <Comment
                      postId={post._id}
                      therapistId={post.therapistId}
                      commentId={comment._id}
                    /> */}
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SinglePost;
