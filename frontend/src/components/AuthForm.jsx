import React, { useState } from "react";
import axios from "axios";

const AuthForm = ({ mode }) => {
  const [selectedRole, setSelectedRole] = useState("donor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5000/${mode}`;
      const payload = mode === "signup" ? { name, email, password, role: selectedRole } : { email, password, role: selectedRole };
      const { data } = await axios.post(url, payload);
      localStorage.setItem("token", data.token);
      alert(`${mode} success as ${data.user.role}`);
      // optionally redirect to dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center p-10 space-y-4">
      <h2 className="text-2xl font-semibold">{mode === "signup" ? "Sign Up" : "Login"}</h2>

      {mode === "signup" && (
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        className="border p-2 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="ngo">NGO</option>
        <option value="donor">Donor</option>
        <option value="volunteer">Volunteer</option>
        <option value="receiver">Receiver</option>
      </select>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={handleSubmit}
      >
        {mode === "signup" ? "Sign Up" : "Login"}
      </button>
    </div>
  );
};

export default AuthForm;
