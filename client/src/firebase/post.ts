import { addDoc, collection,  getDocs,  Timestamp } from 'firebase/firestore';
import { db } from './config';


export interface Post {
  id?: string;
  title: string;
  content: string;
  author: string;
  createdAt: Timestamp;
}



export const createPost = async (post: Omit<Post, 'createdAt'>) => {
  return await addDoc(collection(db, 'posts'), {
    ...post,
    createdAt: Timestamp.now(),
  });
};


export const getAllPosts = async (): Promise<Post[]> => {
    const snapshot = await getDocs(collection(db, 'posts'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
  };



