/**
 * Auth - Identity Verification Matrix
 * 
 * Secure gate-keeping mechanism ensuring high-fidelity email 
 * confirmation before full operational status assignment.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import { Head, Link, useForm } from "@inertiajs/react";
import { Car, Mail, ShieldCheck, LogOut, ChevronRight, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * VerifyEmail Component
 * 
 * @param {Object} props
 * @param {string} props.status - System status indicating if link was dispatched
 * @returns {JSX.Element}
 */
export default function VerifyEmail({ status }) {
    // --- State: Transactional ---
    const { post, processing } = useForm({});

    // --- Logic: Re-dispatch Protocol ---
    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen bg-white md:bg-[#f3f2ef] flex flex-col font-sans antialiased text-[#000000e6]">
            <Head title="Identity Verification | EliteFleet" />

            {/* --- HEADER: INSTITUTIONAL BRANDING --- */}
            <header className="max-w-[1128px] mx-auto w-full px-4 pt-4 md:pt-8 mb-4 md:mb-8">
                <Link href="/" className="flex items-center gap-1.5 group w-fit">
                    <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-[4px] bg-[#0a66c2] text-white shadow-sm transition-transform group-hover:scale-105 active:scale-95">
                        <Car size={18} strokeWidth={2.5} className="md:w-5 md:h-5" />
                    </div>
                    <span className="text-[18px] md:text-[22px] font-bold text-[#0a66c2] tracking-tighter">EliteFleet</span>
                </Link>
            </header>

            <main className="flex-1 flex flex-col items-center px-4">
                {/* --- VERIFICATION CLUSTER --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[400px] bg-white md:rounded-lg md:shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-0 md:p-6 lg:p-8"
                >
                    <div className="mb-6">
                        <div className="w-12 h-12 bg-blue-50 text-[#0a66c2] rounded-xl flex items-center justify-center mb-6">
                            <Mail size={24} />
                        </div>
                        <h1 className="text-[28px] font-bold text-[#000000e6] leading-tight text-left tracking-tight">
                            Identity Verification
                        </h1>
                        <p className="text-[14px] text-[#00000099] mt-3 font-medium leading-relaxed">
                            Welcome to the network. Before full asset acquisition permissions are granted, 
                            please confirm your email identity via the link dispatched to your base address.
                        </p>
                    </div>

                    <AnimatePresence>
                        {status === 'verification-link-sent' && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 text-[13px] font-bold text-[#0a66c2] bg-blue-50 p-4 rounded border border-blue-100 flex items-start gap-3 shadow-sm"
                            >
                                <ShieldCheck size={16} className="shrink-0 mt-0.5" />
                                <span>A new verification uplink has been synchronized to your inbox.</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={submit} className="space-y-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-[48px] md:h-[52px] bg-[#0a66c2] hover:bg-[#084d92] text-white text-[16px] font-bold rounded-full shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {processing && <Activity size={18} className="animate-spin" />}
                            {processing ? 'Synchronizing...' : 'Resend Verification Email'}
                        </button>

                        <div className="pt-2">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full flex items-center justify-center gap-2 text-[14px] font-bold text-gray-500 hover:text-red-600 py-2 transition-colors group"
                            >
                                <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                                De-provision Session
                            </Link>
                        </div>
                    </form>
                </motion.div>

                {/* --- HELP CHANNEL --- */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 text-center pb-8"
                >
                    <p className="text-[14px] text-[#00000099] font-medium flex items-center justify-center gap-1.5">
                        Operational issues? 
                        <a href="#" className="font-bold text-[#0a66c2] hover:underline flex items-center gap-0.5">
                            Contact Deployment Support <ChevronRight size={14} />
                        </a>
                    </p>
                </motion.div>
            </main>

            {/* --- COMPLIANCE FOOTER --- */}
            <footer className="w-full bg-white md:bg-transparent pb-6 px-4">
                 <div className="max-w-[1128px] mx-auto flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-bold text-[#00000099]">
                     <Link href="/" className="flex items-center gap-1.5 text-[#0a66c2]">
                        <span className="font-black">ELITEFLEET</span> © 2026
                     </Link>
                     <a href="#" className="hover:underline">Verification Protocol</a>
                     <a href="#" className="hover:underline">Support Network</a>
                     <div className="flex items-center gap-1 cursor-pointer">
                         <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                         <span>Identity Pending Verification</span>
                     </div>
                 </div>
            </footer>
        </div>
    );
}
