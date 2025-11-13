import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    foodName: "",
    foodImage: "", 
    foodQuantity: "",
    pickupLocation: "",
    expireDate: "",
    additionalNotes: "",
  });
  const [loading, setLoading] = useState(false);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const foodData = {
      food_name: formData.foodName,
      food_image: formData.foodImage, 
      food_quantity: formData.foodQuantity,
      pickup_location: formData.pickupLocation,
      expire_date: formData.expireDate,
      additional_notes: formData.additionalNotes,
      food_status: "Available",
      donator_name: user?.displayName,
      donator_email: user?.email,
      donator_photo: user?.photoURL,
    };

    try {
      const res = await axios.post("http://localhost:3000/add-food", foodData);

      if (res.data.insertedId) {
        toast.success("✅ Food added successfully!");
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">🍱 Add Food</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="foodName"
            placeholder="Food Name"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="foodImage"
            placeholder="Image URL"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="foodQuantity"
            placeholder="Quantity"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="pickupLocation"
            placeholder="Pickup Location"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="expireDate"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="additionalNotes"
          placeholder="Additional Notes"
          className="textarea textarea-bordered w-full mt-4"
          onChange={handleChange}
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full mt-4"
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
