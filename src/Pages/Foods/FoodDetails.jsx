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
      .catch(() => navigate("/availableFoods"));
  }, [id, user]);

  
  useEffect(() => {
    if (food && user?.email === food.donator_email) {
      axios.get(`/food-requests/${food._id}`).then((res) => setRequests(res.data));
    }
  }, [food, user]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmitRequest = async (e) => {
    e.preventDefault();

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

      
      setFood((prev) => ({
        ...prev,
        food_quantity: prev.food_quantity - 1,
      }));

      
      await axios.put(`/foods/${food._id}`, {
        food_quantity: food.food_quantity - 1,
      });

      Swal.fire("Success", "Your request has been submitted.", "success");
      setShowModal(false);
      setFormData({ location: "", reason: "", contact: "" });
    } catch {
      Swal.fire("Error", "Failed to submit request.", "error");
    }
  };

  
  const handleRequestAction = async (reqId, status) => {
    await axios.put(`/food-requests/${reqId}`, { status });
    Swal.fire("Updated!", `Request ${status}`, "success");

    const updated = await axios.get(`/food-requests/${food._id}`);
    setRequests(updated.data);
  };

  if (!food) return <div className="p-5">Loading...</div>;

  return (
    <div className="p-5 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-3">{food.food_name}</h1>

      <img
        src={food.food_image}
        className="w-full rounded h-80 object-cover mb-4"
      />

      <p><strong>Quantity:</strong> {food.food_quantity}</p>
      <p><strong>Pickup:</strong> {food.pickup_location}</p>
      <p><strong>Expire:</strong> {food.expire_date}</p>

      <p className="mt-3">
        <img
          src={food.donator_photo}
          className="inline-block w-8 h-8 rounded-full mr-2"
        />
        {food.donator_name}
      </p>

      <p className="mt-3">{food.additional_notes}</p>

  
      <button
        onClick={() => setShowModal(true)}
        className="mt-5 px-4 py-2 bg-green-600 text-white rounded"
      >
        Request Food
      </button>

      
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmitRequest}
            className="bg-white rounded p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold mb-4">Submit Request</h2>

            <input
              name="location"
              placeholder="Your Location"
              className="w-full border p-2 mb-3"
              value={formData.location}
              onChange={handleChange}
            />

            <textarea
              name="reason"
              placeholder="Reason"
              className="w-full border p-2 mb-3"
              value={formData.reason}
              onChange={handleChange}
            />

            <input
              name="contact"
              placeholder="Contact Number"
              className="w-full border p-2 mb-3"
              value={formData.contact}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      
      {user?.email === food.donator_email && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Food Requests</h2>

          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Reason</th>
                <th className="border p-2">Contact</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td className="border p-2">{req.name}</td>
                  <td className="border p-2">{req.location}</td>
                  <td className="border p-2">{req.reason}</td>
                  <td className="border p-2">{req.contact}</td>
                  <td className="border p-2">{req.status}</td>

                  <td className="border p-2">
                    {req.status === "pending" && (
                      <>
                        <button
                          className="px-2 py-1 bg-green-500 text-white mr-2"
                          onClick={() => handleRequestAction(req._id, "accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white"
                          onClick={() => handleRequestAction(req._id, "rejected")}
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

