import { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import HeroSection from "./CarDetails/HeroSection";
import Gallery from "./CarDetails/Gallery";
import TabsContent from "./CarDetails/TabsContent";
import BookingWidget from "./CarDetails/BookingWidget";
import SimilarCars from "./CarDetails/SimilarCars";
import BookingModal from "./CarDetails/BookingModal";
import ContactSupport from "./CarDetails/ContactSupport";

/**
 * EXECUTIVE ASSET DETAILS (LINKEDIN MASTER STYLE SYNC)
 * 
 * Philosophy:
 * - Style Match: 1:1 synchronization with Category, Cars, and Brand sections.
 * - High Density: Tighter vertical and horizontal spacing.
 * - Institutional: Focused on data, verified status, and professional acquisition.
 * - Palette: #f3f2ef/40 background, pure white modular cards, #0a66c2 primary accents.
 */

export default function CarDetails() {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeFaqIndex, setActiveFaqIndex] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    const [selectedLocation, setSelectedLocation] = useState({
        pickup: "Executive Terminal",
        dropoff: "Corporate Plaza",
    });

    const [bookingDates, setBookingDates] = useState({
        pickup: "2026-02-01",
        dropoff: "2026-02-05",
        pickupTime: "09:00",
        dropoffTime: "17:00",
    });

    const [priceSummary, setPriceSummary] = useState({
        baseRate: 450,
        insurance: 75,
        serviceFee: 25,
        extras: 0,
        total: 550,
    });

    const [selectedExtras, setSelectedExtras] = useState([]);

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

    return (
        <GuestLayout>
            <main className="bg-[#f3f2ef]/40 min-h-screen font-sans">
                {/* Hero / Header Section Sync */}
                <HeroSection
                    isBookmarked={isBookmarked}
                    setIsBookmarked={setIsBookmarked}
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
                                    activeImageIndex={activeImageIndex}
                                    setActiveImageIndex={setActiveImageIndex}
                                />
                            </div>
                            
                            <div className="bg-white rounded-[12px] border border-gray-200 shadow-sm">
                                <TabsContent
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
                />
            </main>
        </GuestLayout>
    );
}
