import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { update } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password, role: selectedRole.toLowerCase() }
      );

      const token = data.token;
      if (!token) {
        console.log("No token found");
        return;
      }

      localStorage.setItem("token", token);
      const user = { ...data.user, token };
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
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
<div className="flex justify-center  px-4 pt-20 ">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

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
          <option value="" disabled>Select role</option>
          <option value="admin">Admin</option>
          <option value="donor">Donor</option>
          <option value="volunteer">Volunteer</option>
          <option value="requestor">Requestor</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
