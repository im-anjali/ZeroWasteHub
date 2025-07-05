import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyRequests = () => {
  const [filter, setFilter] = useState("all"); 
  const [expandedId, setExpandedId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
   
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "requestor") {
      alert("Access denied. Only requestor can access this page.");
      navigate("/login");
      return;
    }

    
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/requestor/myRequests`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Fetched requests:", response.data);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        alert("Failed to fetch your requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [navigate]);

  const filtered = requests.filter((item) =>
    filter === "all" ? true : item.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Requests</h1>
        <p className="text-gray-500 text-sm">
          Track the items you’ve requested
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {["all", "pending", "active", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 rounded-full border text-sm capitalize ${
              filter === status
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading your requests...</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-lg p-4 shadow-sm cursor-pointer"
              onClick={() =>
                setExpandedId(expandedId === item._id ? null : item._id)
              }
            >
              
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.item}
                </h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "active"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              
              {expandedId === item._id && (
                <div className="mt-4 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Pickup Address:</span>{" "}
                    {item.pickupLocation}
                  </p>
                  <p>
                    <span className="font-medium">Drop Address:</span>{" "}
                    {item.dropLocation}
                  </p>
                  <p>
                    <span className="font-medium">Donor:</span>{" "}
                    {item.donorId?.name} ({item.donorId?.email})
                  </p>
                  {item.volunteerId && (
                    <p>
                      <span className="font-medium">Volunteer:</span>{" "}
                      {item.volunteerId?.name} ({item.volunteerId?.email})
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && !loading && (
            <p className="text-center text-gray-500">
              No requests to show in {filter}.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRequests;

