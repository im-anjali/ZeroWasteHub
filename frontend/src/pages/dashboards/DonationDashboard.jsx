import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function DonationDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
   useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.role !== 'donor') {
      alert('Access denied. Only donors can access this page.');
      navigate('/login');
    }
  }, [navigate]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 pt-10 px-3">
      <h1 className="text-4xl font-bold text-green-800 mb-10">Donor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <div
          onClick={() => navigate('/my-donations')}
          className="cursor-pointer bg-green-100 hover:bg-green-200 transition shadow-lg rounded-2xl p-6 h-60 flex flex-col justify-start items-start text-left"
        >
          <h2 className="text-2xl font-semibold text-green-800 mb-2">View Donation Status</h2>
          <p className="text-green-700 text-base">
            Track the status of all your donations, whether pending, approved, or rejected.
          </p>
        </div>

        <div
          onClick={() => navigate('/post-donations')}
          className="cursor-pointer bg-green-100 hover:bg-green-200 transition shadow-lg rounded-2xl p-6 h-60 flex flex-col justify-start items-start text-left"
        >
          <h2 className="text-2xl font-semibold text-green-800 mb-2">Post a New Donation</h2>
          <p className="text-green-700 text-base">
            Submit a new donation of food, clothes, or essentials to support families in need.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DonationDashboard;
