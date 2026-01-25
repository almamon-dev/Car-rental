import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, ArrowRight, Download, Calendar, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import UserLayout from '@/Layouts/UserLayout';

export default function Success({ auth, data }) {
    return (
        <UserLayout>
            <Head title="Payment Successful" />

            <div className="py-12 px-4">
                <div className="max-w-2xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <div className="bg-green-50 p-8 text-center border-b border-green-100">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200"
                            >
                                <CheckCircle2 className="text-white" size={40} />
                            </motion.div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                            <p className="text-green-700 font-medium tracking-tight">Your booking is confirmed and ready to go.</p>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                            <Ticket size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">Transaction ID</div>
                                            <div className="text-[14px] font-mono font-bold text-gray-900">{data.transaction_id}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">Payment Date</div>
                                            <div className="text-[14px] font-bold text-gray-900">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-[12px] p-5 border border-gray-100">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[13px] text-gray-500 font-medium">Paid Amount</span>
                                        <span className="text-[20px] font-bold text-gray-900">৳{data.amount}</span>
                                    </div>
                                    <div className="text-[11px] text-gray-400 flex items-center gap-1">
                                        <CheckCircle2 size={12} className="text-green-500" />
                                        Secure Payment via SSLCommerz
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link 
                                    href={route('user.bookings.index')}
                                    className="flex-1 bg-[#0a66c2] text-white py-3 px-6 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#004182] transition-all shadow-md shadow-blue-100"
                                >
                                    View My Bookings
                                    <ArrowRight size={18} />
                                </Link>
                                <button 
                                    onClick={() => window.print()}
                                    className="px-6 py-3 rounded-full border border-gray-200 font-bold text-[15px] text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Download size={18} />
                                    Download Receipt
                                </button>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-center gap-2 opacity-60">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Powered by Antigravity Car Rental</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </UserLayout>
    );
}
