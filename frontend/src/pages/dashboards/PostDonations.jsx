import React, { useState,   useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostDonations() {
  const navigate = useNavigate();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
  
      if (!user || user.role !== 'donor') {
        alert('Access denied. Only donors can access this page.');
        navigate('/login');
      }
    }, [navigate]);
  const [formData, setFormData] = useState({
    donor: '',
    itemName: '',
    quantity: '',
    condition: 'New',
    pickupAddress: '',
    pickupDate: '',
  })

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imgData = new FormData();
      imgData.append('files', imageFile);
      const token = localStorage.getItem("token")
      const uploadRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, imgData);
      const imageFileId = uploadRes.data.files[0].imageFileId;

      const donationData = { ...formData, imageFileId };

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/donation/postDonation`, donationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(' Donation posted successfully!');
    } catch (error) {
      console.error(error);
      setMessage(' Error uploading donation.');
    }
  };

  return (
    <div className="p-6 mt-20 max-w-2xl mx-auto bg-green-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Post a Donation</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <input
          type="text"
          name="donor"
          placeholder="Your User ID"
          value={formData.donor}
          onChange={handleChange}
          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        /> */}
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="New">New</option>
          <option value="Good">Good</option>
          <option value="Used">Used</option>
        </select>
        <input
          type="text"
          name="pickupAddress"
          placeholder="Pickup Address"
          value={formData.pickupAddress}
          onChange={handleChange}
          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="date"
          name="pickupDate"
          value={formData.pickupDate}
          onChange={handleChange}
          className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-green-800"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Submit Donation
        </button>
        {message && <p className="mt-2 text-center text-green-800 font-medium">{message}</p>}
      </form>
    </div>
  );
}

export default PostDonations;