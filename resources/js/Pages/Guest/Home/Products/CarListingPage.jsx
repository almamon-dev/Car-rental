/**
 * Car Listing Page Component
 * 
 * The primary interface for browsing and filtering the vehicle fleet.
 * Features a dynamic responsive layout with a mobile drawer-style filter system,
 * sophisticated search parameters, and an interactive asset grid.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import React, { useState, useEffect, useRef } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, router, usePage, Head } from "@inertiajs/react";
import {
    Search,
    Filter,
    ChevronUp,
    ChevronDown,
    Grid3X3,
    Heart,
    Activity,
    Settings,
    Fuel,
    Shield,
    MapPin,
    Users,
    X,
    SlidersHorizontal
} from "lucide-react";
import { Skeleton } from "@/Components/ui/Skeleton";
import { useLanguage } from "@/Contexts/LanguageContext";

/**
 * CarListingPage Component
 * 
 * @param {Object} props
 * @param {Object} props.cars - Paginated car data from Inertia
 * @param {Array} props.categories - List of available car categories
 * @param {Array} props.brands - List of vehicle brands
 * @param {Array} props.locations - Available pickup locations
 * @param {number} props.maxPrice - Maximum price context for range slider
 * @returns {JSX.Element}
 */
export default function CarListingPage({ cars, categories = [], brands = [], locations = [], maxPrice = 2500000 }) {
    const { t } = useLanguage();
    const queryParams = new URLSearchParams(window.location.search);
    const isFirstRender = useRef(true);

    // --- STATE ---
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState({
        price: true,
        availability: true,
        categories: true,
        brands: true,
        locations: true,
        transmission: false,
        fuel: false
    });
    
    // Filter State
    const [filters, setFilters] = useState({
        search: queryParams.get('search') || '',
        categories: queryParams.get('category')?.split(',').filter(Boolean) || [],
        brands: queryParams.get('brand')?.split(',').filter(Boolean) || [],
        locations: queryParams.get('location')?.split(',').filter(Boolean) || [],
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
            if (currentItems.includes(String(value))) {
                return { ...prev, [type]: currentItems.filter(i => i !== String(value)) };
            } else {
                return { ...prev, [type]: [...currentItems, String(value)] };
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
        if (filters.locations.length) data.location = filters.locations.join(',');
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
        filters.locations,
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
        filters.locations.length > 0 || 
        filters.availability.length > 0 || 
        filters.transmission.length > 0 || 
        filters.fuel_type.length > 0 || 
        filters.min_price > 0 || 
        filters.max_price < maxPrice || 
        filters.search !== '';

    // Handle body scroll locking for mobile filter
    useEffect(() => {
        if (isMobileFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileFilterOpen]);

    const clearAllFilters = () => {
        setFilters(prev => ({
            ...prev,
            search: '',
            categories: [],
            brands: [],
            locations: [],
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
    const { auth } = usePage().props;

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

    return (
        <GuestLayout>
            <Head>
                <title>{filters.categories.length > 0 ? `${filters.categories[0].replace(/-/g, ' ')} Cars` : 'Browse Our Fleet'}</title>
                <meta name="description" content="Explore our wide range of available cars for rent. Filter by category, brand, price, and location to find the perfect vehicle for your needs." />
                <meta name="keywords" content="car list, car selection, toyota, bmw, audi, suv, sedan, rent a car fleet" />
            </Head>
            <div className="bg-[#f2f4f8] py-4 min-h-screen font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    

                    <div className="lg:grid lg:grid-cols-12 gap-5 items-start relative">
                        
                        {/* --- MOBILE FILTER BACKDROP --- */}
                        {isMobileFilterOpen && (
                            <div 
                                className="fixed inset-0 bg-black/50 z-[100] lg:hidden backdrop-blur-sm transition-opacity duration-300"
                                onClick={() => setIsMobileFilterOpen(false)}
                            />
                        )}

                        {/* --- SIDEBAR (FILTER) --- */}
                        <aside className={`
                            fixed lg:relative inset-y-0 left-0 w-[280px] lg:w-auto bg-white lg:bg-transparent z-[101] lg:z-0
                            transform lg:transform-none transition-transform duration-300 ease-in-out
                            ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                            lg:col-span-3 space-y-4 order-1 lg:sticky lg:top-0 overflow-y-auto lg:overflow-visible p-4 lg:p-0
                        `}>
                            {/* Mobile Sidebar Close Button */}
                            <div className="flex lg:hidden items-center justify-between mb-4 border-b pb-3">
                                <h4 className="text-[16px] font-bold text-[#3749bb] flex items-center gap-2">
                                    <SlidersHorizontal size={18} /> {t.listing.filters}
                                </h4>
                                <button 
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>
                            
                            {/* Filter Header with Clear Link */}
                            <div className="bg-white rounded border border-gray-200 px-3 py-2 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">{t.listing.filters}</h4>
                                    {hasActiveFilters && (
                                        <button 
                                            onClick={clearAllFilters}
                                            className="text-[12px] font-bold text-[#3749bb] hover:text-[#004182] hover:underline flex items-center gap-1 transition-all"
                                        >
                                            <span className="text-[14px]">×</span> {t.listing.clear_all}
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            {/* Price Filter - Exact Match to Reference Image */}
                            <div className="bg-white rounded border border-gray-200 overflow-hidden">
                                <div className="p-4 border-b border-gray-100">
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">{t.listing.price_range}</h4>
                                </div>
                                <div className="px-5 py-6">
                                    {/* Slider Track with Handles */}
                                    <div className="relative h-8 w-full flex items-center mb-8">
                                        <div className="absolute w-full h-2.5 bg-gray-100 rounded-full border border-gray-200/50"></div>
                                        <div 
                                            className="absolute h-2.5 bg-[#3749bb] rounded-full"
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
                                            className="w-full text-center px-3 py-2 border border-gray-200 rounded text-[14px] font-bold text-gray-700 outline-none focus:border-[#3749bb]"
                                        />
                                        <input 
                                            type="number" 
                                            value={filters.max_price} 
                                            onChange={(e) => setFilters({ ...filters, max_price: Math.min(maxPrice, Number(e.target.value)) })}
                                            className="w-full text-center px-3 py-2 border border-gray-200 rounded text-[14px] font-bold text-gray-700 outline-none focus:border-[#3749bb]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Location Filter */}
                            <div className="bg-white border border-gray-200 rounded overflow-hidden">
                                <button onClick={() => toggleMenu('locations')} className={`w-full p-4 flex items-center justify-between ${openMenus.locations ? 'border-b border-gray-100' : ''}`}>
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">{t.listing.pickup_location}</h4>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openMenus.locations ? 'rotate-180 text-[#3749bb]' : ''}`} />
                                </button>
                                {openMenus.locations && (
                                    <div className="px-5 py-5 space-y-3 max-h-[270px] overflow-y-auto custom-scrollbar">
                                        {locations && locations.length > 0 ? (
                                            locations.map((loc) => (
                                                <label key={loc.id} className="flex items-center justify-between cursor-pointer group">
                                                    <div className="flex items-center gap-3">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={filters.locations.includes(String(loc.id))} 
                                                            onChange={() => handleFilterChange('locations', loc.id)} 
                                                            className="custom-checkbox" 
                                                        />
                                                        <span className="text-[13px] font-medium text-gray-700 group-hover:text-[#3749bb] transition-colors">{loc.name}</span>
                                                    </div>
                                                </label>
                                            ))
                                        ) : (
                                            <p className="text-[12px] text-gray-400 italic">{t.listing.no_locations}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="bg-white border border-gray-200 rounded">
                                <button onClick={() => toggleMenu('availability')} className={`w-full p-4 flex items-center justify-between ${openMenus.availability ? 'border-b border-gray-100' : ''}`}>
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">{t.listing.availability}</h4>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openMenus.availability ? 'rotate-180 text-[#3749bb]' : ''}`} />
                                </button>
                                {openMenus.availability && (
                                    <div className="px-5 py-5 space-y-3">
                                        {['available', 'booked', 'maintenance'].map((status) => (
                                            <label key={status} className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" checked={filters.availability.includes(status)} onChange={() => handleFilterChange('availability', status)} className="custom-checkbox" />
                                                <span className="text-[13px] font-medium capitalize">{status === 'available' ? t.listing.certified : t.listing[status]}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Category Filter */}
                            <div className="bg-white border border-gray-200 rounded">
                                <button onClick={() => toggleMenu('categories')} className={`w-full p-4 flex items-center justify-between ${openMenus.categories ? 'border-b border-gray-100' : ''}`}>
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">{t.listing.categories}</h4>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openMenus.categories ? 'rotate-180 text-[#3749bb]' : ''}`} />
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
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">{t.listing.brands}</h4>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openMenus.brands ? 'rotate-180 text-[#3749bb]' : ''}`} />
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
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">{t.listing.transmission}</h4>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openMenus.transmission ? 'rotate-180 text-[#3749bb]' : ''}`} />
                                </button>
                                {openMenus.transmission && (     
                                    <div className="px-5 py-5 space-y-3 max-h-[270px] overflow-y-auto custom-scrollbar">
                                        {['Automatic', 'Manual', 'CVT'].map((t_item) => (
                                            <label key={t_item} className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" checked={filters.transmission.includes(t_item)} onChange={() => handleFilterChange('transmission', t_item)} className="custom-checkbox" />
                                                <span className="text-[13px] font-medium">{t_item}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Fuel Type Filter */}
                            <div className="bg-white border border-gray-200 rounded">
                                <button onClick={() => toggleMenu('fuel')} className={`w-full p-4 flex items-center justify-between ${openMenus.fuel ? 'border-b border-gray-100' : ''}`}>
                                    <h4 className="text-[15px] font-bold text-[#000000e6]">{t.listing.fuel_type}</h4>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${openMenus.fuel ? 'rotate-180 text-[#3749bb]' : ''}`} />
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
                            {/* --- PREMIUM RESPONSIVE TOOLBAR --- */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 bg-white p-4 rounded-[4px] border border-gray-100 shadow-sm">
                                <div className="flex flex-col">
                                    <h2 className="text-[18px] font-bold text-gray-900 leading-tight">
                                        {filters.categories.length > 0 ? filters.categories[0].replace(/-/g, ' ') : t.listing.title}
                                    </h2>
                                    <p className="text-[12px] font-bold text-gray-400 mt-1">
                                        {t.listing.showing} {from || 0} – {to || 0} {t.listing.of} <span className="text-gray-600">{total}</span> {t.listing.assets}
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    {/* Mobile Filter Toggle */}
                                    <button 
                                        onClick={() => setIsMobileFilterOpen(true)}
                                        className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#3749bb] text-white px-4 py-2 rounded-[4px] text-[13px] font-bold hover:bg-[#2c3a96] transition-all active:scale-95"
                                    >
                                        <Filter size={16} />
                                        {t.listing.filter_btn || 'Filter'}
                                    </button>

                                    {/* Sort Dropdown - Startech Style */}
                                    <div className="relative flex-1 sm:flex-none group/sel bg-[#f0f2f5] rounded-[4px]">
                                        <select 
                                            value={filters.sort}
                                            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                                            className="w-full appearance-none bg-transparent border-none text-gray-700 text-[13px] rounded pl-3 pr-10 py-2 outline-none font-bold cursor-pointer"
                                        >
                                            <option value="latest">{t.listing.default}</option>
                                            <option value="price_low">{t.listing.price_low_high}</option>
                                            <option value="price_high">{t.listing.price_high_low}</option>
                                        </select>
                                    </div>

                                    {/* Per Page Dropdown */}
                                    <div className="flex items-center bg-[#f0f2f5] rounded-[4px] flex-1 sm:flex-none">
                                        <select 
                                            value={filters.per_page}
                                            onChange={(e) => setFilters(prev => ({ ...prev, per_page: e.target.value }))}
                                            className="appearance-none bg-transparent border-none text-gray-700 text-[13px] rounded px-3 py-2 outline-none font-bold hover:bg-gray-200 transition-all cursor-pointer w-full sm:min-w-[60px]"
                                        >
                                            <option value="12">12</option>
                                            <option value="24">24</option>
                                            <option value="48">48</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Centered Master Loader - REMOVED for Skeletons */}

                            {data.length === 0 ? (
                                <div className="bg-white rounded-[4px] border border-gray-200 p-12 text-center shadow-sm">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300"><Search size={24} /></div>
                                    <h3 className="text-[18px] font-bold text-gray-700 mb-2">{t.listing.no_assets}</h3>
                                    <p className="text-[14px] text-gray-500 mb-6">{t.listing.adjust_filters}</p>
                                    <button onClick={clearAllFilters} className="px-6 py-2 bg-[#3749bb] text-white text-[13px] font-bold rounded hover:bg-[#004182] transition-colors">{t.listing.reset_filters}</button>
                                </div>
                            ) : (
                                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${isLoading ? 'opacity-70 grayscale-[50%]' : 'opacity-100'}`}>
                                    {isLoading 
                                        ? [...Array(parseInt(filters.per_page) || 12)].map((_, i) => (
                                            <CarCardSkeleton key={`skel-${i}`} />
                                          ))
                                        : data.map((car) => (
                                            <CarCard key={car.id} car={car} toggleFavorite={toggleFavorite} />
                                          ))
                                    }
                                </div>
                            )}

                            {/* Pagination & Results Summary Footer */}
                            <div className="mt-8 flex flex-col items-center gap-4">
                                <p className="text-[14px] text-gray-500 font-medium">
                                    {t.listing.showing} <span className="text-gray-800 font-bold">{cars.from || 0}</span> {t.listing.to} <span className="text-gray-800 font-bold">{cars.to || 0}</span> {t.listing.of} <span className="text-gray-800 font-bold">{total}</span> ({last_page} {t.listing.pages})
                                </p>
                                
                                {last_page > 1 && (
                                    <div className="flex justify-center items-center gap-2">
                                         {links.map((link, i) => {
                                            // Determine Label Content
                                            let labelContent = link.label;
                                            if (link.label.includes('Previous')) labelContent = <ChevronDown className="rotate-90" size={16} />;
                                            else if (link.label.includes('Next')) labelContent = <ChevronDown className="-rotate-90" size={16} />;
                                            else if (link.label.includes('laquo')) labelContent = <ChevronDown className="rotate-90" size={16} />;
                                            else if (link.label.includes('raquo')) labelContent = <ChevronDown className="-rotate-90" size={16} />;
                                            
                                            if (link.url) {
                                                return (
                                                    <Link 
                                                        key={i} 
                                                        href={link.url} 
                                                        className={`min-w-[36px] h-9 px-3 rounded-[4px] flex items-center justify-center text-[13px] font-bold transition-all ${link.active ? "bg-[#3749bb] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#3749bb] hover:text-[#3749bb]"}`} 
                                                        preserveScroll 
                                                        preserveState
                                                    >
                                                        {labelContent}
                                                    </Link>
                                                );
                                            } else {
                                                if (link.label.includes('...')) {
                                                    return (
                                                        <span key={i} className="min-w-[36px] h-9 flex items-center justify-center text-gray-400">
                                                            <Grid3X3 size={12} className="opacity-50" />
                                                        </span>
                                                    );
                                                }
                                                return (
                                                    <span 
                                                        key={i} 
                                                        className={`min-w-[36px] h-9 px-3 rounded-[4px] flex items-center justify-center text-[13px] font-bold bg-white border border-gray-100 text-gray-300 cursor-not-allowed`}
                                                    >
                                                        {labelContent}
                                                    </span>
                                                );
                                            }
                                         })}
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
                    background: #fff; border: 4.5px solid #3749bb;
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
                    background-color: #3749bb;
                    border-color: #3749bb;
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
        <div className="bg-white rounded-[4px] overflow-hidden border border-gray-200 flex flex-col h-full">
            <Skeleton className="aspect-[16/10] rounded-none" />
            <div className="p-4 flex flex-col flex-1">
                <Skeleton className="h-4 rounded-[2px] w-3/4 mb-4" />
                <div className="space-y-3 mb-6">
                    <Skeleton className="h-3 rounded-[2px] w-1/2" />
                    <Skeleton className="h-3 rounded-[2px] w-2/3" />
                    <Skeleton className="h-3 rounded-[2px] w-1/2" />
                </div>
                <div className="mt-auto pt-3 border-t border-gray-100 flex justify-center">
                    <Skeleton className="h-5 rounded-[2px] w-1/4" />
                </div>
            </div>
            <div className="px-4 pb-4">
                <Skeleton className="h-8 rounded-[4px] w-full" />
            </div>
        </div>
    );
}

function CarCard({ car, toggleFavorite }) {
    const { t } = useLanguage();
    return (
        <div className="bg-white rounded-[4px] border border-gray-200 group transition-all flex flex-col h-full relative overflow-hidden">
            {/* --- SAVING BADGE (STAR TECH STYLE) --- */}
            <div className="absolute top-3 left-3 z-10">
                <div className="bg-[#3749bb] text-white px-2 py-0.5 text-[10px] font-black rounded-[2px] shadow-sm uppercase tracking-tighter">
                    {t.listing.save}: {car.price_details?.currency || '৳'}{Math.floor(Number(car.price_details?.daily_rate || 0) * 0.2).toLocaleString()}
                </div>
            </div>

            {/* Media Container: Larger on mobile list? No, stick to grid but polished */}
            <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                <img 
                    src={car.images?.[0] ? `/${car.images[0].file_path}` : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800"} 
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                
                {/* Visual Overlay Detail */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <button 
                    onClick={(e) => toggleFavorite(e, car.id)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-all shadow-md active:scale-90 ${
                        car.is_favorited ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    }`}
                >
                    <Heart size={15} fill={car.is_favorited ? "currentColor" : "none"} />
                </button>
            </div>

            <div className="p-4 flex flex-col flex-1 text-left">
                <h3 className="text-[14px] font-bold text-gray-900 group-hover:text-[#3749bb] transition-colors leading-snug mb-3 line-clamp-2 min-h-[40px]">
                    {car.brand?.name || car.make} {car.model} {car.year}
                </h3>
                
                {/* Technical Specs: Improved Grid for Mobile */}
                <div className="space-y-1.5 mb-5 border-t border-gray-50 pt-3">
                    <ListSpec Icon={Activity} label={t.listing.ops_range} val={car.specifications?.mileage || 'N/A'} />
                    <ListSpec Icon={Settings} label={t.listing.transmission} val={car.specifications?.transmission || car.transmission || 'Auto'} />
                    <ListSpec Icon={Fuel} label={t.listing.fuel_type} val={car.specifications?.fuel_type || car.fuel_type || 'N/A'} />
                    <ListSpec Icon={MapPin} label="Branch" val={car.location?.name || 'Main Hub'} />
                </div>

                <div className="mt-auto border-t border-gray-50 pt-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-gray-400 line-through">
                                {car.price_details?.currency || '৳'}{(Number(car.price_details?.daily_rate || 0) * 1.25).toFixed(0).toLocaleString()}
                            </span>
                            <span className="text-[18px] font-black text-[#3749bb]">
                                {car.price_details?.currency || '৳'}{Number(car.price_details?.daily_rate || 0).toLocaleString()}
                            </span>
                        </div>
                        
                        <div className="bg-green-50 px-2 py-1 rounded text-[10px] font-bold text-green-600 border border-green-100 uppercase">
                            {t.listing.available || 'Online'}
                        </div>
                    </div>

                    <Link 
                        href={car.slug ? `${route('car.details', car.slug)}` : '#'}
                        className={`w-full py-2 flex items-center justify-center gap-2 rounded-[4px] border border-[#3749bb] text-[#3749bb] text-[13px] font-bold hover:bg-[#3749bb] hover:text-white transition-all duration-300 active:scale-[0.98] ${!car.slug ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                    >
                        {t.listing.view_details}
                    </Link>
                </div>
            </div>
        </div>
    );
}

const ListSpec = ({ Icon, label, val }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Icon size={10} className="text-gray-400" />
            <span className="text-[11px] font-medium text-gray-500">{label}</span>
        </div>
        <span className="text-[11px] font-bold text-gray-800">{val}</span>
    </div>
);
