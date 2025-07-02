// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pendingDonations, setPendingDonations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPendingDonations();
  }, []);

  const fetchPendingDonations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/admin/pending-donations');
      setPendingDonations(res.data);
    } catch (err) {
      console.error('Failed to fetch pending donations', err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/admin/approve-donation/${id}`);
      setMessage('Donation approved!');
      fetchPendingDonations(); // Refresh list
    } catch (err) {
      console.error('Approval failed', err);
      setMessage('Error approving donation.');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/reject-donation/${id}`);
      setMessage('Donation rejected!');
      fetchPendingDonations(); // Refresh list
    } catch (err) {
      console.error('Rejection failed', err);
      setMessage('Error rejecting donation.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Admin Dashboard</h1>
      {message && <p className="text-green-600 font-medium mb-4">{message}</p>}

      {pendingDonations.length === 0 ? (
        <p>No pending donations</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {pendingDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white p-4 rounded-lg shadow-md border border-green-200"
            >
              <img
                src={`http://localhost:5000/image/${donation.imageFileId}`}
                alt="Donation Item"
                className="w-full h-48 object-cover rounded mb-4"
              />
              <p><strong>Item:</strong> {donation.itemName}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Condition:</strong> {donation.condition}</p>
              <p><strong>Pickup Address:</strong> {donation.pickupAddress}</p>
              <p><strong>Pickup Date:</strong> {new Date(donation.pickupDate).toLocaleDateString()}</p>
              <p><strong>Donor ID:</strong> {donation.donor}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleApprove(donation._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(donation._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
