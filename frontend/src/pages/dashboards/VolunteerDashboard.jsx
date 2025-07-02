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

  useEffect(() => {
    const fetchRequests = async () => {
      if (!showTasks) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/volunteer/requests`,
          { withCredentials: true }
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [showTasks]);

  useEffect(() => {
    const fetchActive = async () => {
      if (!showActive) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/volunteer/active`,
          { withCredentials: true }
        );
        setActiveTasks(res.data);
      } catch (err) {
        console.error("Error fetching active tasks:", err);
      }
    };
    fetchActive();
  }, [showActive]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!showHistory) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/volunteer/history`,
          { withCredentials: true }
        );
        setCompletedTasks(res.data);
      } catch (err) {
        console.error("Error fetching completed tasks:", err);
      }
    };
    fetchHistory();
  }, [showHistory]);

  const handleAccept = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/volunteer/accept/${id}`,
        {},
        { withCredentials: true }
      );
      alert("Task Accepted ✅");
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Error accepting task");
      console.error(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/volunteer/complete/${id}`,
        {},
        { withCredentials: true }
      );
      alert("Task marked complete ✅");
      setActiveTasks((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Error completing task");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-green-700 text-center">
        Volunteer Dashboard
      </h1>

      {/* New Pickup & Drop Requests */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border-l-4 border-green-600">
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
            {!loading && requests.length === 0 && (
              <p>No available tasks currently.</p>
            )}
            {requests.map((req) => (
              <div key={req._id} className="p-4 border rounded-xl shadow">
                <p><strong>From:</strong> {req.pickupLocation}</p>
                <p><strong>To:</strong> {req.dropLocation}</p>
                <p><strong>Item:</strong> {req.item}</p>
                <button
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  onClick={() => handleAccept(req._id)}
                >
                  Accept
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Active Deliveries */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border-l-4 border-green-600">
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
            {activeTasks.map((task) => (
              <div key={task._id} className="p-4 border rounded-xl shadow">
                <p><strong>From:</strong> {task.pickupLocation}</p>
                <p><strong>To:</strong> {task.dropLocation}</p>
                <p><strong>Item:</strong> {task.item}</p>
                <button
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleComplete(task._id)}
                >
                  Mark Complete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Deliveries */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border-l-4 border-green-600">
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
            {completedTasks.map((task) => (
              <div key={task._id} className="p-4 border rounded-xl shadow">
                <p><strong>From:</strong> {task.pickupLocation}</p>
                <p><strong>To:</strong> {task.dropLocation}</p>
                <p><strong>Item:</strong> {task.item}</p>
                <p><strong>Status:</strong> {task.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delivery Preferences */}
      <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-600">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold flex items-center">
            <FontAwesomeIcon icon={faGear} className={iconStyle} />
            Delivery Preferences
          </h2>
          <button
            onClick={() => setShowPrefs(!showPrefs)}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            {showPrefs ? "Hide" : "Show"}
          </button>
        </div>
        {showPrefs && (
          <div className="mt-4">
            <p>Edit delivery radius, available days, preferred item types here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
