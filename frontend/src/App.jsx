import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import PlanDetails from "./pages/PlanDetails";

export default function App() {
  return (
    <Router>
      {/* Optional global nav */}
      <nav style={{ padding: '10px 30px', backgroundColor: '#7b98c8', color: 'white' }}>
        <Link to="/" style={{ marginRight: '15px', color: 'white' }}>Home</Link>
        <Link to="/login" style={{ marginRight: '15px', color: 'white' }}>Login</Link>
        <Link to="/signup" style={{ marginRight: '15px', color: 'white' }}>Signup</Link>
        <Link to="/dashboard" style={{ marginRight: '15px', color: 'white' }}>Dashboard</Link>
        <Link to="/feed" style={{ color: 'white' }}>Feed</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/plan/:id" element={<PlanDetails />} />

      </Routes>
    </Router>
  );
}
