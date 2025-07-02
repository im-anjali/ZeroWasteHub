import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonations, setSelectedDonations] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPendingDonations();
  }, []);

  const fetchPendingDonations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/admin/pending-donations');
      setDonations(res.data);
    } catch (err) {
      console.error('Error fetching donations:', err);
    }
  };

  const handleCheckboxChange = (id, action) => {
    setSelectedDonations((prev) => ({
      ...prev,
      [id]: action
    }));
  };

  // Submit all selected approve/reject actions
  const handleSubmitActions = async () => {
    try {
      const actions = Object.entries(selectedDonations);

      for (const [id, action] of actions) {
        if (action === 'approve') {
          await axios.post(`http://localhost:5000/admin/approve/${id}`);
        } else if (action === 'reject') {
          await axios.delete(`http://localhost:5000/admin/delete/${id}`);
        }
      }

      setMessage('Actions processed successfully.');
      setSelectedDonations({});
      fetchPendingDonations(); // refresh list
    } catch (err) {
      console.error('Error processing actions:', err);
      setMessage('An error occurred while processing actions.');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Admin Dashboard - Pending Donations</h1>

      {message && (
        <div className="mb-4 p-3 text-center bg-green-100 text-green-800 rounded shadow">
          {message}
        </div>
      )}

      {donations.length === 0 ? (
        <p className="text-center text-gray-600">No pending donations.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white p-4 rounded-xl shadow-md border border-green-200"
            >
            
         <img
  src={`http://localhost:5000/api/image/${donation.imageFileId}`}
  alt="Donation Item"
  className="w-full h-40 object-cover rounded"
/>


              <p><strong>Item:</strong> {donation.itemName}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Condition:</strong> {donation.condition}</p>
              <p><strong>Pickup:</strong> {donation.pickupAddress}</p>
              <p><strong>Date:</strong> {new Date(donation.pickupDate).toLocaleDateString()}</p>
              <p><strong>Donor ID:</strong> {donation.donor}</p>

              <div className="mt-4 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`action-${donation._id}`}
                    onChange={() => handleCheckboxChange(donation._id, 'approve')}
                    checked={selectedDonations[donation._id] === 'approve'}
                  />
                  Approve
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`action-${donation._id}`}
                    onChange={() => handleCheckboxChange(donation._id, 'reject')}
                    checked={selectedDonations[donation._id] === 'reject'}
                  />
                  Reject
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      {donations.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmitActions}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow-md"
          >
            Submit Selected Actions
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
