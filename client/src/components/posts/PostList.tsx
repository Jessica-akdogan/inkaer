import React, { Suspense, useEffect, useState } from "react";
import { type Post } from "../../firebase/post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { formatDistanceToNow } from "date-fns";
import { useAuthStore } from "../../store/useAuthStore";
import PostInteractions from "./interactions/PostInteractions";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(newPosts);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="post-list">
      <Suspense fallback={<p>Loading comments...</p>}>
        {posts.map((post) => (
          <PostInteractions
            key={post.id}
            postId={post.id!}
            title={post.title}
            content={post.content}
            userId={user?.uid || ""}
            author={post.author}
            createdAt={formatDistanceToNow(post.createdAt.toDate(), {
              addSuffix: true,
            })}
          />
        ))}
      </Suspense>
    </div>
  );
};

export default PostList;
