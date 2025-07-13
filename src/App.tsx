import { useState } from "react";
import "./App.css";

import LandingPage from "./Components/LandingPage";
import Navbar from "./Components/Navbar/NavBar";
import Footer from "./Components/Footer/Footer";
import DashboardLayout from "./Components/Dashboard/DashBoardLayout";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ErrorPage from "./Components/ErrorPage";
import ShortenUrlPage from "./Components/Dashboard/ShortnerUrlPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      {/* ✅ Global Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/:url" element={<ShortenUrlPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
