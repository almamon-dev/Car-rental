/**
 * Admin - Message Details
 * 
 * View for a specific customer contact message/inquiry.
 * Covers sender details, message content, and response actions.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { 
    Mail, 
    User, 
    Calendar, 
    MessageSquare, 
    Trash2, 
    ArrowLeft, 
    ExternalLink, 
    Clock,
    ShieldCheck,
    Activity,
    Globe,
    Inbox,
    Share2,
    ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * ContactShow Component
 */
export default function ContactShow({ auth, contact }) {
    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this message?")) {
            router.delete(route("admin.contacts.destroy", contact.id));
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Message from | ${contact.name}`} />

            <div className="max-w-full mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between bg-white px-8 py-5 rounded-xl border border-slate-200 shadow-sm text-[#191919]">
                    <div className="flex items-center gap-5">
                        <Link
                            href={route("admin.contacts.index")}
                            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-all text-slate-400 hover:text-[#0a66c2]"
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </Link>
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                <span className="text-[12px] font-bold text-[#0a66c2]">Customer Message</span>
                            </div>
                            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Inquiry Details</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleDelete}
                            className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 rounded-xl transition-all"
                            title="Delete Message"
                        >
                            <Trash2 size={18} />
                        </button>
                        <button className="h-10 px-5 bg-slate-50 text-slate-600 rounded-xl font-bold text-[12px] transition-all flex items-center gap-2 border border-slate-100 hover:bg-slate-100 tracking-wide active:scale-95">
                            <Share2 size={16} />
                            Forward Message
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    <div className="lg:col-span-8 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                        >
                            <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <MessageSquare size={18} className="text-[#0a66c2]" />
                                    <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Message Content</h2>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold bg-white px-3 py-1 rounded-full border border-slate-100 uppercase tracking-wide">
                                    <Clock size={12} />
                                    {new Date(contact.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Message Subject</span>
                                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">{contact.subject}</h3>
                                </div>
                                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden group">
                                    <p className="text-[16px] text-slate-600 leading-relaxed whitespace-pre-wrap font-semibold relative z-10 italic">
                                        "{contact.message}"
                                    </p>
                                    <Inbox size={100} className="absolute -right-8 -bottom-8 text-slate-200/40 rotate-12 transition-transform duration-700" />
                                </div>
                            </div>
                            <div className="px-8 py-5 bg-white border-t border-slate-100 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-emerald-600 font-bold text-[11px] uppercase tracking-wider">
                                    <ShieldCheck size={14} strokeWidth={2.5} />
                                    Security Verified
                                </div>
                                <a 
                                    href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                                    className="h-11 px-8 bg-[#0a66c2] hover:bg-[#084d92] text-white rounded-xl font-bold text-[12px] transition-all flex items-center gap-2.5 shadow-md shadow-[#0a66c2]/10 tracking-wide active:scale-95"
                                >
                                    Reply via Email
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6"
                        >
                            <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <User size={18} className="text-[#0a66c2]" />
                                Sender Information
                            </h3>
                            
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#0a66c2] shadow-sm border border-slate-100">
                                    <User size={28} strokeWidth={2} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[18px] font-bold text-slate-800 tracking-tight truncate leading-tight">{contact.name}</span>
                                    <span className="text-[11px] text-[#0a66c2] font-semibold uppercase tracking-wider">Customer</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">Email Address</span>
                                    <span className="text-[13px] font-bold text-slate-700 break-all bg-slate-50 p-3 rounded-xl border border-slate-100 block">{contact.email}</span>
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">Sent On</span>
                                    <div className="flex items-center gap-2 text-[14px] font-bold text-slate-700 px-1">
                                        <Calendar size={16} className="text-slate-300" />
                                        {new Date(contact.created_at).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="bg-slate-900 text-white rounded-xl p-8 shadow-xl relative group overflow-hidden">
                             <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 transition-transform group-hover:scale-110 duration-1000">
                                <Globe size={160} />
                             </div>
                             <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-2">
                                    <Activity size={16} className="text-[#0a66c2]" />
                                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Response Status</h4>
                                </div>
                                <p className="text-[14px] font-semibold leading-relaxed text-slate-300 italic">
                                    "Customer messages are prioritized for better service and support engagement."
                                </p>
                             </div>
                        </div>

                        <div className="text-center pt-2">
                             <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest border-t border-slate-100 pt-4 block">Admin Panel © 2026</span>
                         </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
