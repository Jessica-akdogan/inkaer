import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "newsletter-d59ff.firebaseapp.com",
    projectId: "newsletter-d59ff",
    storageBucket: "newsletter-d59ff.firebasestorage.app",
    messagingSenderId: "849892244936",
    appId: "1:849892244936:web:53aef170716aa4de4014fd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);