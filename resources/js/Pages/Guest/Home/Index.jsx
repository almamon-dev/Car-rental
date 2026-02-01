/**
 * Home Page Component
 * 
 * This is the main landing page for the Guest section.
 * It assembles various sections like Hero, Featured Cars, Categories, etc.
 * 
 * @author AL Mamon
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

// --- Components & Sections Import ---
import HeroSection from "./Sections/Hero";
import RentStepsSection from "./Sections/RentSteps";
import RecommendedCars from "./Sections/RecommendedCars";
import ClientsFeedback from "./Sections/ClientsFeedback";
import Pricing from "./Sections/Pricing";
import FAQ from "./Sections/FAQ";
import BrandNarrative from "./Sections/BrandNarrative";
import CarRentalFeatures from "./Sections/FeatureCard";
import Cars from "./Products/Cars";
import Category from "./Products/Category";
import Brand from "./Products/Brand";

/**
 * Main Index Component for the Landing Page
 * 
 * @param {Object} props
 * @param {Array} props.categories - List of car categories
 * @param {Array} props.cars - List of available cars
 * @param {Array} props.brands - List of car brands
 * @param {Array} props.locations - List of available pickup/dropoff locations
 * @returns {JSX.Element}
 */
export default function Index({ categories, cars, brands, locations }) {
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Handle initial loading state
     */
    useEffect(() => {
        // Simulate minor loading delay for smooth transitions
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <GuestLayout>
            <Head>
                <title>Home - Premium Car Rental</title>
                <meta name="description" content="Premium car rental services in Bangladesh. Rent top-quality executive cars, SUVs, and luxury vehicles at the best daily, weekly, and monthly rates." />
                <meta name="keywords" content="car rental bangladesh, rent a car dhaka, luxury car rental, executive car hire, suv rental, toyota rental" />
            </Head>

            <div className="bg-[#f3f2ef]/50 min-h-screen">
                {/* Scroll Progress Indicator at the Top */}
                <ScrollProgress />

                {/* --- 1. Hero Section: Main Banner & Search --- */}
                <div className="relative">
                    <HeroSection locations={locations} />
                </div>

                {/* --- Main Content Area --- */}
                <div className="space-y-4 pb-16">
                    
                    {/* --- 2. Category Navigation --- */}
                    <div className="bg-white/40 backdrop-blur-sm">
                        <Category categories={categories} />
                    </div>

                    {/* --- 3. Operational Features: Why Choose Us --- */}
                    <div className="max-w-7xl mx-auto">
                        <CarRentalFeatures />
                    </div>

                    {/* --- 4. Main Product Grid: Available Cars --- */}
                    <div>
                        <Cars cars={cars} />
                    </div>

                    {/* --- 5. Brand Showcase: Our Partners --- */}
                    <div className="bg-white/60 py-4">
                        <Brand brands={brands} />
                    </div>

                    {/* --- 6. Renting Process: How it Works --- */}
                    <div className="max-w-7xl mx-auto">
                        <RentStepsSection />
                    </div>

                    {/* --- 7. Featured/Recommended Inventory --- */}
                    <div className="bg-white/40">
                        <RecommendedCars cars={cars} />
                    </div>

                    {/* --- 8. Testimonials: Clients Feedback --- */}
                    <div className="max-w-7xl mx-auto">
                        <ClientsFeedback />
                    </div>

                    {/* --- 9. Pricing Information / Packages --- */}
                    <div className="bg-white/40">
                        <Pricing />
                    </div>

                    {/* --- 10. Brand Narrative: About Our High Standards --- */}
                    <BrandNarrative />

                    {/* --- 11. Support: Frequently Asked Questions --- */}
                    <div className="max-w-7xl mx-auto">
                        <FAQ />
                    </div>
                </div>

                {/* Smooth Scroll Navigation Assist */}
                <BackToTopButton />
            </div>
        </GuestLayout>
    );
}

/**
 * ScrollProgress Component
 * Displays a thin progress bar at the top of the page as the user scrolls.
 * 
 * @returns {JSX.Element}
 */
const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        /**
         * Calculate scroll percentage
         */
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const current = window.pageYOffset;
            if (total > 0) {
                setProgress((current / total) * 100);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-[52px] sm:top-[62px] left-0 right-0 h-[2px] bg-[#0a66c2]/5 z-[110]">
            <div 
                className="h-full bg-gradient-to-r from-[#0a66c2] to-cyan-400 p-0 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(10,102,194,0.3)]" 
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

/**
 * BackToTopButton Component
 * Floating button that appears after scrolling down, allowing users to return to top.
 * 
 * @returns {JSX.Element}
 */
const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        /**
         * Toggle visibility based on scroll depth
         */
        const handleScroll = () => {
            setIsVisible(window.pageYOffset > 600);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Back to top"
            className={`fixed bottom-10 right-10 z-[90] w-12 h-12 bg-white border border-gray-200 text-[#0a66c2] rounded-full shadow-lg flex items-center justify-center hover:bg-[#0a66c2] hover:text-white transition-all duration-300 active:scale-95 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            }`}
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    );
};

