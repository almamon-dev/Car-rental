import React, { useState, useEffect, useRef } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, router, usePage } from "@inertiajs/react";
import {
    Search,
    Filter,
    ChevronUp,
    ChevronDown,
    Grid3X3,
    Heart
} from "lucide-react";
import { Skeleton } from "@/Components/ui/Skeleton";

export default function CarListingPage({ cars, categories = [], brands = [], maxPrice = 2500000 }) {
    const queryParams = new URLSearchParams(window.location.search);
    const isFirstRender = useRef(true);

    // --- STATE ---
    const [isLoading, setIsLoading] = useState(true);
    const [openMenus, setOpenMenus] = useState({
        price: true,
        availability: true,
        categories: true,
        brands: true,
        transmission: false,
        fuel: false
    });
    
    // Filter State
    const [filters, setFilters] = useState({
        search: queryParams.get('search') || '',
        categories: queryParams.get('category')?.split(',').filter(Boolean) || [],
        brands: queryParams.get('brand')?.split(',').filter(Boolean) || [],
        availability: queryParams.get('status')?.split(',').filter(Boolean) || [],
        transmission: queryParams.get('transmission')?.split(',').filter(Boolean) || [],
        fuel_type: queryParams.get('fuel_type')?.split(',').filter(Boolean) || [],
        min_price: parseInt(queryParams.get('min_price')) || 0,
        max_price: parseInt(queryParams.get('max_price')) || maxPrice,
        sort: queryParams.get('sort') || 'latest',
        per_page: queryParams.get('per_page') || '12',
    });

    // Sync filters if maxPrice changes (e.g. after migration)
    useEffect(() => {
        if (filters.max_price > maxPrice && maxPrice > 0) {
            setFilters(prev => ({ ...prev, max_price: maxPrice }));
        }
    }, [maxPrice]);

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    const handleFilterChange = (type, value) => {
        setFilters(prev => {
            const currentItems = [...prev[type]];
            if (currentItems.includes(value)) {
                return { ...prev, [type]: currentItems.filter(i => i !== value) };
            } else {
                return { ...prev, [type]: [...currentItems, value] };
            }
        });
    };

    // Apply Filter Function
    const applyFilters = () => {
        setIsLoading(true);
        const data = {};
        if (filters.search) data.search = filters.search;
        if (filters.categories.length) data.category = filters.categories.join(',');
        if (filters.brands.length) data.brand = filters.brands.join(',');
        if (filters.availability.length) data.status = filters.availability.join(',');
        if (filters.transmission.length) data.transmission = filters.transmission.join(',');
        if (filters.fuel_type.length) data.fuel_type = filters.fuel_type.join(',');
        
        if (filters.min_price > 0) data.min_price = filters.min_price;
        if (filters.max_price < maxPrice) data.max_price = filters.max_price;
        if (filters.sort !== 'latest') data.sort = filters.sort;
        if (filters.per_page !== '24') data.per_page = filters.per_page;

        router.get(route('car.list'), data, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => setIsLoading(false)
        });
    };

    useEffect(() => {
        // Initial mount animation to ensure skeletons are seen on first arrival
        const mountTimer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(mountTimer);
    }, []);

    // Trigger filter update on state change (Automatic)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timer = setTimeout(() => {
            applyFilters();
        }, 400); // Reduced debounce for snappier feel
        return () => clearTimeout(timer);
    }, [
        filters.search,
        filters.categories, 
        filters.brands, 
        filters.availability, 
        filters.transmission,
        filters.fuel_type,
        filters.min_price, 
        filters.max_price,
        filters.sort,
        filters.per_page
    ]);

    const hasActiveFilters = 
        filters.categories.length > 0 || 
        filters.brands.length > 0 || 
        filters.availability.length > 0 || 
        filters.transmission.length > 0 || 
        filters.fuel_type.length > 0 || 
        filters.min_price > 0 || 
        filters.max_price < maxPrice || 
        filters.search !== '';

    const clearAllFilters = () => {
        setFilters(prev => ({
            ...prev,
            search: '',
            categories: [],
            brands: [],
            availability: [],
            transmission: [],
            fuel_type: [],
            min_price: 0,
            max_price: maxPrice,
            sort: 'latest',
            per_page: '24',
        }));
    };

    // Pagination data
    const { data, links, total, last_page, from, to } = cars;

    return (
        <GuestLayout>
            <div className="bg-[#f3f2ef] py-6 min-h-screen font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
                    

                    <div className="lg:grid lg:grid-cols-12 gap-5 items-start">
                        
                        {/* --- SIDEBAR --- */}
                        <aside className="lg:col-span-3 space-y-4 order-1 sticky top-6">
                            
                            {/* Filter Header with Clear Link */}
                            <div className="bg-white rounded border border-gray-200 p-4 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">Filters</h4>
                                    {hasActiveFilters && (
                                        <button 
                                            onClick={clearAllFilters}
                                            className="text-[12px] font-bold text-[#0a66c2] hover:text-[#004182] hover:underline flex items-center gap-1 transition-all"
                                        >
                                            <span className="text-[14px]">×</span> Clear All
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            {/* Price Filter - Exact Match to Reference Image */}
                            <div className="bg-white rounded border border-gray-200 overflow-hidden">
                                <div className="p-4 border-b border-gray-100">
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">Price Range</h4>
                                </div>
                                <div className="px-5 py-6">
                                    {/* Slider Track with Handles */}
                                    <div className="relative h-8 w-full flex items-center mb-8">
                                        <div className="absolute w-full h-2.5 bg-gray-100 rounded-full border border-gray-200/50"></div>
                                        <div 
                                            className="absolute h-2.5 bg-[#0a66c2] rounded-full"
                                            style={{ 
                                                left: `${(filters.min_price / (maxPrice || 1)) * 100}%`, 
                                                right: `${100 - (filters.max_price / (maxPrice || 1)) * 100}%` 
                                            }}
                                        ></div>

                                        <input
                                            type="range" min="0" max={maxPrice || 100} step="1"
                                            value={filters.min_price}
                                            onChange={(e) => setFilters({...filters, min_price: Math.min(Number(e.target.value), filters.max_price - 1)})}
                                            className="absolute appearance-none w-full h-2.5 bg-transparent pointer-events-none cursor-pointer slider-range-input"
                                            style={{ zIndex: filters.min_price > (maxPrice || 100) / 2 ? 30 : 25 }}
                                        />
                                        <input
                                            type="range" min="0" max={maxPrice || 100} step="1"
                                            value={filters.max_price}
                                            onChange={(e) => setFilters({...filters, max_price: Math.max(Number(e.target.value), Number(filters.min_price) + 1)})}
                                            className="absolute appearance-none w-full h-2.5 bg-transparent pointer-events-none cursor-pointer slider-range-input"
                                            style={{ zIndex: filters.max_price < (maxPrice || 100) / 2 ? 30 : 25 }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input 
                                            type="number" 
                                            value={filters.min_price} 
                                            onChange={(e) => setFilters({ ...filters, min_price: Math.max(0, Number(e.target.value)) })}
                                            className="w-full text-center px-3 py-2 border border-gray-200 rounded text-[14px] font-bold text-gray-700 outline-none focus:border-[#0a66c2]"
                                        />
                                        <input 
                                            type="number" 
                                            value={filters.max_price} 
                                            onChange={(e) => setFilters({ ...filters, max_price: Math.min(maxPrice, Number(e.target.value)) })}
                                            className="w-full text-center px-3 py-2 border border-gray-200 rounded text-[14px] font-bold text-gray-700 outline-none focus:border-[#0a66c2]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded">
                                <button onClick={() => toggleMenu('availability')} className={`w-full p-4 flex items-center justify-between ${openMenus.availability ? 'border-b border-gray-100' : ''}`}>
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">Availability</h4>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openMenus.availability ? 'rotate-180 text-[#0a66c2]' : ''}`} />
                                </button>
                                {openMenus.availability && (
                                    <div className="px-5 py-5 space-y-3">
                                        {['available', 'booked', 'maintenance'].map((status) => (
                                            <label key={status} className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" checked={filters.availability.includes(status)} onChange={() => handleFilterChange('availability', status)} className="custom-checkbox" />
                                                <span className="text-[13px] font-medium capitalize">{status === 'available' ? 'Certified' : status}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Category Filter */}
                            <div className="bg-white border border-gray-200 rounded">
                                <button onClick={() => toggleMenu('categories')} className={`w-full p-4 flex items-center justify-between ${openMenus.categories ? 'border-b border-gray-100' : ''}`}>
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">Categories</h4>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openMenus.categories ? 'rotate-180 text-[#0a66c2]' : ''}`} />
                                </button>
                                {openMenus.categories && (
                                    <div className="px-5 py-5 space-y-3 max-h-[270px] overflow-y-auto custom-scrollbar">
                                        {categories.map((cat) => (
                                            <label key={cat.id} className="flex items-center justify-between cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <input type="checkbox" checked={filters.categories.includes(String(cat.slug))} onChange={() => handleFilterChange('categories', String(cat.slug))} className="custom-checkbox" />
                                                    <span className="text-[13px] font-medium">{cat.name}</span>
                                                </div>
                                                <span className="text-[11px] font-bold text-gray-400">{cat.cars_count}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Brand Filter */}
                            <div className="bg-white border border-gray-200 rounded">
                                <button onClick={() => toggleMenu('brands')} className={`w-full p-4 flex items-center justify-between ${openMenus.brands ? 'border-b border-gray-100' : ''}`}>
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">Brands</h4>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openMenus.brands ? 'rotate-180 text-[#0a66c2]' : ''}`} />
                                </button>
                                {openMenus.brands && (
                                    <div className="px-5 py-5 space-y-3 max-h-[270px] overflow-y-auto custom-scrollbar">
                                        {brands.map((brand) => (
                                            <label key={brand.id} className="flex items-center justify-between cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <input type="checkbox" checked={filters.brands.includes(String(brand.slug))} onChange={() => handleFilterChange('brands', String(brand.slug))} className="custom-checkbox" />
                                                    <span className="text-[13px] font-medium">{brand.name}</span>
                                                </div>
                                                <span className="text-[11px] font-bold text-gray-400">{brand.cars_count}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Transmission Filter */}
                            <div className="bg-white border border-gray-200 rounded">
                                <button onClick={() => toggleMenu('transmission')} className={`w-full p-4 flex items-center justify-between ${openMenus.transmission ? 'border-b border-gray-100' : ''}`}>
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">Transmission</h4>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openMenus.transmission ? 'rotate-180 text-[#0a66c2]' : ''}`} />
                                </button>
                                {openMenus.transmission && (     
                                    <div className="px-5 py-5 space-y-3 max-h-[270px] overflow-y-auto custom-scrollbar">
                                        {['Automatic', 'Manual', 'CVT'].map((t) => (
                                            <label key={t} className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" checked={filters.transmission.includes(t)} onChange={() => handleFilterChange('transmission', t)} className="custom-checkbox" />
                                                <span className="text-[13px] font-medium">{t}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Fuel Type Filter */}
                            <div className="bg-white border border-gray-200 rounded">
                                <button onClick={() => toggleMenu('fuel')} className={`w-full p-4 flex items-center justify-between ${openMenus.fuel ? 'border-b border-gray-100' : ''}`}>
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">Fuel Type</h4>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openMenus.fuel ? 'rotate-180 text-[#0a66c2]' : ''}`} />
                                </button>
                                {openMenus.fuel && (
                                    <div className="px-5 py-5 space-y-3">
                                        {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map((f) => (
                                            <label key={f} className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" checked={filters.fuel_type.includes(f)} onChange={() => handleFilterChange('fuel_type', f)} className="custom-checkbox" />
                                                <span className="text-[13px] font-medium">{f}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </aside>

                        {/* --- LISTING --- */}
                        <main className="w-full lg:col-span-9 order-2 relative min-h-[400px]">
                            {/* --- REFERENCE STYLE TOOLBAR --- */}
                            <div className="flex flex-row justify-between items-center mb-4 bg-white p-3 rounded shadow-sm border border-gray-100">
                                <div className="px-1 flex flex-col">
                                    <h2 className="text-[15px] font-bold text-gray-800">
                                        {filters.categories.length > 0 ? filters.categories[0].replace(/-/g, ' ') : 'Car Listing'}
                                    </h2>
                                    <span className="text-[11px] font-bold text-gray-400 mt-0.5">
                                        Showing {from || 0} – {to || 0} of {total} Assets
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[13px] text-gray-400 font-bold">Show:</span>
                                        <div className="relative group/sel">
                                            <select 
                                                value={filters.per_page}
                                                onChange={(e) => setFilters(prev => ({ ...prev, per_page: e.target.value }))}
                                                className="appearance-none bg-[#f0f2f5] border border-transparent text-gray-700 text-[13px] rounded pl-3 pr-7 py-1 outline-none font-bold hover:bg-gray-200 transition-all cursor-pointer min-w-[60px]"
                                            >
                                                <option value="12">12</option>
                                                <option value="24">24</option>
                                                <option value="48">48</option>
                                                <option value="72">72</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-[13px] text-gray-400 font-bold whitespace-nowrap hidden sm:inline">Sort By:</span>
                                        <div className="relative group/sel">
                                            <select 
                                                value={filters.sort}
                                                onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                                                className="appearance-none bg-[#f0f2f5] border border-transparent text-gray-700 text-[13px] rounded pl-3 pr-8 py-1 outline-none font-bold hover:bg-gray-200 transition-all cursor-pointer"
                                            >
                                                <option value="latest">Default</option>
                                                <option value="price_low">Price (Low &gt; High)</option>
                                                <option value="price_high">Price (High &gt; Low)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Centered Master Loader - REMOVED for Skeletons */}

                            {data.length === 0 ? (
                                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300"><Search size={24} /></div>
                                    <h3 className="text-[18px] font-bold text-gray-700 mb-2">No Assets Found</h3>
                                    <p className="text-[14px] text-gray-500 mb-6">Try adjusting your filters or clearing them to see all results.</p>
                                    <button onClick={clearAllFilters} className="px-6 py-2 bg-[#0a66c2] text-white text-[13px] font-bold rounded hover:bg-[#004182] transition-colors">Clear All Filters</button>
                                </div>
                            ) : (
                                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${isLoading ? 'opacity-70 grayscale-[50%]' : 'opacity-100'}`}>
                                    {isLoading 
                                        ? [...Array(parseInt(filters.per_page) || 12)].map((_, i) => (
                                            <CarCardSkeleton key={`skel-${i}`} />
                                          ))
                                        : data.map((car) => (
                                            <CarCard key={car.id} car={car} />
                                          ))
                                    }
                                </div>
                            )}

                            {/* Pagination & Results Summary Footer */}
                            <div className="mt-8 flex flex-col items-center gap-4">
                                <p className="text-[14px] text-gray-500 font-medium">
                                    Showing <span className="text-gray-800 font-bold">{cars.from || 0}</span> to <span className="text-gray-800 font-bold">{cars.to || 0}</span> of <span className="text-gray-800 font-bold">{total}</span> ({last_page} Pages)
                                </p>
                                
                                {last_page > 1 && (
                                    <div className="flex justify-center items-center gap-2">
                                        {links.map((link, i) => (
                                            link.url ? (
                                                <Link 
                                                    key={i} 
                                                    href={link.url} 
                                                    className={`min-w-[36px] h-9 px-3 rounded flex items-center justify-center text-[13px] font-bold transition-all ${link.active ? "bg-[#0a66c2] text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600 hover:border-[#0a66c2] hover:text-[#0a66c2]"}`} 
                                                    preserveScroll 
                                                    preserveState
                                                >
                                                    {link.label.replace('&laquo; Previous', '<').replace('Next &raquo;', '>')}
                                                </Link>
                                            ) : (
                                                <span 
                                                    key={i} 
                                                    className={`min-w-[36px] h-9 px-3 rounded flex items-center justify-center text-[13px] font-bold bg-white border border-gray-100 text-gray-300 cursor-not-allowed ${link.label.includes('...') ? "" : "hidden"}`}
                                                >
                                                    {link.label.replace('&laquo; Previous', '<').replace('Next &raquo;', '>')}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .slider-range-input::-webkit-slider-thumb {
                    pointer-events: auto; appearance: none; width: 22px; height: 22px; border-radius: 50%;
                    background: #fff; border: 4.5px solid #0a66c2;
                    cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,0.25);
                    transition: all 0.2s ease;
                }
                .custom-checkbox {
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border: 1px solid #bdc3c7;
                    border-radius: 4px;
                    background-color: #fff;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.15s ease;
                    position: relative;
                    flex-shrink: 0;
                    margin: 0;
                    outline: none;
                }
                .custom-checkbox:checked {
                    background-color: #0a66c2;
                    border-color: #0a66c2;
                }
                .custom-checkbox:checked::after {
                    content: "";
                    position: absolute;
                    left: 5px;
                    top: 1px;
                    width: 5px;
                    height: 9px;
                    border: solid white;
                    border-width: 0 2.5px 2.5px 0;
                    transform: rotate(45deg);
                }
                .custom-checkbox:hover:not(:checked) {
                    border-color: #999;
                }
                .custom-checkbox:focus {
                    outline: none;
                }
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }
               
               
            ` }} />
        </GuestLayout>
    );
}

function CarCardSkeleton() {
    return (
        <div className="bg-white rounded overflow-hidden shadow-sm border border-gray-200 flex flex-col h-full">
            <Skeleton className="aspect-[16/10] rounded-none" />
            <div className="p-4 flex flex-col flex-1">
                <Skeleton className="h-4 rounded w-3/4 mb-4" />
                <div className="space-y-3 mb-6">
                    <Skeleton className="h-3 rounded w-1/2" />
                    <Skeleton className="h-3 rounded w-2/3" />
                    <Skeleton className="h-3 rounded w-1/2" />
                </div>
                <div className="mt-auto pt-3 border-t border-gray-100 flex justify-center">
                    <Skeleton className="h-5 rounded w-1/4" />
                </div>
            </div>
            <div className="px-4 pb-4">
                <Skeleton className="h-8 rounded-full w-full" />
            </div>
        </div>
    );
}

function CarCard({ car }) {
    return (
        <div className="bg-white rounded overflow-hidden shadow-sm border border-gray-200 group transition-all hover:shadow-md flex flex-col h-full relative">
            <div className="absolute top-2 left-0 z-10">
                <div className="bg-[#6e2594] text-white px-3 py-0.5 text-[11px] font-bold rounded-r-full shadow-sm">
                    Save: ${Math.floor(Math.random() * 500) + 100}
                </div>
            </div>

            <div className="relative overflow-hidden aspect-[16/10] bg-gray-50/30">
                <img src={car.images?.[0] ? `/${car.images[0].file_path}` : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                
                {/* Unified Favorite Icon */}
                <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-y-[-5px] group-hover:translate-y-0 duration-300">
                    <Heart size={15} />
                </button>
            </div>

            <div className="p-4 flex flex-col flex-1 border-gray-50">
                <h3 className="text-[14px] font-bold text-gray-800 hover:text-[#0a66c2] transition-colors leading-tight mb-4 line-clamp-2">
                    {car.brand?.name || car.make} {car.model} {car.year}
                </h3>
                
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
                        <span className="text-gray-300 transform translate-y-[2px]">•</span>
                        <span>Fuel Type: <span className="text-gray-700 font-medium">{car.specifications?.fuel_type || 'N/A'}</span></span>
                    </li>
                </ul>

                <div className="mt-auto border-t border-gray-100 pt-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-[17px] font-bold text-[#0a66c2]">${Number(car.price_details?.daily_rate || 0).toLocaleString()}</span>
                        <span className="text-[13px] text-gray-400 line-through font-medium leading-none">${(Number(car.price_details?.daily_rate || 0) + 500).toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            <div className="px-4 pb-4 mt-auto">
                <Link 
                    href={route('car.details', car.id)} 
                    className="w-full py-[5px] inline-block text-center rounded-full border border-[#0a66c2] text-[#0a66c2] text-[14px] font-semibold hover:bg-[#f0f7ff] hover:shadow-[inset_0_0_0_1px_#0a66c2] transition-all duration-200 active:scale-[0.98]"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
