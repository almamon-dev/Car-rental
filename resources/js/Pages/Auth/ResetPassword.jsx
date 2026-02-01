/**
 * Auth - Asset Re-Provisioning (Reset Password)
 * 
 * Final phase of identity recovery where new access credentials 
 * are established and synchronized with the core identity cluster.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import { Head, Link, useForm } from "@inertiajs/react";
import { Car, RefreshCw, ShieldCheck, Eye, EyeOff, Activity } from "lucide-react";
import { useState } from "react";
import InputError from "@/Components/InputError";
import { motion } from "framer-motion";

/**
 * ResetPassword Component
 * 
 * @param {Object} props
 * @param {string} props.token - Recovery token from system
 * @param {string} props.email - Member email address linked to token
 * @returns {JSX.Element}
 */
export default function ResetPassword({ token, email }) {
    // --- State: Transactional ---
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    // --- State: UI ---
    const [showPassword, setShowPassword] = useState(false);

    // --- Logic: Synchronization ---
    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-white md:bg-[#f3f2ef] flex flex-col font-sans antialiased text-[#000000e6]">
            <Head title="Identity Re-Provisioning | EliteFleet" />

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
                {/* --- RESET CLUSTER --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[400px] bg-white md:rounded-lg md:shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-0 md:p-6 lg:p-8"
                >
                    <div className="mb-6">
                        <div className="w-12 h-12 bg-blue-50 text-[#0a66c2] rounded-xl flex items-center justify-center mb-6">
                            <RefreshCw size={24} />
                        </div>
                        <h1 className="text-[28px] font-bold text-[#000000e6] leading-tight text-left tracking-tight">
                            Identity Re-Provisioning
                        </h1>
                        <p className="text-[14px] text-[#00000099] mt-3 font-medium leading-normal">
                            Establish your new access credentials to regain full operational status.
                        </p>
                    </div>

                    <form onSubmit={submit} className="flex flex-col gap-6">
                        {/* Email Reference (Static/Disabled) */}
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                disabled
                                className="w-full h-[56px] px-3 pt-4 pb-1 text-[16px] border border-gray-200 bg-gray-50 rounded-[4px] font-bold text-gray-500 cursor-not-allowed"
                            />
                            <label className="absolute left-3 top-1 text-[12px] text-[#0a66c2] font-bold">
                                Identity Reference
                            </label>
                        </div>

                        {/* New Password Provisioning */}
                        <div className="relative group">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={data.password}
                                placeholder=" "
                                autoFocus
                                onChange={(e) => setData("password", e.target.value)}
                                className={`peer w-full h-[56px] px-3 pt-4 pr-16 pb-1 text-[16px] border rounded-[4px] outline-none transition-all duration-200 font-medium
                                    ${errors.password ? 'border-red-600 ring-1 ring-red-600' : 'border-gray-400 hover:border-gray-900 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]'}
                                `}
                            />
                            <label 
                                htmlFor="password"
                                className="absolute left-3 top-4 text-[16px] text-[#00000099] transition-all duration-200 pointer-events-none font-medium
                                    peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-[#0a66c2] peer-focus:font-bold
                                    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[12px]
                                "
                            >
                                New Access Key
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[14px] h-[28px] px-2 text-[14px] font-bold text-[#0a66c2] hover:bg-blue-50 rounded transition-colors flex items-center gap-1.5"
                            >
                                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                            <InputError message={errors.password} className="mt-1 font-bold text-[11px]" />
                        </div>

                        {/* Confirmation Uplink */}
                        <div className="relative group">
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                placeholder=" "
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                className={`peer w-full h-[56px] px-3 pt-4 pb-1 text-[16px] border rounded-[4px] outline-none transition-all duration-200 font-medium
                                    ${errors.password_confirmation ? 'border-red-600 ring-1 ring-red-600' : 'border-gray-400 hover:border-gray-900 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]'}
                                `}
                            />
                            <label 
                                htmlFor="password_confirmation"
                                className="absolute left-3 top-4 text-[16px] text-[#00000099] transition-all duration-200 pointer-events-none font-medium
                                    peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-[#0a66c2] peer-focus:font-bold
                                    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[12px]
                                "
                            >
                                Confirm Access Key
                            </label>
                            <InputError message={errors.password_confirmation} className="mt-1 font-bold text-[11px]" />
                        </div>

                        {/* Synchronization Dispatch */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-[48px] md:h-[52px] bg-[#0a66c2] hover:bg-[#084d92] text-white text-[16px] font-bold rounded-full shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
                        >
                            {processing ? <Activity size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
                            {processing ? 'Synchronizing...' : 'Reset Access Key'}
                        </button>
                    </form>
                </motion.div>
            </main>

            {/* --- COMPLIANCE FOOTER --- */}
            <footer className="w-full bg-white md:bg-transparent pb-6 px-4">
                 <div className="max-w-[1128px] mx-auto flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-bold text-[#00000099]">
                     <Link href="/" className="flex items-center gap-1.5 text-[#0a66c2]">
                        <span className="font-black">ELITEFLEET</span> © 2026
                     </Link>
                     <a href="#" className="hover:underline">Security Protocols</a>
                     <a href="#" className="hover:underline">Privacy Charter</a>
                 </div>
            </footer>
        </div>
    );
}
