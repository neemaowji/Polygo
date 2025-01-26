import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
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
import About from './components/About';
import Login from './components/Login';
import PyPlayground from './components/PyPlayground';
import ProtectedRoute from './components/Protectedroute';

import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/learn" element={<Roadmap />} />
          <Route path="/quiz/:topic" element={<Quiz />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/PyPlayground" element={<PyPlayground />} />
        </Route>
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>

  )
}

export default App
