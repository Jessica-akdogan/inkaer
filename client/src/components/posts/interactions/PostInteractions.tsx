import React, { lazy, useEffect, useState } from "react";
//import { usePostInteraction } from "../../../hooks/usePostInteraction";
// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   where,
//   writeBatch,
// } from "firebase/firestore";
// import { db } from "../../../firebase/config";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { EllipsisVertical } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import CreatePost from "../CreatePost";

const LazyCommentSection = lazy(() => import("../comment/CommentSection"));

interface PostProps {
  postId: string;
  content: string;
  userId: string;
  title: string;
  author: string;
  createdAt: any;
}

const PostInteractions: React.FC<PostProps> = ({
  postId,
  title,
  content,
 // userId,
  author,
  createdAt,
}) => {
//  const { likes, dislikes, hasLiked, hasDisliked, handleLike, handleDislike } =
  //  usePostInteraction(postId, userId);

  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  useEffect(() => {
    setEditTitle(title);
    setEditContent(content);
  }, [title, content]);

  const ref = useClickOutside(() => setOpen(false));

  // const handleEdit = () => {
  //   setIsEditing(true);
  //   setOpen(false);
  // };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // const handleDelete = async () => {
  //   if (!confirm("Delete post and all related data?")) return;
  //   const batch = writeBatch(db);

  //   batch.delete(doc(db, "posts", postId));

  //   const commentsSnap = await getDocs(
  //     query(collection(db, "comments"), where("postId", "==", postId))
  //   );
  //   commentsSnap.forEach((doc) => batch.delete(doc.ref));

  //   const likesSnap = await getDocs(
  //     query(collection(db, "likes"), where("postId", "==", postId))
  //   );
  //   likesSnap.forEach((doc) => batch.delete(doc.ref));

  //   const dislikesSnap = await getDocs(
  //     query(collection(db, "dislikes"), where("postId", "==", postId))
  //   );
  //   dislikesSnap.forEach((doc) => batch.delete(doc.ref));

  //   await batch.commit();
  // };

  return (
    <div className="post">
      <div className="post-header">
        <h3>{title}</h3>
        {user?.displayName === author && (
          <div className="dropdown" ref={ref}>
            <EllipsisVertical
              onClick={() => setOpen((o) => !o)}
              className="dots-icon"
            />
            {open && (
              // <div className="dropdown-menu">
              //   <button onClick={handleEdit}  className="text-left">Edit</button>
              //   <button onClick={handleDelete} className="text-left">Delete</button>
              // </div>
              <div className="dropdown-menu">
              <button  className="text-left">Edit</button>
              <button className="text-left">Delete</button>
            </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <>
          <CreatePost
            onPostCreated={() => setIsEditing(false)}
            initialTitle={editTitle}
            initialContent={editContent}
            isEditing
            postId={postId}
          />
          <button className="btn-link" onClick={handleCancelEdit}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <p>{content}</p>
          {/* <div className="interaction">
            <button
              className={`like-btn ${hasLiked ? "active" : ""}`}
              onClick={handleLike}
            >
              👍 {likes}  
            </button>
            <button
              className={`dislike-btn ${hasDisliked ? "active" : ""}`}
              onClick={handleDislike}
            >
              👎 {dislikes}
            </button>  
          </div> */}
          <div className="post-footer">
            <span className="author">— {author}</span>
            <span className="time">{createdAt}</span>
          </div>
         
          <LazyCommentSection postId={postId} />
        </>
      )}
    </div>
  );
};

export default PostInteractions;
