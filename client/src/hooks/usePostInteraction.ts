import { useEffect, useState } from 'react';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const usePostInteraction = (postId: string, userId: string) => {
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const docRef = doc(db, 'posts', postId);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const likesArr: string[] = data.likes || [];
        const dislikesArr: string[] = data.dislikes || [];

        setLikes(likesArr.length);
        setDislikes(dislikesArr.length);
        setHasLiked(likesArr.includes(userId));
        setHasDisliked(dislikesArr.includes(userId));
      }
    });

    return () => unsubscribe();
  }, [postId, userId]);

  const handleLike = async () => {
    if (!userId) return;
    const postRef = doc(db, 'posts', postId);

    if (hasLiked) {
      await updateDoc(postRef, { likes: arrayRemove(userId) });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(userId),
        dislikes: arrayRemove(userId),
      });
    }
  };

  const handleDislike = async () => {
    if (!userId) return;
    const postRef = doc(db, 'posts', postId);

    if (hasDisliked) {
      await updateDoc(postRef, { dislikes: arrayRemove(userId) });
    } else {
      await updateDoc(postRef, {
        dislikes: arrayUnion(userId),
        likes: arrayRemove(userId),
      });
    }
  };

  return {
    likes,
    dislikes,
    hasLiked,
    hasDisliked,
    handleLike,
    handleDislike,
  };
};
