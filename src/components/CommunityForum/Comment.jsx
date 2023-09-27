import React, { useState, useEffect } from "react";
import { Button, Input } from "@chakra-ui/react";
import axios from "axios";

export default function Comment({ postId, therapistId }) {
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
        <div>
          <Button size="sm" onClick={postComment}>
            Post
          </Button>
          <Button size="sm" onClick={() => setIsReplying(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button size="sm" onClick={() => setIsReplying(true)}>
          Reply
        </Button>
      )}
      {isReplying && (
        <Input
          placeholder="What are your thoughts?"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        ></Input>
      )}
    </div>
  );
}
