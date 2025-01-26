// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCatxC4N7bfyJ_Dy8e1Yz2H4sq7C8DqDnE",
  authDomain: "swamphacks-12f7c.firebaseapp.com",
  projectId: "swamphacks-12f7c",
  storageBucket: "swamphacks-12f7c.firebasestorage.app",
  messagingSenderId: "131846706247",
  appId: "1:131846706247:web:3f5d21d641a02a6d22cd62",
  measurementId: "G-873CEV8C92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);