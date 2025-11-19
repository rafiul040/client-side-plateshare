// import React, { useContext, useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../Context/AuthProvider";
// import { api } from "../../utils/axiosInstance";
// import LoadingSpinner from "../../components/LoadingSpinner";

// const ManageMyFoods = () => {
//   const { user } = useContext(AuthContext);
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedFood, setSelectedFood] = useState(null);

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchMyFoods = async () => {
//       try {
//         const res = await api.get(`/my-foods?email=${user.email}`);
//         setFoods(res.data);
//       } catch (error) {
//         console.error("Error fetching foods:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyFoods();
//   }, [user]);

//   // 🗑️ Delete Food
//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This food item will be permanently deleted!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await api.delete(`/foods/${id}`);
//           if (res.data.deletedCount > 0) {
//             setFoods(foods.filter((f) => f._id !== id));
//             Swal.fire("Deleted!", "Food has been removed.", "success");
//           }
//         } catch (error) {
//           Swal.fire("Error!", "Failed to delete food.", "error");
//         }
//       }
//     });
//   };

//   // ✏️ Update Food
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const updatedFood = {
//       food_name: form.foodName.value,
//       food_quantity: form.foodQuantity.value,
//       pickup_location: form.pickupLocation.value,
//       expire_date: form.expireDate.value,
//       additional_notes: form.additionalNotes.value,
//     };

//     try {
//       const res = await api.put(`/foods/${selectedFood._id}`, updatedFood);
//       if (res.data.modifiedCount > 0) {
//         Swal.fire("Updated!", "Food details have been updated.", "success");
//         setFoods(
//           foods.map((f) =>
//             f._id === selectedFood._id ? { ...f, ...updatedFood } : f
//           )
//         );
//         setSelectedFood(null);
//       }
//     } catch (error) {
//       Swal.fire("Error!", "Failed to update food.", "error");
//     }
//   };

//   if (loading) return <LoadingSpinner />;

//   if (foods.length === 0)
//     return (
//       <div className="text-center my-20">
//         <h2 className="text-2xl font-semibold text-gray-600">
//           🍽️ You haven’t added any foods yet.
//         </h2>
//       </div>
//     );

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-3xl font-bold text-center mb-8 text-primary">
//         Manage My Foods
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead className="bg-base-200">
//             <tr>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Quantity</th>
//               <th>Pickup</th>
//               <th>Expire Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {foods.map((food) => (
//               <tr key={food._id}>
//                 <td>
//                   <img
//                     src={food.food_image}
//                     alt={food.food_name}
//                     className="w-16 h-16 rounded object-cover"
//                   />
//                 </td>
//                 <td>{food.food_name}</td>
//                 <td>{food.food_quantity}</td>
//                 <td>{food.pickup_location}</td>
//                 <td>{food.expire_date}</td>
//                 <td>
//                   <button
//                     onClick={() => setSelectedFood(food)}
//                     className="btn btn-sm btn-outline btn-info mr-2"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleDelete(food._id)}
//                     className="btn btn-sm btn-outline btn-error"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

    
//       {selectedFood && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <form
//             onSubmit={handleUpdate}
//             className="bg-white p-6 rounded-lg shadow-md w-96"
//           >
//             <h3 className="text-xl font-semibold mb-4 text-center">
//               Update Food
//             </h3>

//             <input
//               type="text"
//               name="foodName"
//               defaultValue={selectedFood.food_name}
//               className="input input-bordered w-full mb-2"
//               required
//             />
//             <input
//               type="text"
//               name="foodQuantity"
//               defaultValue={selectedFood.food_quantity}
//               className="input input-bordered w-full mb-2"
//               required
//             />
//             <input
//               type="text"
//               name="pickupLocation"
//               defaultValue={selectedFood.pickup_location}
//               className="input input-bordered w-full mb-2"
//               required
//             />
//             <input
//               type="date"
//               name="expireDate"
//               defaultValue={selectedFood.expire_date}
//               className="input input-bordered w-full mb-2"
//               required
//             />
//             <textarea
//               name="additionalNotes"
//               defaultValue={selectedFood.additional_notes}
//               className="textarea textarea-bordered w-full mb-3"
//             ></textarea>

//             <div className="flex justify-between">
//               <button type="submit" className="btn btn-primary">
//                 Save
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setSelectedFood(null)}
//                 className="btn btn-ghost"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageMyFoods;



import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { api } from "../../utils/axiosInstance";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  // Load my foods
  useEffect(() => {
    if (user?.email) {
      api.get(`/my-foods?email=${user.email}`).then((res) => {
        setFoods(res.data);
      });
    }
  }, [user]);

  // Delete Food
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete?",
      text: "Are you sure you want to delete this food?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await api.delete(`/foods/${id}`);

        if (res.data.deletedCount > 0) {
          setFoods(foods.filter((f) => f._id !== id));
          Swal.fire("Deleted!", "Food deleted successfully", "success");
        }
      }
    });
  };

  // Update Food
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedFood = {
      food_name: form.food_name.value,
      food_image: form.food_image.value,
      food_quantity: form.food_quantity.value,
      pickup_location: form.pickup_location.value,
      expire_date: form.expire_date.value,
      additional_notes: form.additional_notes.value,
    };

    const res = await api.put(`/foods/${selectedFood._id}`, updatedFood);

    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated!", "Food updated successfully", "success");

      setFoods(
        foods.map((f) =>
          f._id === selectedFood._id ? { ...f, ...updatedFood } : f
        )
      );

      setSelectedFood(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage My Foods</h2>

      {foods.length === 0 ? (
        <p className="text-center mt-10">No foods added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Pickup</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {foods.map((food) => (
                <tr key={food._id}>
                  <td><img src={food.food_image} className="w-16 rounded" /></td>
                  <td>{food.food_name}</td>
                  <td>{food.food_quantity}</td>
                  <td>{food.pickup_location}</td>
                  <td>{food.food_status}</td>

                  <td className="flex gap-2">
                    <button
                      onClick={() => setSelectedFood(food)}
                      className="btn btn-sm btn-warning"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* Update Modal */}
      {selectedFood && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Food</h3>

            <form onSubmit={handleUpdate} className="grid gap-3">
              <input
                name="food_name"
                defaultValue={selectedFood.food_name}
                className="input input-bordered"
                required
              />

              <input
                name="food_image"
                defaultValue={selectedFood.food_image}
                className="input input-bordered"
                required
              />

              <input
                name="food_quantity"
                type="number"
                defaultValue={selectedFood.food_quantity}
                className="input input-bordered"
                required
              />

              <input
                name="pickup_location"
                defaultValue={selectedFood.pickup_location}
                className="input input-bordered"
                required
              />

              <input
                name="expire_date"
                type="date"
                defaultValue={selectedFood.expire_date.split("T")[0]}
                className="input input-bordered"
                required
              />

              <textarea
                name="additional_notes"
                defaultValue={selectedFood.additional_notes}
                className="textarea textarea-bordered"
              />

              <button className="btn btn-primary w-full mt-2">Save</button>
            </form>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedFood(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageMyFoods;
