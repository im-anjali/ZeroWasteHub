import React, { useState } from "react";

const SignupPage = () => {
  const [selectedRole, setSelectedRole] = useState("donor");

  const handleSignup = () => {
    window.location.href = `http://localhost:5000/auth/google?role=${selectedRole}&mode=signup`;
  };

  return (
    <div className="flex flex-col items-center p-10 space-y-4">
      <h2 className="text-2xl font-semibold">Sign Up</h2>
      <label className="text-lg">Select your role:</label>
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
        onClick={handleSignup}
      >
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignupPage;
