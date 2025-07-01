import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";

import Achievements from "./pages/Achievements";
<<<<<<< HEAD
import About from "./pages/About";

=======
>>>>>>> 817d600ba3daaaadddaad664764a78e249d9e63a

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
<<<<<<< HEAD
        <Route path="/about" element={<About/>} />
        {/*<Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/achievements" element={<Achievements/>}/>
=======

        <Route path="/" element={<SignupPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/achivements" element={<Achievements/>}/>

>>>>>>> 817d600ba3daaaadddaad664764a78e249d9e63a
      </Routes>
    </Router>
  );
};

export default App;
