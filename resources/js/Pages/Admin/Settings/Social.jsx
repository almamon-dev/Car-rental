import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Search, Save, Globe, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import SettingsTabs from "./Partials/SettingsTabs";

export default function SocialSettings({ auth, settings = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        group: 'social',
        facebook_url: settings.facebook_url || "",
        twitter_url: settings.twitter_url || "",
        instagram_url: settings.instagram_url || "",
        linkedin_url: settings.linkedin_url || "",
        youtube_url: settings.youtube_url || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Social Media Settings" />

            <div className="max-w-full mx-auto space-y-4 font-sans antialiased selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* Header */}
                <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm">
                    <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#f3f6f8] rounded flex items-center justify-center text-[#0a66c2]">
                                <Globe size={20} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[18px] font-semibold text-[#000000e6]">
                                    Social Media Links
                                </h1>
                                <p className="text-[12px] text-[#00000099] mt-0.5 font-medium">
                                    Connect your social media profiles to increase engagement
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
                        <SettingsTabs activeTab="social" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Section */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm divide-y divide-[#f3f2ef]">
                            
                            {/* Social Links */}
                            <div className="p-6">
                                <h3 className="text-[14px] font-bold text-gray-900 mb-4">Social Media Profiles</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099] flex items-center gap-2">
                                            <Facebook size={16} className="text-[#1877f2]" />
                                            Facebook
                                        </label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="url" 
                                                value={data.facebook_url}
                                                onChange={e => setData('facebook_url', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="https://facebook.com/yourpage"
                                            />
                                            {errors.facebook_url && <p className="text-red-600 text-[11px] mt-1 font-bold">{errors.facebook_url}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099] flex items-center gap-2">
                                            <Twitter size={16} className="text-[#1da1f2]" />
                                            Twitter / X
                                        </label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="url" 
                                                value={data.twitter_url}
                                                onChange={e => setData('twitter_url', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="https://twitter.com/yourhandle"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099] flex items-center gap-2">
                                            <Instagram size={16} className="text-[#e4405f]" />
                                            Instagram
                                        </label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="url" 
                                                value={data.instagram_url}
                                                onChange={e => setData('instagram_url', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="https://instagram.com/yourprofile"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099] flex items-center gap-2">
                                            <Linkedin size={16} className="text-[#0a66c2]" />
                                            LinkedIn
                                        </label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="url" 
                                                value={data.linkedin_url}
                                                onChange={e => setData('linkedin_url', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="https://linkedin.com/company/yourcompany"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <label className="text-[13px] font-bold text-[#00000099] flex items-center gap-2">
                                            <Youtube size={16} className="text-[#ff0000]" />
                                            YouTube
                                        </label>
                                        <div className="md:col-span-3">
                                            <input 
                                                type="url" 
                                                value={data.youtube_url}
                                                onChange={e => setData('youtube_url', e.target.value)}
                                                className="w-full bg-[#f3f6f8] border-none rounded py-2 px-4 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#0a66c2]/10 transition-all font-medium"
                                                placeholder="https://youtube.com/@yourchannel"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="lg:col-span-4 space-y-4 sticky top-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-3">Why Connect Social Media?</h3>
                            <ul className="space-y-2 text-[12px] text-[#00000099]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Increase brand visibility and trust</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Drive traffic from social platforms</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Improve customer engagement</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#0a66c2] mt-0.5">•</span>
                                    <span>Build community around your brand</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4">
                            <p className="text-[11px] text-[#00000099] leading-relaxed">
                                <strong>Tip:</strong> Make sure to use your complete profile URLs. These links will appear in your website footer and contact pages.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
