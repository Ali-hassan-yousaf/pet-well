import React from 'react';

const BarberShop = () => {
  return (
    <div className="bg-white text-gray-800">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-3xl font-bold mb-4">
              Crafting Your Unique Style
            </h1>
            <h2 className="text-3xl font-bold mb-4">
              Journey Beyond Ordinary
            </h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto md:mx-0 mb-4"></div>
            <p className="text-base text-gray-600 mb-8 md:pr-8">
              To inspire and elevate your style through innovative grooming solutions, making a lasting impact in the fashion landscape while fostering genuine connections with our clients.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-xl text-black"></i>
                <span className="text-base font-medium">Exceptional Haircuts</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-xl text-black"></i>
                <span className="text-base font-medium">Beard Grooming</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-xl text-black"></i>
                <span className="text-base font-medium">Innovative Styling</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-xl text-black"></i>
                <span className="text-base font-medium">Client Collaboration</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center space-x-4">
            <div className="w-1/2">
              <img
                alt="Barber working on a client's hair"
                className="rounded-lg shadow-lg"
                height="400"
                src="https://storage.googleapis.com/a1aa/image/NbpUfB5ql2z3cCR6zDrn3K0wifPOoeWF0yJwkOpb0d1aWTePB.jpg"
                width="300"
              />
            </div>
            <div className="w-1/2">
              <img
                alt="Client with a stylish haircut"
                className="rounded-lg shadow-lg"
                height="400"
                src="https://storage.googleapis.com/a1aa/image/ptwqPjIyTb4VGhfzPGChlRmuehDoIurChdjfuzY3Wg1cWTePB.jpg"
                width="300"
              />
            </div>
          </div>
        </div>
      </div>

  );
};

export default BarberShop;
