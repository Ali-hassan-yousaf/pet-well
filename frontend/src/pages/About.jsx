import React from 'react';
import BarberShop from '../components/BarberShop';  // Adjust the path if necessary
import SalonPage from '../components/salonpage';
import BarberShopInfo from '../components/BarberShopInfo';



function App() {
  return (
    <div>
      <BarberShop />
      <SalonPage/>
      <BarberShopInfo/>

      <section class="py-10 bg-white sm:py-16 lg:py-24">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">People who made it successful</h2>
            <p class="max-w-2xl mx-auto mt-4 text-xl text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
        </div>

        <div class="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-3 md:mt-16 lg:gap-x-12">
            <div>
                <img class="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/6/team-member-1.jpg" alt="" />
            </div>

            <div>
                <img class="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/6/team-member-2.jpg" alt="" />
            </div>

            <div>
                <img class="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/6/team-member-3.jpg" alt="" />
            </div>
        </div>
    </div>
</section>

<section class="py-10 bg-gray-900 sm:py-16 lg:py-24">
    <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Salon Questions & Answers</h2>
            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-300">Explore the common questions and answers about our salon services</p>
        </div>

        <div class="grid grid-cols-1 mt-12 md:mt-20 md:grid-cols-2 gap-y-16 gap-x-20">
            <div class="flex items-start">
                <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
                    <span class="text-lg font-semibold text-white">?</span>
                </div>
                <div class="ml-4">
                    <p class="text-xl font-semibold text-white">How do I book an appointment?</p>
                    <p class="mt-4 text-base text-gray-400">You can book an appointment by visiting our website, using our mobile app, or calling our salon directly.</p>
                </div>
            </div>

            <div class="flex items-start">
                <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
                    <span class="text-lg font-semibold text-white">?</span>
                </div>
                <div class="ml-4">
                    <p class="text-xl font-semibold text-white">What payment methods do you accept?</p>
                    <p class="mt-4 text-base text-gray-400">We accept cash, credit/debit cards, and various digital payment methods like Apple Pay and Google Pay.</p>
                </div>
            </div>

            <div class="flex items-start">
                <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
                    <span class="text-lg font-semibold text-white">?</span>
                </div>
                <div class="ml-4">
                    <p class="text-xl font-semibold text-white">Do you offer any discounts or packages?</p>
                    <p class="mt-4 text-base text-gray-400">Yes, we provide seasonal discounts and customized grooming packages. Contact us for more details.</p>
                </div>
            </div>

            <div class="flex items-start">
                <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
                    <span class="text-lg font-semibold text-white">?</span>
                </div>
                <div class="ml-4">
                    <p class="text-xl font-semibold text-white">What services do you provide?</p>
                    <p class="mt-4 text-base text-gray-400">We offer haircuts, styling, coloring, manicures, pedicures, and more to enhance your personal style.</p>
                </div>
            </div>
        </div>

        {/* <div class="flex items-center justify-center mt-12 md:mt-20">
            <div class="px-8 py-4 text-center bg-gray-800 rounded-full">
                <p class="text-gray-50">Didn’t find the answer you are looking for? <a href="#" title="" class="text-yellow-300 transition-all duration-200 hover:text-yellow-400 focus:text-yellow-400 hover:underline">Contact our support team</a></p>
            </div>
        </div> */}
    </div>
</section>


    </div>
  );
}

export default App;


