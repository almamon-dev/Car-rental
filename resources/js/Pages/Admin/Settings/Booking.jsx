import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Calendar, Save, Clock, DollarSign, Shield } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";

export default function BookingSettings({ auth, settings = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        group: 'booking',
        minimum_booking_hours: settings.minimum_booking_hours || "24",
        maximum_advance_days: settings.maximum_advance_days || "90",
        cancellation_hours: settings.cancellation_hours || "24",
        security_deposit_percentage: settings.security_deposit_percentage || "20",
        late_return_fee_per_hour: settings.late_return_fee_per_hour || "500",
        allow_instant_booking: settings.allow_instant_booking === 'true' || settings.allow_instant_booking === true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Booking Rules" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Calendar size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                    Booking Rules & Policies
                                </h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Configure booking constraints and pricing rules
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
                        <SettingsTabs activeTab="booking" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm divide-y divide-[#f3f2ef]">
                            
                            {/* Booking Constraints */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Clock size={16} className="text-[#0a66c2]" />
                                    Time Constraints
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Minimum Booking</label>
                                        <div className="md:col-span-3 flex items-center gap-2">
                                            <input 
                                                type="number" 
                                                value={data.minimum_booking_hours}
                                                onChange={e => setData('minimum_booking_hours', e.target.value)}
                                                className="w-24 bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                min="1"
                                            />
                                            <span className="text-[13px] text-gray-600 font-medium">hours</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Max Advance Booking</label>
                                        <div className="md:col-span-3 flex items-center gap-2">
                                            <input 
                                                type="number" 
                                                value={data.maximum_advance_days}
                                                onChange={e => setData('maximum_advance_days', e.target.value)}
                                                className="w-24 bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                min="1"
                                            />
                                            <span className="text-[13px] text-gray-600 font-medium">days in advance</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Cancellation Window</label>
                                        <div className="md:col-span-3 flex items-center gap-2">
                                            <input 
                                                type="number" 
                                                value={data.cancellation_hours}
                                                onChange={e => setData('cancellation_hours', e.target.value)}
                                                className="w-24 bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                min="0"
                                            />
                                            <span className="text-[13px] text-gray-600 font-medium">hours before pickup</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Financial Rules */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <DollarSign size={16} className="text-[#0a66c2]" />
                                    Financial Rules
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Security Deposit</label>
                                        <div className="md:col-span-3 flex items-center gap-2">
                                            <input 
                                                type="number" 
                                                value={data.security_deposit_percentage}
                                                onChange={e => setData('security_deposit_percentage', e.target.value)}
                                                className="w-24 bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                min="0"
                                                max="100"
                                            />
                                            <span className="text-[13px] text-gray-600 font-medium">% of rental price</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Late Return Fee</label>
                                        <div className="md:col-span-3 flex items-center gap-2">
                                            <input 
                                                type="number" 
                                                value={data.late_return_fee_per_hour}
                                                onChange={e => setData('late_return_fee_per_hour', e.target.value)}
                                                className="w-32 bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                min="0"
                                            />
                                            <span className="text-[13px] text-gray-600 font-medium">৳ per hour</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Options */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Shield size={16} className="text-[#0a66c2]" />
                                    Booking Options
                                </h3>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                    <div>
                                        <p className="text-[13px] font-bold text-gray-900">Allow Instant Booking</p>
                                        <p className="text-[11px] text-gray-500">Customers can book without admin approval</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={data.allow_instant_booking}
                                            onChange={e => setData('allow_instant_booking', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0a66c2]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0a66c2]"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4 sticky top-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3">Policy Guidelines</h3>
                            <ul className="space-y-2 text-[12px] text-[#00000099]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Set realistic minimum booking times</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Security deposits protect your assets</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Late fees discourage delays</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Clear cancellation policy builds trust</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4">
                            <p className="text-[11px] text-[#00000099] leading-relaxed">
                                <strong>Tip:</strong> These rules apply globally to all bookings. Make sure they align with your business model and local regulations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
