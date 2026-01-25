import React, { useState, useEffect } from "react";
import {
    Heart,
    MapPin,
    Star,
    ChevronRight,
    Activity,
    Zap,
    Fuel,
    Settings,
    Shield
} from "lucide-react";
import { Skeleton } from "../../../../Components/ui/Skeleton";
import { Link, router, usePage } from "@inertiajs/react";
import { useLanguage } from "@/Contexts/LanguageContext";

const CarSkeleton = () => (
    <div className="bg-white rounded-[4px] border border-gray-200 overflow-hidden flex flex-col h-full">
        <Skeleton className="aspect-[16/10] rounded-none" />
        <div className="p-4 flex flex-col flex-1">
            <Skeleton className="h-4 rounded-[2px] w-3/4 mb-4" />
            <div className="space-y-3 mb-6">
                <Skeleton className="h-3 rounded-[2px] w-1/2" />
                <Skeleton className="h-3 rounded-[2px] w-2/3" />
            </div>
            <div className="mt-auto pt-3 border-t border-gray-100 flex justify-center">
                <Skeleton className="h-5 rounded-[2px] w-1/4" />
            </div>
        </div>
        <div className="px-4 pb-4 mt-auto">
            <Skeleton className="h-8 rounded-[4px] w-full" />
        </div>
    </div>
);

export default function CarListing({ cars = [] }) {
    const { t } = useLanguage();
    const { auth } = usePage().props;
    const [isLoading, setIsLoading] = useState(true);

    const toggleFavorite = (e, carId) => {
        e.preventDefault();
        e.stopPropagation();

        if (!auth.user) {
            router.get(route('login'));
            return;
        }

        router.post(route('user.favorites.toggle', carId), {}, {
            preserveScroll: true
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-6 bg-transparent font-sans relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-black text-[#3749bb] uppercase tracking-widest leading-none">
                                {t.home.cars.recommended}
                            </span>
                        </div>
                        <h2 className="text-[24px] font-bold text-gray-900 leading-none">
                            {t.home.cars.available} <span className="text-[#3749bb]">{t.home.cars.fleet}</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                         <div className="hidden md:flex flex-col items-end leading-none">
                              <span className="text-[12px] font-bold text-green-600 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                  {cars.length} {t.home.cars.cars_available}
                              </span>
                         </div>
                         <Link href={route('car.list')} className="flex items-center gap-1.5 text-[13px] font-bold text-[#3749bb] hover:underline transition-all">
                            {t.home.cars.explore_all} <ChevronRight size={14} />
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
                                  className="bg-white rounded-[4px] border border-gray-200 overflow-hidden flex flex-col h-full group transition-all duration-300 relative"
                              >
                                  {/* --- SAVE BADGE (STAR TECH CHIP STYLE) --- */}
                                  <div className="absolute top-2 left-2 z-10">
                                      <div className="bg-[#3749bb] text-white px-2 py-0.5 text-[10px] font-black rounded-[2px] shadow-sm uppercase tracking-tighter">
                                          {t.listing.save}: {car.price_details?.currency || '৳'}{Math.floor(Number(car.price_details?.daily_rate || 0) * 0.2).toLocaleString()}
                                      </div>
                                  </div>

                                  {/* --- MEDIA --- */}
                                  <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                                      <img
                                          src={car.images && car.images.length > 0 ? `/${car.images[0].file_path}` : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"}
                                          alt={`${car.make} ${car.model}`}
                                          className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                                      />
                                      
                                      <button 
                                          onClick={(e) => toggleFavorite(e, car.id)}
                                          className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity ${
                                              car.is_favorited ? "text-red-500" : "text-gray-400 hover:text-red-500"
                                          }`}
                                      >
                                          <Heart size={15} fill={car.is_favorited ? "currentColor" : "none"} />
                                      </button>
                                  </div>

                                  {/* --- CONTENT SECTION --- */}
                                  <div className="p-4 flex flex-col flex-1 border-gray-50 text-left">
                                      <div className="mb-4">
                                          <h4 className="text-[14px] font-bold text-gray-900 group-hover:text-[#3749bb] transition-colors leading-tight line-clamp-2">
                                              {car.brand?.name || car.make} {car.model} {car.year}
                                          </h4>
                                      </div>

                                      {/* Specs List */}
                                      <div className="space-y-1.5 mb-5 border-t border-gray-100 pt-3">
                                          <ListSpec Icon={Activity} label={t.listing.ops_range} val={car.specifications?.mileage || 'N/A'} />
                                          <ListSpec Icon={Settings} label={t.listing.transmission} val={car.specifications?.transmission || 'Auto'} />
                                          <ListSpec Icon={Fuel} label={t.listing.fuel_type} val={car.specifications?.fuel_type || 'N/A'} />
                                      </div>

                                      {/* Key Highlights (Bullet style) */}
                                      {car.features && car.features.length > 0 && (
                                          <div className="mb-5">
                                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter block mb-2 leading-none">Key Highlights</span>
                                              <div className="grid grid-cols-1 gap-1">
                                                  {car.features.slice(0, 3).map((feat, idx) => (
                                                      <div key={idx} className="flex items-center gap-1.5">
                                                           <div className="w-1 h-1 rounded-full bg-[#3749bb]" />
                                                           <span className="text-[11px] font-bold text-gray-600 line-clamp-1">{feat.feature_name}</span>
                                                      </div>
                                                  ))}
                                              </div>
                                          </div>
                                      )}

                                      <div className="mt-auto border-t border-gray-100 pt-3 text-center">
                                          <div className="flex items-center justify-center gap-2 mb-3">
                                              <span className="text-[16px] font-black text-[#3749bb]">{car.price_details?.currency || '৳'}{Number(car.price_details?.daily_rate || 0).toLocaleString()}</span>
                                              <span className="text-[12px] text-gray-400 line-through font-bold leading-none">{car.price_details?.currency || '৳'}{(Number(car.price_details?.daily_rate || 0) * 1.25).toFixed(0).toLocaleString()}</span>
                                          </div>
                                          
                                          <Link 
                                              href={car.slug ? `${route('car.details', car.slug)}#${Array.from({length:250}, () => 'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 36))).join('')}` : '#'}
                                              className={`w-full py-1.5 inline-block px-4 rounded-[4px] border border-[#3749bb] text-[#3749bb] text-[13px] font-bold hover:bg-[#3749bb] hover:text-white transition-all duration-200 active:scale-[0.98] ${!car.slug ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                          >
                                              {t.listing.view_details}
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

const ListSpec = ({ Icon, label, val }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Icon size={12} className="text-[#3749bb]" />
            <span className="text-[12px] font-medium text-gray-500">{label}</span>
        </div>
        <span className="text-[12px] font-bold text-gray-900">{val}</span>
    </div>
);

const SpecItem = ({ val, label }) => (
    <div className="flex flex-col items-start leading-none text-left">
        <span className="text-[11px] font-bold text-gray-900 truncate mb-0.5">{val}</span>
        <span className="text-[8px] font-bold text-gray-400 uppercase">{label}</span>
    </div>
);
