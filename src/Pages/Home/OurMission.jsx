import React from 'react';

const OurMission = () => {
    return (
        <div>
            <section className="py-16 text-center px-6 md:px-10">
        <h2 className="text-3xl font-bold mb-4">🌍 Our Mission</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          Our mission is to create a community where no food goes to waste and
          no one goes hungry. Together, we build a sustainable and caring
          environment.
        </p>

        <div className="stats shadow flex flex-wrap justify-center">
          <div className="stat">
            <div className="stat-title">Total Donors</div>
            <div className="stat-value text-primary">1.2K+</div>
          </div>
          <div className="stat">
            <div className="stat-title">Meals Shared</div>
            <div className="stat-value text-secondary">8.4K+</div>
          </div>
          <div className="stat">
            <div className="stat-title">Communities Reached</div>
            <div className="stat-value text-accent">350+</div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default OurMission;