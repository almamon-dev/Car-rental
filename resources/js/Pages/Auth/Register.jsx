/**
 * Auth - Institutional Access Provisioning (Register)
 * 
 * Facilitates the establishment of new member identities within the 
 * strategic mobility ecosystem.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Car, ShieldCheck, Eye, EyeOff, Globe, Activity, CheckCircle2 } from "lucide-react";
import InputError from "@/Components/InputError";
import { motion } from "framer-motion";

/**
 * Register Component
 * 
 * @returns {JSX.Element}
 */
export default function Register() {
    // --- Context & Localization ---
    const { t } = useLanguage();
    
    // --- State: Transactional ---
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // --- State: UI ---
    const [showPassword, setShowPassword] = useState(false);

    // --- Logic: Identity Provisioning ---
    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-white md:bg-[#f3f2ef] flex flex-col font-sans antialiased text-[#000000e6]">
            <Head title={`${t.auth.join_now} | EliteFleet Identity`} />

            {/* --- HEADER: INSTITUTIONAL BRANDING --- */}
            <header className="max-w-[1128px] mx-auto w-full px-4 pt-4 md:pt-8 mb-4 md:mb-8">
                <Link href="/" className="flex items-center gap-1.5 group w-fit">
                    <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-[4px] bg-[#0a66c2] text-white transition-transform group-hover:scale-105 active:scale-95 shadow-sm">
                        <Car size={18} strokeWidth={2.5} className="md:w-5 md:h-5" />
                    </div>
                    <span className="text-[18px] md:text-[22px] font-bold text-[#0a66c2] tracking-tighter">EliteFleet</span>
                </Link>
            </header>

            <main className="flex-1 flex flex-col items-center px-4">
                {/* --- REGISTRATION CLUSTER --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[400px] bg-white md:rounded-lg md:shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-0 md:p-6 lg:p-8"
                >
                    <div className="mb-6">
                        <h1 className="text-[32px] font-bold text-[#000000e6] leading-tight text-left tracking-tight">
                            {t.auth.join_now}
                        </h1>
                        <p className="text-[14px] text-[#00000099] mt-1 font-medium italic">
                            Provision your strategic access credentials
                        </p>
                    </div>

                    <form onSubmit={submit} className="flex flex-col gap-5">
                        {/* Name Provisioning Field */}
                        <div className="relative group">
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                placeholder=" "
                                onChange={(e) => setData("name", e.target.value)}
                                className={`peer w-full h-[56px] px-3 pt-4 pb-1 text-[16px] border rounded-[4px] outline-none transition-all duration-200 font-medium
                                    ${errors.name ? 'border-red-600 ring-1 ring-red-600' : 'border-gray-400 hover:border-gray-900 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]'}
                                `}
                            />
                            <label 
                                htmlFor="name"
                                className="absolute left-3 top-4 text-[16px] text-[#00000099] transition-all duration-200 pointer-events-none font-medium
                                    peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-[#0a66c2] peer-focus:font-bold
                                    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[12px]
                                "
                            >
                                {t.auth.name || "Full Identification Name"}
                            </label>
                            <InputError message={errors.name} className="mt-1 font-bold text-[11px]" />
                        </div>

                        {/* Email Deployment Field */}
                        <div className="relative group">
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                placeholder=" "
                                onChange={(e) => setData("email", e.target.value)}
                                className={`peer w-full h-[56px] px-3 pt-4 pb-1 text-[16px] border rounded-[4px] outline-none transition-all duration-200 font-medium
                                    ${errors.email ? 'border-red-600 ring-1 ring-red-600' : 'border-gray-400 hover:border-gray-950 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]'}
                                `}
                            />
                            <label 
                                htmlFor="email"
                                className="absolute left-3 top-4 text-[16px] text-[#00000099] transition-all duration-200 pointer-events-none font-medium
                                    peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-[#0a66c2] peer-focus:font-bold
                                    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[12px]
                                "
                            >
                                {t.auth.email}
                            </label>
                            <InputError message={errors.email} className="mt-1 font-bold text-[11px]" />
                        </div>

                        {/* Password Deployment Field */}
                        <div className="relative group">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={data.password}
                                placeholder=" "
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
                                {t.auth.password}
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[14px] h-[28px] px-2 text-[14px] font-bold text-[#0a66c2] hover:bg-blue-50 rounded transition-colors flex items-center gap-1.5"
                            >
                                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                {showPassword ? t.auth.hide : t.auth.show}
                            </button>
                            <InputError message={errors.password} className="mt-1 font-bold text-[11px]" />
                        </div>

                        {/* Compliance Protocol */}
                        <div className="px-4 py-3 bg-blue-50/50 rounded-[4px] border border-blue-100/50">
                            <p className="text-[12px] text-[#00000099] text-center leading-snug">
                                By proceeding with <span className="font-bold text-[#0a66c2]">Agree & Join</span>, you acknowledge the EliteFleet <a href="#" className="font-bold text-[#0a66c2] hover:underline">User Protocol</a>, <a href="#" className="font-bold text-[#0a66c2] hover:underline">Privacy Charter</a>, and <a href="#" className="font-bold text-[#0a66c2] hover:underline">Telemetry Policy</a>.
                            </p>
                        </div>

                        {/* Registration Dispatch */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-[48px] md:h-[52px] bg-[#0a66c2] hover:bg-[#084d92] text-white text-[16px] font-bold rounded-full shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
                        >
                            {processing && <Activity size={18} className="animate-spin" />}
                            {processing ? "Deploying..." : "Agree & Join"}
                        </button>
                    </form>

                    {/* Sequential Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-[13px]">
                            <span className="px-4 bg-white text-[#00000099] font-medium tracking-widest uppercase">
                                Already Optimized?
                            </span>
                        </div>
                    </div>

                    {/* Login Channel */}
                    <div className="text-center">
                        <p className="text-[16px] text-[#000000e6] font-medium">
                            Already part of the network? 
                            <Link
                                href={route("login")}
                                className="font-bold text-[#0a66c2] hover:underline ml-1.5"
                            >
                                {t.nav.login}
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </main>

            {/* --- COMPLIANCE FOOTER --- */}
            <footer className="w-full bg-white md:bg-transparent pb-6 px-4">
                 <div className="max-w-[1128px] mx-auto flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-bold text-[#00000099]">
                     <Link href="/" className="flex items-center gap-1.5 text-[#0a66c2]">
                        <span className="font-black">ELITEFLEET</span> © 2026
                     </Link>
                     <a href="#" className="hover:underline hover:text-[#0a66c2] transition-colors">User Protocol</a>
                     <a href="#" className="hover:underline hover:text-[#0a66c2] transition-colors">Privacy Policy</a>
                     <a href="#" className="hover:underline hover:text-[#0a66c2] transition-colors">Strategic Standards</a>
                     <a href="#" className="hover:underline hover:text-[#0a66c2] transition-colors">Asset Protection</a>
                     <div className="flex items-center gap-1 cursor-pointer hover:text-[#0a66c2]">
                         <Globe size={12} />
                         <span>Language: English</span>
                     </div>
                 </div>
            </footer>
        </div>
    );
}
