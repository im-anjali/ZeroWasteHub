import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Achievements from "./pages/Achievements";
import About from "./pages/About";
import Home from "./pages/Home";
import SignUp from "./components/SignupPage";
import RequestorDashboard from "./pages/dashboards/RequestorDashboard";

const App = () => {
  return (
   <>
      <Navbar />
      <Routes>
        <Route path="/requestor-dashboard" element={<RequestorDashboard />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/achievements" element={<Achievements/>}/>
      </Routes>
  </>
  );
};

export default App;
