import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Achievements from "./pages/Achievements";
import About from "./pages/About";
import Home from "./pages/Home";
import SignUp from "./components/SignupPage";
import RequestorDashboard from "./pages/dashboards/RequestorDashboard";
import LoginPage from "./components/LoginPage";
import VolunteerDashboard from "./pages/dashboards/VolunteerDashboard";
import TempBrowseItems from "./pages/requestor/TempBrowseItems";
import MyRequests from "./pages/requestor/MyRequests";
import DonorDashboard from "./pages/dashboards/DonorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
const App = () => {
  return (
   <>
      <Navbar />
      <Routes>
        <Route path = "/volunteer-dashboard" element={<VolunteerDashboard/>}/>
        <Route path="/requestor-dashboard" element={<RequestorDashboard />} />
        <Route path="/requestor/browse" element={<TempBrowseItems/>} />
        <Route path="/requestor/requests" element={<MyRequests/>} />
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/achievements" element={<Achievements/>}/>
         <Route path="/donations" element={<DonorDashboard/>}/>
           <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
  </>
  );
};

export default App;
