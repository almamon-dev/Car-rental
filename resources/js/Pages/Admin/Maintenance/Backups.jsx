/**
 * Admin - System Backups
 * 
 * Manages the creation and storage of database and file backups.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { 
    Database, 
    Download, 
    ShieldCheck, 
    HardDrive, 
    Trash2, 
    FileText, 
    Calendar, 
    Activity,
    Cpu,
    Lock,
    Zap,
    Archive
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Backups Component
 */
export default function Backups({ auth, backups = [] }) {
    
    const handleGenerate = () => {
        if (confirm("Are you sure you want to create a new system backup? This might take a moment.")) {
             router.post(route('admin.maintenance.backups.generate'), {}, {
                 preserveScroll: true
             });
        }
    };

    const handleDownload = (filename) => {
        window.location.href = route('admin.maintenance.backups.download', filename);
    };

    const handleDelete = (filename) => {
        if (confirm(`Are you sure you want to delete the backup: ${filename}?`)) {
            router.delete(route('admin.maintenance.backups.delete', filename), {
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Backups | Admin Panel" />

            <div className="max-w-full mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[#191919]">
                    <div className="px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a66c2] shadow-sm border border-slate-100">
                                <Archive size={28} strokeWidth={2} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">Data Security</span>
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    System Backups
                                </h1>
                                <p className="text-[14px] text-slate-500 font-medium italic">
                                    Manage and secure your platform's data with manual and automated backups.
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={handleGenerate}
                            className="h-11 px-8 bg-[#0a66c2] hover:bg-[#084d92] text-white rounded-xl font-bold text-[13px] transition-all flex items-center gap-2 shadow-md shadow-[#0a66c2]/10"
                        >
                            <Zap size={18} />
                            Create New Backup
                        </button>
                    </div>
                </div>

                {/* --- MAIN CONTENT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                            <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/20 flex items-center justify-between">
                                <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                    <Database size={16} className="text-[#0a66c2]" />
                                    Available Backups
                                </h3>
                                <span className="text-[12px] font-semibold text-slate-400">
                                    {backups.length} backups stored
                                </span>
                            </div>
                            
                            <AnimatePresence mode="popLayout">
                                {backups.length > 0 ? (
                                    <div className="divide-y divide-slate-50">
                                        {backups.map((backup, index) => (
                                            <motion.div 
                                                key={backup.name}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-all group"
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="w-11 h-11 bg-white text-slate-400 group-hover:text-[#0a66c2] rounded-xl flex items-center justify-center border border-slate-100 shadow-sm transition-colors">
                                                        <FileText size={22} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="text-[14px] font-bold text-slate-800 truncate max-w-[200px] md:max-w-md">{backup.name}</h4>
                                                        <div className="flex items-center gap-5">
                                                            <span className="flex items-center gap-1.5 text-[12px] text-slate-400 font-medium">
                                                                <Calendar size={12} />
                                                                {backup.created_at}
                                                            </span>
                                                            <span className="flex items-center gap-1.5 text-[12px] text-slate-400 font-medium">
                                                                <HardDrive size={12} />
                                                                {backup.size}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-3">
                                                    <button 
                                                        onClick={() => handleDownload(backup.name)}
                                                        className="h-9 w-9 flex items-center justify-center bg-white text-slate-500 hover:text-[#0a66c2] hover:border-[#0a66c2] rounded-lg border border-slate-200 transition-all"
                                                        title="Download"
                                                    >
                                                        <Download size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(backup.name)}
                                                        className="h-9 w-9 flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-lg border border-rose-100 transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-24 flex flex-col items-center justify-center text-center space-y-5">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                            <Database size={32} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-[18px] font-bold text-slate-800">No Backups Found</h3>
                                            <p className="text-[14px] text-slate-500 font-medium max-w-xs mx-auto">
                                                You haven't created any database backups yet. Click the button above to create your first backup.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6"
                        >
                            <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-[#0a66c2]" />
                                Backup Status
                            </h3>
                            <div className="space-y-5">
                                <StatusRow label="Database" value="Connected" icon={ShieldCheck} color="text-emerald-500" />
                                <StatusRow label="Storage" value="Ready" icon={Activity} color="text-emerald-500" />
                                <div className="h-px bg-slate-50" />
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                                    <span className="text-[13px] font-bold text-slate-600">Total Files</span>
                                    <span className="text-[15px] font-bold text-[#0a66c2]">{backups.length}</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl relative group overflow-hidden">
                           <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-2">
                                    <Lock size={16} className="text-[#0a66c2]" />
                                    <h4 className="text-[12px] font-bold text-slate-300">Data Tip</h4>
                                </div>
                                <p className="text-[14px] font-medium leading-relaxed text-slate-400 italic">
                                    "Regular backups ensure your business keeps running smoothly even if something unexpected happens on your server."
                                </p>
                           </div>
                           <HardDrive size={100} className="absolute -right-8 -bottom-8 text-white/[0.03] rotate-12 transition-transform duration-1000 group-hover:rotate-0" />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

const StatusRow = ({ label, value, icon: Icon, color }) => (
    <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-slate-500">{label}</span>
        <div className="flex items-center gap-2">
            <span className={`text-[14px] font-bold ${color}`}>{value}</span>
            <Icon size={14} className={color} />
        </div>
    </div>
);
