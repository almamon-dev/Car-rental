import React, { useState, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";

// Import all sections
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

export default function Index({ categories, cars, brands, locations }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <GuestLayout>
            <div className="bg-[#f3f2ef]/50 min-h-screen">
                {/* Progress Bar */}
                <ScrollProgress />

                {/* Hero Section */}
                <div className="relative">
                    <HeroSection locations={locations} />
                </div>

                {/* Main Content Feed - LinkedIn Tighter Spacing */}
                <div className="space-y-4 pb-16">
                    {/* Category Selection */}
                    <div className="bg-white/40 backdrop-blur-sm">
                        <Category categories={categories} />
                    </div>

                    {/* Operational Features */}
                    <div className="max-w-7xl mx-auto">
                        <CarRentalFeatures />
                    </div>

                    {/* Primary Asset Grid */}
                    <div>
                        <Cars cars={cars} />
                    </div>

                    {/* Partner Brands */}
                    <div className="bg-white/60 py-4">
                        <Brand brands={brands} />
                    </div>

                    {/* Procedural Steps */}
                    <div className="max-w-7xl mx-auto">
                        <RentStepsSection />
                    </div>

                    {/* Curated Recommendations */}
                    <div className="bg-white/40">
                        <RecommendedCars cars={cars} />
                    </div>

                    {/* Market Reputation */}
                    <div className="max-w-7xl mx-auto">
                        <ClientsFeedback />
                    </div>

                    {/* Acquisition Models (Pricing) */}
                    <div className="bg-white/40">
                        <Pricing />
                    </div>

                    {/* Market Perspective / Brand Narrative (Star Tech Style) */}
                    <BrandNarrative />

                    {/* Institutional Support (FAQ) */}
                    <div className="max-w-7xl mx-auto">
                        <FAQ />
                    </div>
                </div>

                {/* Navigation Assist */}
                <BackToTopButton />
            </div>
        </GuestLayout>
    );
}

// Fixed Scroll Progress
const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const current = window.pageYOffset;
            setProgress((current / total) * 100);
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

// Fixed Back to Top
const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.pageYOffset > 600);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
