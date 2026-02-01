/**
 * Auth - Password Recovery Initiation (Forgot Password)
 * 
 * Initiates the identity recovery protocol by dispatching a verification 
 * uplink to the provided member email.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import { Head, Link, useForm } from "@inertiajs/react";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Car, Send, ArrowLeft, ShieldCheck, Mail, Globe, Activity } from "lucide-react";
import InputError from "@/Components/InputError";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ForgotPassword Component
 * 
 * @param {Object} props
 * @param {string} props.status - Post-action status message from system
 * @returns {JSX.Element}
 */
export default function ForgotPassword({ status }) {
    // --- Context & Localization ---
    const { t } = useLanguage();
    
    // --- State: Transactional ---
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    // --- Logic: Dispatch Recovery ---
    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-white md:bg-[#f3f2ef] flex flex-col font-sans antialiased text-[#000000e6]">
            <Head title="Establish Identity Recovery | EliteFleet" />

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
                {/* --- RECOVERY CLUSTER --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[400px] bg-white md:rounded-lg md:shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-0 md:p-6 lg:p-8"
                >
                    <div className="mb-6">
                        <h1 className="text-[28px] font-bold text-[#000000e6] leading-tight text-left tracking-tight">
                            Identity Recovery
                        </h1>
                        <p className="text-[14px] text-[#00000099] mt-3 font-medium leading-normal">
                            Forgot your access credentials? Provide your registered email to receive a secure recovery uplink.
                        </p>
                    </div>

                    <AnimatePresence>
                        {status && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 text-[13px] font-bold text-green-700 bg-green-50 p-4 rounded border border-green-100 flex items-start gap-3"
                            >
                                <ShieldCheck size={16} className="shrink-0 mt-0.5" />
                                <span>{status}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Email Deployment Field */}
                        <div className="relative group">
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                placeholder=" "
                                autoFocus
                                onChange={(e) => setData("email", e.target.value)}
                                className={`peer w-full h-[56px] px-3 pt-4 pb-1 text-[16px] border rounded-[4px] outline-none transition-all duration-200 font-medium
                                    ${errors.email ? 'border-red-600 ring-1 ring-red-600' : 'border-gray-400 hover:border-gray-900 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]'}
                                `}
                            />
                            <label 
                                htmlFor="email"
                                className="absolute left-3 top-4 text-[16px] text-[#00000099] transition-all duration-200 pointer-events-none font-medium
                                    peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-[#0a66c2] peer-focus:font-bold
                                    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[12px]
                                "
                            >
                                Registered Email Address
                            </label>
                            <InputError message={errors.email} className="mt-1 font-bold text-[11px]" />
                        </div>

                        {/* Dispatch Button */}
                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full h-[48px] md:h-[52px] bg-[#0a66c2] hover:bg-[#084d92] text-white text-[16px] font-bold rounded-full shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {processing ? <Activity size={18} className="animate-spin" /> : <Mail size={18} />}
                                {processing ? 'Requesting Uplink...' : 'Email Reset Link'}
                            </button>

                            <Link
                                href={route("login")}
                                className="flex items-center justify-center gap-2 text-[15px] font-bold text-[#0a66c2] hover:bg-blue-50 py-2.5 rounded-full transition-all"
                            >
                                <ArrowLeft size={16} />
                                Return to Sign In
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </main>

            {/* --- COMPLIANCE FOOTER --- */}
            <footer className="w-full bg-white md:bg-transparent pb-6 px-4">
                 <div className="max-w-[1128px] mx-auto flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-bold text-[#00000099]">
                     <Link href="/" className="flex items-center gap-1.5 text-[#0a66c2]">
                        <span className="font-black">ELITEFLEET</span> © 2026
                     </Link>
                     <a href="#" className="hover:underline hover:text-[#0a66c2] transition-colors">User Protocol</a>
                     <a href="#" className="hover:underline hover:text-[#0a66c2] transition-colors">Strategic Standards</a>
                     <div className="flex items-center gap-1 cursor-pointer hover:text-[#0a66c2]">
                         <Globe size={12} />
                         <span>Support Vector: Active</span>
                     </div>
                 </div>
            </footer>
        </div>
    );
}
