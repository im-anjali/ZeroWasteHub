import React, { useState } from 'react';

const MyRequests = () => {
  const [filter, setFilter] = useState('all'); // all | pending | delivered
  const [expandedId, setExpandedId] = useState(null);

  const mockRequests = [
    {
      _id: '1',
      itemName: 'Books',
      quantity: '10',
      condition: 'Good',
      pickupAddress: 'Library Road, Delhi',
      pickupDate: '2025-07-05',
      status: 'pending',
    },
    {
      _id: '2',
      itemName: 'Blankets',
      quantity: '4',
      condition: 'Like New',
      pickupAddress: 'NGO Center, Pune',
      pickupDate: '2025-07-06',
      status: 'delivered',
    },
  ];

  const filtered = mockRequests.filter((item) =>
    filter === 'all' ? true : item.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Page Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Requests</h1>
        <p className="text-gray-500 text-sm">Track the items you’ve requested</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {['all', 'pending', 'delivered'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 rounded-full border text-sm capitalize ${
              filter === status
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Request List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="bg-white border rounded-lg p-4 shadow-sm cursor-pointer"
            onClick={() =>
              setExpandedId(expandedId === item._id ? null : item._id)
            }
          >
            {/* Collapsed Summary */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.itemName}
              </h2>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {item.status}
                </span>
                <span className="text-sm text-gray-500">{item.pickupDate}</span>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedId === item._id && (
              <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Quantity:</span>{' '}
                  {item.quantity}
                </p>
                <p>
                  <span className="font-medium">Condition:</span>{' '}
                  {item.condition}
                </p>
                <p>
                  <span className="font-medium">Pickup Address:</span>{' '}
                  {item.pickupAddress}
                </p>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500">No requests to show.</p>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
