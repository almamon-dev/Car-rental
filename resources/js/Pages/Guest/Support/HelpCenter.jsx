import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { 
    Search, HelpCircle, MessageSquare, BookOpen, 
    Shield, CreditCard, Car, Calendar, 
    ChevronRight, ExternalLink, Phone, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HelpCenter() {
    const { settings } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { icon: Car, title: "Booking & Rentals", count: 12, desc: "How to book, pick up, and return vehicles." },
        { icon: CreditCard, title: "Payments & Invoices", count: 8, desc: "Managing billing, taxes, and payment methods." },
        { icon: Shield, title: "Trust & Safety", count: 15, desc: "Insurance, data protection, and account verification." },
        { icon: Calendar, title: "Cancellations", count: 5, desc: "Policies regarding changes and refunds." },
    ];

    const faqs = [
        { q: "How do I verify my institutional credentials?", a: "Standard administrative protocol requires all members to maintain high-fidelity credentials. Verified status is subject to periodic technical audits." },
        { q: "What is the policy for multi-hub repositioning?", a: "Assets must be utilized within authorized operational sectors. Multi-hub repositioning without prior authorization is strictly prohibited." },
        { q: "Are electric performance assets available globally?", a: "Yes, our tier-1 fleet expansion has integrated 200+ electric performance assets into the global operational cluster." },
        { q: "How are my mobility logs protected?", a: "All institutional data transmitted within the matrix is protected by high-entropy encryption standards." },
    ];

    return (
        <UserLayout>
            <Head title="Help Center" />
            
            <div className="bg-[#f3f2ef] min-h-screen mt-20 pb-12">
                
                {/* Search Hero */}
                <div className="bg-white border-b border-gray-200 pt-12 pb-16">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h1 className="text-[32px] font-bold text-gray-900 mb-6">How can we help you today?</h1>
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text"
                                placeholder="Search for articles, guides..."
                                className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#f3f6f8] border-none focus:ring-2 focus:ring-[#0a66c2]/20 text-[16px] font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8">
                    
                    {/* Category Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {categories.map((cat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 bg-blue-50 text-[#0a66c2] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <cat.icon size={24} />
                                </div>
                                <h3 className="text-[16px] font-bold text-gray-900 mb-2">{cat.title}</h3>
                                <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">{cat.desc}</p>
                                <div className="text-[12px] font-bold text-[#0a66c2]">{cat.count} Articles</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Main Content: FAQs */}
                        <div className="lg:col-span-8 space-y-4">
                            <div className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                    <h2 className="text-[18px] font-bold text-gray-900">Recommended for you</h2>
                                    <BookOpen size={20} className="text-gray-400" />
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {faqs.map((faq, idx) => (
                                        <div key={idx} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h4 className="text-[15px] font-bold text-gray-900 mb-2 flex items-center gap-2">
                                                        <HelpCircle size={16} className="text-[#0a66c2]" />
                                                        {faq.q}
                                                    </h4>
                                                    <p className="text-[14px] text-gray-500 leading-relaxed">{faq.a}</p>
                                                </div>
                                                <ChevronRight size={18} className="text-gray-300 group-hover:text-[#0a66c2] transition-colors" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar: Contact Support */}
                        <div className="lg:col-span-4 space-y-4">
                            
                            {/* Support Card */}
                            <div className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-6">
                                <h3 className="text-[16px] font-bold text-gray-900 mb-4">Still need help?</h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-blue-50/50 flex items-start gap-4 group cursor-pointer border border-transparent hover:border-blue-100">
                                        <MessageSquare className="text-[#0a66c2] mt-1" size={20} />
                                        <div>
                                            <div className="text-[14px] font-bold text-[#0a66c2]">Live Support Mesh</div>
                                            <div className="text-[12px] text-gray-500">Typical response under 2 cycles.</div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <a href={`tel:${settings?.company_phone}`} className="flex items-center gap-3 text-[14px] text-gray-600 hover:text-[#0a66c2] transition-colors">
                                            <Phone size={16} />
                                            {settings?.company_phone || "Call us"}
                                        </a>
                                        <a href={`mailto:${settings?.company_email}`} className="flex items-center gap-3 text-[14px] text-gray-600 hover:text-[#0a66c2] transition-colors">
                                            <Mail size={16} />
                                            {settings?.company_email || "Email us"}
                                        </a>
                                    </div>

                                    <Link 
                                        href={route('contact.index')}
                                        className="w-full bg-[#0a66c2] text-white py-2 rounded-full font-bold text-[13px] hover:bg-[#004182] transition-all flex items-center justify-center gap-2"
                                    >
                                        Open Support Ticket
                                        <ExternalLink size={14} />
                                    </Link>
                                </div>
                            </div>

                            {/* Resource Card */}
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 text-white overflow-hidden relative shadow-lg">
                                <div className="relative z-10">
                                    <h4 className="text-[15px] font-bold mb-2 text-blue-400 uppercase tracking-wider">Operational Guide</h4>
                                    <p className="text-[13px] opacity-90 mb-4 leading-relaxed">Download our institutional deployment matrix manual for advanced operatives.</p>
                                    <button className="text-[13px] font-bold border-b-2 border-blue-400 hover:text-blue-400 transition-colors">
                                        Download PDF
                                    </button>
                                </div>
                                <BookOpen className="absolute -bottom-4 -right-4 text-white/5" size={120} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
