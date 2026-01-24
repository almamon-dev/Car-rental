import React from "react";
import {
    Gauge,
    Calendar,
    Settings,
    Wifi,
    Baby,
    Fuel,
    Clock,
    ShieldCheck,
    CheckCircle2,
    ArrowRight,
    Users,
    Battery,
    Shield,
    Zap,
    Navigation,
    Smartphone,
    Camera,
    Lock,
    Sun,
    Volume2,
    Wind,
    BatteryCharging,
} from "lucide-react";

// --- Stats Section ---
export const stats = [
    {
        value: "450+",
        label: "Premium Fleet",
        color: "from-blue-500 to-cyan-400",
    },
    { value: "99.8%", label: "Uptime", color: "from-emerald-500 to-green-400" },
    {
        value: "24/7",
        label: "VIP Support",
        color: "from-purple-500 to-pink-400",
    },
    {
        value: "60min",
        label: "Delivery",
        color: "from-orange-500 to-amber-400",
    },
];

// --- Car Image Gallery ---
export const carImages = [
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
];

// --- Hero Stats (Main Specs) ---
export const heroStats = [
    {
        icon: <Zap size={20} />,
        value: "455 HP",
        label: "Engine Power",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: <Gauge size={20} />,
        value: "4.2s",
        label: "0-60 MPH",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: <Fuel size={20} />,
        value: "22 MPG",
        label: "Fuel Economy",
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: <Battery size={20} />,
        value: "650 Km",
        label: "Range",
        color: "from-orange-500 to-red-500",
    },
    {
        icon: <Users size={20} />,
        value: "4",
        label: "Seats",
        color: "from-indigo-500 to-blue-500",
    },
    {
        icon: <Calendar size={20} />,
        value: "2023",
        label: "Model Year",
        color: "from-yellow-500 to-amber-500",
    },
];

// --- Features List ---
export const features = [
    { icon: <Camera size={18} />, label: "360° Camera", category: "Safety" },
    {
        icon: <Navigation size={18} />,
        label: "Adaptive Cruise",
        category: "Tech",
    },
    {
        icon: <Smartphone size={18} />,
        label: "Apple CarPlay",
        category: "Tech",
    },
    {
        icon: <Lock size={18} />,
        label: "Keyless Entry",
        category: "Convenience",
    },
    { icon: <Wind size={18} />, label: "Dual Climate", category: "Comfort" },
    {
        icon: <Volume2 size={18} />,
        label: "Premium Audio",
        category: "Entertainment",
    },
    { icon: <Sun size={18} />, label: "Panoramic Roof", category: "Comfort" },
    {
        icon: <Shield size={18} />,
        label: "Blind Spot Monitor",
        category: "Safety",
    },
    {
        icon: <BatteryCharging size={18} />,
        label: "Wireless Charging",
        category: "Tech",
    },
];

// --- Specifications Table Data ---
export const specifications = [
    {
        category: "Performance",
        items: [
            { label: "Engine", value: "6.2L V8", icon: <Settings size={16} /> },
            { label: "Horsepower", value: "455 HP", icon: <Zap size={16} /> },
            { label: "Torque", value: "455 lb-ft", icon: <Gauge size={16} /> },
            {
                label: "0-60 mph",
                value: "4.2 seconds",
                icon: <Clock size={16} />,
            },
        ],
    },
    {
        category: "Technology",
        items: [
            {
                label: "Infotainment",
                value: '10" Touchscreen',
                icon: <Smartphone size={16} />,
            },
            {
                label: "Connectivity",
                value: "4G LTE Wi-Fi",
                icon: <Wifi size={16} />,
            },
            {
                label: "Audio",
                value: "Bose 9-Speaker",
                icon: <Volume2 size={16} />,
            },
            {
                label: "Navigation",
                value: "HD Live Map",
                icon: <Navigation size={16} />,
            },
        ],
    },
];

// --- Extra Services ---
export const extraServices = [
    {
        id: 1,
        name: "GPS Navigation",
        price: 1500,
        icon: <Navigation size={16} />,
        popular: true,
    },
    {
        id: 2,
        name: "Child Safety Seat",
        price: 1000,
        icon: <Baby size={16} />,
        popular: true,
    },
    {
        id: 3,
        name: "Wi-Fi Hotspot",
        price: 800,
        icon: <Wifi size={16} />,
        popular: false,
    },
    {
        id: 4,
        name: "Additional Driver",
        price: 3500,
        icon: <Users size={16} />,
        popular: false,
    },
    {
        id: 5,
        name: "Roadside Plus",
        price: 2500,
        icon: <ShieldCheck size={16} />,
        popular: true,
    },
    {
        id: 6,
        name: "Express Return",
        price: 1800,
        icon: <Clock size={16} />,
        popular: false,
    },
];

// --- Similar Cars ---
export const similarCars = [
    {
        id: 101,
        slug: "toyota-camry-se-elite-dummy",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=600",
        brand: "Toyota",
        name: "Toyota Camry SE Elite",
        model: "Camry SE Elite",
        make: "Toyota",
        year: 2024,
        location: "Financial District",
        price: "12,500",
        rating: 4.8,
        specifications: {
            mileage: "12 km/L",
            transmission: "Automatic",
            fuel_type: "Hybrid"
        },
        features: [
            { feature_name: "Self-Driving Assist" },
            { feature_name: "Panoramic Roof" },
            { feature_name: "Premium Audio" }
        ],
        isAvailable: true,
    },
    {
        id: 102,
        slug: "audi-r8-performance-v10-dummy",
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=600",
        brand: "Audi",
        name: "Audi R8 Performance",
        model: "R8 Performance",
        make: "Audi",
        year: 2025,
        location: "Business Bay Area",
        price: "45,000",
        rating: 4.9,
        specifications: {
            mileage: "6 km/L",
            transmission: "Manual",
            fuel_type: "Petrol"
        },
        features: [
            { feature_name: "V10 Engine" },
            { feature_name: "Carbon Interior" },
            { feature_name: "Sport Exhaust" }
        ],
        isAvailable: true,
    },
];

export const faqs = [
    { q: "Cancellation policy?", a: "48 hours lead time for full refund." },
];

export const reviews = [
    {
        id: 1,
        name: "Michael",
        comment: "Great car!",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=1",
        date: "Jan 2026",
        verified: true,
    },
];

// --- Animations ---
export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
};

export const transition = {
    duration: 0.5,
    ease: "easeOut",
};
