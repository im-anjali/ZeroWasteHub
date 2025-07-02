import React, { useState } from 'react';

const TempBrowseItems = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockDonations = [
    {
      _id: '1',
      itemName: 'Winter Jackets',
      quantity: '5',
      condition: 'Good',
      pickupAddress: '123 Main Street, Pune',
      pickupDate: '2025-07-05',
    },
    {
      _id: '2',
      itemName: 'Canned Food',
      quantity: '10',
      condition: 'Sealed',
      pickupAddress: 'Market Lane, Mumbai',
      pickupDate: '2025-07-07',
    },
    {
      _id: '3',
      itemName: 'Books',
      quantity: '20',
      condition: 'Like New',
      pickupAddress: 'Library Road, Delhi',
      pickupDate: '2025-07-08',
    },
  ];

  const filteredDonations = mockDonations.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Page Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Available Donations</h1>
        <p className="text-gray-500 text-sm mt-1">
          Browse and request items shared by donors
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonations.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-sm border p-5"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {item.itemName}
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              Quantity:{' '}
              <span className="font-medium">{item.quantity}</span>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Condition:{' '}
              <span className="font-medium">{item.condition}</span>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Pickup Address:{' '}
              <span className="font-medium">{item.pickupAddress}</span>
            </p>
            <p className="text-sm text-gray-600 mb-3">
              Pickup Date:{' '}
              <span className="font-medium">{item.pickupDate}</span>
            </p>
            <button className="mt-2 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition">
              Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempBrowseItems;

