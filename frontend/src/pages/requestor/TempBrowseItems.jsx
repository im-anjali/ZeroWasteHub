import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TempBrowseItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [showModal, setModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [requestorAddress, setRequestorAddress] = useState('');
  const [useVolunteer, setUseVolunteer] = useState(null); 
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/requestor/getDonations`);
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);
  
  const handleRequestClick = (donation) =>{
    setModal(true);
    setSelectedDonation(donation)
  }
  const handleVolunteerChoice = async(choice) =>{
    if(!selectedDonation)return;
    if(choice){
      if(!requestorAddress.trim()){
        alert("Please enter address!");
        return;
      }
      try{
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/volunteer/createVolTask`,
          {
            donationId: selectedDonation._id,
            donorId: selectedDonation.donor._id,
            donorAddr:selectedDonation.pickupAddress,
            requestorAddr:requestorAddress
          },{
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
            } 
        })
          alert("Addresses sent to vol!");
          setModal(false);
          setSelectedDonation(null);
          setUseVolunteer(null);
        }catch(error){
          console.log("Error", error);
          alert("Failed");
        }
      }
    else{
      try{
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/requestor/completeDonation`,
          {donationId:selectedDonation._id}
        );
        alert("Request sent successfully!");
        setModal(false);
        setSelectedDonation(null);
      }catch(error){
        console.log("Error in requesting donation", error);
        alert("Failed to send request");
      }
    }
  }


  const filteredDonations = donations.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Available Donations</h1>
        <p className="text-gray-500 text-sm mt-1">
          Browse and request items shared by donors
        </p>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading donations...</div>
      ) : filteredDonations.length === 0 ? (
        <div className="text-center text-gray-500">No items found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm border p-5"
            >
              
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
              )}

              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {item.itemName}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                Quantity: <span className="font-medium">{item.quantity}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Condition: <span className="font-medium">{item.condition}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Pickup Address: <span className="font-medium">{item.pickupAddress}</span>
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Pickup Date: <span className="font-medium">{new Date(item.pickupDate).toLocaleDateString()}</span>
              </p>
              <button className="mt-2 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
              onClick = {() => handleRequestClick(item)}>
                Request
              </button>
            </div>
          ))}
        </div>
      )}
  {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="relative bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-[90%] max-w-md sm:w-80">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          Use volunteer for delivery?
        </h2>

        {useVolunteer && (
        <div className="mb-4">
          <label
            htmlFor="requestorAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Your Address:
          </label>
          <input
            type="text"
            id="requestorAddress"
            value={requestorAddress}
            onChange={(e) => setRequestorAddress(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter your address"
          />
          <button
            onClick={() => handleVolunteerChoice(true)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Submit Address
          </button>
        </div>
      )}

        <div className="flex flex-col sm:flex-row justify-between gap-2">
        <button
          onClick={() => setUseVolunteer(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1"
        >
          Yes
        </button>
        <button
          onClick={() => handleVolunteerChoice(false)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex-1"
        >
          No
        </button>
      </div>

      <button
        onClick={() => setModal(false)}
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
      >
        ×
      </button>
    </div>
  </div>
  )}


    </div>
  );
};

export default TempBrowseItems;
