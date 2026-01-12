import React from "react";
import {
    ShieldCheck,
    Truck,
    Headphones,
    CircleDollarSign,
    Zap,
    CarFront,
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title }) => (
    <div className="group relative bg-white p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden">
        {/* Hover Border Gradient Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#147a81] transition-all duration-500 rounded-2xl [mask-image:linear-gradient(135deg,black_30%,transparent_90%)] opacity-0 group-hover:opacity-100 pointer-events-none"></div>

        {/* Icon Container */}
        <div className="relative z-10 flex-shrink-0 w-14 h-14 bg-[#147a81] rounded-2xl flex items-center justify-center text-white transition-all duration-500 group-hover:bg-orange-600">
            <Icon size={26} strokeWidth={1.5} />
        </div>

        <div className="relative z-10">
            <h4 className="font-bold text-gray-900 text-[17px] mb-0.5 leading-tight">
                {title}
            </h4>
            <p className="text-gray-500 text-[13px] leading-snug max-w-[180px]">
                Car Rent offers a fleet of high-quality
            </p>
        </div>
    </div>
);

const CarRentalFeatures = () => {
    const features = [
        { icon: Zap, title: "Best Deal" },
        { icon: Truck, title: "Doorstep Delivery" },
        { icon: ShieldCheck, title: "Low Security Deposit" },
        { icon: CarFront, title: "Latest Cars" },
        { icon: Headphones, title: "Customer Support" },
        { icon: CircleDollarSign, title: "No Hidden Charges" },
    ];

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto bg-white font-sans">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Side: Text and Image */}
                <div className="space-y-10">
                    <div className="max-w-md">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-orange-500 text-xl">✦</span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                Best Platform for Car Rental
                            </h2>
                            <span className="text-orange-500 text-xl">✦</span>
                        </div>
                        <p className="text-gray-500 leading-relaxed text-lg">
                            Why do we choose relax rent bikes generally if we
                            travel in unknown cities? With a car in our hand, we
                            feel like we are in our hometown.
                        </p>
                    </div>

                    <div className="relative pt-10">
                        {/* Shadow underneath car */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-black/10 blur-3xl rounded-[100%] -z-10"></div>
                        <img
                            src="images/Category/car.png"
                            alt="Premium Car"
                            className="w-full h-auto drop-shadow-2xl transform transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                </div>

                {/* Right Side: Features Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((f, index) => (
                        <FeatureCard
                            key={index}
                            icon={f.icon}
                            title={f.title}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CarRentalFeatures;
