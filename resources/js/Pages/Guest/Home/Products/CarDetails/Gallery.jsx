import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Camera, X, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/Contexts/LanguageContext";

export default function Gallery({ images = [], activeImageIndex, setActiveImageIndex }) {
    const { t } = useLanguage();
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [zoomScale, setZoomScale] = useState(1);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const displayImages = useMemo(() => {
        if (!images || images.length === 0) {
            return ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200"];
        }
        return images.map(img => `/${img.file_path}`);
    }, [images]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePos({ x, y });
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setIsLightboxOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const activeImage = displayImages[activeImageIndex] || displayImages[0];

    return (
        <div className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-[4px] border border-gray-100/50">
            
            {/* --- THUMBNAIL RAIL --- */}
            {displayImages.length > 1 && (
                <div className="order-2 md:order-1 flex md:flex-col gap-3 max-h-[450px] overflow-y-auto no-scrollbar py-1 px-1">
                    {displayImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`relative w-16 h-14 md:w-20 md:h-[60px] flex-shrink-0 rounded-[4px] overflow-hidden transition-all duration-300 border-2 ${
                                activeImageIndex === index
                                    ? "border-[#3749bb] ring-2 ring-[#3749bb]/10 opacity-100"
                                    : "border-transparent opacity-70 hover:opacity-100 hover:scale-[1.02]"
                            }`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}

            {/* --- MAIN STAGE --- */}
            <div className="order-1 md:order-2 flex-1 relative aspect-[16/10] bg-gray-50 rounded-[4px] overflow-hidden border border-gray-100 group/gallery">
                <div 
                    className="w-full h-full cursor-zoom-in relative overflow-hidden"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={() => setIsLightboxOpen(true)}
                >
                    <motion.img
                        key={activeImage}
                        src={activeImage}
                        initial={{ opacity: 0.8 }}
                        animate={{ 
                            opacity: 1,
                            scale: isHovering ? 1.4 : 1,
                            transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute top-4 left-4 pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-[4px] shadow-sm border border-gray-100">
                        <span className="text-[11px] font-black text-[#0052cc] uppercase tracking-wide">
                            View {activeImageIndex + 1}/{displayImages.length}
                        </span>
                    </div>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/gallery:translate-x-0">
                    <button 
                        onClick={() => setIsLightboxOpen(true)}
                        className="w-9 h-9 flex items-center justify-center bg-white rounded-full text-gray-700 hover:text-[#3749bb] shadow-md hover:shadow-lg transition-all"
                    >
                        <Maximize2 size={16} />
                    </button>
                </div>
            </div>

            {/* --- LIGHTBOX MODAL (INSTITUTIONAL GRADE) --- */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-[9999] flex flex-col p-4 md:p-10 font-sans"
                    >
                        {/* Lightbox Header */}
                        <div className="flex items-center justify-between text-white mb-6">
                            <div className="flex flex-col">
                                <span className="text-[14px] font-bold">{t.details.gallery.observation_mode}</span>
                                <span className="text-[11px] text-gray-400">{t.details.gallery.view} {activeImageIndex + 1} of {displayImages.length}</span>
                            </div>
                            <button 
                                onClick={() => setIsLightboxOpen(false)}
                                className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-all border border-white/10"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Stage */}
                        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                            <button 
                                onClick={() => setActiveImageIndex(prev => (prev === 0 ? displayImages.length - 1 : prev - 1))}
                                className="absolute left-4 z-10 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
                            >
                                <ChevronLeft size={28} />
                            </button>

                            <div className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center">
                                <motion.img
                                    key={activeImage}
                                    src={activeImage}
                                    style={{ scale: zoomScale }}
                                    className="max-w-full max-h-full object-contain shadow-2xl transition-transform cursor-grab active:cursor-grabbing"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: zoomScale, opacity: 1 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                />
                            </div>

                            <button 
                                onClick={() => setActiveImageIndex(prev => (prev === displayImages.length - 1 ? 0 : prev + 1))}
                                className="absolute right-4 z-10 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
                            >
                                <ChevronRight size={28} />
                            </button>
                        </div>

                        {/* Controls Footer */}
                        <div className="mt-8 flex items-center justify-center gap-6">
                            <div className="flex bg-white/10 rounded-full p-1 border border-white/10 backdrop-blur-md">
                                <button 
                                    onClick={() => setZoomScale(s => Math.max(0.5, s - 0.5))}
                                    className="p-3 text-white hover:text-[#0a66c2] transition-colors"
                                >
                                    <ZoomOut size={20} />
                                </button>
                                <div className="w-[1px] bg-white/10" />
                                <button 
                                    onClick={() => setZoomScale(1)}
                                    className="px-4 text-[12px] font-bold text-gray-300 hover:text-white"
                                >
                                    {Math.round(zoomScale * 100)}%
                                </button>
                                <div className="w-[1px] bg-white/10" />
                                <button 
                                    onClick={() => setZoomScale(s => Math.min(3, s + 0.5))}
                                    className="p-3 text-white hover:text-[#0a66c2] transition-colors"
                                >
                                    <ZoomIn size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

