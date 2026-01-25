import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { XCircle, AlertCircle, RefreshCcw, Home, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import UserLayout from '@/Layouts/UserLayout';

export default function Failure({ auth, status, message }) {
    const isCancel = status === 'cancel';

    return (
        <UserLayout>
            <Head title={isCancel ? "Payment Cancelled" : "Payment Failed"} />

            <div className="py-12 px-4">
                <div className="max-w-md mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <div className={`p-8 text-center border-b ${isCancel ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100'}`}>
                            <motion.div 
                                initial={{ rotate: -10 }}
                                animate={{ rotate: 0 }}
                                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ${isCancel ? 'bg-amber-500 shadow-amber-200' : 'bg-red-500 shadow-red-200'}`}
                            >
                                {isCancel ? <AlertCircle className="text-white" size={40} /> : <XCircle className="text-white" size={40} />}
                            </motion.div>
                            <h1 className={`text-2xl font-bold mb-2 ${isCancel ? 'text-amber-900' : 'text-red-900'}`}>
                                {isCancel ? 'Payment Cancelled' : 'Payment Failed'}
                            </h1>
                            <p className={`text-[14px] font-medium leading-relaxed ${isCancel ? 'text-amber-700' : 'text-red-700'}`}>
                                {message || (isCancel 
                                    ? "Order processing has been stopped because you cancelled the payment." 
                                    : "Something went wrong while processing your payment. Please don't worry, if any money was deducted, it will be refunded.")}
                            </p>
                        </div>

                        <div className="p-8 space-y-4">
                            <div className="bg-gray-50 rounded-[12px] p-5 border border-gray-100 space-y-3">
                                <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider leading-none">Possible reasons:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2 text-[13px] text-gray-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                                        <span>Insufficient balance in your card/wallet</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-[13px] text-gray-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                                        <span>Connection timeout with the bank server</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-[13px] text-gray-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                                        <span>Invalid OTP or payment credentials</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-3 pt-2">
                                <Link 
                                    href={route('car.list')}
                                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-black transition-all"
                                >
                                    <RefreshCcw size={18} />
                                    Try Re-booking
                                </Link>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <Link 
                                        href={route('home')}
                                        className="flex-1 py-3 px-4 rounded-full border border-gray-200 font-bold text-[14px] text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Home size={16} />
                                        Go Home
                                    </Link>
                                    <button 
                                        className="flex-1 py-3 px-4 rounded-full border border-gray-200 font-bold text-[14px] text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <PhoneCall size={16} />
                                        Support
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-center text-gray-400">
                             <p className="text-[10px] font-medium">Please quote transaction ID if you contact support.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </UserLayout>
    );
}
