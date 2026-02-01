/**
 * Auth - Institutional Access Portal (Login)
 * 
 * Provides a secure entry point for existing members, featuring 
 * multi-factor authentication potential and professional session management.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Car, ShieldCheck, Eye, EyeOff, Globe, Activity } from "lucide-react";
import InputError from "@/Components/InputError";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Login Component
 * 
 * @param {Object} props
 * @param {string} props.status - Post-action status message
 * @param {boolean} props.canResetPassword - Eligibility for password recovery
 * @returns {JSX.Element}
 */
export default function Login({ status, canResetPassword }) {
    // --- Context & Localization ---
    const { t } = useLanguage();
    
    // --- State: Transactional ---
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // --- State: UI ---
    const [showPassword, setShowPassword] = useState(false);

    // --- Logic: Authentication Dispatch ---
    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen bg-white md:bg-[#f3f2ef] flex flex-col font-sans antialiased text-[#000000e6]">
            <Head title={`${t.nav.login} | EliteFleet Identity`} />

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
                {/* --- LOGIN CLUSTER --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[400px] bg-white md:rounded-lg md:shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-0 md:p-6 lg:p-8"
                >
                    <div className="mb-6">
                        <h1 className="text-[32px] font-bold text-[#000000e6] leading-tight text-left tracking-tight">
                            {t.nav.login}
                        </h1>
                        <p className="text-[14px] text-[#00000099] mt-1 font-medium">
                            {t.auth.welcome_subtitle}
                        </p>
                    </div>

                    <AnimatePresence>
                        {status && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-4 text-[13px] font-bold text-green-700 bg-green-50 p-3 rounded border border-green-100 flex items-center gap-2"
                            >
                                <ShieldCheck size={14} />
                                {status}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={submit} className="flex flex-col gap-6">
                        {/* Email Deployment Field */}
                        <div className="relative group">
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                placeholder=" "
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

                        {/* Recovery Protocol */}
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-[15px] font-bold text-[#0a66c2] hover:underline w-fit"
                            >
                                {t.auth.forgot_password}
                            </Link>
                        )}

                        {/* Primary Dispatch */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-[48px] md:h-[52px] bg-[#0a66c2] hover:bg-[#084d92] text-white text-[16px] font-bold rounded-full shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
                        >
                            {processing && <Activity size={18} className="animate-spin" />}
                            {processing ? t.auth.signing_in : t.nav.login}
                        </button>
                    </form>

                    {/* Sequential Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-[13px]">
                            <span className="px-4 bg-white text-[#00000099] font-medium tracking-widest">
                                OR
                            </span>
                        </div>
                    </div>

                    {/* Third-Party Federated Identities */}
                    <div className="flex flex-col gap-3">
                        <button className="w-full flex items-center justify-center gap-3 h-[40px] md:h-[48px] rounded-full border border-gray-400 font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-900 transition-all text-[15px] group">
                            <svg className="w-[18px] md:w-[20px] h-[18px] md:h-[20px] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            {t.auth.sign_in_google}
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 h-[40px] md:h-[48px] rounded-full border border-gray-400 font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-900 transition-all text-[15px] group">
                            <svg className="w-[18px] md:w-[20px] h-[18px] md:h-[20px] text-black group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z" />
                            </svg>
                            {t.auth.sign_in_apple}
                        </button>
                    </div>
                </motion.div>

                {/* --- REGISTRATION CHANNEL --- */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 text-center pb-8"
                >
                    <p className="text-[16px] text-[#000000e6] font-medium">
                        {t.auth.new_to_luxdrive} 
                        <Link
                            href={route("register")}
                            className="font-bold text-[#0a66c2] hover:underline ml-1.5"
                        >
                            {t.auth.join_now}
                        </Link>
                    </p>
                </motion.div>
            </main>

            {/* --- COMPLIANCE FOOTER --- */}
            <footer className="w-full bg-white md:bg-transparent pb-6 px-4">
                 <div className="max-w-[1128px] mx-auto flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-bold text-[#00000099]">
                     <Link href="/" className="flex items-center gap-1.5 text-[#0a66c2]">
                        <span className="font-black">ELITEFLEET</span> © 2026
                     </Link>
                     <a href="#" className="hover:underline hover:text-[#0a66c2] transition-colors">User Agreement</a>
                     <a href="#" className="hover:underline hover:text-[#0a66c2] transition-colors">Privacy Policy</a>
                     <a href="#" className="hover:underline hover:text-[#0a66c2] transition-colors">Strategic Standards</a>
                     <a href="#" className="hover:underline hover:text-[#0a66c2] transition-colors">Cookie Policy</a>
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
