import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TempBrowseItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/donation/getDonations`);
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const filteredDonations = donations.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Available Donations</h1>
        <p className="text-gray-500 text-sm mt-1">
          Browse and request items shared by donors
        </p>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading donations...</div>
      ) : filteredDonations.length === 0 ? (
        <div className="text-center text-gray-500">No items found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm border p-5"
            >
              
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
              )}

              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {item.itemName}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                Quantity: <span className="font-medium">{item.quantity}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Condition: <span className="font-medium">{item.condition}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Pickup Address: <span className="font-medium">{item.pickupAddress}</span>
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Pickup Date: <span className="font-medium">{new Date(item.pickupDate).toLocaleDateString()}</span>
              </p>
              <button className="mt-2 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition">
                Request
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TempBrowseItems;
