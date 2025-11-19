

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
  const [loading, setLoading] = useState(true);

  // Load the selected food
  useEffect(() => {
    axios
      .get(`http://localhost:3000/foods/${id}`)
      .then((res) => {
        setFood(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!food) return <p className="text-center py-20">Food not found.</p>;

  const {
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    donator_name,
    donator_email,
    additional_notes,
  } = food;

  // Request Button Click
  const handleRequest = () => {
    if (!user) {
      Swal.fire("Please login first!");
      navigate("/login");
      return;
    }

    const requestData = {
      foodId: id,
      requester_email: user.email,
      requester_name: user.displayName,
      donator_email,
      donator_name,
      status: "pending",
      requested_at: new Date(),
    };

    axios
      .post("http://localhost:3000/food-requests", requestData)
      .then(() => Swal.fire("Request sent successfully!"))
      .catch(() => Swal.fire("Request failed!"));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={food_image}
          alt={food_name}
          className="rounded-xl w-full h-80 object-cover shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{food_name}</h1>

          <p className="text-gray-700 mb-2">
            <strong>Quantity:</strong> {food_quantity}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Pickup:</strong> {pickup_location}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Expire Date:</strong> {expire_date}
          </p>

          <p className="text-gray-700 mt-3">{additional_notes}</p>

          <div className="bg-gray-50 p-4 rounded-lg border mt-6">
            <h3 className="font-semibold mb-1">Food Donator</h3>
            <p>Name: {donator_name}</p>
            <p>Email: {donator_email}</p>
          </div>

          <button
            onClick={handleRequest}
            className="mt-6 px-6 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700"
          >
            Request This Food
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
