import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckFast,
  faBox,
  faClipboardCheck,
  faGear
} from "@fortawesome/free-solid-svg-icons";

export default function VolunteerDashboard() {
  const [showTasks, setShowTasks] = useState(false);
  const [showActive, setShowActive] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [requests, setRequests] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const iconStyle = "mr-3 text-green-600 text-xl";
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const axiosAuth = axios.create({
    baseURL: backendURL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Fetch pending requests
  useEffect(() => {
    const fetchRequests = async () => {
      if (!showTasks) return;
      setLoading(true);
      try {
        const res = await axiosAuth.get(`/api/volunteer/requests`);
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [showTasks]);

  // Fetch active tasks
  useEffect(() => {
    const fetchActive = async () => {
      if (!showActive) return;
      try {
        const res = await axiosAuth.get(`/api/volunteer/active`);
        setActiveTasks(res.data);
      } catch (err) {
        console.error("Error fetching active tasks:", err);
      }
    };
    fetchActive();
  }, [showActive]);

  // Fetch completed history
  useEffect(() => {
    const fetchHistory = async () => {
      if (!showHistory) return;
      try {
        const res = await axiosAuth.get(`/api/volunteer/history`);
        setCompletedTasks(res.data);
      } catch (err) {
        console.error("Error fetching completed tasks:", err);
      }
    };
    fetchHistory();
  }, [showHistory]);

  // Accept task
  const handleAccept = async (id) => {
  try {
    await axiosAuth.put(`/api/volunteer/accept/${id}`);

    const acceptedTask = requests.find((r) => r._id === id);
    if (acceptedTask) {
      setActiveTasks((prev) => [...prev, { ...acceptedTask, status: "active" }]);
    }

    // Optional: visually update the task's status in the pending list
    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status: "active" } : r))
    );
  } catch (err) {
    alert("Error accepting task");
    console.error(err);
  }
};


  // Complete task
  const handleComplete = async (id) => {
  try {
    await axiosAuth.put(`/api/volunteer/complete/${id}`);

    const completedTask = activeTasks.find((t) => t._id === id);
    if (completedTask) {
      setCompletedTasks((prev) => [...prev, { ...completedTask, status: "completed" }]);
    }

    setActiveTasks((prev) => prev.filter((t) => t._id !== id));
  } catch (err) {
    alert("Error completing task");
    console.error(err);
  }
};


 const renderCard = (task, showButton, buttonLabel, buttonAction, buttonColor) => (
  <div
    key={task._id}
    className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 flex gap-6 items-center"
  >
    <img
      src={`${backendURL}/donation/image/${task.imageFileId}`}
      alt="Donation"
      className="w-32 h-32 object-cover rounded-md border border-gray-300"
      onError={(e) => (e.target.style.display = "none")}
    />

    <div className="flex-1 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {task.itemName || task.item}
          </h3>
          <p className="text-sm text-gray-500">{task.quantity} item(s)</p>
        </div>
        {task.status && (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
            {task.status}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
        <div><strong>Condition:</strong> {task.condition}</div>
        <div><strong>Date:</strong> {task.pickupDate ? new Date(task.pickupDate).toLocaleString() : "N/A"}</div>
        <div><strong>Pickup:</strong> {task.pickupAddress || "N/A"}</div>
        <div><strong>Drop:</strong> {task.dropLocation || "N/A"}</div>
      </div>

      {showButton && (
        <div className="pt-2">
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-lg ${buttonColor} text-white shadow hover:opacity-90 transition`}
            onClick={() => buttonAction(task._id)}
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </div>
  </div>
);


  return (
   <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-green-700 text-center">
        Volunteer Dashboard
      </h1>

      {/* Requests */}
     <section className="bg-white-100 rounded-2xl shadow-xl p-6 mb-6 border-l-4 border-green-600">


        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold flex items-center">
            <FontAwesomeIcon icon={faTruckFast} className={iconStyle} />
            New Pickup & Drop Requests
          </h2>
          <button
            onClick={() => setShowTasks(!showTasks)}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            {showTasks ? "Hide" : "Show"}
          </button>
        </div>
        {showTasks && (
          <div className="mt-4 space-y-4">
            {loading && <p>Loading...</p>}
            {!loading && requests.length === 0 && <p>No available tasks currently.</p>}
            {requests.map((req) =>
              renderCard(req, true, "Accept", handleAccept, "bg-green-600")
            )}
          </div>
        )}
      </section>

      {/* Active */}
      <section className="bg-gray-100 rounded-2xl shadow-xl p-6 mb-6 border-l-4 border-green-600">


        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold flex items-center">
            <FontAwesomeIcon icon={faBox} className={iconStyle} />
            My Active Deliveries
          </h2>
          <button
            onClick={() => setShowActive(!showActive)}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            {showActive ? "Hide" : "Show"}
          </button>
        </div>
        {showActive && (
          <div className="mt-4 space-y-4">
            {activeTasks.length === 0 && <p>No active deliveries.</p>}
            {activeTasks.map((task) =>
              renderCard(task, true, "Mark Complete", handleComplete, "bg-blue-600")
            )}
          </div>
        )}
      </section>

      {/* Completed */}
      <section className="bg-gray-100 rounded-2xl shadow-xl p-6 mb-6 border-l-4 border-green-600">

      
       <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold flex items-center">
            <FontAwesomeIcon icon={faClipboardCheck} className={iconStyle} />
            Completed Deliveries
          </h2>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            {showHistory ? "Hide" : "Show"}
          </button>
        </div>
        {showHistory && (
          <div className="mt-4 space-y-4">
            {completedTasks.length === 0 && <p>No completed deliveries yet.</p>}
            {completedTasks.map((task) =>
              renderCard(task, false, "", null, "")
            )}
          </div>
        )}
      </section>

    </div>
  );
}
