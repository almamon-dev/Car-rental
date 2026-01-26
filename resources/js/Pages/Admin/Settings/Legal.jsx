// File refreshed to trigger Vite reload
import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Scale, Save, FileText, ShieldCheck } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function LegalSettings({ auth, settings = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        group: 'legal',
        terms_of_service: settings.terms_of_service || "",
        privacy_policy: settings.privacy_policy || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Legal Policies" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* Header */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Scale size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                    Legal Policies
                                </h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Manage your platform terms and privacy guidelines
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
                        <SettingsTabs activeTab="legal" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Section */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm divide-y divide-[#f3f2ef]">
                            
                            {/* Terms of Service */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText size={16} className="text-[#0a66c2]" />
                                    Terms of Service
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-bold text-[#00000099]">Agreement Content</label>
                                        <div className="bg-[#f3f6f8] rounded overflow-hidden">
                                            <ReactQuill 
                                                theme="snow"
                                                value={data.terms_of_service}
                                                onChange={val => setData('terms_of_service', val)}
                                                modules={modules}
                                                className="bg-white"
                                            />
                                        </div>
                                        {errors.terms_of_service && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.terms_of_service}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Privacy Policy */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-[#0a66c2]" />
                                    Privacy Policy
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-bold text-[#00000099]">Policy Content</label>
                                        <div className="bg-[#f3f6f8] rounded overflow-hidden">
                                            <ReactQuill 
                                                theme="snow"
                                                value={data.privacy_policy}
                                                onChange={val => setData('privacy_policy', val)}
                                                modules={modules}
                                                className="bg-white"
                                            />
                                        </div>
                                        {errors.privacy_policy && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.privacy_policy}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="lg:col-span-4 space-y-4 sticky top-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3">Legal Guidelines</h3>
                            <ul className="space-y-2 text-[12px] text-[#00000099]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Displayed to users during registration</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Protects your platform legally</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Ensures data transparency</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Required for app store compliance</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4 text-center">
                            <Scale size={32} className="mx-auto text-slate-300 mb-2" />
                            <p className="text-[11px] text-[#00000099] leading-relaxed italic">
                                "Compliance is not just a checkbox, it's a foundation of trust for your members."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
