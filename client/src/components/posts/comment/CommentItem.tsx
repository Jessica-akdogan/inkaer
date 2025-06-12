import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";
import Thread from "./Thread";
import {
  //deleteCommentWithReplies,
  editComment,
  type ThreadedComment,
} from "../../../firebase/comments";
import EmojiPickerButton from "./EmojiPickerButton";

interface Props {
  comment: ThreadedComment;
  depth: number;
  visibleReplies: { [key: string]: number };
  setVisibleReplies: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  activeForm: string | null;
  setActiveForm: (id: string | null) => void;
  formContent: string;
  setFormContent: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (parentId: string | null, replyToUser?: string) => void;
  user: any;
  loadingId: string | null;
}

const COMMENTS_BATCH = 3;

const CommentItem: React.FC<Props> = ({
  comment: c,
  depth,
  visibleReplies,
  setVisibleReplies,
  activeForm,
  setActiveForm,
  formContent,
  setFormContent,
  handleSubmit,
  user,
  loadingId,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(c.content);

  if (!c.id) return null;

  // const handleDelete = async () => {
  //   if (!c.id) return;
  //   await deleteCommentWithReplies(c.id);
  // };

  const handleEdit = async () => {
    if (!c.id || !editContent.trim()) return;
    await editComment(c.id, editContent);
    setEditMode(false);
  };

  const visibleCount = visibleReplies[c.id] || 2;
  const showReplies = expanded ? c.replies.slice(0, visibleCount) : [];

  return (
    <div className={`comment depth-${depth}`}>
      <div className="top-row">
        <img
          src={c.photoURL || "/placeholder-avatar.png"}
          className="avatar"
          alt="avatar"
        />
        <div className="meta">
          <strong>{c.author}</strong>
          {c.replyToUser && (
            <span className="reply-to"> ↪ @{c.replyToUser}</span>
          )}
          <div className="meta-row">
            <span>
              {formatDistanceToNow(c.createdAt.toDate(), { addSuffix: true })}
            </span>
            <span
              className="hide-form toggle-visibility"
              onClick={() => setHidden(!hidden)}
            >
              {hidden ? "👁 Show" : "🙈 Hide"}
            </span>
          </div>
        </div>
      </div>

      {!hidden && (
        <>
          {editMode ? (
            <div className="reply-form">
            <EmojiPickerButton
  onSelect={(emoji) => setFormContent((prev) => prev + emoji)}
  disabled={!user}
/>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="edit-actions">
                <span onClick={handleEdit} className="btn-link">
                  Save
                </span>
                <span onClick={() => setEditMode(false)} className="btn-link">
                  Cancel
                </span>
              </div>
            </div>
          ) : (
            <div className="content">
              <ReactMarkdown>{c.content}</ReactMarkdown>
            </div>
          )}

          {activeForm !== c.id && !editMode && (
            <div className="actions">
              {user && (
                <span onClick={() => setActiveForm(c.id!)} className="btn-link">
                  Reply
                </span>
              )}
              {user?.displayName === c.author && (
                <>
                  {/* <span onClick={() => setEditMode(true)} className="btn-link">
                    Edit
                  </span>
                  <span onClick={handleDelete} className="btn-link">
                    Delete
                  </span> */}
                 <span  className="btn-link">
                    Edit
                  </span>
                  <span  className="btn-link">
                    Delete
                  </span>
                </>
              )}
            </div>
          )}
          <AnimatePresence>
            {activeForm === c.id && (
              <motion.div
                className="reply-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
              <EmojiPickerButton
  onSelect={(emoji) => setFormContent((prev) => prev + emoji)}
  disabled={!user}
/>
                <textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder={`Replying to @${c.author}`}
                />
                <div className="reply-actions">
                  <button
                    onClick={() => handleSubmit(c.id!, c.author)}
                    disabled={loadingId === c.id}
                    className="btn-link"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => setActiveForm(null)}
                    className="btn-link"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {c.replies.length > 0 && !expanded && (
            <div className="view-replies" onClick={() => setExpanded(true)}>
              View replies ({c.replies.length})
            </div>
          )}

          {expanded && (
            <div className="replies">
              <Thread
                comments={showReplies}
                depth={depth + 1}
                visibleReplies={visibleReplies}
                setVisibleReplies={setVisibleReplies}
                activeForm={activeForm}
                setActiveForm={setActiveForm}
                formContent={formContent}
                setFormContent={setFormContent}
                handleSubmit={handleSubmit}
                user={user}
                loadingId={loadingId}
              />
              {c.replies.length > visibleCount && (
                <div
                  className="load-more"
                  onClick={() =>
                    setVisibleReplies((prev) => ({
                      ...prev,
                      [c.id!]: (prev[c.id!] || 2) + COMMENTS_BATCH,
                    }))
                  }
                >
                  Load more replies
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentItem;
