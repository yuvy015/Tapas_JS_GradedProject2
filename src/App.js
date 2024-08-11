import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import ResumeList from './ResumeList';
import './Login.css';
import './ResumeList.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/resumes" element={<ResumeList />} />
      </Routes>
    </Router>
  );
}

export default App;

