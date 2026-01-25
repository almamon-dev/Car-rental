import React, { useState, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import HeroSection from "./CarDetails/HeroSection";
import Gallery from "./CarDetails/Gallery";
import TabsContent from "./CarDetails/TabsContent";
import BookingWidget from "./CarDetails/BookingWidget";
import SimilarCars from "./CarDetails/SimilarCars";
import BookingModal from "./CarDetails/BookingModal";
import { Skeleton } from "@/Components/ui/Skeleton";
import { router, usePage, Head } from "@inertiajs/react";

/**
 * EXECUTIVE ASSET DETAILS (STAR TECH INSPIRED / LINKEDIN SYNC)
 * 
 * Philosophy:
 * - High Density Tech (Star Tech Inspired): Extreme vertical/horizontal efficiency.
 * - Sharp Modular Content: Information in high-contrast containers with minimal rounding.
 * - Palette: Pure White (#ffffff) background, #084c8d primary accents, deep black text.
 */

const CarDetailsSkeleton = () => (
    <div className="bg-[#f0f2f5] min-h-screen font-sans pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Main Content Column */}
                <div className="lg:w-8/12 space-y-4">
                    
                    {/* Header Card (Facebook Style) */}
                    <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-3 w-24 rounded-md bg-gray-300" />
                                <Skeleton className="h-3 w-3 rounded-full bg-gray-300" />
                                <Skeleton className="h-3 w-16 rounded-md bg-gray-300" />
                            </div>
                            <Skeleton className="h-8 w-3/4 rounded-md bg-gray-300" />
                            <div className="flex gap-2 mt-2">
                                <Skeleton className="h-8 w-24 rounded-full bg-gray-300" />
                                <Skeleton className="h-8 w-24 rounded-full bg-gray-300" />
                                <Skeleton className="h-8 w-24 rounded-full bg-gray-300" />
                            </div>
                        </div>
                    </div>

                    {/* Media Card */}
                    <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                         <Skeleton className="w-full aspect-[16/9] rounded-lg mb-3 bg-gray-300" />
                         <div className="flex gap-2 overflow-hidden">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Skeleton key={i} className="h-16 w-20 rounded-md flex-shrink-0 bg-gray-300" />
                            ))}
                         </div>
                    </div>

                    {/* Info/Tabs Card */}
                    <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                        <div className="flex gap-4 border-b border-gray-100 pb-3 mb-4">
                             <Skeleton className="h-8 w-24 rounded-md bg-gray-300" />
                             <Skeleton className="h-8 w-24 rounded-md bg-gray-300" />
                             <Skeleton className="h-8 w-24 rounded-md bg-gray-300" />
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full rounded bg-gray-300" />
                            <Skeleton className="h-4 w-full rounded bg-gray-300" />
                            <Skeleton className="h-4 w-5/6 rounded bg-gray-300" />
                            <Skeleton className="h-4 w-4/6 rounded bg-gray-300" />
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:w-4/12">
                     <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse space-y-6 sticky top-4">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-1/3 rounded bg-gray-300" />
                            <Skeleton className="h-10 w-full rounded-md bg-gray-300" />
                        </div>

                        <div className="space-y-4">
                            <Skeleton className="h-12 w-full rounded-md bg-gray-300" />
                            <Skeleton className="h-12 w-full rounded-md bg-gray-300" />
                        </div>

                        <div className="space-y-3 pt-4 border-t border-gray-100">
                             <div className="flex justify-between"><Skeleton className="h-4 w-24 bg-gray-300" /><Skeleton className="h-4 w-16 bg-gray-300" /></div>
                             <div className="flex justify-between"><Skeleton className="h-4 w-24 bg-gray-300" /><Skeleton className="h-4 w-16 bg-gray-300" /></div>
                             <div className="flex justify-between pt-2"><Skeleton className="h-6 w-32 bg-gray-300" /><Skeleton className="h-6 w-20 bg-gray-300" /></div>
                        </div>
                        
                        <Skeleton className="h-12 w-full rounded-full mt-2 bg-gray-300" />
                     </div>
                </div>
            </div>
        </div>
    </div>
);

