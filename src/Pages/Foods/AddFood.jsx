import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const foodData = {
      food_name: form.foodName.value,
      food_image: form.foodImage.value,
      food_quantity: form.foodQuantity.value,
      pickup_location: form.pickupLocation.value,
      expire_date: form.expireDate.value,
      additional_notes: form.additionalNotes.value,
      food_status: "Available",
      donator_name: user?.displayName,
      donator_email: user?.email,
      donator_photo: user?.photoURL,
    };

    try {
      const res = await axios.post("http://localhost:3000/add-food", foodData);

      if (res.data.insertedId) {
        toast.success("Food added successfully!");
        form.reset();

        
        window.dispatchEvent(new Event("foodAdded"));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Add New Food</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            name="foodName"
            placeholder="Food Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="url"
            name="foodImage"
            placeholder="Food Image URL"
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="foodQuantity"
            placeholder="Quantity (serves how many)"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="pickupLocation"
            placeholder="Pickup Location"
            className="input input-bordered w-full"
            required
          />
          <input
            type="date"
            name="expireDate"
            className="input input-bordered w-full"
            required
          />
        </div>

        <textarea
          name="additionalNotes"
          placeholder="Additional Notes (optional)"
          className="textarea textarea-bordered w-full h-28"
          rows="4"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          // className="btn btn-success w-full text-white text-lg"
          className="btn-grad w-full
         text-white uppercase text-center
         px-11 py-4 m-2 block
         rounded-[10px] shadow-[0_0_20px_#eee]
         bg-gradient-to-r from-[#ffb347] via-[#ffcc33] to-[#ffb347]
         bg-[length:200%_auto]
         transition-all duration-500
         hover:bg-[position:right_center]"
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;