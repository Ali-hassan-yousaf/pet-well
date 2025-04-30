
import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Vogue Vibe is a modern salon management system designed to provide users with a seamless and convenient experience. This platform allows users to schedule salon appointments, browse services, and make online payments effortlessly. The front-end is developed using React.js and Bootstrap, while the back-end is built with Node.js and Express.js. With integrated payment methods, Vogue Vibe offers a comprehensive and professional solution that ensures efficiency and ease for its users.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <NavLink to='/'><li className='cursor-pointer hover:text-black'>Home</li></NavLink>
            <NavLink to='/barber'><li className='cursor-pointer hover:text-black'>My Shopes</li></NavLink>
            <NavLink to='/about'><li className='cursor-pointer hover:text-black'>About</li></NavLink>
            <NavLink to='/contact'><li className='cursor-pointer hover:text-black'>Contact</li></NavLink>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>03164356746</li>
            <li> myousaf5431@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @ Voguevibe.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
