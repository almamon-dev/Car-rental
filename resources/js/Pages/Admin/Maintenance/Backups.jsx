import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { Database, Download, ShieldCheck, HardDrive, Trash2, FileText, Calendar, HardDrive as SizeIcon } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Backups({ auth, backups = [] }) {
    const handleGenerate = () => {
        if (confirm("Generate a new database backup? This will save a .sql file on your server.")) {
             router.post(route('admin.maintenance.backups.generate'), {}, {
                 preserveScroll: true
             });
        }
    };

    const handleDownload = (filename) => {
        window.location.href = route('admin.maintenance.backups.download', filename);
    };

    const handleDelete = (filename) => {
        if (confirm(`Are you sure you want to delete ${filename}?`)) {
            router.delete(route('admin.maintenance.backups.delete', filename), {
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="System Backups" />

            <div className="max-w-7xl mx-auto space-y-6 font-sans antialiased text-slate-900 pb-12">
                {/* Header Section - LinkedIn Style Top Card */}
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-[#0a66c2]">
                                <Database size={24} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-tight">Data & Media Backups</h1>
                                <p className="text-[13px] text-slate-500 mt-0.5 font-medium">Securely export and manage your platform database and assets.</p>
                            </div>
                        </div>

                        <button 
                            onClick={handleGenerate}
                            className="h-10 px-6 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full font-bold text-[13px] transition-all flex items-center gap-2 shadow-sm"
                        >
                            <Database size={16} />
                            Generate New Backup
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Backup List */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="text-[15px] font-bold text-slate-900">Stored Backups</h3>
                            </div>
                            
                            {backups.length > 0 ? (
                                <div className="divide-y divide-[#f3f2ef]">
                                    {backups.map((backup) => (
                                        <div key={backup.name} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-50 text-[#0a66c2] rounded flex items-center justify-center">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[13px] font-bold text-gray-900 truncate max-w-[200px] md:max-w-md">{backup.name}</h4>
                                                    <div className="flex items-center gap-4 mt-0.5">
                                                        <span className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                                                            <Calendar size={12} />
                                                            {backup.created_at}
                                                        </span>
                                                        <span className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                                                            <SizeIcon size={12} />
                                                            {backup.size}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => handleDownload(backup.name)}
                                                    className="p-2 text-gray-400 hover:text-[#0a66c2] hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Download"
                                                >
                                                    <Download size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(backup.name)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-[#f3f6f8] rounded-full flex items-center justify-center text-gray-400 mb-4">
                                        <Database size={32} />
                                    </div>
                                    <h3 className="text-[16px] font-bold text-gray-900 mb-1">No Recent Backups</h3>
                                    <p className="text-[13px] text-gray-500 max-w-[300px]">You haven't generated any manual backups yet. They will appear here once created.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats & Tips */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white rounded-lg border border-[#EBEBEB] shadow-sm p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded">
                                    <ShieldCheck size={18} />
                                </div>
                                <h3 className="text-[14px] font-bold text-gray-900">Health Check</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-[12px]">
                                    <span className="text-gray-500 font-medium">DB Connection</span>
                                    <span className="font-bold text-emerald-600">Secure</span>
                                </div>
                                <div className="flex items-center justify-between text-[12px]">
                                    <span className="text-gray-500 font-medium">Storage Path</span>
                                    <span className="font-bold text-emerald-600">Writable</span>
                                </div>
                                <div className="flex items-center justify-between text-[12px]">
                                    <span className="text-gray-500 font-medium">Storage Used</span>
                                    <span className="font-bold text-blue-600">
                                        {backups.length} Files Stored
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f3f6f8] rounded-lg border border-[#EBEBEB] p-4 flex items-start gap-3">
                            <HardDrive size={18} className="text-gray-400 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-[12px] font-bold text-gray-900 mb-1">Backup Recommendation</h4>
                                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                                    It's a best practice to generate a backup before making major changes to your car listings or settings.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
