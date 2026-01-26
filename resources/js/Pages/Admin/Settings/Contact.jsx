import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Phone, Save, MapPin, Mail, Clock, Globe } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";

export default function ContactSettings({ auth, settings = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        group: 'contact',
        contact_email: settings.contact_email || "",
        contact_phone: settings.contact_phone || "",
        contact_address: settings.contact_address || "",
        office_hours: settings.office_hours || "",
        google_maps_link: settings.google_maps_link || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Contact Settings" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* Header */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Phone size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                    Business Profile
                                </h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Update your public contact information and office localization
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
                                Save Profile
                            </button>
                        </div>
                    </div>
                    
                    <div className="px-6 border-t border-[#f3f2ef]">
                        <SettingsTabs activeTab="contact" />
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm divide-y divide-[#f3f2ef]">
                            {/* Contact Details */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Mail size={16} className="text-[#0a66c2]" />
                                    Communication Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Support Email</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="email" 
                                                value={data.contact_email}
                                                onChange={e => setData('contact_email', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="support@domain.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Phone Number</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.contact_phone}
                                                onChange={e => setData('contact_phone', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="+880 1XXX-XXXXXX"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Location Section */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <MapPin size={16} className="text-[#0a66c2]" />
                                    Headquarters Info
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                        <label className="text-[13px] font-bold text-[#00000099] mt-2">Physical Address</label>
                                        <div className="md:col-span-3">
                                            <textarea 
                                                rows="3"
                                                value={data.contact_address}
                                                onChange={e => setData('contact_address', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium resize-none"
                                                placeholder="Street, City, Country"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Office Hours</label>
                                        <div className="md:col-span-3 flex items-center gap-3 bg-[#f3f6f8] rounded px-4">
                                            <Clock size={16} className="text-gray-400 shrink-0" />
                                            <input 
                                                type="text" 
                                                value={data.office_hours}
                                                onChange={e => setData('office_hours', e.target.value)}
                                                className="w-full bg-transparent border-none py-2 text-[13px] text-gray-700 outline-none font-medium"
                                                placeholder="Mon - Fri: 9 AM - 6 PM"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Google Maps</label>
                                        <div className="md:col-span-3 flex items-center gap-3 bg-[#f3f6f8] rounded px-4">
                                            <Globe size={16} className="text-gray-400 shrink-0" />
                                            <input 
                                                type="text" 
                                                value={data.google_maps_link}
                                                onChange={e => setData('google_maps_link', e.target.value)}
                                                className="w-full bg-transparent border-none py-2 text-[13px] text-gray-700 outline-none font-medium"
                                                placeholder="https://maps.google.com/..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4 sticky top-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3">Visibility Note</h3>
                            <p className="text-[11px] text-[#00000099] leading-relaxed font-medium">
                                The information provided here will be automatically updated on your Contact Us page and Footer across the entire customer-facing website.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
