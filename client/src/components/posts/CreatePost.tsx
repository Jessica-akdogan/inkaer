import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { createPost } from "../../firebase/post";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import EmojiPickerButton from "./comment/EmojiPickerButton";


interface CreatePostProps {
  onPostCreated?: () => void;
  isEditing?: boolean;
  initialTitle?: string;
  initialContent?: string;
  postId?: string;
}

const CreatePost: React.FC<CreatePostProps> = ({
  onPostCreated,
  isEditing = false,
  initialTitle = "",
  initialContent = "",
  postId,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      toast.error("Please log in to submit a post.");
      return;
    }

    if (title.trim() === "" || content.trim() === "") {
      toast.info("Title and content cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      if (isEditing && postId) {
        await updateDoc(doc(db, "posts", postId), {
          title: title.trim(),
          content: content.trim(),
        });
        toast.success("Post updated!");
      } else {
        await createPost({
          title: title.trim(),
          content: content.trim(),
          author: user.displayName || "Anonymous",
        });
        toast.success("Post created!");
        setTitle("");
        setContent("");
      }

      if (onPostCreated) onPostCreated();
    } catch (err) {
      toast.error(
        isEditing ? "Failed to update post." : "Failed to create post."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
   <div className="textarea-wrapper">
  <textarea
    placeholder="Content"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    required
  />

  <EmojiPickerButton
    onSelect={(emoji) => setContent((prev) => prev + emoji)}
    disabled={!user}
  />
</div>


      <button type="submit" disabled={loading}>
        {loading ? (
          <span className="spinner" />
        ) : isEditing ? (
          "Update Post"
        ) : (
          "Post"
        )}
      </button>
    </form>
  );
};

export default CreatePost;
