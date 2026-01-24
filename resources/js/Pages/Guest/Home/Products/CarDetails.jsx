import React, { useState, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import HeroSection from "./CarDetails/HeroSection";
import Gallery from "./CarDetails/Gallery";
import TabsContent from "./CarDetails/TabsContent";
import BookingWidget from "./CarDetails/BookingWidget";
import SimilarCars from "./CarDetails/SimilarCars";
import BookingModal from "./CarDetails/BookingModal";
import ContactSupport from "./CarDetails/ContactSupport";
import { Skeleton } from "@/Components/ui/Skeleton";
import { router, usePage } from "@inertiajs/react";

/**
 * EXECUTIVE ASSET DETAILS (STAR TECH INSPIRED / LINKEDIN SYNC)
 * 
 * Philosophy:
 * - High Density: Tighter vertical and horizontal spacing for professional efficiency.
 * - Modular Content: Information grouped into clear, high-contrast containers.
 * - Palette: #f3f2ef/40 background, pure white modular cards, #0a66c2 primary accents.
 */

const CarDetailsSkeleton = () => (
    <div className="bg-[#f3f2ef]/40 min-h-screen font-sans">
        {/* Hero Skeleton */}
        <div className="bg-white border-b border-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="space-y-3 flex-1">
                        <Skeleton className="h-4 w-32 rounded" />
                        <Skeleton className="h-10 w-3/4 rounded-lg" />
                        <div className="flex gap-4">
                            <Skeleton className="h-4 w-40 rounded" />
                            <Skeleton className="h-4 w-24 rounded" />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Skeleton className="h-12 w-32 rounded-full" />
                        <Skeleton className="h-12 w-12 rounded-full" />
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Primary Content Skeleton */}
                <div className="lg:w-8/12 space-y-6">
                    <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm overflow-hidden p-2">
                        <Skeleton className="aspect-video w-full rounded-lg" />
                        <div className="flex gap-2 mt-4 p-2">
                            {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-20 flex-1 rounded-md" />)}
                        </div>
                    </div>
                    <div className="bg-white rounded-[12px] border border-gray-200 p-6 space-y-6">
                        <div className="flex gap-8 border-b border-gray-100 pb-4">
                            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-6 w-20 rounded" />)}
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-2/3 rounded" />
                        </div>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-4 mt-8">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="flex justify-between">
                                    <Skeleton className="h-4 w-24 rounded" />
                                    <Skeleton className="h-4 w-16 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <div className="lg:w-4/12 space-y-6">
                    <div className="bg-white rounded-[12px] border border-gray-200 p-6 shadow-sm space-y-6">
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <div className="space-y-4">
                            <Skeleton className="h-20 w-full rounded-md" />
                            <Skeleton className="h-20 w-full rounded-md" />
                        </div>
                        <div className="space-y-3 pt-4 border-t border-gray-100">
                            <div className="flex justify-between"><Skeleton className="h-4 w-24 rounded" /><Skeleton className="h-4 w-16 rounded" /></div>
                            <div className="flex justify-between"><Skeleton className="h-4 w-24 rounded" /><Skeleton className="h-4 w-16 rounded" /></div>
                            <div className="flex justify-between pt-2"><Skeleton className="h-6 w-32 rounded" /><Skeleton className="h-6 w-20 rounded" /></div>
                        </div>
                        <Skeleton className="h-14 w-full rounded-full" />
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
        pickup: "2026-02-10",
        dropoff: "2026-02-15",
        pickupTime: "10:00",
        dropoffTime: "18:00",
    });

    const [priceSummary, setPriceSummary] = useState({
        baseRate: Number(car.price_details?.daily_rate || 0),
        insurance: 750,
        serviceFee: 250,
        extras: 0,
        total: Number(car.price_details?.daily_rate || 0) + 750 + 250,
    });

    const [selectedExtras, setSelectedExtras] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

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
            <main className="bg-[#f3f2ef]/40 min-h-screen font-sans">
                {/* Hero / Header Section Sync */}
                <HeroSection
                    car={car}
                    isBookmarked={isBookmarked}
                    setIsBookmarked={toggleFavorite}
                    hoveredButton={hoveredButton}
                    setHoveredButton={setHoveredButton}
                    handleBookNow={handleBookNow}
                />

                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Primary Content (Directory Main Flow) */}
                        <div className="lg:w-8/12 space-y-4">
                            <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm overflow-hidden p-1">
                                <Gallery
                                    images={car.images}
                                    activeImageIndex={activeImageIndex}
                                    setActiveImageIndex={setActiveImageIndex}
                                />
                            </div>
                            
                            <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm">
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
                        <div className="lg:w-4/12 space-y-6">
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
                            />
                            <ContactSupport />
                        </div>
                    </div>
                </div>

                {/* Recommendations Footer */}
                <div className="bg-white border-t border-gray-200 py-12">
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
