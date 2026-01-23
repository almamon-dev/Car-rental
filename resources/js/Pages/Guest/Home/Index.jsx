import React, { useState, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { motion } from "framer-motion";

// Import all sections
import HeroSection from "./Sections/Hero";
import RentStepsSection from "./Sections/RentSteps";
import RecommendedCars from "./Sections/RecommendedCars";
import ClientsFeedback from "./Sections/ClientsFeedback";
import Pricing from "./Sections/Pricing";
import FAQ from "./Sections/FAQ";
import CarRentalFeatures from "./Sections/FeatureCard";
import Cars from "./Products/Cars";
import Category from "./Products/Category";
import Brand from "./Products/Brand";

// Loading animations
const pageVariants = {
    initial: { opacity: 0 },
    in: {
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
    },
    out: { opacity: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function Index() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <GuestLayout>
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
            >
                {/* Progress Bar */}
                <ScrollProgress />

                {/* Hero Section */}
                <motion.div variants={fadeUp}>
                    <HeroSection />
                </motion.div>

                {/* Staggered Sections */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="space-y-20"
                >
                    {/* Category Section */}
                    <motion.div variants={fadeUp}>
                        <Category />
                    </motion.div>

                    {/* Feature Cards */}
                    <motion.div variants={fadeUp}>
                        <CarRentalFeatures />
                    </motion.div>

                    {/* Car Listings */}
                    <motion.div variants={fadeUp}>
                        <Cars />
                    </motion.div>

                    {/* Brand Showcase */}
                    <motion.div variants={fadeUp}>
                        <Brand />
                    </motion.div>

                    {/* Rent Steps */}
                    <motion.div variants={fadeUp}>
                        <RentStepsSection />
                    </motion.div>

                    {/* Recommended Cars */}
                    <motion.div variants={fadeUp}>
                        <RecommendedCars />
                    </motion.div>

                    {/* Client Feedback */}
                    <motion.div variants={fadeUp}>
                        <ClientsFeedback />
                    </motion.div>

                    {/* Pricing */}
                    <motion.div variants={fadeUp}>
                        <Pricing />
                    </motion.div>

                    {/* FAQ */}
                    <motion.div variants={fadeUp}>
                        <FAQ />
                    </motion.div>
                </motion.div>

                {/* Back to Top Button */}
                <BackToTopButton />
            </motion.div>
        </GuestLayout>
    );
}

// Scroll Progress Component
const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const progress = (totalScroll / windowHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", updateScrollProgress);
        return () => window.removeEventListener("scroll", updateScrollProgress);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 z-50 origin-left"
            style={{ scaleX: scrollProgress / 100 }}
        />
    );
};

// Back to Top Button Component
const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 20,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300"
        >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
            </svg>
        </motion.button>
    );
};
