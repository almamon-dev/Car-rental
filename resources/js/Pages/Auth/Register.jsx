import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { useLanguage } from "@/Contexts/LanguageContext";
import { Car } from "lucide-react";
import InputError from "@/Components/InputError";

export default function Register() {
    const { t, locale } = useLanguage();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-white md:bg-[#f3f2ef] flex flex-col font-sans antialiased text-[#000000e6]">
            <Head title={t.nav.register || "Register"} />

            {/* --- HEADER --- */}
            <header className="max-w-[1128px] mx-auto w-full px-4 pt-4 md:pt-8 mb-4 md:mb-8">
                <Link href="/" className="flex items-center gap-1.5 group w-fit">
                    <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-[4px] bg-[#0a66c2] text-white transition-transform group-hover:scale-105 active:scale-95">
                        <Car size={18} strokeWidth={2.5} className="md:w-5 md:h-5" />
                    </div>
                    <span className="text-[18px] md:text-[22px] font-bold text-[#0a66c2] tracking-tighter">LuxDrive</span>
                </Link>
            </header>

            <main className="flex-1 flex flex-col items-center px-4">
                {/* --- REGISTER CARD --- */}
                <div className="w-full max-w-[400px] bg-white md:rounded-lg md:shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-0 md:p-6 lg:p-8">
                    <div className="mb-6">
                        <h1 className="text-[32px] font-semibold text-[#000000e6] leading-tight text-left">
                            {t.auth.join_now}
                        </h1>
                        <p className="text-[14px] text-[#00000099] mt-1 font-normal">
                            Make the most of your professional life
                        </p>
                    </div>

                    <form onSubmit={submit} className="flex flex-col gap-5">
                        {/* Name Input */}
                        <div className="relative group">
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                placeholder=" "
                                onChange={(e) => setData("name", e.target.value)}
                                className={`peer w-full h-[56px] px-3 pt-4 pb-1 text-[16px] border rounded-[4px] outline-none transition-all duration-200
                                    ${errors.name ? 'border-red-600 ring-1 ring-red-600' : 'border-gray-800 hover:border-gray-950 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]'}
                                `}
                            />
                            <label 
                                htmlFor="name"
                                className="absolute left-3 top-4 text-[16px] text-[#00000099] transition-all duration-200 pointer-events-none
                                    peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-[#0a66c2]
                                    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[12px]
                                "
                            >
                                {t.auth.name || "Full Name"}
                            </label>
                            <InputError message={errors.name} className="mt-1" />
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                placeholder=" "
                                onChange={(e) => setData("email", e.target.value)}
                                className={`peer w-full h-[56px] px-3 pt-4 pb-1 text-[16px] border rounded-[4px] outline-none transition-all duration-200
                                    ${errors.email ? 'border-red-600 ring-1 ring-red-600' : 'border-gray-800 hover:border-gray-950 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]'}
                                `}
                            />
                            <label 
                                htmlFor="email"
                                className="absolute left-3 top-4 text-[16px] text-[#00000099] transition-all duration-200 pointer-events-none
                                    peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-[#0a66c2]
                                    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[12px]
                                "
                            >
                                {t.auth.email}
                            </label>
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={data.password}
                                placeholder=" "
                                onChange={(e) => setData("password", e.target.value)}
                                className={`peer w-full h-[56px] px-3 pt-4 pr-16 pb-1 text-[16px] border rounded-[4px] outline-none transition-all duration-200
                                    ${errors.password ? 'border-red-600 ring-1 ring-red-600' : 'border-gray-800 hover:border-gray-900 focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]'}
                                `}
                            />
                            <label 
                                htmlFor="password"
                                className="absolute left-3 top-4 text-[16px] text-[#00000099] transition-all duration-200 pointer-events-none
                                    peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-[#0a66c2]
                                    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[12px]
                                "
                            >
                                {t.auth.password}
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[14px] h-[28px] px-2 text-[14px] font-semibold text-[#0a66c2] hover:bg-blue-50 rounded transition-colors"
                            >
                                {showPassword ? t.auth.hide : t.auth.show}
                            </button>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Agreement */}
                        <p className="text-[12px] text-[#00000099] text-center px-4">
                            By clicking Agree & Join, you agree to the LuxDrive <a href="#" className="text-[#0a66c2] font-semibold hover:underline">User Agreement</a>, <a href="#" className="text-[#0a66c2] font-semibold hover:underline">Privacy Policy</a>, and <a href="#" className="text-[#0a66c2] font-semibold hover:underline">Cookie Policy</a>.
                        </p>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-[48px] md:h-[52px] bg-[#0a66c2] hover:bg-[#004182] text-white text-[16px] font-semibold rounded-full shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
                        >
                            {processing ? "Joining..." : "Agree & Join"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-[14px]">
                            <span className="px-4 bg-white text-[#00000099]">
                                {t.auth.or}
                            </span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-[16px] text-[#000000e6]">
                            Already on LuxDrive? 
                            <Link
                                href={route("login")}
                                className="font-semibold text-[#0a66c2] hover:underline ml-1"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            {/* --- FOOTER --- */}
            <footer className="w-full bg-white md:bg-transparent py-6 px-4">
                 <div className="max-w-[1128px] mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] font-semibold text-[#00000099]">
                     <Link href="/" className="flex items-center gap-1 text-[#0a66c2]">
                        <span className="font-bold">LuxDrive</span> © 2026
                     </Link>
                     <a href="#" className="hover:underline">User Agreement</a>
                     <a href="#" className="hover:underline">Privacy Policy</a>
                     <a href="#" className="hover:underline">Community Guidelines</a>
                     <a href="#" className="hover:underline">Cookie Policy</a>
                     <a href="#" className="hover:underline">Copyright Policy</a>
                     <a href="#" className="hover:underline">Send Feedback</a>
                     <button className="hover:underline">Language</button>
                 </div>
            </footer>
        </div>
    );
}
