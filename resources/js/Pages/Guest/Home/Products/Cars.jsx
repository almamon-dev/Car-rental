import React, { useState, useEffect } from "react";
import {
    Heart,
    MapPin,
    Star,
    ChevronRight,
    Activity,
} from "lucide-react";
import { Skeleton } from "../../../../Components/ui/Skeleton";
import { Link } from "@inertiajs/react";

const CarSkeleton = () => (
    <div className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
        <Skeleton className="aspect-[16/10] rounded-none" />
        <div className="p-4 flex flex-col flex-1">
            <Skeleton className="h-4 rounded w-3/4 mb-4" />
            <div className="space-y-3 mb-6">
                <Skeleton className="h-3 rounded w-1/2" />
                <Skeleton className="h-3 rounded w-2/3" />
            </div>
            <div className="mt-auto pt-3 border-t border-gray-100 flex justify-center">
                <Skeleton className="h-5 rounded w-1/4" />
            </div>
        </div>
        <div className="px-4 pb-4 mt-auto">
            <Skeleton className="h-8 rounded-full w-full" />
        </div>
    </div>
);

export default function CarListing({ cars = [] }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
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
                            <span className="text-[10px] font-bold text-[#0a66c2]">Operational Inventory</span>
                        </div>
                        <h2 className="text-[22px] font-bold text-[#000000e6]">
                            Elite Asset <span className="text-[#0a66c2]">Directory</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                         <div className="hidden md:flex flex-col items-end leading-none">
                              <span className="text-[12px] font-bold text-green-600 flex items-center gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                  {cars.length} Assets Available
                              </span>
                         </div>
                         <Link href={route('car.list')} className="flex items-center gap-1.5 text-[13px] font-bold text-[#0a66c2] hover:underline">
                            Explore All <ChevronRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* --- ASSET GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {isLoading
                        ? [...Array(4)].map((_, i) => (
                              <div key={`skel-${i}`}>
                                  <CarSkeleton />
                              </div>
                          ))
                        : (cars.length > 0 ? cars : []).map((car) => (
                              <div
                                  key={car.id}
                                  className="bg-white rounded-[12px] border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full group hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative"
                              >
                                  {/* Save Badge Sync */}
                                  <div className="absolute top-2 left-0 z-10">
                                      <div className="bg-[#6e2594] text-white px-2.5 py-0.5 text-[10px] font-bold rounded-r-full shadow-sm">
                                          Save: ${Math.floor(Math.random() * 500) + 100}
                                      </div>
                                  </div>
                                  {/* --- CINEMATIC MEDIA --- */}
                                  <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                                      <img
                                          src={car.images && car.images.length > 0 ? `/${car.images[0].file_path}` : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"}
                                          alt={`${car.make} ${car.model}`}
                                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                                      />
                                      
                                      {/* Style Match Overlay */}
                                      <div className="absolute inset-0 bg-gradient-to-tr from-[#0a66c2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                      {/* Status Badges */}
                                      <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                                           <div className="bg-white/95 px-2 py-0.5 rounded-md text-[9px] font-bold text-gray-900 border border-gray-100 shadow-sm flex items-center gap-1.5">
                                               <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                               {car.status === 'available' ? 'Certified' : car.status}
                                           </div>
                                      </div>

                                      <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-[-5px] duration-300">
                                          <Heart size={15} />
                                      </button>
                                  </div>

                                  {/* --- CONTENT SECTION (STAR TECH STYLE) --- */}
                                  <div className="p-4 flex flex-col flex-1 border-t border-gray-50 text-left">
                                      <div className="mb-4">
                                          <h4 className="text-[14px] font-bold text-gray-800 hover:text-[#0a66c2] transition-colors leading-tight line-clamp-2">
                                              {car.brand?.name || car.make} {car.model} {car.year}
                                          </h4>
                                      </div>

                                      <ul className="space-y-1 text-[12.5px] text-gray-500 mb-4 list-none p-0">
                                          <li className="flex items-start gap-2">
                                              <span className="text-gray-300 transform translate-y-[2px]">•</span>
                                              <span>Category: <span className="text-gray-700 font-medium">{car.category?.name || 'Asset'}</span></span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                              <span className="text-gray-300 transform translate-y-[2px]">•</span>
                                              <span>Transmission: <span className="text-gray-700 font-medium">{car.specifications?.transmission || 'Auto'}</span></span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                              <span className="text-gray-300 transform translate-y-[1px]">•</span>
                                              <span>Fuel Type: <span className="text-gray-700 font-medium">{car.specifications?.fuel_type || 'N/A'}</span></span>
                                          </li>
                                      </ul>

                                      <div className="mt-auto border-t border-gray-100 pt-3 text-center">
                                          <div className="flex items-center justify-center gap-2 mb-3">
                                              <span className="text-[17px] font-bold text-[#0a66c2]">${Number(car.price_details?.daily_rate || 0).toLocaleString()}</span>
                                              <span className="text-[13px] text-gray-400 line-through font-medium leading-none">${(Number(car.price_details?.daily_rate || 0) + 500).toLocaleString()}</span>
                                          </div>
                                          
                                          <Link 
                                              href={route('car.details', car.id)}
                                              className="w-full py-[5px] inline-block px-4 rounded-full border border-[#0a66c2] text-[#0a66c2] text-[14px] font-semibold hover:bg-[#f0f7ff] hover:shadow-[inset_0_0_0_1px_#0a66c2] transition-all duration-200 active:scale-[0.98]"
                                          >
                                              View Details
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>
            </div>
        </section>
    );
}

const SpecItem = ({ val, label }) => (
    <div className="flex flex-col items-start leading-none text-left">
        <span className="text-[11px] font-bold text-gray-900 truncate mb-0.5">{val}</span>
        <span className="text-[8px] font-bold text-gray-400 uppercase">{label}</span>
    </div>
);
