
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    reason: "",
    contact: "",
  });


  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    axios
      .get(`/foods/${id}`)
      .then((res) => setFood(res.data))
      .catch(() => {
        Swal.fire("Error", "Unable to fetch food details", "error");
        navigate("/availableFoods");
      });
  }, [id, user, navigate]);

  useEffect(() => {
    if (food && user?.email === food.donator_email) {
      axios
        .get(`/food-requests/${food._id}`)
        .then((res) => setRequests(res.data))
        .catch(() => Swal.fire("Error", "Failed to fetch requests", "error"));
    }
  }, [food, user]);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    if (!user) return;

    const requestData = {
      ...formData,
      userEmail: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      foodId: food._id,
      status: "pending",
    };

    try {
      await axios.post("/food-requests", requestData);
      Swal.fire("Success", "Your request has been submitted.", "success");
      setShowModal(false);
      setFormData({ location: "", reason: "", contact: "" });
      
      if (user.email === food.donator_email) {
        const updated = await axios.get(`/food-requests/${food._id}`);
        setRequests(updated.data);
      }
    } catch {
      Swal.fire("Error", "Failed to submit request.", "error");
    }
  };

  
  const handleRequestAction = async (reqId, action) => {
    try {
      await axios.put(`/food-requests/${reqId}`, { status: action });
      Swal.fire("Updated!", `Request ${action}`, "success");
      const updated = await axios.get(`/food-requests/${food._id}`);
      setRequests(updated.data);
    } catch {
      Swal.fire("Error", "Failed to update request.", "error");
    }
  };

  if (!food) return <div className="p-5">Loading details...</div>;

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{food.food_name}</h1>
      <img
        src={food.food_image}
        alt={food.food_name}
        className="mb-4 max-h-96 w-full object-cover rounded"
      />
      <p>
        <strong>Quantity:</strong> {food.food_quantity}
      </p>
      <p>
        <strong>Pickup Location:</strong> {food.pickup_location}
      </p>
      <p>
        <strong>Expire Date:</strong> {food.expire_date}
      </p>
      <p className="mt-2">
        <strong>Donated by:</strong>{" "}
        <img
          src={food.donator_photo}
          alt={food.donator_name}
          className="inline-block w-8 h-8 rounded-full mr-2"
        />
        {food.donator_name}
      </p>
      <p className="mt-3 whitespace-pre-line">{food.additional_notes}</p>

      
      {user && (
        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => setShowModal(true)}
        >
          Request Food
        </button>
      )}




















      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmitRequest}
            className="bg-white rounded p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold mb-4">Submit a Food Request</h2>
            <input
              type="text"
              name="location"
              placeholder="Your Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full mb-3 p-2 border rounded"
            />
            <textarea
              name="reason"
              placeholder="Why do you need this food?"
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      
      {user?.email === food.donator_email && requests.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Food Requests</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Location</th>
                <th className="border px-2 py-1">Reason</th>
                <th className="border px-2 py-1">Contact</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="text-center">
                  <td className="border px-2 py-1">{req.name}</td>
                  <td className="border px-2 py-1">{req.location}</td>
                  <td className="border px-2 py-1">{req.reason}</td>
                  <td className="border px-2 py-1">{req.contact}</td>
                  <td className="border px-2 py-1 capitalize">{req.status}</td>
                  <td className="border px-2 py-1 space-x-2">
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleRequestAction(req._id, "accepted")}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRequestAction(req._id, "rejected")}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
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
