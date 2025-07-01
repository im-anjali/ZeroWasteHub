import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";

import Achievements from "./pages/Achievements";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<SignupPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/achivements" element={<Achievements/>}/>

      </Routes>
    </Router>
  );
};

export default App;
