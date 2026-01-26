import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, CheckCircle2, CreditCard, Lock, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import axios from "axios";

/**
 * DIRECT SSLCOMMERZ CHECKOUT (NO MIDDLE STEP)
 */

export default function BookingModal({
    showBookingModal,
    setShowBookingModal,
    priceSummary,
    car,
    bookingDates
}) {
    const [step, setStep] = useState('summary'); // summary, success
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInitiating, setIsInitiating] = useState(false);

    if (!car) return null;
    const currency = car.price_details?.currency || '৳';

const handleConfirmBooking = () => {
        setIsInitiating(true);
        axios.post(route('user.sslcommerz.payment'), {
            amount: priceSummary.total,
            car_id: car.id,
            start_date: bookingDates.pickup,
            end_date: bookingDates.dropoff
        }).then(res => {
            if (res.data.status === 'success' && res.data.GatewayPageURL) {
                window.location.href = res.data.GatewayPageURL;
            } else {
                setIsInitiating(false);
            }
        }).catch(err => {
            setIsInitiating(false);
        });
    };

    return (
        <AnimatePresence>
            {showBookingModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                    onClick={() => {
                        if (!isInitiating && !isSuccess) setShowBookingModal(false);
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.98, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-[8px] max-w-[400px] w-full overflow-hidden shadow-xl border border-gray-200"
                    >
                        {/* Compact Header */}
                        <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between bg-white">
                            <h3 className="text-[16px] font-bold text-gray-900">
                                {isSuccess ? 'Confirmed' : 'Review your booking'}
                            </h3>
                            {!isSuccess && !isInitiating && (
                                <button
                                    onClick={() => setShowBookingModal(false)}
                                    className="p-1 text-gray-400 hover:text-gray-700"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>

                        <div className="p-5">
                            {isSuccess ? (
                                <div className="text-center py-4 space-y-4">
                                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200">
                                        <CheckCircle2 size={28} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-[18px] font-bold text-gray-900">Success!</h4>
                                        <p className="text-[13px] text-gray-500">Redirecting to your dashboard...</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[4px] border border-gray-100">
                                        <img
                                            src={car.images?.[0] ? `/${car.images[0].file_path}` : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400"}
                                            className="w-16 h-16 rounded-[4px] object-cover border border-white"
                                        />
                                        <div>
                                            <div className="text-[15px] font-bold text-gray-900 leading-tight">{car.brand?.name} {car.model}</div>
                                            <div className="text-[11px] text-gray-500 font-medium">{car.year} • {car.category?.name}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 divider-top">
                                         <div className="flex justify-between items-end pb-1">
                                             <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Total Charge</span>
                                             <span className="text-[22px] font-bold text-[#0a66c2] leading-none">{currency}{priceSummary.total.toLocaleString()}</span>
                                         </div>
                                         <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                                             <Lock size={12} className="text-green-600" />
                                             Payment via SSLCommerz
                                         </div>
                                    </div>

                                    <button 
                                        onClick={handleConfirmBooking}
                                        disabled={isInitiating}
                                        className="w-full py-2.5 bg-[#ff7a00] text-white text-[14px] font-bold rounded-full hover:bg-[#e66e00] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isInitiating ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Processing Gateway...
                                            </>
                                        ) : (
                                            <>Confirm & Pay Now</>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* LinkedIn Compact Footer */}
                        <div className="px-5 py-2 bg-[#f9fafb] border-t border-gray-200 flex justify-center items-center gap-4">
                            <div className="flex items-center gap-1 opacity-50">
                                <ShieldCheck size={10} />
                                <span className="text-[9px] font-bold uppercase tracking-tighter">Verified</span>
                            </div>
                            <div className="w-px h-2 bg-gray-300" />
                            <div className="flex items-center gap-1 opacity-50">
                                <Lock size={10} />
                                <span className="text-[9px] font-bold uppercase tracking-tighter">Secure SSL</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
