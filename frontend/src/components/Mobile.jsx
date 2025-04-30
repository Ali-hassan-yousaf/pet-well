import React from 'react'

const Mobile = () => {
  return (
    

    <section class="overflow-hidden">
        <div class="flex flex-col lg:flex-row lg:items-stretch lg:max-h-[900px] lg:min-h-[900px]">
            <div class="flex items-center justify-center w-full lg:order-2 lg:w-7/12">
                <div class="h-full px-4 pt-24 pb-16 sm:px-6 lg:px-24 2xl:px-32 lg:pt-40 lg:pb-14">
                    <div class="flex flex-col justify-between flex-1 h-full">
                        <div>
                            <h1 class="text-4xl font-bold text-black sm:text-6xl xl:text-7xl">Download <br />the Vogue Vibe app</h1>
                            <p class="mt-6 text-base text-black sm:text-xl">Our APP helps you to predict your expenses based on your previous activity and shares how you should manage you money.</p>
                        </div>

                        <div class="mt-8 border-t-2 border-black lg:mt-auto sm:mt-14">
                            <div class="pt-8 sm:flex sm:items-center sm:justify-between sm:pt-14">
                                <p class="text-base font-semibold text-black">App available on</p>

                                <div class="flex items-center mt-5 space-x-5 sm:mt-0">
                                    <a href="#" title="" class="block transition-all duration-200 hover:opacity-80 focus:opacity-80" role="button">
                                        <img class="w-auto rounded h-14 sm:h-16" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/app-store-button.png" alt="" />
                                    </a>

                                    <a href="#" title="" class="block transition-all duration-200 hover:opacity-80 focus:opacity-80" role="button">
                                        <img class="w-auto rounded h-14 sm:h-16" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/play-store-button.png" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="relative w-full overflow-hidden lg:w-5/12 lg:order-1">
                <div class="lg:absolute lg:bottom-0 lg:left-0">
                    <img class="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/phone-mockup.png" alt="" />
                </div>
            </div>
        </div>
    </section>


  )
}

export default Mobile