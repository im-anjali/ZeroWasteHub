import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

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

    const user = {
      ...data.user,
      token: token,
    };

    update(user); 
    switch (data.user.role) {
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "ngo":
        navigate("/ngo-dashboard");
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
    <div className="flex flex-col items-center p-10 mt-20 space-y-4">
      <h2 className="text-2xl font-semibold">Login</h2>

      <input
        className="border border-gray-400 p-2 rounded w-96"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border border-gray-400 p-2 rounded w-96"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="border border-gray-400 p-2 rounded w-96"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        <option value="" disabled>
          Select role
        </option>
        <option value="admin">Admin</option>
        <option value="ngo">NGO</option>
        <option value="donor">Donor</option>
        <option value="volunteer">Volunteer</option>
        <option value="requestor">Requestor</option>
      </select>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-96"
        onClick={handleLogin}
      >
        Login
      </button>

      <p className="text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
