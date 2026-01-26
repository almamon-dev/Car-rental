import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Bell, Save, Mail, MessageSquare } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";

export default function NotificationsSettings({ auth, settings = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        group: 'notifications',
        email_notifications: settings.email_notifications === 'true' || settings.email_notifications === true,
        sms_notifications: settings.sms_notifications === 'true' || settings.sms_notifications === true,
        admin_email: settings.admin_email || "",
        booking_notification_email: settings.booking_notification_email || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Notification Settings" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Bell size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                    Notification Settings
                                </h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Configure how you receive alerts and updates
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={handleSubmit}
                            disabled={processing}
                            className="h-8 px-5 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full font-bold text-[13px] transition-all flex items-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
                        >
                            <Save size={14} strokeWidth={3} />
                            Save Changes
                        </button>
                    </div>
                    
                    <div className="px-6 border-t border-[#f3f2ef]">
                        <SettingsTabs activeTab="notifications" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm divide-y divide-[#f3f2ef]">
                            
                            {/* Notification Channels */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4">Notification Channels</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Mail size={20} className="text-[#0a66c2]" />
                                            <div>
                                                <p className="text-[13px] font-bold text-gray-900">Email Notifications</p>
                                                <p className="text-[11px] text-gray-500">Receive alerts via email</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={data.email_notifications}
                                                onChange={e => setData('email_notifications', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0a66c2]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0a66c2]"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <MessageSquare size={20} className="text-[#0a66c2]" />
                                            <div>
                                                <p className="text-[13px] font-bold text-gray-900">SMS Notifications</p>
                                                <p className="text-[11px] text-gray-500">Receive alerts via SMS</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={data.sms_notifications}
                                                onChange={e => setData('sms_notifications', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0a66c2]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0a66c2]"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Email Recipients */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4">Email Recipients</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Admin Email</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="email" 
                                                value={data.admin_email}
                                                onChange={e => setData('admin_email', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="admin@example.com"
                                            />
                                            <p className="text-[11px] text-slate-500 mt-1">Receives all system notifications</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Booking Email</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="email" 
                                                value={data.booking_notification_email}
                                                onChange={e => setData('booking_notification_email', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="bookings@example.com"
                                            />
                                            <p className="text-[11px] text-slate-500 mt-1">Receives new booking notifications</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4 sticky top-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3">Notification Types</h3>
                            <ul className="space-y-2 text-[12px] text-[#00000099]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>New booking confirmations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Payment received alerts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Booking cancellations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>System alerts and updates</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4">
                            <p className="text-[11px] text-[#00000099] leading-relaxed">
                                <strong>Tip:</strong> Enable email notifications to stay updated on important events. You can always customize which events trigger notifications.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
