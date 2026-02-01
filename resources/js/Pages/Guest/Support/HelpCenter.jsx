/**
 * Help Center (Support) Page
 * 
 * Provides a central hub for user assistance, including searchable topics,
 * categorized help articles, and direct support channels.
 * 
 * @author AL Mamon
 * @version 1.0.0
 */

import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { useLanguage } from "@/Contexts/LanguageContext";
import { 
    Search, 
    BookOpen, 
    CreditCard, 
    ShieldCheck, 
    User, 
    MessageSquare, 
    Phone, 
    Mail,
    ChevronRight,
    HelpCircle,
    FileText,
    Zap,
    MapPin,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * HelpCenter Component
 * 
 * @returns {JSX.Element}
 */
export default function HelpCenter() {
    const { t } = useLanguage();
    const { settings } = usePage().props;
    const siteName = settings?.company_name || settings?.site_name || "EliteFleet";

    // --- State Management ---
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    // --- Mock Data: Help Categories ---
    const categories = [
        { id: "booking", name: "Booking & Reservations", icon: BookOpen, color: "blue", desc: "Manage your rentals, extend trips, or cancel bookings." },
        { id: "payments", name: "Payments & Billing", icon: CreditCard, color: "green", desc: "View invoices, update payment methods, and refund policies." },
        { id: "safety", name: "Safety & Security", icon: ShieldCheck, color: "red", desc: "Insurance details, emergency contacts, and vehicle safety." },
        { id: "account", name: "Account Management", icon: User, color: "purple", desc: "Update profile settings, passwords, and member verification." },
        { id: "logistics", name: "Logistics & Delivery", icon: MapPin, color: "orange", desc: "Delivery options, pickup locations, and fuel policies." },
        { id: "technical", name: "Technical Support", icon: Zap, color: "indigo", desc: "App troubleshooting, website errors, and connectivity." },
    ];

    // --- Mock Data: Popular Questions ---
    const popularFaqs = [
        { id: 1, question: "How do I modify an existing booking?", category: "booking" },
        { id: 2, question: "What insurance coverage is included?", category: "safety" },
        { id: 3, question: "Can I pay with a corporate credit card?", category: "payments" },
        { id: 4, question: "How does the fuel policy work?", category: "logistics" },
        { id: 5, question: "What documents are required for verification?", category: "account" },
        { id: 6, question: "Is there a limit on mileage?", category: "logistics" },
    ];

    return (
        <GuestLayout>
            <Head title="Help Center | Support Matrix" />
            
            <div className="bg-[#f3f2ef] min-h-screen pt-20 pb-16 font-sans selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* --- HERO SECTION: Search & Branding --- */}
                <div className="bg-[#001c38] text-white py-16 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <HelpCircle size={20} className="text-[#0a66c2]" />
                                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-[#0a66c2]">Support Core</span>
                            </div>
                            <h1 className="text-[32px] md:text-[42px] font-black tracking-tight leading-tight">
                                How can our agents assist you today?
                            </h1>
                            <p className="text-[16px] text-gray-400 font-medium max-w-2xl mx-auto">
                                Search our comprehensive knowledge base or select a category to resolve your operational inquiries.
                            </p>
                            
                            {/* Institutional Search Bar */}
                            <div className="relative max-w-2xl mx-auto mt-10">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="text"
                                    placeholder="Search for articles, keywords, or topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-white rounded-xl text-gray-900 font-bold shadow-2xl outline-none focus:ring-4 focus:ring-[#0a66c2]/20 transition-all border-none"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:block">
                                    <button className="bg-[#0a66c2] text-white px-6 py-2 rounded-lg font-bold text-[13px] hover:bg-[#004182] transition-colors">
                                        Search Hub
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    
                    {/* --- CATEGORY GRID --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {categories.map((cat, index) => (
                            <motion.div 
                                key={cat.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-6 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                            >
                                <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white
                                    ${cat.color === 'blue' ? 'bg-[#0a66c2]' : ''}
                                    ${cat.color === 'green' ? 'bg-[#057642]' : ''}
                                    ${cat.color === 'red' ? 'bg-[#cc1016]' : ''}
                                    ${cat.color === 'purple' ? 'bg-[#663399]' : ''}
                                    ${cat.color === 'orange' ? 'bg-[#f57c00]' : ''}
                                    ${cat.color === 'indigo' ? 'bg-[#303f9f]' : ''}
                                `}>
                                    <cat.icon size={24} />
                                </div>
                                <h3 className="text-[17px] font-bold text-gray-900 mb-2 group-hover:text-[#0a66c2] transition-colors">{cat.name}</h3>
                                <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-4">
                                    {cat.desc}
                                </p>
                                <div className="flex items-center gap-1 text-[12px] font-bold text-[#0a66c2] uppercase tracking-wider">
                                    Explore Articles <ChevronRight size={14} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        
                        {/* --- LEFT COLUMN: POPULAR ARTICLES --- */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-8">
                                <h2 className="text-[20px] font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-[#0a66c2] rounded-full" />
                                    Popular Technical Briefings
                                </h2>
                                <div className="divide-y divide-gray-100">
                                    {popularFaqs.map((faq) => (
                                        <div key={faq.id} className="py-4 first:pt-0 last:pb-0 group cursor-pointer hover:bg-gray-50 transition-colors -mx-4 px-4 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-[#f3f6f8] flex items-center justify-center text-[#0a66c2]">
                                                        <FileText size={16} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[15px] font-bold text-gray-800 group-hover:text-[#0a66c2] transition-colors">{faq.question}</h4>
                                                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{faq.category}</span>
                                                    </div>
                                                </div>
                                                <ChevronRight size={18} className="text-gray-300 group-hover:text-[#0a66c2] transition-all" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-8 py-3 bg-[#f3f6f8] rounded-lg text-[13px] font-bold text-[#0a66c2] hover:bg-[#0a66c2]/10 transition-all uppercase tracking-widest">
                                    Browse All Information Assets
                                </button>
                            </div>

                            {/* Operational Status Banner */}
                            <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-6 border-l-4 border-green-500 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                        <Zap size={20} className="animate-pulse" />
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-bold text-gray-900">Platform Systems Operational</h4>
                                        <p className="text-[12px] text-gray-500 font-medium">All deployment hubs and booking servers are currently active.</p>
                                    </div>
                                </div>
                                <div className="hidden sm:block text-[11px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 uppercase">
                                    100% Uptime
                                </div>
                            </div>
                        </div>

                        {/* --- RIGHT COLUMN: DIRECT ASSISTANCE --- */}
                        <div className="space-y-4">
                             {/* Contact Support Card */}
                             <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-6">
                                <h3 className="text-[16px] font-bold text-gray-900 mb-6">Direct Support Channels</h3>
                                <div className="space-y-4">
                                    <SupportChannel 
                                        icon={MessageSquare} 
                                        title="Live Signal" 
                                        val="Active Now" 
                                        secondary="Avg. response: 2m" 
                                        active 
                                    />
                                    <SupportChannel 
                                        icon={Mail} 
                                        title="Email Desk" 
                                        val={settings?.company_email || "support@fleet.rentals"} 
                                        secondary="24-hour response cycle" 
                                    />
                                    <SupportChannel 
                                        icon={Phone} 
                                        title="Voice Sync" 
                                        val={settings?.company_phone || "+880 1700-000000"} 
                                        secondary="VIP/Corporate Priority" 
                                    />
                                </div>
                                <Link href={route('contact.index')} className="w-full mt-8 py-3 bg-[#0a66c2] rounded-lg text-white text-[13px] font-bold hover:bg-[#004182] transition-all flex items-center justify-center gap-2">
                                     Establish Communication
                                </Link>
                             </div>

                             {/* Quick Tools */}
                             <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-6">
                                <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Self-Service Matrix</h3>
                                <div className="space-y-1">
                                    <QuickTool icon={AlertCircle} label="Report Operational Issue" />
                                    <QuickTool icon={CreditCard} label="Payment Disputes" />
                                    <QuickTool icon={User} label="Verification Request" />
                                </div>
                             </div>

                             {/* Institutional Verification */}
                             <div className="bg-[#001c38] rounded-xl p-8 text-white relative overflow-hidden group">
                                <ShieldCheck className="absolute -bottom-6 -right-6 text-white/5 group-hover:text-blue-500/10 transition-colors" size={140} />
                                <div className="relative z-10">
                                    <div className="w-10 h-10 bg-[#0a66c2] rounded-lg flex items-center justify-center mb-4">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <h4 className="text-[15px] font-bold mb-2 tracking-tight">Enterprise Shield Protocol</h4>
                                    <p className="text-[12px] text-gray-400 font-medium mb-6">All support interactions are recorded for security auditing and protocol compliance.</p>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-[#0a66c2]">Verified Hub v4.1</div>
                                </div>
                             </div>
                        </div>

                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}

// --- SUB-COMPONENTS ---

const SupportChannel = ({ icon: Icon, title, val, secondary, active }) => (
    <div className="flex gap-4 p-3 rounded-lg border border-gray-50 hover:border-blue-100 transition-all group cursor-pointer">
        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#0a66c2] group-hover:bg-[#0a66c2]/5 transition-all">
            <Icon size={20} />
        </div>
        <div>
            <div className="flex items-center gap-2">
                <h4 className="text-[14px] font-bold text-gray-900 leading-tight">{title}</h4>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
            </div>
            <div className="text-[13px] font-bold text-[#0a66c2] mt-0.5">{val}</div>
            <div className="text-[11px] text-gray-400 font-medium mt-0.5">{secondary}</div>
        </div>
    </div>
);

const QuickTool = ({ icon: Icon, label }) => (
    <div className="flex items-center justify-between p-2.5 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer">
        <div className="flex items-center gap-3">
            <Icon size={16} className="text-gray-400 group-hover:text-[#0a66c2]" />
            <span className="text-[13px] font-bold text-gray-600 group-hover:text-gray-900">{label}</span>
        </div>
        <ChevronRight size={14} className="text-gray-300 group-hover:text-[#0a66c2] transition-transform group-hover:translate-x-1" />
    </div>
);
