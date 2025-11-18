import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { api } from "../../utils/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpinner";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get("/foods?status=Available");
        setFoods(res.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (foods.length === 0)
    return (
      <div className="text-center my-20">
        <h2 className="text-2xl font-semibold text-gray-600">
           No available foods found.
        </h2>
      </div>
    );

  const handleViewDetails = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/food/${id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        🥗 Available Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={food.food_image}
              alt={food.food_name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                {food.food_name}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <img
                  src={food.donator_photo}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-700">
                  Donated by <strong>{food.donator_name}</strong>
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                <strong>Quantity:</strong> {food.food_quantity}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Pickup Location:</strong> {food.pickup_location}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Expire Date:</strong> {food.expire_date}
              </p>

              
              <Link onClick={handleViewDetails} to={`/food/${food._id}`} className="btn btn-primary btn-sm">
  View Details
</Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;


