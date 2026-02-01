/**
 * Admin - Email Settings
 * 
 * Manages SMTP and outgoing mail configurations.
 * Ensures deliverability for system notifications and customer alerts.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Mail, Save, Server, ShieldCheck, Lock, Loader2 } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";
import { motion } from "framer-motion";

/**
 * EmailSettings Component
 */
export default function EmailSettings({ auth, settings = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        group: 'email',
        mail_mailer: settings.mail_mailer || "smtp",
        mail_host: settings.mail_host || "",
        mail_port: settings.mail_port || "587",
        mail_username: settings.mail_username || "",
        mail_password: settings.mail_password || "",
        mail_encryption: settings.mail_encryption || "tls",
        mail_from_address: settings.mail_from_address || "",
        mail_from_name: settings.mail_from_name || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Email Settings | Admin Panel" />

            <div className="max-w-full mx-auto space-y-6 text-[#191919]">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a66c2] shadow-sm border border-slate-100">
                                <Mail size={28} strokeWidth={2} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Communication</span>
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    Email Server Settings
                                </h1>
                                <p className="text-[14px] text-slate-500 font-medium italic">
                                    Configure outgoing mail protocols and notification delivery.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleSubmit}
                                disabled={processing}
                                className="h-11 px-8 bg-[#0a66c2] hover:bg-[#084d92] text-white rounded-xl font-bold text-[13px] transition-all flex items-center gap-2 shadow-md shadow-[#0a66c2]/10 disabled:opacity-50 active:scale-95"
                            >
                                {processing ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <Save size={18} />
                                )}
                                Save Settings
                            </button>
                        </div>
                    </div>
                    
                    <div className="px-6 border-t border-slate-50 bg-slate-50/20">
                        <SettingsTabs activeTab="email" />
                    </div>
                </div>

                {/* --- CONTENT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-8 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-50 overflow-hidden"
                        >
                            {/* SMTP Config */}
                            <div className="p-8 space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#0a66c2]/5 flex items-center justify-center text-[#0a66c2]">
                                        <Server size={18} />
                                    </div>
                                    <h3 className="text-[14px] font-bold text-slate-800">
                                        Mailing Server (SMTP)
                                    </h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">SMTP Host</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.mail_host}
                                                onChange={e => setData('mail_host', e.target.value)}
                                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-semibold"
                                                placeholder="e.g. smtp.gmail.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">Port & Security</label>
                                        <div className="md:col-span-3 grid grid-cols-2 gap-4">
                                            <input 
                                                type="text" 
                                                value={data.mail_port}
                                                onChange={e => setData('mail_port', e.target.value)}
                                                className="bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-bold text-center"
                                                placeholder="587"
                                            />
                                            <select 
                                                value={data.mail_encryption}
                                                onChange={e => setData('mail_encryption', e.target.value)}
                                                className="bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-semibold cursor-pointer appearance-none"
                                            >
                                                <option value="tls">TLS (Recommended)</option>
                                                <option value="ssl">SSL</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Authentication */}
                            <div className="p-8 space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#0a66c2]/5 flex items-center justify-center text-[#0a66c2]">
                                        <Lock size={18} />
                                    </div>
                                    <h3 className="text-[14px] font-bold text-slate-800">
                                        Authentication
                                    </h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">Username</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.mail_username}
                                                onChange={e => setData('mail_username', e.target.value)}
                                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-semibold"
                                                placeholder="API Key or Email Address"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">Password</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="password" 
                                                value={data.mail_password}
                                                onChange={e => setData('mail_password', e.target.value)}
                                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-semibold"
                                                placeholder="••••••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sender Info */}
                            <div className="p-8 space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#0a66c2]/5 flex items-center justify-center text-[#0a66c2]">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <h3 className="text-[14px] font-bold text-slate-800">
                                        Sender Details
                                    </h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">From Email</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="email" 
                                                value={data.mail_from_address}
                                                onChange={e => setData('mail_from_address', e.target.value)}
                                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-semibold"
                                                placeholder="no-reply@yourdomain.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-semibold text-slate-500">Sender Name</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.mail_from_name}
                                                onChange={e => setData('mail_from_name', e.target.value)}
                                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-[#0a66c2]/20 rounded-xl py-3 px-5 text-[14px] text-slate-900 outline-none transition-all font-semibold"
                                                placeholder="e.g. Fleet Rentals Support"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-4 space-y-6 sticky top-24">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                <Activity size={18} className="text-[#0a66c2]" />
                                Server Status
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] text-slate-500 font-semibold">SMTP Connection</span>
                                    <span className="text-[11px] font-bold text-[#0a66c2] px-2.5 py-1 bg-blue-50 rounded-lg border border-blue-100">Configured</span>
                                </div>
                                <div className="h-px bg-slate-50" />
                                <p className="text-[12px] text-slate-500 leading-relaxed font-semibold italic">
                                    "Correct SMTP settings ensure that booking confirmations and password recovery emails are delivered successfully."
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden group">
                           <div className="relative z-10 space-y-3">
                                <h4 className="text-[14px] font-bold text-white">Need Assistance?</h4>
                                <p className="text-[13px] font-medium leading-relaxed text-slate-400">
                                    Email configuration can be tricky. If you're having trouble, check your mail provider's SMTP documentation.
                                </p>
                           </div>
                           <Server size={100} className="absolute -right-8 -bottom-8 text-white/[0.03] rotate-12 transition-transform duration-700 group-hover:scale-110" />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
