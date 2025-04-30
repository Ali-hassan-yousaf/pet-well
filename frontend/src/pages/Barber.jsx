import React from 'react';
import BarberCount from '../components/barbercount';
// import Mobile from '../components/mobile';

const App = () => {
  return (
    <div>
      <body class="bg-gray-50">
    <header class="relative h-screen">
     <div class="absolute inset-0">
      <img alt="A stylish barber shop interior with vintage decor and modern equipment" class="w-full h-full object-cover" height="1080" src="https://storage.googleapis.com/a1aa/image/vOdP2yjqjYqABFefsnOc8C8DdlzYsnB6UHhBM6Lf4YghcZ9nA.jpg" width="1920"/>
      <div class="absolute inset-0 bg-black opacity-50">
      </div>
     </div>
     <div class="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
      <div>
       <h1 class="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
        Classic Cuts &amp; Modern Style
       </h1>
       <p class="text-2xl mb-8 animate-slide-up">
        Experience the art of traditional barbering
       </p>
       <div className="flex justify-center">
  <button
    className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2 text-lg"
    onClick={() => window.location.href = '/saloons'}
  >
    Book Now
  </button>
</div>


      </div>
     </div>
    </header>
    <div class="container mx-auto px-6 py-20">
     <section class="mb-32">
      <h2 class="text-4xl font-bold text-center text-gray-800 mb-16">
       Our Services
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
       <div class="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        <div class="h-56 overflow-hidden">
         <img alt="A classic haircut being performed by a skilled barber" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" height="300" src="https://storage.googleapis.com/a1aa/image/W4jCKSPB2JqjKJbrciCpB4EsJt3fmzHAwpiklzPehdrDusenA.jpg" width="400"/>
        </div>
        <div class="p-8">
         <h3 class="text-2xl font-bold text-gray-800 mb-3">
          Classic Haircut
         </h3>
         <p class="text-gray-600 mb-6">
          Traditional haircut with precision trimming and styling.
         </p>
         <div class="flex justify-between items-center">
         
         <button
  className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2"
  onClick={() => window.location.href = '/saloons'}
>
  Book Now
</button>

         </div>
        </div>
       </div>
       <div class="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        <div class="h-56 overflow-hidden">
         <img alt="A well-groomed beard being trimmed by a professional barber" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" height="300" src="https://storage.googleapis.com/a1aa/image/hsNKQAhUfuSWXKOCSStSM1GuJkgJu2LcT5etjZibLA5LusenA.jpg" width="400"/>
        </div>
        <div class="p-8">
         <h3 class="text-2xl font-bold text-gray-800 mb-3">
          Beard Trim
         </h3>
         <p class="text-gray-600 mb-6">
          Professional beard grooming and shaping.
         </p>
         <div class="flex justify-between items-center">
         
         <button
  className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2"
  onClick={() => window.location.href = '/saloons'}
>
  Book Now
</button>

         </div>
        </div>
       </div>
       <div class="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        <div class="h-56 overflow-hidden">
         <img alt="A luxurious hot towel shave being performed with precision" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" height="300" src="https://storage.googleapis.com/a1aa/image/1uVt6kCQymJNKRjeqnoWRYZWfiU9MXvMX7tM0R74LOoOusenA.jpg" width="400"/>
        </div>
        <div class="p-8">
         <h3 class="text-2xl font-bold text-gray-800 mb-3">
          Hot Towel Shave
         </h3>
         <p class="text-gray-600 mb-6">
          Luxurious straight razor shave with hot towel treatment.
         </p>
         <div class="flex justify-between items-center">
       
         <button
  className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2"
  onClick={() => window.location.href = '/saloons'}
>
  Book Now
</button>

         </div>
        </div>
       </div>
       <div class="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        <div class="h-56 overflow-hidden">
         <img alt="A contemporary hairstyle being styled by a professional barber" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" height="300" src="https://storage.googleapis.com/a1aa/image/TDtlUTiZH3KsMpsEM74vMyeT5gnkcfj0kUpPdQQmjhfOcZ9nA.jpg" width="400"/>
        </div>
        <div class="p-8">
         <h3 class="text-2xl font-bold text-gray-800 mb-3">
          Hair Styling
         </h3>
         <p class="text-gray-600 mb-6">
          Contemporary styling for any occasion.
         </p>
         <div class="flex justify-between items-center">
       
       
           <button
  className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2"
  onClick={() => window.location.href = '/saloons'}
>
           Book Now
           <i class="fas fa-arrow-right">
           </i>
          </button>
         </div>
        </div>
       </div>
      </div>
     </section>
     <section class="mb-32">
      <h2 class="text-4xl font-bold text-center text-gray-800 mb-16">
       Meet Our Barbers
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
       <div class="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        <div class="h-72 overflow-hidden">
         <img alt="A professional barber named Hassan Shahid with 10+ years of experience" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" height="300" src="https://storage.googleapis.com/a1aa/image/qahrfN0a4ftgfpkgrxg6Yrdtnwbred6X9nwH5D5UTFZl4y6PB.jpg" width="400"/>
        </div>
        <div class="p-8 text-center">
         <h3 class="text-2xl font-bold text-gray-800 mb-3">
          Hassan Shahid
         </h3>
         <p class="text-xl text-blue-600 mb-2">
          Classic Cuts
         </p>
         <p class="text-gray-500">
          10+ years Experience
         </p>
        </div>
       </div>
       <div class="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        <div class="h-72 overflow-hidden">
         <img alt="A professional barber named Ali Raza with 8 years of experience" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" height="300" src="https://storage.googleapis.com/a1aa/image/DMQpN3t98OK4IBH7rl5aAZB6Ic9i9truEGuzVzrUsPnkLrfJA.jpg" width="400"/>
        </div>
        <div class="p-8 text-center">
         <h3 class="text-2xl font-bold text-gray-800 mb-3">
          Ali Raza
         </h3>
         <p class="text-xl text-blue-600 mb-2">
          Modern Styles
         </p>
         <p class="text-gray-500">
          8 years Experience
         </p>
        </div>
       </div>
       <div class="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        <div class="h-72 overflow-hidden">
         <img alt="A professional barber named Sana Rizwan with 12 years of experience" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" height="300" src="https://storage.googleapis.com/a1aa/image/2XdPlaQXBKbxNZS1ypTokCrKv4cilmreEVzOq45uk8reRtenA.jpg" width="400"/>
        </div>
        <div class="p-8 text-center">
         <h3 class="text-2xl font-bold text-gray-800 mb-3">
          Sana Rizwan
         </h3>
         <p class="text-xl text-blue-600 mb-2">
          Beard Styling
         </p>
         <p class="text-gray-500">
          12 years Experience
         </p>
        </div>
       </div>
      </div>
     </section>
     <section class="mb-32">
     </section>
     <section class="mb-32">
      <h2 class="text-4xl font-bold text-center text-gray-800 mb-16">
       Client Testimonials
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
       <div class="bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div class="flex gap-2 mb-6">
         <i class="fas fa-star text-yellow-400 text-2xl">
         </i>
         <i class="fas fa-star text-yellow-400 text-2xl">
         </i>
         <i class="fas fa-star text-yellow-400 text-2xl">
         </i>
         <i class="fas fa-star text-yellow-400 text-2xl">
         </i>
         <i class="fas fa-star text-yellow-400 text-2xl">
         </i>
        </div>
        <p class="text-xl text-gray-600 italic mb-6">
         "Best haircut I've ever had! The attention to detail is amazing."
        </p>
        <p class="text-lg font-semibold text-gray-800">
         Anas Hassan
        </p>
       </div>
       <div class="bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div class="flex gap-2 mb-6">
         <i class="fas fa-star text-yellow-400 text-2xl">
         </i>
         <i class="fas fa-star text-yellow-400 text-2xl">
         </i>
         <i class="fas fa-star text-yellow-400 text-2xl">
         </i>
         <i class="fas fa-star text-yellow-400 text-2xl">
         </i>
         <i class="fas fa-star text-yellow-400 text-2xl">
         </i>
        </div>
        <p class="text-xl text-gray-600 italic mb-6">
         "Great atmosphere and professional service."
        </p>
        <p class="text-lg font-semibold text-gray-800">
         Sana Fatima
        </p>
       </div>
      </div>
     </section>
     <section class="mb-32">
      <h2 class="text-4xl font-bold text-center text-gray-800 mb-16">
       Our Gallery
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
       <img alt="A stylish haircut being performed by a professional barber" class="w-full h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition-all duration-300" height="300" src="https://storage.googleapis.com/a1aa/image/pw2mbv93JDJoOxzTuklGlbDo5BSnx5NaSEuJIlhr78UhLrfJA.jpg" width="400"/>
       <img alt="A well-groomed beard being trimmed by a professional barber" class="w-full h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition-all duration-300" height="300" src="https://storage.googleapis.com/a1aa/image/hsNKQAhUfuSWXKOCSStSM1GuJkgJu2LcT5etjZibLA5LusenA.jpg" width="400"/>
       <img alt="A luxurious hot towel shave being performed with precision" class="w-full h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition-all duration-300" height="300" src="https://storage.googleapis.com/a1aa/image/1uVt6kCQymJNKRjeqnoWRYZWfiU9MXvMX7tM0R74LOoOusenA.jpg" width="400"/>
       <img alt="A contemporary hairstyle being styled by a professional barber" class="w-full h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition-all duration-300" height="300" src="https://storage.googleapis.com/a1aa/image/TDtlUTiZH3KsMpsEM74vMyeT5gnkcfj0kUpPdQQmjhfOcZ9nA.jpg" width="400"/>
      </div>
     </section>
     <BarberCount/>
    {/* <Mobile/> */}
    </div>

   </body>
   
   
    </div>
  );
};
const services = [
  {
    title: 'Haircut',
    description: 'Stylish haircuts tailored to your preference.',
    price: 'PKR 200',
  },
  {
    title: 'Beard Trim',
    description: 'Precision trimming and shaping for a sharp look.',
    price: 'PKR 150',
  },
  {
    title: 'Facial',
    description: 'Rejuvenate your skin with our premium facials.',
    price: 'PKR 300',
  },
  {
    title: 'Hair Wash',
    description: 'Relaxing hair wash with premium products.',
    price: 'PKR 250',
  },
];

const team = [
  {
    name: 'Ali Ahmed',
    specialization: 'Haircut Specialist',
    experience: '10 years of experience',
    image: 'https://storage.googleapis.com/a1aa/image/qahrfN0a4ftgfpkgrxg6Yrdtnwbred6X9nwH5D5UTFZl4y6PB.jpg',
  },
  {
    name: 'Omar Khan',
    specialization: 'Beard Expert',
    experience: '8 years of experience',
    image: 'https://storage.googleapis.com/a1aa/image/DMQpN3t98OK4IBH7rl5aAZB6Ic9i9truEGuzVzrUsPnkLrfJA.jpg',
  },
 
  {
    name: 'Ahmed Iqbal',
    specialization: 'All-Rounder',
    experience: '12 years of experience',
    image: 'https://storage.googleapis.com/a1aa/image/2XdPlaQXBKbxNZS1ypTokCrKv4cilmreEVzOq45uk8reRtenA.jpg',
  },
];

export default App;
