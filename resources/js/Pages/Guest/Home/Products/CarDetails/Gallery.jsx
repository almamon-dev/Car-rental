import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, ZoomIn } from "lucide-react";
import { useState } from "react";
import { carImages } from "./data";

/**
 * EXECUTIVE DATA-VISUAL GALLERY (LINKEDIN MASTER STYLE)
 * 
 * Philosophy:
 * - High Interaction: Zoom-hover, kinetic thumbnails, and full-screen expansion.
 * - Style Sync: Minimalist UI, #0a66c2 accents, and high-density metadata.
 * - Cinematic: Smooth slide transitions with depth-scaling.
 */

export default function Gallery({ activeImageIndex, setActiveImageIndex }) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setMousePos({ x, y });
    };

    return (
        <div className="bg-white rounded-[12px] overflow-hidden group/gallery">
            {/* --- MAIN STAGE --- */}
            <div className="relative aspect-[16/10] bg-gray-900 cursor-zoom-in overflow-hidden"
                 onMouseEnter={() => setIsZoomed(true)}
                 onMouseLeave={() => setIsZoomed(false)}
                 onMouseMove={handleMouseMove}>
                
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0, x: 20, scale: 1.05 }}
                        animate={{ 
                            opacity: 1, 
                            x: 0, 
                            scale: isZoomed ? 1.5 : 1,
                            transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                        }}
                        exit={{ opacity: 0, x: -20, scale: 1.05 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        <img
                            src={carImages[activeImageIndex]}
                            alt="Asset Visual"
                            className="w-full h-full object-cover transition-transform duration-300"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Tactical Overlays */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                
                {/* Navigation Controls (LinkedIn Style) */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300">
                    <NavBtn 
                        direction="left" 
                        onClick={() => setActiveImageIndex((prev) => (prev === 0 ? carImages.length - 1 : prev - 1))} 
                    />
                    <NavBtn 
                        direction="right" 
                        onClick={() => setActiveImageIndex((prev) => (prev === carImages.length - 1 ? 0 : prev + 1))} 
                    />
                </div>

                {/* Status HUD */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0a66c2]" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                            V-View: {activeImageIndex + 1} / {carImages.length}
                        </span>
                    </div>
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 bg-black/40 backdrop-blur-md text-white rounded-lg hover:bg-[#0a66c2] transition-colors">
                        <Maximize2 size={14} />
                    </button>
                </div>
            </div>

            {/* --- KINETIC THUMBNAIL RAIL --- */}
            <div className="p-3 bg-white">
                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide snap-x px-1">
                    {carImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`relative flex-shrink-0 w-20 aspect-[16/10] rounded-lg overflow-hidden transition-all duration-300 snap-start ${
                                activeImageIndex === index
                                    ? "ring-2 ring-[#0a66c2] ring-offset-2 scale-105"
                                    : "opacity-40 grayscale-[40%] hover:opacity-100 hover:scale-105 hover:grayscale-0"
                            }`}
                        >
                            <img
                                src={img}
                                alt={`Snapshot ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

const NavBtn = ({ direction, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-[#0a66c2] hover:border-[#0a66c2] transition-all"
    >
        {direction === "left" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </motion.button>
);
