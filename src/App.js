import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TaskPage from './pages/TaskPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/task/:id" element={<TaskPage />} />
    </Routes>
  </Router>
);

export default App;