export default function CarDetails({ car, locations }) {
    const { auth } = usePage().props;
    const [isLoading, setIsLoading] = useState(true);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeFaqIndex, setActiveFaqIndex] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(car.is_favorited || false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [availability, setAvailability] = useState(null); // null, 'checking', 'available', 'busy'
    const [rateMode, setRateMode] = useState("Daily"); // Daily, Weekly, Monthly

    const toggleFavorite = () => {
        if (!auth.user) {
            router.get(route('login'));
            return;
        }

        setIsBookmarked(!isBookmarked);
        router.post(route('user.favorites.toggle', car.id), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // success
            },
            onError: () => {
                setIsBookmarked(!isBookmarked); // revert
            }
        });
    };

    const [selectedLocation, setSelectedLocation] = useState({
        pickup: car.location?.name || locations?.[0]?.name || "Central Business District",
        dropoff: car.location?.name || locations?.[0]?.name || "Central Business District",
    });

    const [bookingDates, setBookingDates] = useState({
        pickup: "",
        dropoff: "",
        pickupTime: "",
        dropoffTime: "",
    });

    const [priceSummary, setPriceSummary] = useState({
        baseRate: Number(car.price_details?.daily_rate || 0),
        insurance: 750,
        serviceFee: 250,
        extras: 0,
        multiplier: 1,
        total: (Number(car.price_details?.daily_rate || 0) * 1) + 750 + 250,
    });

    useEffect(() => {
        if (!bookingDates.pickup || !bookingDates.dropoff) {
            setPriceSummary(prev => ({
                ...prev,
                multiplier: 0,
                total: prev.insurance + prev.serviceFee + prev.extras
            }));
            return;
        }

        const start = new Date(`${bookingDates.pickup}T${bookingDates.pickupTime}`);
        const end = new Date(`${bookingDates.dropoff}T${bookingDates.dropoffTime}`);
        
        let diffMs = end - start;
        if (diffMs < 0) diffMs = 0;
        
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)) || 1;
        
        let multiplier = diffDays;
        if (rateMode === 'Weekly') multiplier = Math.max(1, Math.ceil(diffDays / 7));
        if (rateMode === 'Monthly') multiplier = Math.max(1, Math.ceil(diffDays / 30));

        const rates = {
            Daily: Number(car.price_details?.daily_rate || 0),
            Weekly: Number(car.price_details?.weekly_rate || 0),
            Monthly: Number(car.price_details?.monthly_rate || 0),
        };

        const currentBase = rates[rateMode];

        setPriceSummary(prev => {
            const newBaseTotal = currentBase * multiplier;
            return {
                ...prev,
                baseRate: currentBase,
                multiplier: multiplier,
                total: newBaseTotal + prev.insurance + prev.serviceFee + prev.extras
            };
        });
    }, [bookingDates, rateMode]);

    const [selectedExtras, setSelectedExtras] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleRateModeChange = (mode) => {
        setRateMode(mode);
    };

    const handleExtraServiceToggle = (service) => {
        if (selectedExtras.includes(service.id)) {
            setSelectedExtras(selectedExtras.filter((id) => id !== service.id));
            setPriceSummary((prev) => ({
                ...prev,
                extras: prev.extras - service.price,
                total: prev.total - service.price,
            }));
        } else {
            setSelectedExtras([...selectedExtras, service.id]);
            setPriceSummary((prev) => ({
                ...prev,
                extras: prev.extras + service.price,
                total: prev.total + service.price,
            }));
        }
    };

    const handleBookNow = () => setShowBookingModal(true);

    if (isLoading) return <CarDetailsSkeleton />;

    return (
        <GuestLayout>
            <Head>
                <title>{`${car.brand?.name || car.make} ${car.model} (${car.year})`}</title>
                <meta name="description" content={`Rent the ${car.brand?.name || car.make} ${car.model} ${car.year}. Features: ${car.transmission}, ${car.fuel_type}, ${car.mileage}. Book now for just ${car.currency}${Number(car.price_details?.daily_rate || 0).toLocaleString()} per day.`} />
                <meta name="keywords" content={`${car.make} ${car.model}, rent ${car.make}, ${car.brand?.name} rental, luxury car hire, ${car.category?.name}`} />
            </Head>
            <main className="bg-white min-h-screen font-sans pb-12">
                {/* Hero / Header Section Sync */}
                <HeroSection
                    car={car}
                    isBookmarked={isBookmarked}
                    setIsBookmarked={toggleFavorite}
                    hoveredButton={hoveredButton}
                    setHoveredButton={setHoveredButton}
                    handleBookNow={handleBookNow}
                    availability={availability}
                />

                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Primary Content (Minimal Modular Flow) */}
                        <div className="lg:w-8/12 space-y-4">
                            <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden">
                                <Gallery
                                    images={car.images}
                                    activeImageIndex={activeImageIndex}
                                    setActiveImageIndex={setActiveImageIndex}
                                />
                            </div>
                            
                            <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm">
                                <TabsContent
                                    car={car}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    activeFaqIndex={activeFaqIndex}
                                    setActiveFaqIndex={setActiveFaqIndex}
                                />
                            </div>
                        </div>

                        {/* Sidebar (Acquisition Console) */}
                        <div className="lg:w-4/12 space-y-4">
                            <BookingWidget
                                car={car}
                                locations={locations}
                                selectedLocation={selectedLocation}
                                setSelectedLocation={setSelectedLocation}
                                bookingDates={bookingDates}
                                setBookingDates={setBookingDates}
                                priceSummary={priceSummary}
                                selectedExtras={selectedExtras}
                                handleExtraServiceToggle={
                                    handleExtraServiceToggle
                                }
                                handleBookNow={handleBookNow}
                                availability={availability}
                                setAvailability={setAvailability}
                                rateMode={rateMode}
                                onRateModeChange={handleRateModeChange}
                            />
                           
                        </div>
                    </div>
                </div>

                {/* Recommendations Footer */}
                <div className="bg-white py-12">
                    <SimilarCars />
                </div>

                <BookingModal
                    showBookingModal={showBookingModal}
                    setShowBookingModal={setShowBookingModal}
                    priceSummary={priceSummary}
                    car={car}
                />
            </main>
        </GuestLayout>
    );
}
