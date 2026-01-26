import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Building2, Save, MapPin, Phone, Mail, Clock, FileText } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";

export default function BusinessSettings({ auth, settings = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        group: 'business',
        company_name: settings.company_name || "",
        company_address: settings.company_address || "",
        company_phone: settings.company_phone || "",
        company_email: settings.company_email || "",
        business_hours: settings.business_hours || "",
        tax_number: settings.tax_number || "",
        vat_percentage: settings.vat_percentage || "15",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Business Information" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* Header */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Building2 size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                    Business Information
                                </h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Manage your company details and legal information
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
                        <SettingsTabs activeTab="business" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Section */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm divide-y divide-[#f3f2ef]">
                            
                            {/* Company Details */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Building2 size={16} className="text-[#0a66c2]" />
                                    Company Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Company Name</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.company_name}
                                                onChange={e => setData('company_name', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="Your Company Ltd."
                                            />
                                            {errors.company_name && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.company_name}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                        <label className="text-[13px] font-bold text-[#00000099] mt-2 flex items-center gap-2">
                                            <MapPin size={14} />
                                            Address
                                        </label>
                                        <div className="md:col-span-3">
                                            <textarea 
                                                rows="3"
                                                value={data.company_address}
                                                onChange={e => setData('company_address', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium resize-none"
                                                placeholder="123 Main Street, City, Country"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099] flex items-center gap-2">
                                            <Phone size={14} />
                                            Phone
                                        </label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="tel" 
                                                value={data.company_phone}
                                                onChange={e => setData('company_phone', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="+880 1234-567890"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099] flex items-center gap-2">
                                            <Mail size={14} />
                                            Email
                                        </label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="email" 
                                                value={data.company_email}
                                                onChange={e => setData('company_email', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="info@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099] flex items-center gap-2">
                                            <Clock size={14} />
                                            Business Hours
                                        </label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.business_hours}
                                                onChange={e => setData('business_hours', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="Mon-Sat: 9AM-8PM"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Legal Information */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText size={16} className="text-[#0a66c2]" />
                                    Legal & Tax Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">Tax/TIN Number</label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="text" 
                                                value={data.tax_number}
                                                onChange={e => setData('tax_number', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="TIN-123456789"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099]">VAT Percentage</label>
                                        <div className="md:col-span-3">
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    type="number" 
                                                    value={data.vat_percentage}
                                                    onChange={e => setData('vat_percentage', e.target.value)}
                                                    className="w-24 bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                    placeholder="15"
                                                    min="0"
                                                    max="100"
                                                />
                                                <span className="text-[13px] text-gray-600 font-medium">%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="lg:col-span-4 space-y-4 sticky top-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3">Why This Matters</h3>
                            <ul className="space-y-2 text-[12px] text-[#00000099]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Appears on invoices and receipts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Required for legal compliance</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Builds customer trust</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Used in email communications</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4">
                            <p className="text-[11px] text-[#00000099] leading-relaxed">
                                <strong>Tip:</strong> Keep your business information up-to-date for accurate invoicing and customer communications. VAT percentage will be applied to all bookings.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
