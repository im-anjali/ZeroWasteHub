import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState('pending'); 
  const [loading, setLoading] = useState(true);
  const [reason , setReason] = useState("");
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
  
      if (!user || user.role !== 'donor') {
        alert('Access denied. Only donors can access this page.');
        navigate('/login');
      }
    }, [navigate]);
  useEffect(() => {
    fetchMyDonations();
  }, []);

  const fetchMyDonations = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/donation/mydonations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonations(res.data);
    } catch (err) {
      console.error('Error fetching donations:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = donations.filter((donation) => donation.status === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl text-center font-bold text-green-800 mb-9">My Donations</h1>

      <div className="flex justify-center gap-4 mb-8">
        {['pending', 'approved', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              filter === status
                ? 'bg-green-600 text-white shadow'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} Donations
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : filteredDonations.length === 0 ? (
        <p className="text-center text-gray-600">No {filter} donations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white p-4 rounded-xl shadow border border-green-200"
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/api/image/${donation.imageFileId}`}
                alt="Donation"
                className="w-full h-40 object-cover rounded mb-4"
              />
              <p><strong>Item:</strong> {donation.itemName}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Condition:</strong> {donation.condition}</p>
              <p><strong>Status:</strong> <span className="capitalize text-green-700 font-medium">{donation.status}</span></p>
              {donation.status === 'rejected' && donation.reason && (
                <p><strong>Reason:</strong> {donation.reason}</p>
              )}
              <p><strong>Pickup:</strong> {donation.pickupAddress}</p>
               <p><strong>Reason:</strong> {donation.reason}</p>
              <p><strong>Date:</strong> {new Date(donation.pickupDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDonations;
