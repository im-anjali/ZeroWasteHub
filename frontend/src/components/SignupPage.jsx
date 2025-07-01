import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async () => {
    try {
      const url = `http://localhost:5000/api/auth/signup`;
      const payload = { name, email, password, role: selectedRole };
      const { data } = await axios.post(url, payload);
      localStorage.setItem("token", data.token);
      alert(`Signup success as ${data.user.role}`);
    } catch (err) {
      alert(err.response?.data?.message || "Signup error");
    }
  };

  return (
    <div className="flex flex-col items-center p-10 mt-30 space-y-4">
      <h2 className="text-2xl font-semibold">Sign Up</h2>

      <input
        className="border p-2 rounded w-96"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
  <option value="requestor">Requestor</option>
</select>


      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-96"
        onClick={handleSignup}
      >
        Sign Up
      </button>
      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-96" onClick={() => {
      if (!selectedRole) {
        alert("Please select a role first.");
        return;
      }
      window.location.href = `http://localhost:5000/auth/google?role=${selectedRole}&mode=signup`;
      }}>Sign Up with Google</button>

      <p className="text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
