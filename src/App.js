import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Breeds from './pages/breeds';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Breeds/>} />
      </Routes>
    </Router>
  );
}

export default App;
