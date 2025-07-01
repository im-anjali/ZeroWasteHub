import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const url = `http://localhost:5000/api/auth/login`;
      const payload = { email, password, role: selectedRole };
      const { data } = await axios.post(url, payload);
      localStorage.setItem("token", data.token);
      alert(`Login success as ${data.user.role}`);
    } catch (err) {
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="flex flex-col items-center p-10 mt-30 space-y-4">
      <h2 className="text-2xl font-semibold">Login</h2>

      <input
        className="border p-2 rounded w-96"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 rounded w-96"
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
  <option value="receiver">Receiver</option>
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

export default LoginForm;
