
import {
  addDoc, collection, Timestamp,
  query, where,
  onSnapshot, orderBy,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from './config';

export interface Comment {
  id?: string;
  postId: string;
  parentId?: string; // undefined for root-level comments
  author: string;
  photoURL?: string;
  content: string;
  replyToUser?: string; // username you replied to
  createdAt: Timestamp;

}

export const addComment = async (comment: Omit<Comment, 'createdAt'>) => {
  return await addDoc(collection(db, 'comments'), {
    ...comment,
    createdAt: Timestamp.now()
  });
};


export const listenComments = (postId: string, callback: (comments: Comment[]) => void) => {
    try {
      const q = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        orderBy('createdAt', 'asc')
      );
      return onSnapshot(q, snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Comment) }));
        callback(data);
      });
    } catch (err) {
      console.error('Failed to listen to comments:', err);
      return () => {}; // no-op unsubscribe
    }
  };
  

export interface ThreadedComment extends Comment {
  replies: ThreadedComment[];
}

export const nestComments = (list: Comment[]): ThreadedComment[] => {
  const map = new Map<string, ThreadedComment>();
  list.forEach(c => map.set(c.id!, { ...c, replies: [] }));
  const roots: ThreadedComment[] = [];
  map.forEach(c => {
    if (c.parentId) {
      const parent = map.get(c.parentId);
      parent?.replies.push(c);
    } else {
      roots.push(c);
    }
  });
  return roots;
};


  // export const deleteComment = async (commentId: string) => {
  //   await deleteDoc(doc(db, 'comments', commentId));
  // };

  // export const deleteCommentWithReplies = async (commentId: string) => {
  //   // Step 1: Find all replies where parentId === commentId
  //   const repliesQuery = query(
  //     collection(db, 'comments'),
  //     where('parentId', '==', commentId)
  //   );
  //   const repliesSnapshot = await getDocs(repliesQuery);
  
  //   // Step 2: Recursively delete each reply first
  //   for (const replyDoc of repliesSnapshot.docs) {
  //     await deleteCommentWithReplies(replyDoc.id); // recurse
  //   }
  
  //   // Step 3: Delete the main comment
  //   await deleteDoc(doc(db, 'comments', commentId));
  // };
  
// Recursive delete of a comment and its replies
export const deleteCommentWithReplies = async (commentId: string) => {
  const repliesSnapshot = await getDocs(
    query(collection(db, "comments"), where("parentId", "==", commentId))
  );

  const deletePromises = repliesSnapshot.docs.map((docSnap) =>
    deleteCommentWithReplies(docSnap.id)
  );

  await Promise.all(deletePromises);
  await deleteDoc(doc(db, "comments", commentId));
};


// Edit comment content (current user only)
export const editComment = async (commentId: string, content: string) => {
  await updateDoc(doc(db, "comments", commentId), {
    content,
  });
};