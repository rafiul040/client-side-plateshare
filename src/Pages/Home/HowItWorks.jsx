import React from 'react';

const HowItWorks = () => {
    return (
        <div>
             <section className="bg-base-200 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          🚀 How It Works
        </h2>
        <div className="grid gap-8 sm:grid-cols-3 text-center px-6 md:px-10">
          <div className="p-6">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="text-xl font-semibold mb-2">1. Post</h3>
            <p>List your extra food on PlateShare in just a few clicks.</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-xl font-semibold mb-2">2. Find</h3>
            <p>Browse available food near your area anytime.</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="text-xl font-semibold mb-2">3. Collect</h3>
            <p>Connect with donors and collect fresh, shared meals.</p>
          </div>
        </div>
      </section>
        </div>
    );
};

export default HowItWorks;