import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Volunteers from './pages/Volunteers';
import PlantationDrives from './pages/PlantationDrives';
import Trees from './pages/Trees';
import CheckIns from './pages/CheckIns';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/drives" element={<PlantationDrives />} />
            <Route path="/trees" element={<Trees />} />
            <Route path="/check-ins" element={<CheckIns />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
