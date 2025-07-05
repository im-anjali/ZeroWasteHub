import React, { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Search, ClipboardList } from 'lucide-react';

const RequestorDashboard = () => {
  const navigate = useNavigate();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
  
      if (!user || user.role !== 'requestor') {
        alert('Access denied. Only requestor can access this page.');
        navigate('/login');
      }
    }, [navigate]);
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Heading */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Requestor Dashboard</h1>
        <p className="text-gray-500 text-base mt-2">Browse and track your requested items</p>
      </div>

      {/* Cards */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DashboardCard
          to="/requestor/browse"
          title="Browse Items"
          description="Find and request donated items"
          icon={<Search size={28} className="text-blue-600" />}
          bg="bg-blue-100"
        />

        <DashboardCard
          to="/requestor/requests"
          title="My Requests"
          description="Track the status of your requests"
          icon={<ClipboardList size={28} className="text-green-600" />}
          bg="bg-green-100"
        />
      </div><br/><br/>
      <div className="mt-12 max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-200">
  <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
    Request Summary
  </h3>

  <div className="flex justify-between items-center text-sm mb-2">
    <span className="text-gray-600">Pending</span>
    <span className="font-bold text-yellow-600">2</span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
    <div className="bg-yellow-400 h-2.5 rounded-full w-[50%]"></div>
  </div>

  <div className="flex justify-between items-center text-sm mb-2">
    <span className="text-gray-600">Delivered</span>
    <span className="font-bold text-green-600">1</span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
    <div className="bg-green-400 h-2.5 rounded-full w-[25%]"></div>
  </div>

  <p className="text-center text-gray-500 text-xs mt-2">
    Total Requests: <span className="font-medium">3</span>
  </p>
</div>

    </div>
  );
};

const DashboardCard = ({ to, title, description, icon, bg }) => (
  <Link
    to={to}
    className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition"
  >
    <div className="flex items-start space-x-4">
      <div className={`p-3 rounded-full ${bg}`}>
        {icon}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </Link>
);

export default RequestorDashboard;


