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
import PostDonations from "./pages/dashboards/PostDonations";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import DonationDashboard from "./pages/dashboards/DonationDashboard";
import MyDonations from "./pages/dashboards/MyDonations";
import OAuthSuccess from "./components/OAuthSuccess";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/requestor-dashboard" element={<RequestorDashboard />} />
        <Route path="/requestor/browse" element={<TempBrowseItems />} />
        <Route path="/requestor/requests" element={<MyRequests />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/post-donations" element={<PostDonations />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/donor-dashboard" element={<DonationDashboard />} />
        <Route path="/my-donations" element={<MyDonations />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />


      </Routes>
    </>
  );
};

export default App;
