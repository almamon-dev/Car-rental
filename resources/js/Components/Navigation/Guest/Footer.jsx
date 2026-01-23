import React from "react";
import {
    Activity,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Apple,
    ArrowRight,
    PlayCircle,
    Verified,
    Globe,
    ShieldCheck,
    ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * EXECUTIVE GLOBAL FOOTER (LINKEDIN LIGHT MODE SYNC)
 * 
 * Philosophy:
 * - High Density: Reduced padding and compact spacing.
 * - Style Sync: LinkedIn Light Gray (#f8f9fa / #f3f2ef) palette.
 * - Institutional: Tier-1 executive architecture for global mobility.
 */

export default function Footer() {
    return (
        <footer className="footer bg-white border-t border-gray-200 py-10 lg:py-14 px-6 relative overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* --- TOP GRID: DIRECTORY ARCHITECTURE --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-10 mb-12">
                    
                    {/* Brand Identifier */}
                    <div className="col-span-2 lg:pr-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-[#0a66c2] p-1.5 rounded-[4px] shadow-sm">
                                <Activity className="text-white" size={16} />
                            </div>
                            <span className="text-[#000000e6] font-black text-[18px] tracking-tighter uppercase">
                                Elite<span className="text-[#0a66c2]">Fleet</span>
                            </span>
                        </div>
                        <p className="text-[12px] leading-relaxed text-gray-500 font-medium mb-6">
                            The global benchmark for luxury executive mobility. 
                            Institutional Tier-1 asset management.
                        </p>
                        <div className="flex gap-2.5">
                            <SocialButton Icon={Linkedin} />
                            <SocialButton Icon={Facebook} />
                            <SocialButton Icon={Twitter} />
                        </div>
                    </div>

                    {/* Directory Columns */}
                    <FooterColumn title="General" links={["Sign Up", "Help Center", "About", "Press", "Blog"]} />
                    <FooterColumn title="Solutions" links={["Enterprise", "Fleet", "Small Business", "Agencies"]} />
                    <FooterColumn title="Directory" links={["Members", "Assets", "Verification", "Services"]} />
                    
                    {/* Control Panel / Language */}
                    <div className="col-span-1">
                         <h4 className="text-gray-900 font-bold mb-4 text-[11px] uppercase tracking-[0.15em]">Control</h4>
                         <button className="w-full flex items-center justify-between px-3 py-1.5 border border-gray-300 rounded-[4px] text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-all mb-4">
                             <div className="flex items-center gap-2">
                                <Globe size={14} className="text-[#0a66c2]" />
                                <span>Language</span>
                             </div>
                             <ChevronDown size={14} />
                         </button>
                         <button className="w-full flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-[4px] text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-all">
                             <ShieldCheck size={14} className="text-[#0a66c2]" />
                             <span>Trust Center</span>
                         </button>
                    </div>
                </div>

                {/* --- BOTTOM INTERFACE: LEGAL & DEPLOYMENT --- */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center flex-wrap justify-center gap-x-6 gap-y-2">
                         <span className="text-[#000000e6] font-black text-[14px] tracking-tighter uppercase mr-2">
                            Elite<span className="text-[#0a66c2]">Fleet</span> <span className="text-gray-400 font-normal lowercase ml-1">© 2026</span>
                         </span>
                         <LegalLink label="User Agreement" />
                         <LegalLink label="Privacy Policy" />
                         <LegalLink label="Cookie Policy" />
                         <LegalLink label="Brand Policy" />
                    </div>

                    {/* Verified Payment Grid (LinkedIn Style Grayscale) */}
                    <div className="flex items-center gap-6 opacity-30 grayscale hover:opacity-60 transition-all duration-500">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-2.5" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-2" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-3.5" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

const FooterColumn = ({ title, links }) => (
    <div>
        <h4 className="text-gray-900 font-bold mb-4 text-[11px] uppercase tracking-[0.15em]">{title}</h4>
        <ul className="space-y-2.5">
            {links.map(link => (
                <li key={link} className="text-[12px] text-gray-500 font-bold hover:text-[#0a66c2] hover:underline cursor-pointer transition-colors decoration-[#0a66c2] decoration-2 underline-offset-4">
                    {link}
                </li>
            ))}
        </ul>
    </div>
);

const LegalLink = ({ label }) => (
    <span className="text-[11px] font-bold text-gray-500 hover:text-[#0a66c2] hover:underline cursor-pointer transition-colors decoration-[#0a66c2] underline-offset-2">
        {label}
    </span>
);

const SocialButton = ({ Icon }) => (
    <div className="text-gray-500 hover:text-[#0a66c2] transition-colors cursor-pointer p-0.5">
        <Icon size={18} />
    </div>
);
