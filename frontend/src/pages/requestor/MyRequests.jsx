import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyRequests = () => {
  const [filter, setFilter] = useState("pending"); 
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "requestor") {
      alert("Access denied. Only requestor can access this page.");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        
        const donationsRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/requestor/getDonations`
        );

        
        const deliveriesRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/requestor/myRequests`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const combinedRequests = [
          ...donationsRes.data.map((donation) => ({
            _id: donation._id,
            type: "donation",
            item: donation.itemName,
            donor: donation.donor?.name || "Unknown Donor",
          })),
          ...deliveriesRes.data.map((delivery) => ({
            _id: delivery._id,
            type: "delivery",
            item: delivery.item || "Delivery Item",
            donor: delivery.donorId?.name || "Unknown Donor",
          })),
        ];

        
        setPendingRequests(combinedRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
        alert("Failed to fetch requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const markAsCompleted = (requestId) => {
    const requestToMove = pendingRequests.find((req) => req._id === requestId);
    if (requestToMove) {
      setPendingRequests((prev) =>
        prev.filter((req) => req._id !== requestId)
      );
      setCompletedRequests((prev) => [...prev, requestToMove]);
    }
  };

  const displayedRequests =
    filter === "pending" ? pendingRequests : completedRequests;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Requests</h1>
        <p className="text-gray-500 text-sm">
          Track and manage all your requested items
        </p>
      </div>

      
      <div className="flex justify-center gap-4 mb-8">
        {["pending", "completed"].map((status) => (
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
          {displayedRequests.map((req) => (
            <div
              key={req._id}
              className="bg-white border rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {req.item}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Donor: {req.donor}
                  </p>
                </div>
                {filter === "pending" && (
                  <button
                    onClick={() => markAsCompleted(req._id)}
                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          ))}

          {displayedRequests.length === 0 && (
            <p className="text-center text-gray-500">
              No {filter} requests to show.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRequests;


