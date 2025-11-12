import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {



    const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/food").then((res) => res.json())
      .then((data) => {
    
        const sorted = data.sort((a, b) => b.quantity - a.quantity).slice(0, 6);
        setFoods(sorted);
      });
  }, []);
    return (
        <div>
            <section className="my-16 px-6 md:px-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          🍛 Featured Foods
        </h2>

        {foods.length === 0 ? (
          <p className="text-center text-gray-500">Loading top foods...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {foods.map((food) => (
              <div key={food._id} className="card bg-base-100 shadow-md hover:shadow-lg transition">
                <figure>
                  <img
                    src={food.image}
                    alt={food.title}
                    className="h-56 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{food.title}</h2>
                  <p className="text-gray-600">Quantity: {food.quantity}</p>
                  <p className="text-gray-500 text-sm">
                    Location: {food.location}
                  </p>
                  <div className="card-actions justify-end">
                    <Link to={`/foods/${food._id}`} className="btn btn-sm btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/availableFoods" className="btn btn-outline btn-primary">
            Show All
          </Link>
        </div>
      </section>
        </div>
    );
};

export default FeaturedProducts;