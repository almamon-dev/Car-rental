import { Head, usePage } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { ShieldCheck, Lock, EyeOff, FileText, Clock, Shield } from 'lucide-react';
import 'react-quill/dist/quill.snow.css';

export default function Privacy() {
    const { settings } = usePage().props;
    const siteName = settings?.company_name || settings?.site_name || "EliteFleet";

    return (
        <UserLayout>
            <Head title="Privacy Policy" />
            
            <div className="bg-[#f3f2ef] min-h-screen mt-20 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    
                    {/* Hero Section (LinkedIn Style) */}
                    <div className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden mb-6">
                        <div className="h-32 bg-gradient-to-r from-[#057642] to-[#004d2c]" />
                        <div className="px-8 pb-6">
                            <div className="relative flex items-end -mt-12 mb-4">
                                <div className="p-1 bg-white rounded-lg shadow-sm border border-gray-100">
                                    <div className="bg-[#057642] p-3 rounded-lg text-white">
                                        <ShieldCheck size={40} />
                                    </div>
                                </div>
                                <div className="ml-6 pb-2">
                                    <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Privacy & Security Protocol</h1>
                                    <p className="text-[14px] text-gray-500 font-medium">Data Protection Framework • Secure Operational Matrix</p>
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
                                        <div className="flex items-center gap-2 text-[13px] font-bold text-[#057642] uppercase tracking-wider">
                                            <Lock size={16} />
                                            Encrypted Document
                                        </div>
                                        <div className="text-[12px] text-gray-400">
                                            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>

                                    <div className="text-[15px] leading-[1.6] text-gray-700">
                                        {settings?.privacy_policy ? (
                                            <div className="ql-editor p-0" dangerouslySetInnerHTML={{ __html: settings.privacy_policy }} />
                                        ) : (
                                            <div className="space-y-6">
                                                <p className="font-bold text-gray-900 italic">Institutional data protection standards are in effect...</p>
                                                <section>
                                                    <h2 className="text-[18px] font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                        <Lock size={20} className="text-[#057642]" />
                                                        1. Data Encryption Protocol
                                                    </h2>
                                                    <p>All institutional data transmitted within the matrix is protected by high-entropy encryption standards. Personal identifying information (PII) is isolated within secure data silos.</p>
                                                </section>
                                                <section>
                                                    <h2 className="text-[18px] font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                        <EyeOff size={20} className="text-[#057642]" />
                                                        2. Operational Transparency
                                                    </h2>
                                                    <p>We only collect telemetry required for asset deployment and safety audits. Your mobility logs are never shared with unauthorized third-party operatives.</p>
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
                                <h3 className="text-[16px] font-bold text-gray-900 mb-4">Security Metrics</h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="p-2 bg-green-50 text-[#057642] rounded-md h-max"><Shield size={16} /></div>
                                        <div>
                                            <div className="text-[13px] font-bold">AES-256 Encryption</div>
                                            <div className="text-[11px] text-gray-500">Standard for all data fragments.</div>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-md h-max"><FileText size={16} /></div>
                                        <div>
                                            <div className="text-[13px] font-bold">GDPR Compliant</div>
                                            <div className="text-[11px] text-gray-500">Global data protection standards.</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-[#057642] rounded-lg p-6 text-white overflow-hidden relative">
                                <div className="relative z-10">
                                    <h4 className="text-[15px] font-bold mb-2">Privacy Shield Active</h4>
                                    <p className="text-[12px] opacity-80 mb-4">Your mobility data is isolated and protected by our core security mesh.</p>
                                </div>
                                <ShieldCheck className="absolute -bottom-4 -right-4 text-white/10" size={100} />
                            </div>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-8 text-center text-[12px] text-gray-500">
                        <p>© 2026 {siteName} Privacy & Security Operations Hub. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
