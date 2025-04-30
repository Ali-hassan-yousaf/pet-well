import React from 'react';

const SalonReviews = () => {
    return (
        <section className="py-10 bg-pink-50 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        What our salon customers say
                    </h2>
                    <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
                        Discover why our clients love our salon services. From haircuts to spa treatments, we’re here to pamper you.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2">
                    {/* Review 1 */}
                    <div className="overflow-hidden bg-white rounded-md shadow-lg">
                        <div className="px-5 py-6">
                            <div className="flex items-center justify-between">
                                <img
                                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-1.jpg"
                                    alt="Customer Avatar"
                                />
                                <div className="min-w-0 ml-3 mr-auto">
                                    <p className="text-base font-semibold text-gray-900 truncate">Shahid Hassan</p>
                                    <p className="text-sm text-gray-600 truncate">@shahid</p>
                                </div>
                                <a href="#" title="" className="inline-block text-pink-500">
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19.633 7.997c.013.175..." />
                                    </svg>
                                </a>
                            </div>
                            <blockquote className="mt-5">
                                <p className="text-base text-gray-800">
                                    "The spa experience was simply divine! The facial left my skin glowing, and the ambiance was perfect."
                                    <span className="block text-pink-500">#RelaxationGoals</span>
                                </p>
                            </blockquote>
                        </div>
                    </div>

                    {/* Review 2 */}
                    <div className="overflow-hidden bg-white rounded-md shadow-lg">
                        <div className="px-5 py-6">
                            <div className="flex items-center justify-between">
                                <img
                                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-2.jpg"
                                    alt="Customer Avatar"
                                />
                                <div className="min-w-0 ml-3 mr-auto">
                                    <p className="text-base font-semibold text-gray-900 truncate">Daniel Martinez</p>
                                    <p className="text-sm text-gray-600 truncate">@danmart</p>
                                </div>
                                <a href="#" title="" className="inline-block text-pink-500">
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19.633 7.997c.013.175..." />
                                    </svg>
                                </a>
                            </div>
                            <blockquote className="mt-5">
                                <p className="text-base text-gray-800">
                                    "I loved the haircut and styling. The stylist really understood what I wanted. Highly recommend!"
                                    <span className="block text-pink-500">#StyleUpgrade</span>
                                </p>
                            </blockquote>
                        </div>
                    </div>

                    {/* Review 3 */}
                    <div className="overflow-hidden bg-white rounded-md shadow-lg">
                        <div className="px-5 py-6">
                            <div className="flex items-center justify-between">
                                <img
                                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-3.jpg"
                                    alt="Customer Avatar"
                                />
                                <div className="min-w-0 ml-3 mr-auto">
                                    <p className="text-base font-semibold text-gray-900 truncate">Hamza Ali</p>
                                    <p className="text-sm text-gray-600 truncate">@Ham</p>
                                </div>
                                <a href="#" title="" className="inline-block text-pink-500">
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19.633 7.997c.013.175..." />
                                    </svg>
                                </a>
                            </div>
                            <blockquote className="mt-5">
                                <p className="text-base text-gray-800">
                                    "Their manicure and pedicure services are out of this world! Perfect attention to detail."
                                    <span className="block text-pink-500">#Pampered</span>
                                </p>
                            </blockquote>
                        </div>
                    </div>

                    {/* Review 4 */}
                    <div className="overflow-hidden bg-white rounded-md shadow-lg">
                        <div className="px-5 py-6">
                            <div className="flex items-center justify-between">
                                <img
                                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-4.jpg"
                                    alt="Customer Avatar"
                                />
                                <div className="min-w-0 ml-3 mr-auto">
                                    <p className="text-base font-semibold text-gray-900 truncate">Mirza Fatima</p>
                                    <p className="text-sm text-gray-600 truncate">@Fatima</p>
                                </div>
                                <a href="#" title="" className="inline-block text-pink-500">
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19.633 7.997c.013.175..." />
                                    </svg>
                                </a>
                            </div>
                            <blockquote className="mt-5">
                                <p className="text-base text-gray-800">
                                    "Best hair coloring experience I've ever had! The team is incredibly talented."
                                    <span className="block text-pink-500">#ColorMeHappy</span>
                                </p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SalonReviews;
