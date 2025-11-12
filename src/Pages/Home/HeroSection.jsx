import React from 'react';
import { Link } from 'react-router';

const HeroSection = () => {
    return (
        <div>
            <section className="hero min-h-[70vh] bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co/XWm4j1M/food-share-banner.jpg')" }}>
                    <div className="hero-overlay bg-black bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                      <div className="max-w-2xl">
                        <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white">
                          Share Food, Spread Love 🍽
                        </h1>
                        <p className="mb-5 text-lg text-gray-200">
                          PlateShare connects kind hearts — donate your surplus food, find available meals, and reduce community waste together.
                        </p>
                        <div className="flex justify-center gap-4">
                          <Link to="/availableFoods" className="btn btn-primary">
                            View All Foods
                          </Link>
                          <Link to="/search" className="btn btn-outline text-white border-white">
                            Search Food
                          </Link>
                        </div>
                      </div>
                    </div>
                  </section>
        </div>
    );
};

export default HeroSection;