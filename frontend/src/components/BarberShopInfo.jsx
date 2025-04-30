

import React from 'react';

const BarberShopInfo = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Our Vision */}
          <div className="bg-green-100 p-6 rounded-lg flex items-start space-x-4">
            <div className="bg-white p-3 rounded-full">
              <i className="fas fa-cut text-black"></i>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
              <p className="text-gray-700">
                To inspire and elevate our clients through exceptional grooming services, making a lasting impact in the barbering industry while fostering genuine connections with our patrons.
              </p>
            </div>
          </div>

          {/* Our Approach */}
          <div className="bg-white p-6 rounded-lg flex items-start space-x-4">
            <div className="bg-black p-3 rounded-full">
              <i className="fas fa-hands text-white"></i>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Our Approach</h2>
              <p className="text-gray-700">
                Our approach focuses on understanding each client’s unique style, collaborating closely to deliver tailored grooming services that enhance their appearance and confidence.
              </p>
            </div>
          </div>

          {/* Our Impact */}
          <div className="bg-white p-6 rounded-lg flex items-start space-x-4">
            <div className="bg-black p-3 rounded-full">
              <i className="fas fa-heart text-white"></i>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Our Impact</h2>
              <p className="text-gray-700">
                We strive to create meaningful transformations for our clients, using our expertise and creativity to turn grooming sessions into memorable experiences that foster loyalty.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div className="bg-white p-6 rounded-lg flex items-start space-x-4">
            <div className="bg-black p-3 rounded-full">
              <i className="fas fa-bullseye text-white"></i>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
              <p className="text-gray-700">
                At Elite Barber Shop, our mission is to amplify your personal style, sharing your unique look with the world through expert grooming and exceptional service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberShopInfo;
