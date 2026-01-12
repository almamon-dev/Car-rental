import React from "react";
import { Calendar, MapPin, Car } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Choose Date & Locations",
        description:
            "Determine the date & location for your car rental. Consider factors such as your travel itinerary, pickup/drop-off locations.",
        icon: <Calendar className="text-white" size={24} />,
        bgColor: "bg-orange-500",
    },
    {
        id: 2,
        title: "Select Pick-Up & Drop Locations",
        description:
            "Check the availability of your desired vehicle type for your chosen dates and location. Ensure that the rental rates, taxes, fees, and any additional charges.",
        icon: <MapPin className="text-white" size={24} />,
        bgColor: "bg-teal-600",
    },
    {
        id: 3,
        title: "Book your Car",
        description:
            "Determine the date & location for your car rental. Consider factors such as your travel itinerary, pickup/drop-off locations.",
        icon: <Car className="text-white" size={24} />,
        bgColor: "bg-[#1A1C1E]",
    },
];

const stats = [
    { label: "Happy Customers", value: "3K+" },
    { label: "Count of Cars", value: "616K+" },
    { label: "Locations to Pickup", value: "145K+" },
    { label: "Total Kilometers", value: "3492K+" },
];

export default function RentStepsSection() {
    return (
        <section className="bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Top Section: Image and Steps */}
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
                    {/* Left: Car Image */}
                    <div className="w-full lg:w-1/2 relative">
                        <img
                            src="images/Category/car.png"
                            alt="Rental Car"
                            className="w-full h-auto object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Right: Steps */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1A1C1E] mb-4">
                            Rent Our Cars in{" "}
                            <span className="text-gray-400">3 Steps</span>
                        </h2>
                        <p className="text-gray-500 mb-10">
                            Check how it Works to Rent Cars in 3 Easy Steps
                        </p>

                        <div className="space-y-8">
                            {steps.map((step) => (
                                <div key={step.id} className="flex gap-6">
                                    <div
                                        className={`shrink-0 w-14 h-14 rounded-xl ${step.bgColor} flex items-center justify-center shadow-lg`}
                                    >
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#1A1C1E] mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Stats Counter */}
                <div className="bg-[#0F1012] rounded-3xl p-10 md:p-16 relative overflow-hidden">
                    {/* Background Texture Effect */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <h4 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                                    {stat.value}
                                </h4>
                                <div className="w-12 h-0.5 bg-gray-700 mx-auto mb-3"></div>
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
