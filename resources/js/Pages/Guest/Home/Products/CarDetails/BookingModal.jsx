import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, ShieldCheck, CheckCircle2, CreditCard, Wallet, Smartphone, ChevronLeft, ChevronRight, Briefcase, FileText, Lock, Loader2 } from "lucide-react";
import React, { useState } from "react";
import StripePaymentForm from "@/Components/Payment/StripePaymentForm";
import { router } from "@inertiajs/react";
import { toast } from "react-hot-toast";

/**
 * AUTHENTIC LINKEDIN-STYLE COMPACT CHECKOUT
 */

const PAYMENT_METHODS = [
    { 
        id: 'card', 
        name: 'Debit/Credit Card', 
        icon: CreditCard, 
        color: 'bg-[#0a66c2]',
        subtitle: 'Visa, Mastercard, Amex'
    },
    { 
        id: 'bkash', 
        name: 'bKash', 
        icon: Smartphone, 
        color: 'bg-[#e2136e]',
        subtitle: 'Instant Mobile Banking'
    },
    { 
        id: 'nagad', 
        name: 'Nagad', 
        icon: Smartphone, 
        color: 'bg-[#f15a22]',
        subtitle: 'Digital Mobile Wallet'
    }
];

export default function BookingModal({
    showBookingModal,
    setShowBookingModal,
    priceSummary,
    car
}) {
    const [step, setStep] = useState('summary'); // summary, method_select, payment_form, success
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!car) return null;
    const currency = car.price_details?.currency || '৳';

    const handlePaymentSuccess = (paymentIntent) => {
        setStep('success');
        setIsSuccess(true);
        toast.success("Transaction Confirmed!");
        
        setTimeout(() => {
            setShowBookingModal(false);
            setStep('summary');
            setSelectedMethod(null);
            setIsSuccess(false);
            router.get(route('user.bookings.index'));
        }, 3000);
    };

    const MobilePaymentView = ({ method }) => {
        const [phone, setPhone] = useState("");
        const [otpStep, setOtpStep] = useState(false);
        const [processing, setProcessing] = useState(false);

        const handleContinue = () => {
             if(!otpStep) {
                 if(phone.length < 11) {
                     toast.error("Enter valid number");
                     return;
                 }
                 setProcessing(true);
                 
                 const routeName = method.id === 'bkash' ? 'user.bkash.payment' : 'user.nagad.payment';
                 
                 axios.post(route(routeName), {
                     amount: priceSummary.total,
                     car_id: car.id,
                     phone: phone
                 }).then(res => {
                     setProcessing(false);
                     setOtpStep(true);
                     toast.success("Security token sent!");
                 }).catch(err => {
                     setProcessing(false);
                     toast.error("Communication failure.");
                 });
             } else {
                 setProcessing(true);
                 
                 // Finalize on backend
                 axios.post(route('user.stripe.success'), {
                     amount: priceSummary.total,
                     car_id: car.id,
                     method: method.id,
                     transaction_id: 'MOB-' + Math.random().toString(36).substr(2, 9).toUpperCase()
                 }).then(res => {
                     setProcessing(false);
                     handlePaymentSuccess();
                 }).catch(err => {
                     setProcessing(false);
                     toast.error("Authorization failed.");
                 });
             }
        };

        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
            >
                <div className={`p-4 rounded-[4px] ${method.color} text-white flex items-center justify-between`}>
                    <div>
                        <div className="text-[10px] font-bold opacity-80 uppercase tracking-wider">Method</div>
                        <div className="text-[16px] font-bold">{method.name}</div>
                    </div>
                    <method.icon size={20} />
                </div>

                <div className="space-y-3">
                    {!otpStep ? (
                        <div className="space-y-1">
                            <label className="text-[12px] font-bold text-gray-700">Phone Number</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold border-r pr-2">+88</span>
                                <input 
                                    type="tel" 
                                    placeholder="01XXXXXXXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full border border-gray-300 rounded-[4px] pl-14 pr-3 py-2 text-[14px] focus:ring-1 focus:ring-[#0a66c2] focus:border-[#0a66c2] outline-none transition-all"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <label className="text-[12px] font-bold text-gray-700 text-center block">Verification Token</label>
                            <input 
                                type="text" 
                                placeholder="000000"
                                className="w-full border border-gray-300 rounded-[4px] px-3 py-2 text-[18px] font-bold tracking-[8px] text-center focus:ring-1 focus:ring-[#0a66c2] outline-none transition-all"
                            />
                        </div>
                    )}
                    
                    <button 
                        onClick={handleContinue}
                        disabled={processing}
                        className="w-full py-2.5 bg-[#0a66c2] text-white text-[14px] font-bold rounded-full hover:bg-[#004182] transition-all flex items-center justify-center gap-2"
                    >
                        {processing ? <Loader2 size={16} className="animate-spin" /> : (otpStep ? 'Complete' : 'Continue')}
                    </button>
                    <button 
                        onClick={() => { setOtpStep(false); setStep('method_select'); }}
                        className="w-full py-1 text-gray-500 text-[12px] font-bold hover:underline"
                    >
                        Change Method
                    </button>
                </div>
            </motion.div>
        );
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
                        if (step !== 'payment_form' || isSuccess) setShowBookingModal(false);
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
                            <div className="flex items-center gap-2">
                                {step !== 'summary' && !isSuccess && (
                                    <button 
                                        onClick={() => {
                                             if(step === 'method_select') setStep('summary');
                                             else if(step === 'payment_form') setStep('method_select');
                                        }}
                                        className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                )}
                                <h3 className="text-[16px] font-bold text-gray-900">
                                    {isSuccess ? 'Confirmed' : 
                                     step === 'summary' ? 'Review your booking' : 
                                     step === 'method_select' ? 'Select payment' : 'Authorize payment'}
                                </h3>
                            </div>
                            {!isSuccess && (
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
                            ) : step === 'summary' ? (
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
                                             <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Total</span>
                                             <span className="text-[22px] font-bold text-[#0a66c2] leading-none">{currency}{priceSummary.total.toLocaleString()}</span>
                                         </div>
                                         <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                                             <Lock size={12} className="text-green-600" />
                                             Secure encrypted transaction
                                         </div>
                                    </div>

                                    <button 
                                        onClick={() => setStep('method_select')}
                                        className="w-full py-2 bg-[#0a66c2] text-white text-[14px] font-bold rounded-full hover:bg-[#004182] transition-all"
                                    >
                                        Booking Confirm
                                    </button>
                                </div>
                            ) : step === 'method_select' ? (
                                <div className="space-y-3">
                                    {PAYMENT_METHODS.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => {
                                                setSelectedMethod(method);
                                                setStep('payment_form');
                                            }}
                                            className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-[4px] hover:border-[#0a66c2] hover:bg-blue-50/20 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-[4px] ${method.color} flex items-center justify-center text-white`}>
                                                    <method.icon size={20} />
                                                </div>
                                                <div className="text-left leading-tight">
                                                    <div className="text-[14px] font-bold text-gray-900">{method.name}</div>
                                                    <div className="text-[11px] text-gray-500">{method.subtitle}</div>
                                                </div>
                                            </div>
                                            <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0a66c2]" />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                selectedMethod?.id === 'card' ? (
                                    <StripePaymentForm 
                                        amount={priceSummary.total} 
                                        carId={car.id} 
                                        currency={currency}
                                        onSuccess={handlePaymentSuccess}
                                        onCancel={() => setStep('method_select')}
                                    />
                                ) : (
                                    <MobilePaymentView method={selectedMethod} />
                                )
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
                                <span className="text-[9px] font-bold uppercase tracking-tighter">Secure</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
