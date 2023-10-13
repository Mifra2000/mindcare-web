import React, { useState, useEffect } from "react";
import { Button, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { BiComment } from "react-icons/bi";

export default function Reply({ commentId, postId, therapistId }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [replyState, setReplyState] = useState(false);

  useEffect(() => {}, [replyState]);

  const postReply = async () => {
    console.log("reply body: ", replyBody);
    console.log("post id for comment: ", postId);
    console.log("reply therapise id: ", therapistId);
    const replyObject = {
      postId: postId,
      therapistId: therapistId,
      body: replyBody,
      commentId: commentId,
    };
    const response = await axios.post(
      `/reply-to-comment/${commentId}`,
      replyObject
    );
    console.log("reply response: ", response);
    setReplyBody("");
    // setCommentState(!replyState);
  };
  return (
    <div>
      {/* <span>{body}</span> */}
      {isReplying ? (
        <div style={{ paddingTop: "2rem", paddingBottom: "0.5rem" }}>
          <Button size="sm" onClick={postReply} style={{ marginRight: "1rem" }}>
            Post
          </Button>
          <Button size="sm" onClick={() => setIsReplying(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <BiComment onClick={() => setIsReplying(true)}>Reply</BiComment>
      )}
      {isReplying && (
        <Textarea
          placeholder="What are your thoughts?"
          value={replyBody}
          onChange={(e) => setReplyBody(e.target.value)}
        ></Textarea>
      )}
    </div>
  );
}
