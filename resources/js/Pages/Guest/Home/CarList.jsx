import { useState, useMemo } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    Search,
    MapPin,
    ChevronDown,
    LayoutGrid,
    List as ListIcon,
    Settings,
    Fuel,
    Users,
    Calendar,
    Gauge,
    ChevronUp,
    Compass,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function CarList() {
    // --- STATE ---
    const [viewMode, setViewMode] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    // Mock Data - Increased length to demonstrate pagination
    const cars = useMemo(
        () =>
            Array.from({ length: 32 }, (_, i) => ({
                id: i + 1,
                name: i % 2 === 0 ? "Honda V3" : "Honda Secure",
                brand: "Honda",
                price: i % 2 === 0 ? 10 : 20,
                location: "St Paul's Cathedral",
                img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
                transmission: "Manual",
                fuel: "Petrol",
                capacity: "4 Persons",
                year: "2025",
                mileage: "20km",
                position: "Front",
            })),
        []
    );

    // --- PAGINATION LOGIC ---
    const totalPages = Math.ceil(cars.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCars = cars.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <GuestLayout>
            <div className="bg-[#f8f9fa] py-9 px-4 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Toolbar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm">
                            Showing {startIndex + 1}-
                            {Math.min(startIndex + itemsPerPage, cars.length)}{" "}
                            of {cars.length} Results
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                    Show
                                </span>
                                <div className="relative">
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(
                                                Number(e.target.value)
                                            );
                                            setCurrentPage(1);
                                        }}
                                        className="appearance-none border border-slate-200 rounded-md pl-3 pr-8 py-1 text-xs text-slate-600 bg-white focus:outline-none cursor-pointer"
                                    >
                                        <option value="6">6</option>
                                        <option value="12">12</option>
                                        <option value="24">24</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-1 border-l pl-4">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-1.5 rounded ${
                                        viewMode === "grid"
                                            ? "bg-[#157284] text-white"
                                            : "text-gray-400"
                                    }`}
                                >
                                    <LayoutGrid size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-1.5 rounded ${
                                        viewMode === "list"
                                            ? "bg-[#157284] text-white"
                                            : "text-gray-400"
                                    }`}
                                >
                                    <ListIcon size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:grid lg:grid-cols-12 gap-6 items-start">
                        {/* --- STICKY SIDEBAR --- */}
                        <aside className="hidden lg:block lg:col-span-3 space-y-4 sticky top-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                                <h4 className="text-sm font-bold text-gray-800 mb-4 tracking-tight">
                                    Search
                                </h4>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-md outline-none text-xs focus:border-[#157284]"
                                        placeholder="Search cars..."
                                    />
                                    <Search
                                        className="absolute right-3 top-3 text-gray-400"
                                        size={16}
                                    />
                                </div>
                            </div>

                            <div className="max-h-[calc(100vh-200px)] overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                                <FilterCard title="Car Brand">
                                    <FilterOptions
                                        options={[
                                            "Audi",
                                            "Honda",
                                            "Tesla",
                                            "Mazda",
                                        ]}
                                    />
                                </FilterCard>
                                <FilterCard title="Car Category">
                                    <FilterOptions
                                        options={[
                                            "SUV",
                                            "Sedan",
                                            "Luxury",
                                            "Compact",
                                        ]}
                                    />
                                </FilterCard>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <main className="w-full lg:col-span-9">
                            <div
                                className={
                                    viewMode === "grid"
                                        ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                                        : "flex flex-col gap-6"
                                }
                            >
                                {currentCars.map((car) => (
                                    <CarCard
                                        key={car.id}
                                        car={car}
                                        viewMode={viewMode}
                                    />
                                ))}
                            </div>

                            {/* --- PAGINATION CONTROLS --- */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex justify-center items-center gap-2">
                                    <button
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-md border border-gray-200 bg-white text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, i) => i + 1
                                    ).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() =>
                                                handlePageChange(page)
                                            }
                                            className={`w-10 h-10 rounded-md text-sm font-bold transition-all ${
                                                currentPage === page
                                                    ? "bg-[#157284] text-white shadow-md"
                                                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#157284] hover:text-[#157284]"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-md border border-gray-200 bg-white text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

// --- Helper Components ---

function FilterOptions({ options }) {
    return (
        <div className="space-y-3">
            {options.map((opt) => (
                <label
                    key={opt}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-[#157284] focus:ring-0 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        {opt}
                    </span>
                </label>
            ))}
        </div>
    );
}

function FilterCard({ title, children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 hover:bg-gray-50 transition-colors"
            >
                <h4 className="text-sm font-bold text-gray-800 tracking-tight">
                    {title}
                </h4>
                {isOpen ? (
                    <ChevronUp size={16} className="text-gray-400" />
                ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                )}
            </button>
            {isOpen && <div className="p-5 pt-0">{children}</div>}
        </div>
    );
}

function CarCard({ car, viewMode }) {
    const isList = viewMode === "list";
    return (
        <div
            className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group transition-all hover:shadow-md ${
                isList ? "flex flex-col md:flex-row" : ""
            }`}
        >
            <div
                className={`relative overflow-hidden ${
                    isList ? "md:w-1/3 h-64 md:h-auto" : "h-60"
                }`}
            >
                <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded shadow-sm">
                    <span className="text-[11px] font-bold text-[#157284] uppercase tracking-wider">
                        {car.brand}
                    </span>
                </div>
            </div>
            <div className={`p-6 ${isList ? "md:w-2/3" : ""}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {car.name}
                </h3>
                <div className="grid grid-cols-3 gap-y-3 mb-6">
                    <IconInfo
                        icon={<Settings size={14} />}
                        label={car.transmission}
                    />
                    <IconInfo icon={<Gauge size={14} />} label={car.mileage} />
                    <IconInfo icon={<Fuel size={14} />} label={car.fuel} />
                    <IconInfo
                        icon={<Compass size={14} />}
                        label={car.position}
                    />
                    <IconInfo icon={<Calendar size={14} />} label={car.year} />
                    <IconInfo icon={<Users size={14} />} label={car.capacity} />
                </div>
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg mb-4 border border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <MapPin size={14} /> {car.location}
                    </div>
                    <div className="text-[12px] text-gray-500">
                        <span className="text-[#e63946] text-lg font-bold">
                            ${car.price}
                        </span>{" "}
                        /Day
                    </div>
                </div>
                <button className="w-full bg-[#222] hover:bg-black text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all active:scale-95">
                    <Calendar size={16} /> Rent Now
                </button>
            </div>
        </div>
    );
}

function IconInfo({ icon, label }) {
    return (
        <div className="flex items-center gap-2 text-gray-400 text-[12px]">
            <span className="text-[#157284]">{icon}</span>
            <span className="text-gray-600 font-medium">{label}</span>
        </div>
    );
}
