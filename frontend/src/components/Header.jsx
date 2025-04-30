import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div
      className="flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.header_img})` }}
    >
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
              Vogue Vibe<br/> Book Appointment
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img 
            className="w-28" 
            src={assets.group_profiles} 
            alt="Group of People Profiles" 
          />
          <p className="text-white mt-2">
            You will leave looking sharp, relaxed, and ready to take on 
            the world with swagger in your stride. We are here for you.
          </p>
        </div>
        <a 
          href="#speciality" 
          className="flex items-center  gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm md:m-0 hover:scale-105 transation-all duration-300"
        >
          Book Appointment
          <img  className='w-3'
            src={assets.arrow_icon} 
            alt="Arrow Icon for Booking" 
        
          />
        </a>
      </div>


    
      
    </div>
  );
};

export default Header;
