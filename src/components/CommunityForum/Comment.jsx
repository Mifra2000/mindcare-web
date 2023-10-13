import React, { useState, useEffect } from "react";
import axios from "axios";
import Reply from "../CommunityForum/Reply";
import { Card, Button, Textarea } from "@chakra-ui/react";
import { BiComment } from "react-icons/bi";

export default function Comment({ postId, therapistId, commentId }) {
  const [isReplying, setIsReplying] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [commentState, setCommentState] = useState(false);

  useEffect(() => {}, [commentState]);

  const postComment = async () => {
    console.log("comment body: ", commentBody);
    console.log("post id for comment: ", postId);
    const commentObject = {
      postId: postId,
      therapistId: therapistId,
      body: commentBody,
    };
    const response = await axios.post(`/comments/${postId}`, commentObject);
    console.log("comment response: ", response);
    setCommentBody("");
    setCommentState(!commentState);
  };
  return (
    <div>
      {/* <span>{body}</span> */}
      {isReplying ? (
        <div style={{ paddingTop: "2rem", paddingBottom: "0.5rem" }}>
          <Button
            style={{ marginRight: "1rem" }}
            size="sm"
            onClick={postComment}
          >
            Post
          </Button>
          <Button size="sm" onClick={() => setIsReplying(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <BiComment
          style={{ marginLeft: "0.5rem" }}
          onClick={() => setIsReplying(true)}
        ></BiComment>
      )}
      {isReplying && (
        <Textarea
          placeholder="What are your thoughts?"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        ></Textarea>
      )}
      {/* <Reply commentId={commentId} postId={postId} therapistId={therapistId} /> */}
    </div>
  );
}
