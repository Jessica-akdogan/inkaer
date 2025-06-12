import React from "react";
import type { ThreadedComment } from "../../../firebase/comments";
import CommentItem from "./CommentItem";


interface Props {
  comments: ThreadedComment[];
  depth: number;
  visibleReplies: { [key: string]: number };
  setVisibleReplies: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  activeForm: string | null;
  setActiveForm: (id: string | null) => void;
  formContent: string;
  setFormContent: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (parentId: string | null, replyToUser?: string) => void;
  user: any;
  loadingId: string | null;
}

const Thread: React.FC<Props> = (props) => {
  return (
    <>
      {props.comments.map((c) => (
        <CommentItem
          key={c.id}
          comment={c}
          {...props}
        />
      ))}
    </>
  );
};

export default Thread;
