import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, ShieldCheck } from "lucide-react";

export default function BookingModal({
    showBookingModal,
    setShowBookingModal,
    priceSummary,
    car
}) {
    if (!car) return null;
    const currency = car.price_details?.currency || '৳';

    return (
        <AnimatePresence>
            {showBookingModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans"
                    onClick={() => setShowBookingModal(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-[#f3f7fb] p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-6 bg-[#0a66c2] rounded-full" />
                                <h3 className="text-[18px] font-bold text-gray-900">
                                    Deployment Confirmation
                                </h3>
                            </div>
                            <button
                                onClick={() => setShowBookingModal(false)}
                                className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-gray-900"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Asset Summary */}
                            <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                                <img
                                    src={car.images?.[0] ? `/${car.images[0].file_path}` : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400"}
                                    alt="Asset"
                                    className="w-20 h-20 rounded-lg object-cover border border-gray-50"
                                />
                                <div>
                                    <div className="text-[16px] font-black text-gray-900 leading-tight">
                                        {car.brand?.name || car.make} {car.model}
                                    </div>
                                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                        {car.year} • {car.category?.name || 'Executive Asset'}
                                    </div>
                                </div>
                            </div>

                            {/* Logistics info - Placeholder for now */}
                            <div className="space-y-4 px-1">
                                <div className="flex items-start gap-4">
                                     <div className="mt-1"><Calendar size={16} className="text-[#0a66c2]" /></div>
                                     <div>
                                         <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Deployment Period</div>
                                         <div className="text-[13px] font-bold text-gray-800">Feb 01, 2026 — Feb 05, 2026</div>
                                     </div>
                                </div>
                                <div className="flex items-start gap-4">
                                     <div className="mt-1"><MapPin size={16} className="text-[#0a66c2]" /></div>
                                     <div>
                                         <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Origin / Destination</div>
                                         <div className="text-[13px] font-bold text-gray-800">Executive Terminal / Corporate Plaza</div>
                                     </div>
                                </div>
                            </div>

                            {/* Financial Summary */}
                            <div className="pt-6 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={16} className="text-green-500" />
                                        <span className="text-[13px] font-bold text-gray-900">Total Liability</span>
                                    </div>
                                    <span className="text-[26px] font-black text-[#0a66c2]">
                                        {currency}{priceSummary.total.toLocaleString()}
                                    </span>
                                </div>
                                <div className="text-[11px] font-medium text-gray-400 flex justify-end">
                                    Comprehensive Insurance & Fees Included
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3 pt-2">
                                <button className="w-full py-3.5 bg-[#0a66c2] text-white text-[15px] font-bold rounded-xl hover:bg-[#004182] transition-all shadow-md active:scale-[0.98]">
                                    Authorize Transaction
                                </button>
                                <button
                                    onClick={() => setShowBookingModal(false)}
                                    className="w-full py-3 text-gray-500 text-[14px] font-bold hover:text-gray-900 transition-colors"
                                >
                                    Cancel Request
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
