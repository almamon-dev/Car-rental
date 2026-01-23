import React, { useState, useEffect } from "react";
import {
    Heart,
    MapPin,
    Star,
    ChevronRight,
    Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "../../../../Components/ui/Skeleton";

/**
 * EXECUTIVE ASSET DIRECTORY (REFINED LINKEDIN STYLE)
 * 
 * Philosophy:
 * - Ultra-Clean Manifest: Removed floating symbols and spec icons for a cleaner, data-driven look.
 * - Style Sync: Maintained cinematic vibration and exact Category.jsx button logic.
 * - High Density: Tighter vertical and horizontal spacing for professional efficiency.
 * - Palette: #f3f2ef section, white modular cards, #0a66c2 primary accents.
 */

const dummyCars = [
    {
        id: 1,
        name: "Porsche Taycan Turbo S",
        category: "Elite Electric",
        price: 450,
        year: "2024",
        mileage: "240 KM",
        transmission: "Auto",
        fuel: "Electric",
        passengers: "4 Seats",
        tech: "V2X Sync",
        location: "Downtown",
        status: "Certified",
        rating: 5.0,
        img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "BMW M8 Competition",
        category: "Performance Luxury",
        price: 380,
        year: "2023",
        mileage: "1,200 KM",
        transmission: "M-Step",
        fuel: "Petrol",
        passengers: "4 Seats",
        tech: "Driver+ Pro",
        location: "Financial",
        status: "Active",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Lexus LC 500 Inspiration",
        category: "Grand Tourer",
        price: 320,
        year: "2024",
        mileage: "85 KM",
        transmission: "Auto",
        fuel: "Hybrid",
        passengers: "2 Seats",
        tech: "Levinson",
        location: "Marina",
        status: "Verified",
        rating: 4.8,
        img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "Audi RS e-tron GT",
        category: "Prestige EV",
        price: 410,
        year: "2024",
        mileage: "500 KM",
        transmission: "Auto",
        fuel: "Electric",
        passengers: "5 Seats",
        tech: "e-Sound Pro",
        location: "Gateway",
        status: "Certified",
        rating: 5.0,
        img: "https://images.unsplash.com/photo-1603584173870-7f3bc1707294?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 5,
        name: "Mercedes S-Class 500",
        category: "Executive Luxury",
        price: 490,
        year: "2023",
        mileage: "2.1K KM",
        transmission: "9G-Tronic",
        fuel: "Petrol",
        passengers: "5 Seats",
        tech: "MBUX Hyperscreen",
        location: "Capital",
        status: "Active",
        rating: 4.7,
        img: "https://images.unsplash.com/photo-1541443131876-44b035dd1c51?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 6,
        name: "Tesla Model S Plaid",
        category: "Executive SUV",
        price: 260,
        year: "2024",
        mileage: "110 KM",
        transmission: "Auto",
        fuel: "Electric",
        passengers: "6 Seats",
        tech: "Full S-Drive",
        location: "Tech Val",
        status: "Verified",
        rating: 4.9,
        img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
    }
];

const CarSkeleton = () => (
    <div className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm">
        <Skeleton className="h-40 w-full rounded-none" />
        <div className="p-4 flex flex-col items-center">
            <Skeleton className="mt-4 h-4 w-3/4" />
            <div className="grid grid-cols-2 gap-2 w-full mt-4">
                 <Skeleton className="h-3 w-full" />
                 <Skeleton className="h-3 w-full" />
                 <Skeleton className="h-3 w-full" />
                 <Skeleton className="h-3 w-full" />
            </div>
            <Skeleton className="mt-4 h-8 w-full rounded-full" />
        </div>
    </div>
);

export default function CarListing() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-6 bg-transparent font-sans relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- COMPACT EXECUTIVE HEADER --- */}
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-[#0a66c2] rounded-full" />
                            <span className="text-[10px] font-bold text-[#0a66c2] uppercase tracking-[0.2em]">Operational Inventory</span>
                        </div>
                        <h2 className="text-[22px] font-bold text-[#000000e6] tracking-tight">
                            Elite Asset <span className="text-[#0a66c2]">Directory</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                         <div className="hidden md:flex flex-col items-end leading-none">
                              <span className="text-[12px] font-bold text-green-600 flex items-center gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                  142 Assets Available
                              </span>
                         </div>
                         <button className="flex items-center gap-1.5 text-[13px] font-bold text-[#0a66c2] hover:underline">
                            Explore All <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* --- ASSET GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <AnimatePresence mode="wait">
                        {isLoading
                            ? [...Array(8)].map((_, i) => (
                                  <motion.div key={`skel-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                      <CarSkeleton />
                                  </motion.div>
                              ))
                            : dummyCars.map((car, index) => (
                                  <motion.div
                                      key={car.id}
                                      initial={{ opacity: 0, y: 10 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.4, delay: index * 0.05 }}
                                      whileHover={{ y: -4 }}
                                      className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full group"
                                  >
                                      {/* --- CINEMATIC MEDIA --- */}
                                      <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                                          <motion.img
                                              src={car.img}
                                              alt={car.name}
                                              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-[800ms]"
                                              whileHover={{ 
                                                  scale: 1.2,
                                                  x: [0, -4, 4, 0], 
                                              }}
                                              transition={{ duration: 1, ease: "easeOut" }}
                                          />
                                          
                                          {/* Style Match Overlay */}
                                          <div className="absolute inset-0 bg-gradient-to-tr from-[#0a66c2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                          {/* Status Badges */}
                                          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                                               <div className="bg-white/95 px-2 py-0.5 rounded-md text-[9px] font-bold text-gray-900 border border-gray-100 shadow-sm flex items-center gap-1.5">
                                                   <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                                   {car.status}
                                               </div>
                                          </div>

                                          <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-red-500 transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 duration-300">
                                              <Heart size={14} />
                                          </button>
                                      </div>

                                      {/* --- CONTENT SECTION --- */}
                                      <div className="p-4 flex flex-col items-center text-center flex-1">
                                          <div className="w-full">
                                              <h4 className="text-[14px] font-bold text-gray-900 mb-0.5 group-hover:text-[#0a66c2] transition-colors line-clamp-1">
                                                  {car.name}
                                              </h4>
                                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">{car.category}</div>
                                          </div>

                                          {/* DATA MANIFEST (ICON-FREE) */}
                                          <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full py-4 border-y border-gray-50 mb-4 bg-slate-50/20 -mx-4 px-4 overflow-hidden">
                                              <SpecItem val={car.year} label="Series" />
                                              <SpecItem val={car.mileage} label="Mileage" />
                                              <SpecItem val={car.transmission} label="Trans" />
                                              <SpecItem val={car.passengers} label="Cap" />
                                          </div>

                                          {/* Pricing & CTA */}
                                          <div className="mt-auto w-full">
                                              <div className="flex items-center justify-between mb-3 px-1">
                                                  <div className="flex flex-col items-start leading-none gap-1">
                                                      <span className="text-[16px] font-black text-gray-900">${car.price}</span>
                                                      <div className="flex items-center gap-1">
                                                           <Star size={10} fill="#0a66c2" className="text-[#0a66c2]" />
                                                           <span className="text-[10px] font-black text-gray-900">{car.rating}</span>
                                                      </div>
                                                  </div>
                                                  <div className="flex items-center gap-2">
                                                       <MapPin size={12} className="text-blue-500" />
                                                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{car.location}</span>
                                                  </div>
                                              </div>
                                              
                                              {/* EXACT CATEGORY BUTTON STYLE */}
                                              <button className="w-full py-[5px] px-4 rounded-full border border-[#0a66c2] text-[#0a66c2] text-[14px] font-semibold hover:bg-[#f0f7ff] hover:shadow-[inset_0_0_0_1px_#0a66c2] transition-all duration-200 active:scale-[0.98]">
                                                  Deployment Profile
                                              </button>
                                          </div>
                                      </div>
                                  </motion.div>
                              ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

const SpecItem = ({ val, label }) => (
    <div className="flex flex-col items-start leading-none text-left">
        <span className="text-[11px] font-bold text-gray-900 truncate mb-0.5">{val}</span>
        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{label}</span>
    </div>
);
