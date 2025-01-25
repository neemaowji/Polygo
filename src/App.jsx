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



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Roadmap />} />
      </Routes>
    </Router>

  )
}

export default App
