import React from "react";

export default function BrandNarrative() {
    return (
        <section className="bg-white py-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-[22px] font-bold text-[#081621] mb-4">
                            Premium Car Rental Service In Bangladesh
                        </h2>
                        <p className="text-[14px] text-[#666666] leading-[1.6] text-justify">
                            We at our Car Rental service love driving. Therefore, we aim to provide a huge fleet of premium, luxury, and economy cars for your journeys. Whether it's a corporate event, a family trip, or an individual need, we offer the best vehicle solutions with precision and care. Our commitment to quality and customer satisfaction makes us the leading car rental platform in the country. Explore our wide range of categories and experience the joy of seamless travel.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <h3 className="text-[18px] font-bold text-[#081621]">
                                Wide Fleet Of Modern Vehicles
                            </h3>
                            <p className="text-[13px] text-[#666666] leading-[1.6] text-justify">
                                From sleek sedans to powerful SUVs, our inventory is curated to meet diverse travel needs. Each vehicle undergoes rigorous maintenance checks to ensure safety and comfort. We believe in transparency and reliability, which is why our booking process is straightforward and efficient. 
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-[18px] font-bold text-[#081621]">
                                Unmatched Customer Experience
                            </h3>
                            <p className="text-[13px] text-[#666666] leading-[1.6] text-justify">
                                Our dedicated support team is always ready to assist you. From choosing the right car to navigating through your journey, we are here every step of the way. Experience the premium treatment that sets us apart in the logistics and rental market.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
