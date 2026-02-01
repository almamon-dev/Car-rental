/**
 * Terms of Service Page
 * 
 * Defines the legal framework, member responsibilities, and 
 * operational protocols for using the mobility matrix.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import { Head, usePage } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { Scale, ShieldCheck, Clock, Shield } from 'lucide-react';
import 'react-quill/dist/quill.snow.css';

/**
 * Terms Component
 * 
 * @returns {JSX.Element}
 */
export default function Terms() {
    const { settings } = usePage().props;
    const siteName = settings?.company_name || settings?.site_name || "EliteFleet";

    return (
        <UserLayout>
            <Head title="Terms of Service" />
            
            <div className="bg-[#f3f2ef] min-h-screen mt-20 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    
                    {/* Hero Section (LinkedIn Style) */}
                    <div className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden mb-6">
                        <div className="h-32 bg-gradient-to-r from-[#0a66c2] to-[#004182]" />
                        <div className="px-8 pb-6">
                            <div className="relative flex items-end -mt-12 mb-4">
                                <div className="p-1 bg-white rounded-lg shadow-sm border border-gray-100">
                                    <div className="bg-[#0a66c2] p-3 rounded-lg text-white">
                                        <Scale size={40} />
                                    </div>
                                </div>
                                <div className="ml-6 pb-2">
                                    <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Institutional Terms of Service</h1>
                                    <p className="text-[14px] text-gray-500 font-medium">Standardized Mobility Operational Protocol • Ver 2026.1</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Left Column: Main Content */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-8">
                                <div className="prose prose-sm max-w-none">
                                    <div className="mb-6 pb-6 border-b border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-[13px] font-bold text-[#0a66c2] uppercase tracking-wider">
                                            <Shield size={16} />
                                            Verified Legal Document
                                        </div>
                                        <div className="text-[12px] text-gray-400">
                                            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>

                                    <div className="text-[15px] leading-[1.6] text-gray-700">
                                        {settings?.terms_of_service ? (
                                            <div className="ql-editor p-0" dangerouslySetInnerHTML={{ __html: settings.terms_of_service }} />
                                        ) : (
                                            <div className="space-y-6">
                                                <p className="font-bold text-gray-900 italic">No custom protocol defined. Displaying standard institutional boilerplate...</p>
                                                <section>
                                                    <h2 className="text-[18px] font-bold text-gray-900 mb-3">1. Operational Protocol</h2>
                                                    <p>By accessing the {siteName} matrix, you agree to comply with all institutional deployment protocols. All assets are managed through our decentralized mobility network.</p>
                                                </section>
                                                <section>
                                                    <h2 className="text-[18px] font-bold text-gray-900 mb-3">2. Membership Verification</h2>
                                                    <p>Standard administrative protocol requires all members to maintain high-fidelity credentials. Verified status is subject to periodic technical audits.</p>
                                                </section>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-6">
                                <h3 className="text-[16px] font-bold text-gray-900 mb-4">Institutional Summary</h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="p-2 bg-blue-50 text-[#0a66c2] rounded-md h-max"><Clock size={16} /></div>
                                        <div>
                                            <div className="text-[13px] font-bold">Standard Review Cycle</div>
                                            <div className="text-[11px] text-gray-500">Updated every 180 solar phases.</div>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="p-2 bg-green-50 text-green-600 rounded-md h-max"><ShieldCheck size={16} /></div>
                                        <div>
                                            <div className="text-[13px] font-bold">Global Compliance</div>
                                            <div className="text-[11px] text-gray-500">Certified for Tier-1 mobility sectors.</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-[#0a66c2] rounded-lg p-6 text-white text-center">
                                <h4 className="text-[15px] font-bold mb-2">Need Clarification?</h4>
                                <p className="text-[12px] opacity-80 mb-4">Our legal ops hub is active 24/7 for member inquiries.</p>
                                <button className="w-full bg-white text-[#0a66c2] py-2 rounded-full font-bold text-[13px] hover:bg-gray-100 transition-all">
                                    Contact Command
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-8 text-center text-[12px] text-gray-500">
                        <p>© 2026 {siteName} Logistics Core. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
