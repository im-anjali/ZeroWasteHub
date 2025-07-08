import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

const SignupForm = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { update } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`;
      const payload = { name, email, password, role: selectedRole };
      const { data } = await axios.post(url, payload);
      localStorage.setItem("token", data.token);
      const user = { ...data.user, token: data.token };
      console.log("Signed up user:", user);
      update(user);
      switch (data.user.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "donor":
          navigate("/donor-dashboard");
          break;
        case "volunteer":
          navigate("/volunteer-dashboard");
          break;
        case "receiver":
        case "requestor":
          navigate("/requestor-dashboard");
          break;
        default:
          navigate("/dashboard");
          break;
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-300 p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full border border-gray-300 p-2 rounded"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="" disabled>
            Select role
          </option>
          <option value="donor">Donor</option>
          <option value="volunteer">Volunteer</option>
          <option value="requestor">Requestor</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        <button
          onClick={() => {
            if (!selectedRole) {
              alert("Please select a role first.");
              return;
            }
            window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google?role=${selectedRole}&mode=signup`;
          }}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Sign Up with Google
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
