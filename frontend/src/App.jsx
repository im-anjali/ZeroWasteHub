import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Achievements from "./pages/Achievements";



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/achivements" element={<Achievements/>}/>
      </Routes>
    </Router>
  );
};

export default App;
