import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { 
    Mail, User, Calendar, MessageSquare, Trash2, 
    ArrowLeft, ExternalLink, Clock
} from "lucide-react";

export default function ContactShow({ auth, contact }) {
    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this message?")) {
            router.delete(route("admin.contacts.destroy", contact.id));
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Message - ${contact.name}`} />

            <div className="max-w-9xl mx-auto space-y-6 pb-20 font-sans selection:bg-[#0a66c2]/10 selection:text-[#0a66c2]">
                
                {/* Minimal Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("admin.contacts.index")}
                            className="w-9 h-9 flex items-center justify-center bg-white border border-[#EBEBEB] rounded-full hover:bg-gray-50 transition-all shadow-sm text-gray-500"
                        >
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                             <h1 className="text-[18px] font-semibold text-[#000000e6]">View Message</h1>
                             <div className="flex items-center gap-2 text-[12px] text-[#00000099]">
                                <Link href={route("admin.contacts.index")} className="hover:text-[#0a66c2] transition-colors">Contacts</Link>
                                <span>/</span>
                                <span className="text-gray-500">Details</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    
                    {/* Left: Message Card */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#f3f2ef] flex justify-between items-center">
                                <h2 className="text-[15px] font-bold text-[#000000e6]">Message Subject</h2>
                                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                                    <Clock size={12} />
                                    {new Date(contact.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-[20px] font-bold text-[#000000e6] mb-6">{contact.subject}</h3>
                                <p className="text-[15px] text-[#000000e6] leading-relaxed whitespace-pre-wrap font-medium">
                                    {contact.message}
                                </p>
                            </div>
                            <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#f3f2ef]">
                                <a 
                                    href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                                    className="inline-flex items-center justify-center px-6 py-2 bg-[#0a66c2] text-white rounded-full text-[13px] font-bold hover:bg-[#004182] transition-all"
                                >
                                    Reply via Email
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Sender Info */}
                    <div className="lg:col-span-4 space-y-5">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-5">
                            <h3 className="text-[13px] font-bold text-[#000000e6] mb-5 uppercase tracking-tight">Sender Details</h3>
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-[#f3f6f8] rounded-full flex items-center justify-center text-[#0a66c2]">
                                    <User size={24} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[16px] font-bold text-[#000000e6] truncate">{contact.name}</span>
                                    <span className="text-[12px] text-[#00000099] truncate font-medium">Customer</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-[#f3f2ef]">
                                <div>
                                    <span className="text-[11px] font-bold text-[#00000099] uppercase block mb-1">Email</span>
                                    <span className="text-[13px] font-semibold text-[#000000e6] break-all">{contact.email}</span>
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold text-[#00000099] uppercase block mb-1">Sent Date</span>
                                    <span className="text-[13px] font-semibold text-[#000000e6]">
                                        {new Date(contact.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
