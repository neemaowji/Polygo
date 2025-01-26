import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyCatxC4N7bfyJ_Dy8e1Yz2H4sq7C8DqDnE",
  authDomain: "swamphacks-12f7c.firebaseapp.com",
  projectId: "swamphacks-12f7c",
  storageBucket: "swamphacks-12f7c.firebasestorage.app",
  messagingSenderId: "131846706247",
  appId: "1:131846706247:web:3f5d21d641a02a6d22cd62",
  measurementId: "G-873CEV8C92"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
