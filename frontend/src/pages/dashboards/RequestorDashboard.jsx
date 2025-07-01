const RequestorDashboard = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Welcome, Requestor!</h1>

      {/* Section 1: Browse Items */}
      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3">🛒 Browse Available Items</h2>
        <p className="text-gray-600 mb-3">View and request items donated by individuals and organizations.</p>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Browse Items
        </button>
      </div>

      {/* Section 2: Track Received Items */}
      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3">📦 Track Received Items</h2>
        <p className="text-gray-600 mb-3">Keep track of what items you’ve received and their status.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View History
        </button>
      </div>

      {/* Section 3: Preferences */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h2 className="text-xl font-semibold mb-3">⚙️ Set Your Preferences</h2>
        <p className="text-gray-600 mb-3">Customize your interests and priority needs to get relevant matches.</p>
        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
          Edit Preferences
        </button>
      </div>
    </div>
  );
};

export default RequestorDashboard;
