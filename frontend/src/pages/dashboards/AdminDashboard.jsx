import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonations, setSelectedDonations] = useState({});
  const [rejectionReasons, setRejectionReasons] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
  
      if (!user || user.role !== 'admin') {
        alert('Access denied. Only donors can access this page.');
        navigate('/login');
      }
    }, [navigate]);
  useEffect(() => {
    fetchPendingDonations();
  }, []);

  const fetchPendingDonations = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/pending-donations`);
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

    if (action === 'reject') {
      setRejectionReasons((prev) => ({
        ...prev,
        [id]: prev[id] || ""
      }));
    } else {
      setRejectionReasons((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const handleSubmitActions = async () => {
    try {
      const actions = Object.entries(selectedDonations);

      for (const [id, action] of actions) {
        if (action === 'approve') {
          await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/approve/${id}`);
        } else if (action === 'reject') {
          const reason = rejectionReasons[id] || "No reason provided";
          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/delete/${id}`, {
            data: { reason },
          });
        }
      }

      setMessage('Actions processed successfully.');
      setSelectedDonations({});
      setRejectionReasons({});
      fetchPendingDonations();
    } catch (err) {
      console.error('Error processing actions:', err);
      setMessage('An error occurred while processing actions.');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Admin Dashboard - Pending Donations
      </h1>

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
                src={`${import.meta.env.VITE_BACKEND_URL}/api/image/${donation.imageFileId}`}
                alt="Donation Item"
                className="w-full h-40 object-cover rounded"
              />

              <p><strong>Item:</strong> {donation.itemName}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Condition:</strong> {donation.condition}</p>
              <p><strong>Pickup:</strong> {donation.pickupAddress}</p>
              <p><strong>Date:</strong> {new Date(donation.pickupDate).toLocaleDateString()}</p>
              <p><strong>Donor ID:</strong> {donation.donor}</p>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => handleCheckboxChange(donation._id, 'approve')}
                  className={`px-4 py-2 rounded font-semibold ${
                    selectedDonations[donation._id] === 'approve'
                      ? 'bg-green-700 text-white'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  Approve
                </button>

                <button
                  onClick={() => handleCheckboxChange(donation._id, 'reject')}
                  className={`px-4 py-2 rounded font-semibold ${
                    selectedDonations[donation._id] === 'reject'
                      ? 'bg-red-600 text-white'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  Reject
                </button>

                {selectedDonations[donation._id] === 'reject' && (
                  <textarea
                    placeholder="Enter rejection reason"
                    value={rejectionReasons[donation._id] || ''}
                    onChange={(e) =>
                      setRejectionReasons((prev) => ({
                        ...prev,
                        [donation._id]: e.target.value
                      }))
                    }
                    className="mt-2 p-2 w-full border border-red-300 rounded resize-none"
                    rows={3}
                  />
                )}
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
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow-md disabled:opacity-50"
            disabled={Object.keys(selectedDonations).length === 0}
          >
            Submit Selected Actions
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
