import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Navbar from './components/Navbar';
import Roadmap from './components/Roadmap';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Practice from './components/Practice';
import QuestionList from './components/QuestionList';
import About from './components/About';
// Firebase services
import { getFirestore } from 'firebase/firestore'; 


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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Roadmap />} />
        <Route path="/quiz/:topic" element={<Quiz />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/questionlist" element={<QuestionList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>

  )
}

export default App
