import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Hotel from "./components/Hotel";
import HotelDetail from "./components/HotelDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;