import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [food, setFood] = useState(null);
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    reason: "",
    contact: "",
  });

  // Fetch food details
  useEffect(() => {
    axios.get(`/foods/${id}`).then(res => setFood(res.data));
  }, [id]);

  // Fetch food requests if current user is owner
  useEffect(() => {
    if (food && user?.email === food.donator_email) {
      axios.get(`/food-requests/${food._id}`).then(res => setRequests(res.data));
    }
  }, [food, user]);

  // Handle form input
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Food Request
  const handleSubmitRequest = async e => {
    e.preventDefault();
    if (!user) return;

    const requestData = {
      ...formData,
      userEmail: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      foodId: food._id,
    };

    await axios.post("/food-requests", requestData);
    Swal.fire("Success!", "Your request has been submitted.", "success");
    setShowModal(false);
    setFormData({ location: "", reason: "", contact: "" });
  };

  // Accept or Reject Request
  const handleRequestAction = async (requestId, action) => {
    await axios.put(`/food-requests/${requestId}`, { status: action });
    Swal.fire("Updated!", `Request ${action}`, "success");
    // Refresh requests
    const updated = await axios.get(`/food-requests/${food._id}`);
    setRequests(updated.data);
  };

  if (!food) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold">{food.name}</h2>
      <img src={food.image} alt={food.name} className="my-4 w-64" />
      <p>Donator: {food.donator_name}</p>
      <p>Quantity: {food.quantity}</p>
      <p>Pickup: {food.pickup_location}</p>
      <p>Expire: {food.expire_date}</p>
      <p>Notes: {food.additional_notes}</p>

      {/* Request Food Button */}
      {user && (
        <button
          className="bg-green-500 text-white px-4 py-2 mt-3"
          onClick={() => setShowModal(true)}
        >
          Request Food
        </button>
      )}

      {/* Food Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            className="bg-white p-5 rounded"
            onSubmit={handleSubmitRequest}
          >
            <h3 className="text-xl font-bold mb-3">Request Food</h3>
            <input
              type="text"
              name="location"
              placeholder="Your Location"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
              required
            />
            <textarea
              name="reason"
              placeholder="Why do you need this food?"
              value={formData.reason}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 mr-2">
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-300 px-3 py-1"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Food Requests Table (only owner sees) */}
      {user?.email === food.donator_email && requests.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Food Requests</h3>
          <table className="table-auto border">
            <thead>
              <tr>
                <th className="border px-2">Name</th>
                <th className="border px-2">Location</th>
                <th className="border px-2">Reason</th>
                <th className="border px-2">Contact</th>
                <th className="border px-2">Status</th>
                <th className="border px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req._id}>
                  <td className="border px-2">{req.name}</td>
                  <td className="border px-2">{req.location}</td>
                  <td className="border px-2">{req.reason}</td>
                  <td className="border px-2">{req.contact}</td>
                  <td className="border px-2">{req.status}</td>
                  <td className="border px-2 space-x-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1"
                      onClick={() => handleRequestAction(req._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1"
                      onClick={() => handleRequestAction(req._id, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
