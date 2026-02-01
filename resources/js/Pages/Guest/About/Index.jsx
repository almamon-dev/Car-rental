/**
 * About Us Page
 * 
 * Provides an institutional overview of the company, mission, milestones,
 * leadership, and corporate information.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { 
    Users, Target, Award, Globe, 
    CheckCircle2, TrendingUp, Activity,
    ShieldCheck, Mail, Phone, ExternalLink,
    ChevronRight, MapPin, Building2, Shield,
    FileText, Zap, Globe2, Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * About Component
 * 
 * @returns {JSX.Element}
 */
export default function About() {
    const { settings } = usePage().props;
    const siteName = settings?.company_name || settings?.site_name || "EliteFleet";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    return (
        <UserLayout>
            <Head title={`About Us | ${siteName} Global`} />
            
            <div className="bg-white min-h-screen mt-20 pb-16 selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    
                    {/* --- PROFESSIONAL LINKEDIN HEADER (REFINED) --- */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden mb-4"
                    >
                        <div className="h-40 bg-gradient-to-r from-[#00315a] via-[#0a66c2] to-[#004182] relative">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <div className="px-8 pb-8">
                            <div className="relative flex flex-col md:flex-row items-end -mt-16 gap-6 mb-6">
                                <div className="p-1 bg-white rounded-xl shadow-xl border border-gray-100">
                                    <div className="w-32 h-32 bg-[#0a66c2] rounded-lg flex items-center justify-center text-white shadow-inner">
                                        <Activity size={64} strokeWidth={1} />
                                    </div>
                                </div>
                                <div className="flex-1 pb-1">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">{siteName} Global</h1>
                                        <div className="bg-blue-50 text-[#0a66c2] p-1 rounded-full border border-blue-100">
                                            <ShieldCheck size={18} />
                                        </div>
                                    </div>
                                    <p className="text-[15px] text-gray-500 font-medium">Next-Gen Mobility & Strategic Asset Management Cluster</p>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[13px] text-gray-400 font-bold">
                                         <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#0a66c2]" /> {settings?.company_address || "Dhaka Hub"}</span>
                                         <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                         <span className="text-[#0a66c2]">12,403 Institutional Followers</span>
                                         <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                         <span className="flex items-center gap-1.5 text-green-600"><CheckCircle2 size={14} /> Operational Protocol v2.5.1 Active</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 mb-2 shrink-0">
                                    <button className="bg-[#0a66c2] text-white px-6 py-1.5 rounded-full font-bold text-[14px] hover:bg-[#004182] transition-all shadow-md active:scale-95">Follow</button>
                                    <button className="border-2 border-[#0a66c2] text-[#0a66c2] px-6 py-1.5 rounded-full font-bold text-[14px] hover:bg-blue-50 transition-all active:scale-95">Message</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        
                        {/* --- PRIMARY CLUSTER (LEFT) --- */}
                        <div className="lg:col-span-8">
                            <motion.div 
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-4"
                            >
                                {/* Professional Overview */}
                                <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-8">
                                    <h2 className="text-[18px] font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <div className="w-1 h-5 bg-[#0a66c2] rounded-full" />
                                        Executive Briefing
                                    </h2>
                                    <div className="text-[14px] text-gray-600 space-y-5 leading-relaxed font-medium">
                                        <p>
                                            {siteName} represents the evolution of <span className="text-gray-950 font-bold">decentralized mobility networks</span>. Since our strategic deployment in 2024, we have bridge the gap between elementary transportation and enterprise-grade logistics orchestration.
                                        </p>
                                        <p>
                                            Our framework is engineered on zero-friction asset acquisition, ensured by institutional-grade audits and AI-driven telemetry. We don't just provide vehicles; we deploy strategic mobility solutions for the modern operative.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-50">
                                        <QuickMetric label="Active Fleet" value="250+" />
                                        <QuickMetric label="Global Hubs" value="12" />
                                        <QuickMetric label="Uptime" value="99.9%" />
                                        <QuickMetric label="Employees" value="500+" />
                                    </div>
                                </motion.div>

                                {/* Featured Expertise */}
                                <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-8">
                                    <h2 className="text-[18px] font-bold text-gray-900 mb-6">Core Operational Vectors</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <VectorItem icon={Zap} title="Precision Deployment" desc="Synchronized asset allocation with record-breaking acquisition cycles." />
                                        <VectorItem icon={Shield} title="Encrypted Logistics" desc="High-fidelity member data protection and secure transit protocols." />
                                        <VectorItem icon={Globe2} title="Cross-Hub Matrix" desc="Seamless transition between international deployment sectors." />
                                        <VectorItem icon={Target} title="Strategic Sourcing" desc="Tier-1 fleet selection based on performance telemetry benchmarks." />
                                    </div>
                                </motion.div>

                                {/* Career Roadmap */}
                                <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-8">
                                    <h2 className="text-[18px] font-bold text-gray-900 mb-8 flex items-center justify-between">
                                        Strategic Roadmap
                                        <TrendingUp size={18} className="text-[#0a66c2]" />
                                    </h2>
                                    <div className="space-y-8 relative border-l-2 border-slate-50 ml-4 pl-10">
                                        <MilestoneBlock year="2024" phase="ALPHA" title="Genesis Matrix" desc="Core cluster establishment and initial hub activation." active />
                                        <MilestoneBlock year="2025" phase="BETA" title="Tier-1 Uplink" desc="Fleet expansion with electric performance assets." active />
                                        <MilestoneBlock year="2026" phase="GAMMA" title="Autonomous Sync" desc="Deployment of AI-driven predictive maintenance." />
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* --- SIDEBAR CLUSTER (RIGHT) --- */}
                        <div className="lg:col-span-4 space-y-4">
                            
                            {/* Leadership Summary */}
                            <motion.div 
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-6"
                            >
                                <h3 className="text-[15px] font-bold text-gray-900 mb-5 flex items-center justify-between">
                                    Excecutive Hub
                                    <Users size={16} className="text-gray-400" />
                                </h3>
                                <div className="space-y-5">
                                    <SidebarLeader name="Alexander Vance" role="Chief Logistics Officer" img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" />
                                    <SidebarLeader name="Sarah Jenkins" role="Head of Global Ops" img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" />
                                </div>
                                <button className="w-full mt-6 py-2 bg-[#f3f6f8] rounded text-[13px] font-bold text-[#0a66c2] hover:bg-[#0a66c2]/10 transition-all">Review Full Directory</button>
                            </motion.div>

                            {/* Institutional Intel */}
                            <div className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-6">
                                <h3 className="text-[15px] font-bold text-gray-900 mb-5">Institutional Details</h3>
                                <div className="space-y-4">
                                     <IntelItem label="Industry" value="Mobility & Logistics" />
                                     <IntelItem label="Company Size" value="500-1,000 Agents" />
                                     <IntelItem label="Type" value="Private Enterprise" />
                                     <IntelItem label="Founded" value="2024" />
                                     <IntelItem label="Phone" value={settings?.company_phone || "N/A"} />
                                </div>
                            </div>

                            {/* Verification Badge */}
                            <div className="bg-[#001c38] rounded-lg p-6 text-white text-center relative overflow-hidden group">
                                <ShieldCheck className="absolute -bottom-6 -right-6 text-white/5 group-hover:text-blue-500/10 transition-colors" size={120} />
                                <Shield size={28} className="mx-auto mb-3 text-[#0a66c2]" />
                                <h4 className="text-[14px] font-bold mb-1">ISO Certified Protocol</h4>
                                <p className="text-[11px] opacity-70 mb-4">Verified institutional mobility matrix.</p>
                                <button className="w-full bg-[#0a66c2] py-2 rounded font-bold text-[12px] hover:bg-[#004182] transition-colors">Establish Sync</button>
                            </div>

                            {/* Page Links */}
                            <div className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-6">
                                <h3 className="text-[14px] font-bold text-gray-400 uppercase tracking-widest mb-4">Official Resources</h3>
                                <div className="space-y-3">
                                    <ResourceLine label="Operational Matrix" icon={FileText} />
                                    <ResourceLine label="Compliance Report" icon={Briefcase} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Minimal Footer */}
                    <div className="mt-12 text-center text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                        © 2026 {siteName} Logistics Core Hub • All Protocols Active
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

// --- MICRO-COMPONENTS (REFINED ATOMIC DESIGN) ---

const QuickMetric = ({ label, value }) => (
    <div className="text-center group">
        <div className="text-[18px] font-black text-gray-900 group-hover:text-[#0a66c2] transition-colors">{value}</div>
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mt-0.5">{label}</div>
    </div>
);

const VectorItem = ({ icon: Icon, title, desc }) => (
    <div className="flex gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-blue-100 group transition-all">
        <div className="w-10 h-10 bg-white rounded shadow-sm border border-gray-100 flex items-center justify-center text-[#0a66c2] shrink-0 group-hover:scale-110 transition-transform">
            <Icon size={20} />
        </div>
        <div>
            <h4 className="text-[15px] font-bold text-gray-900 mb-1 leading-tight">{title}</h4>
            <p className="text-[12px] text-gray-400 font-medium leading-relaxed">{desc}</p>
        </div>
    </div>
);

const MilestoneBlock = ({ year, phase, title, desc, active }) => (
    <div className="relative group">
        <div className={`absolute -left-[51px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm z-10 
            ${active ? 'bg-[#0a66c2]' : 'bg-gray-200'}`} />
        <div className="text-[11px] font-black text-[#0a66c2] tracking-[0.2em] mb-1">{year} • {phase}</div>
        <h4 className="text-[15px] font-bold text-gray-900 mb-1 leading-tight group-hover:text-[#0a66c2] transition-colors">{title}</h4>
        <p className="text-[13px] text-gray-500 font-medium leading-relaxed italic">"{desc}"</p>
    </div>
);

const SidebarLeader = ({ name, role, img }) => (
    <div className="flex items-center gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded -mx-2 transition-all">
        <img src={img} alt={name} className="w-10 h-10 rounded shadow-sm border border-white grayscale group-hover:grayscale-0 transition-all duration-300" />
        <div className="overflow-hidden">
            <div className="text-[14px] font-bold text-gray-900 leading-tight group-hover:text-[#0a66c2] truncate transition-colors">{name}</div>
            <div className="text-[11px] text-gray-400 font-bold truncate">{role}</div>
        </div>
    </div>
);

const IntelItem = ({ label, value }) => (
    <div className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-2 last:border-0 last:pb-0">
        <span className="text-gray-400 font-bold">{label}</span>
        <span className="text-gray-700 font-bold">{value}</span>
    </div>
);

const ResourceLine = ({ label, icon: Icon }) => (
    <div className="flex items-center justify-between text-[13px] text-gray-500 hover:text-[#0a66c2] cursor-pointer group transition-colors">
        <div className="flex items-center gap-2">
            <Icon size={14} className="text-gray-300 group-hover:text-[#0a66c2]" />
            <span className="font-bold">{label}</span>
        </div>
        <ChevronRight size={14} className="text-gray-200 group-hover:text-[#0a66c2]" />
    </div>
);
