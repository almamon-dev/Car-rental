import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Mail, Save, Server, ShieldCheck, Lock } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";

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
            <Head title="Email Settings" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* 1. Header (LinkedIn Style) */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Mail size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                    Communication Settings
                                </h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Configure outgoing mail protocols and notification deliverability
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handleSubmit}
                                disabled={processing}
                                className="h-8 px-5 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full font-bold text-[13px] transition-all flex items-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
                            >
                                <Save size={14} strokeWidth={3} />
                                Update Connection
                            </button>
                        </div>
                    </div>
                    
                    <div className="px-6 border-t border-[#f3f2ef]">
                        <SettingsTabs activeTab="email" />
                    </div>
                </div>

                {/* 2. Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm divide-y divide-[#f3f2ef]">
                            {/* SMTP Config */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Server size={16} className="text-[#0a66c2]" />
                                    Mailing Server (SMTP)
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">SMTP Host</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.mail_host}
                                                onChange={e => setData('mail_host', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="e.g. smtp.gmail.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Port & Security</label>
                                        <div className="md:col-span-3 grid grid-cols-2 gap-4">
                                            <input 
                                                type="text" 
                                                value={data.mail_port}
                                                onChange={e => setData('mail_port', e.target.value)}
                                                className="bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="587"
                                            />
                                            <select 
                                                value={data.mail_encryption}
                                                onChange={e => setData('mail_encryption', e.target.value)}
                                                className="bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium appearance-none"
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
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Lock size={16} className="text-[#0a66c2]" />
                                    Secure Authentication
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Username</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.mail_username}
                                                onChange={e => setData('mail_username', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="API Key or Email Address"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Password</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="password" 
                                                value={data.mail_password}
                                                onChange={e => setData('mail_password', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="••••••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sender Info */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-[#0a66c2]" />
                                    Sender Identification
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">From Email</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="email" 
                                                value={data.mail_from_address}
                                                onChange={e => setData('mail_from_address', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="no-reply@yourdomain.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Sender Name</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.mail_from_name}
                                                onChange={e => setData('mail_from_name', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="e.g. Fleet Rentals Support"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3">Connection Health</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] text-gray-500 font-medium">SMTP Status</span>
                                    <span className="text-[11px] font-bold text-[#057642] px-2 py-0.5 bg-emerald-50 rounded">Configured</span>
                                </div>
                                <div className="h-px bg-gray-50" />
                                <p className="text-[11px] text-[#00000099] leading-relaxed">
                                    Ensuring your SMTP settings are correct is vital for sending booking confirmation emails and password recovery requests to your customers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
