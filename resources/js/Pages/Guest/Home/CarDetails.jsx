import { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    Car,
    Map as MapIcon,
    Star,
    Gauge,
    Calendar,
    Settings,
    Share2,
    Heart,
    MapPin,
    Eye,
    Repeat,
    Award,
    Wifi,
    Baby,
    Fuel,
    Globe,
    Info,
    Clock,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
} from "lucide-react";

export default function CarDetails() {
    // 1. States
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeFaqIndex, setActiveFaqIndex] = useState(null);

    // 2. Dummy Data
    const carImages = [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
    ];

    const features = [
        "360-degree Camera",
        "Adaptive Cruise Control",
        "Adaptive Headlights",
        "Air Bags",
        "Air Conditioner",
        "Panoramic Sunroof",
        "Parking Sensors",
        "Rear View Camera",
        "USB",
    ];

    const faqs = [
        {
            q: "How old do I need to be to rent a car?",
            a: "You generally need to be at least 21 years old, though some luxury categories may require you to be 25.",
        },
        {
            q: "What documents do I need to rent a car?",
            a: "A valid driver's license, a passport or ID, and a credit card in the driver's name.",
        },
        {
            q: "What types of vehicles are available for rent?",
            a: "We offer sedans, SUVs, luxury sports cars like the Camaro, and economy models.",
        },
        {
            q: "Can I rent a car with a debit card?",
            a: "Yes, though a security deposit will be held on the card for the duration of the rental.",
        },
    ];
    // Dummy data for Related Items
    const relatedCars = [
        {
            id: 1,
            name: "Toyota Camry SE 400",
            brand: "Toyota",
            price: 100,
            year: 2025,
            location: "Westminster Abbey",
            img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=400",
        },
        {
            id: 2,
            name: "Chevrolet Pick Truck 3.5L",
            brand: "Audi",
            price: 160,
            year: 2022,
            location: "The Tower of London",
            img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=400",
        },
        {
            id: 3,
            name: "Tesla New X",
            brand: "Tesla",
            price: 20,
            year: 2025,
            location: "Big Ben",
            img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=400",
        },
    ];

    const toggleFaq = (index) => {
        setActiveFaqIndex(activeFaqIndex === index ? null : index);
    };

    return (
        <GuestLayout>
            {/* Hero Section */}
            <section className="relative bg-[#1a1a1a] py-16 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Chevrolet Camaro
                    </h1>
                    <nav className="flex justify-center items-center space-x-2 text-sm text-white">
                        <a
                            href="/"
                            className="hover:text-orange-500 transition-colors"
                        >
                            Home
                        </a>
                        <span>/</span>
                        <a
                            href="#"
                            className="hover:text-orange-500 transition-colors"
                        >
                            Listings
                        </a>
                        <span>/</span>
                        <span className="text-orange-500 font-medium">
                            Chevrolet Camaro
                        </span>
                    </nav>
                </div>
            </section>

            {/* Sub-Header Bar */}
            <section className="bg-white p-6 shadow-sm border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                                <Car size={12} />{" "}
                                <span className="text-xs">Sedan</span>
                            </div>
                            <span className="bg-[#157284] text-white px-2 py-0.5 rounded text-xs font-bold">
                                2023
                            </span>
                            <div className="flex items-center gap-1">
                                <div className="flex text-orange-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className="fill-current"
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-400 text-xs">
                                    (5.0)
                                </span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Chevrolet Camaro
                        </h1>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                                <MapPin size={14} /> Miami St, Destin, FL
                            </span>
                            <span className="flex items-center gap-1">
                                <Eye size={14} /> Views: 250
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={14} /> 01 Jan, 2024
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="bg-[#157284] text-white px-4 py-2 rounded-lg font-medium text-sm">
                            Total Booking: 300
                        </button>
                        <button className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 flex items-center gap-2">
                            <Repeat size={18} /> Compare
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="bg-[#f8f9fa] py-10 px-4">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* Left Column */}
                    <div className="w-full lg:w-[68%] space-y-6">
                        {/* Gallery */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="relative group rounded-xl overflow-hidden mb-4 h-[450px] bg-gray-200">
                                <img
                                    src={carImages[activeImageIndex]}
                                    className="w-full h-full object-cover"
                                    alt="Chevrolet Camaro"
                                />
                                <button
                                    onClick={() =>
                                        setActiveImageIndex((prev) =>
                                            prev === 0
                                                ? carImages.length - 1
                                                : prev - 1
                                        )
                                    }
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() =>
                                        setActiveImageIndex((prev) =>
                                            prev === carImages.length - 1
                                                ? 0
                                                : prev + 1
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {carImages.map((img, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActiveImageIndex(i)}
                                        className={`rounded-lg overflow-hidden border-2 cursor-pointer ${
                                            activeImageIndex === i
                                                ? "border-[#157284]"
                                                : "border-transparent"
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            className="w-full h-24 object-cover"
                                            alt="thumb"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Extra Services */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6 flex flex-col">
                                Extra Service{" "}
                                <span className="w-12 h-1 bg-orange-500 mt-1 rounded-full"></span>
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
                                <ServiceIcon
                                    icon={<MapIcon size={18} />}
                                    label="GPS Systems"
                                />
                                <ServiceIcon
                                    icon={<Wifi size={18} />}
                                    label="Wi-Fi Hotspot"
                                />
                                <ServiceIcon
                                    icon={<Baby size={18} />}
                                    label="Child Seats"
                                />
                                <ServiceIcon
                                    icon={<Fuel size={18} />}
                                    label="Fuel Options"
                                />
                                <ServiceIcon
                                    icon={<ShieldCheck size={18} />}
                                    label="Roadside Asst."
                                />
                                <ServiceIcon
                                    icon={<Globe size={18} />}
                                    label="Satellite Radio"
                                />
                                <ServiceIcon
                                    icon={<Info size={18} />}
                                    label="Accessories"
                                />
                                <ServiceIcon
                                    icon={<Clock size={18} />}
                                    label="Express Check"
                                />
                            </div>
                        </div>

                        {/* Specifications */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6 flex flex-col">
                                Specifications{" "}
                                <span className="w-12 h-1 bg-orange-500 mt-1 rounded-full"></span>
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <SpecItem
                                    icon={<Car size={18} />}
                                    label="Body"
                                    value="Sedan"
                                />
                                <SpecItem
                                    icon={<Settings size={18} />}
                                    label="Make"
                                    value="Chevrolet"
                                />
                                <SpecItem
                                    icon={<Repeat size={18} />}
                                    label="Transmission"
                                    value="Automatic"
                                />
                                <SpecItem
                                    icon={<Fuel size={18} />}
                                    label="Fuel Type"
                                    value="Petrol"
                                />
                                <SpecItem
                                    icon={<Gauge size={18} />}
                                    label="Mileage"
                                    value="12 Km"
                                />
                                <SpecItem
                                    icon={<Calendar size={18} />}
                                    label="Year"
                                    value="2023"
                                />
                                <SpecItem
                                    icon={<CheckCircle2 size={18} />}
                                    label="VIN"
                                    value="CHV987654"
                                />
                                <SpecItem
                                    icon={<Settings size={18} />}
                                    label="Engine (hp)"
                                    value="455"
                                />
                            </div>
                        </div>

                        {/* Car Features */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6 flex flex-col">
                                Car Features{" "}
                                <span className="w-12 h-1 bg-orange-500 mt-1 rounded-full"></span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">
                                {features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-2 text-gray-600"
                                    >
                                        <CheckCircle2
                                            size={18}
                                            className="text-[#157284]"
                                        />
                                        <span className="text-sm">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6 flex flex-col">
                                Description{" "}
                                <span className="w-12 h-1 bg-orange-500 mt-1 rounded-full"></span>
                            </h3>
                            <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                                <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s.
                                </p>
                                <p>
                                    It was popularised in the 1960s with the
                                    release of Letraset sheets containing
                                    passages, and more recently with desktop
                                    publishing software.
                                </p>
                            </div>
                        </div>

                        {/* Policy & FAQ Section */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6 flex flex-col">
                                Policy Documents{" "}
                                <span className="w-12 h-1 bg-orange-500 mt-1 rounded-full"></span>
                            </h3>
                            <p className="text-sm text-gray-500 italic">
                                No policy documents available at this time.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6 flex flex-col">
                                Frequently Asked Questions{" "}
                                <span className="w-12 h-1 bg-orange-500 mt-1 rounded-full"></span>
                            </h3>
                            <div className="space-y-3">
                                {faqs.map((faq, i) => (
                                    <div
                                        key={i}
                                        className="border border-gray-100 rounded-lg overflow-hidden"
                                    >
                                        <div
                                            onClick={() => toggleFaq(i)}
                                            className="flex items-center justify-between p-4 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Info
                                                    size={16}
                                                    className="text-orange-400"
                                                />
                                                <span className="text-sm font-medium text-gray-700">
                                                    {faq.q}
                                                </span>
                                            </div>
                                            <ChevronRight
                                                size={18}
                                                className={`text-gray-400 transition-transform duration-300 ${
                                                    activeFaqIndex === i
                                                        ? "rotate-90"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${
                                                activeFaqIndex === i
                                                    ? "max-h-40 border-t border-gray-50"
                                                    : "max-h-0"
                                            }`}
                                        >
                                            <div className="p-4 text-sm text-gray-600 bg-gray-50">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6 flex flex-col">
                                Reviews{" "}
                                <span className="w-12 h-1 bg-orange-500 mt-1 rounded-full"></span>
                            </h3>
                            <div className="border border-gray-100 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                            <img
                                                src="https://i.pravatar.cc/150?u=admin"
                                                alt="admin"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">
                                                Admin User
                                            </h4>
                                            <p className="text-xs text-gray-400">
                                                14 Mar 2024
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex text-orange-400 gap-0.5 items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={
                                                    i < 4 ? "fill-current" : ""
                                                }
                                            />
                                        ))}
                                        <span className="text-xs text-gray-400 ml-1">
                                            (4)
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Great car, had a fantastic experience
                                    renting this for the weekend! Highly
                                    recommended.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-[32%] space-y-6">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-24 p-6">
                            <h3 className="text-lg font-bold mb-1">
                                Booking Form
                            </h3>
                            <div className="w-10 h-1 bg-orange-500 rounded-full mb-6"></div>

                            <div className="space-y-4">
                                {/* Rental Type */}
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-2">
                                        Rental Type
                                    </label>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <input
                                            type="radio"
                                            checked
                                            readOnly
                                            className="text-[#157284] focus:ring-[#157284]"
                                        />
                                        <span>Day</span>
                                    </div>
                                </div>

                                {/* Locations */}
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">
                                            Pickup Location
                                        </label>
                                        <select className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-400 outline-none">
                                            <option>
                                                Palace of Westminster
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">
                                            Dropoff Location
                                        </label>
                                        <select className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-400 outline-none">
                                            <option>Big Ben</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Dates & Times */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">
                                            Pickup Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs outline-none"
                                            defaultValue="2026-01-10"
                                        />
                                        <input
                                            type="time"
                                            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs outline-none"
                                            defaultValue="13:50"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">
                                            Drop-off Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs outline-none"
                                            defaultValue="2026-01-13"
                                        />
                                        <input
                                            type="time"
                                            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs outline-none"
                                            defaultValue="13:50"
                                        />
                                    </div>
                                </div>

                                {/* Extra Services */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 block">
                                        Extra Service
                                    </label>
                                    {[
                                        "Child Safety Seats - $10",
                                        "Wi-Fi Hotspot - $10",
                                        "Navigation - $10",
                                    ].map((service) => (
                                        <div
                                            key={service}
                                            className="flex items-center gap-2 text-sm text-gray-500"
                                        >
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-[#157284]"
                                            />
                                            <span>{service}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="space-y-3 pt-2">
                                    <button className="w-full bg-orange-500 text-white font-bold py-4 rounded-lg transition-all duration-300 hover:bg-[#EA580C] shadow-md">
                                        Check Availability
                                    </button>
                                    <button className="w-full bg-[#157284] text-white font-bold py-4 rounded-lg transition-all duration-300 hover:bg-[#115e6b]">
                                        Enquiry Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            {/* Related Items Section */}
            <section className="bg-[#f8f9fa] pb-16">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header with Title and Navigation */}
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-gray-900">
                            You May be Interested in
                        </h3>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full bg-white border border-gray-100 shadow-sm transition-all duration-300 ease-in-out hover:bg-[#EA580C] active:scale-95 group">
                                <ArrowLeft
                                    size={20}
                                    strokeWidth={2.5}
                                    className="text-gray-600 transition-colors duration-300 group-hover:text-white"
                                />
                            </button>
                            <button className="p-2 rounded-full bg-white border border-gray-100 shadow-sm transition-all duration-300 ease-in-out hover:bg-[#EA580C] active:scale-95 group">
                                <ArrowRight
                                    size={20}
                                    strokeWidth={2.5}
                                    className="text-gray-600 transition-colors duration-300 group-hover:text-white"
                                />
                            </button>
                        </div>
                    </div>

                    {/* Responsive Grid for Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <RelatedCarCard
                            image="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=600"
                            brand="Toyota"
                            name="Toyota Camry SE 400"
                            location="Westminster Abbey"
                            price="100"
                        />
                        <RelatedCarCard
                            image="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=600"
                            brand="Audi"
                            name="Chevrolet Pick Truck 3.5L"
                            location="The Tower of London"
                            price="160"
                        />
                        <RelatedCarCard
                            image="https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=600"
                            brand="Tesla"
                            name="Tesla New X"
                            location="Big Ben"
                            price="20"
                        />
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

// Reusable Components
function ServiceIcon({ icon, label }) {
    return (
        <div className="flex items-center gap-2 group cursor-pointer">
            <div className="text-[#157284] p-1.5 bg-[#157284]/10 rounded-md group-hover:bg-[#157284] group-hover:text-white transition-all">
                {icon}
            </div>
            <span className="text-[11px] font-bold text-gray-600 uppercase">
                {label}
            </span>
        </div>
    );
}

function SpecItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-3 p-3 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="text-gray-400">{icon}</div>
            <div>
                <p className="text-[9px] uppercase text-gray-400 font-bold">
                    {label}
                </p>
                <p className="text-xs font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
}

function PriceRow({ label, price, active = false }) {
    return (
        <div
            className={`flex justify-between items-center p-3 rounded-lg border transition-all cursor-pointer ${
                active ? "border-[#157284] bg-teal-50" : "border-gray-100"
            }`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        active ? "border-[#157284]" : "border-gray-300"
                    }`}
                >
                    {active && (
                        <div className="w-2 h-2 rounded-full bg-[#157284]" />
                    )}
                </div>
                <span className="text-sm font-bold text-gray-600">{label}</span>
            </div>
            <span className="font-bold text-gray-900">{price}</span>
        </div>
    );
}
function RelatedCarCard({ image, brand, name, location, price }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
            {/* Image Wrapper */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {brand}
                </span>
            </div>

            {/* Content */}
            <div className="p-5">
                <h4 className="font-bold text-gray-900 mb-3">{name}</h4>

                <div className="space-y-2 mb-5">
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <Settings size={14} /> Automatic
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Fuel size={14} /> Electric
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <MapPin size={14} /> {location}
                        </span>
                        <span>
                            Starting From{" "}
                            <span className="text-red-500 font-bold text-sm">
                                ${price}
                            </span>
                            /Day
                        </span>
                    </div>
                </div>

                <button className="w-full bg-[#111827] text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-500 transition-colors flex items-center justify-center gap-2">
                    Rent Now
                </button>
            </div>
        </div>
    );
}
