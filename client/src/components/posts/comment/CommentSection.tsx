import React, { useState, useEffect, Suspense } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import {
  addComment,
  listenComments,
  nestComments,
  type ThreadedComment,
} from "../../../firebase/comments";
import EmojiPickerButton from "./EmojiPickerButton";


const Thread = React.lazy(() => import("./Thread"));

const COMMENTS_BATCH = 3;

interface Props {   
  postId: string;
}

const CommentSection: React.FC<Props> = ({ postId }) => {
  const [threaded, setThreaded] = useState<ThreadedComment[]>([]);
  const [visibleComments, setVisibleComments] = useState(0);
  const [formContent, setFormContent] = useState("");
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [visibleReplies, setVisibleReplies] = useState<{
    [key: string]: number;
  }>({});
  const { user } = useAuthStore();

  useEffect(() => {
    const unsub = listenComments(postId, (list) => {
      setThreaded(nestComments(list));
    });
    return unsub;
  }, [postId]);

  const handleSubmit = async (
    parentId: string | null,
    replyToUser?: string
  ) => {
    if (!formContent.trim()) return;
    if (!user) return alert("Please log in.");

    setLoadingId(parentId || "root");
    await addComment({
      postId,
      ...(parentId && { parentId }),
      author: user.displayName || "Anonymous",
      content: formContent.trim(),
      photoURL: user.photoURL,
      ...(replyToUser && { replyToUser }),
    });
    setFormContent("");
    setActiveForm(null);
    setLoadingId(null);
  };

  return (
    <div className="comment-section">
      <div className="new-comment">
      <EmojiPickerButton
  onSelect={(emoji) => setFormContent((prev) => prev + emoji)}
  disabled={!user}
/>

        <textarea
          placeholder={user ? "Add a comment ..." : "Log in to add a comment"}
          value={activeForm === null ? formContent : ""}
          onChange={(e) => {
            setFormContent(e.target.value);
            setActiveForm(null);
          }}
          disabled={!user}
        />
        <button
          onClick={() => handleSubmit(null)}
          disabled={!user || loadingId === "root"}
        >
          {loadingId === "root" ? "..." : "Comment"}
        </button>
      </div>

      {threaded.length > 0 && visibleComments === 0 && (
        <div
          className="view-comments"
          onClick={() => setVisibleComments(COMMENTS_BATCH)}
        >
          View comments ({threaded.length})
        </div>
      )}

      <Suspense fallback={<div>Loading comments...</div>}>
        {visibleComments > 0 && (
          <>
            <Thread
              comments={threaded.slice(0, visibleComments)}
              depth={0}
              visibleReplies={visibleReplies}
              setVisibleReplies={setVisibleReplies}
              activeForm={activeForm}
              setActiveForm={setActiveForm}
              formContent={formContent}
              setFormContent={setFormContent}
              handleSubmit={handleSubmit}
              // handleDelete={deleteComment}
              user={user}
              loadingId={loadingId}
            />
            {threaded.length > visibleComments && (
              <div
                className="load-more"
                onClick={() => setVisibleComments((v) => v + COMMENTS_BATCH)}
              >
                Load more comments
              </div>
            )}
          </>
        )}
      </Suspense>
    </div>
  );
};

export default CommentSection;
