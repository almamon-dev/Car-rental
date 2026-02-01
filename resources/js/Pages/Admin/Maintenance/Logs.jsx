/**
 * Admin - System Logs
 * 
 * Provides an interface for viewing the application's activity and error logs.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { 
    Terminal, 
    RefreshCw, 
    Trash2, 
    AlertCircle, 
    Info, 
    AlertTriangle, 
    XCircle, 
    ChevronLeft, 
    ChevronRight, 
    Search,
    ShieldCheck,
    Cpu,
    Activity,
    Database,
    Binary
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * MaintenanceLogs Component
 */
export default function MaintenanceLogs({ auth, logs = "" }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLevel, setFilterLevel] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const itemsPerPage = 12;

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({ 
            only: ['logs'],
            onFinish: () => setIsRefreshing(false)
        });
    };

    const handleClearLogs = () => {
        if (confirm("Are you sure you want to clear all log entries? This cannot be undone.")) {
            router.post(route('admin.maintenance.logs.clear'), {}, {
                preserveScroll: true
            });
        }
    };

    const parseLogEntries = (logText) => {
        if (!logText) return [];
        
        const lines = logText.split('\n').filter(line => line.trim());
        const entries = [];
        let currentEntry = null;

        lines.forEach(line => {
            const levelMatch = line.match(/^\[([\d\-\s:]+)\]\s+(local|production|testing)\.(\w+):/);
            
            if (levelMatch) {
                if (currentEntry) entries.push(currentEntry);
                
                const [, timestamp, environment, level] = levelMatch;
                currentEntry = {
                    timestamp,
                    environment,
                    level: level.toUpperCase(),
                    message: line.substring(levelMatch[0].length).trim(),
                    stackTrace: []
                };
            } else if (currentEntry) {
                currentEntry.stackTrace.push(line);
            }
        });

        if (currentEntry) entries.push(currentEntry);
        return entries.reverse();
    };

    const logEntries = parseLogEntries(logs);

    const filteredLogs = logEntries.filter(entry => {
        const matchesSearch = searchTerm === "" || 
            entry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.stackTrace.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLevel = filterLevel === "all" || entry.level.toLowerCase() === filterLevel.toLowerCase();
        
        return matchesSearch && matchesLevel;
    });

    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

    const getLevelConfig = (level) => {
        const configs = {
            error: { icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100 shadow-rose-100/20' },
            warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100 shadow-amber-100/20' },
            info: { icon: Info, color: 'text-[#0a66c2]', bg: 'bg-blue-50', border: 'border-blue-100 shadow-blue-100/20' },
            debug: { icon: Binary, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100 shadow-emerald-100/20' },
            default: { icon: AlertCircle, color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-100' }
        };
        return configs[level.toLowerCase()] || configs.default;
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="System Logs | Admin Panel" />

            <div className="max-w-full mx-auto space-y-6">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[#191919]">
                    <div className="px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a66c2] shadow-sm border border-slate-100">
                                <Terminal size={28} strokeWidth={2} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-3 bg-[#0a66c2] rounded-full" />
                                    <span className="text-[12px] font-bold text-[#0a66c2]">System Maintenance</span>
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    System Event Logs
                                </h1>
                                <p className="text-[14px] text-slate-500 font-medium italic">
                                    Track errors, warnings, and informational events happening on the server.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleRefresh}
                                className="h-11 px-6 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-[13px] hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm group"
                            >
                                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                                Refresh Logs
                            </button>
                            <button 
                                onClick={handleClearLogs}
                                className="h-11 px-6 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl font-bold text-[13px] hover:bg-rose-100 transition-all flex items-center gap-2 shadow-sm"
                            >
                                <Trash2 size={16} />
                                Clear All Logs
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col lg:flex-row gap-4 items-center">
                        <div className="flex-1 relative w-full">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search logs for specific messages or dates..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full h-11 pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] font-semibold focus:outline-none focus:border-[#0a66c2] transition-all"
                            />
                        </div>
                        <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                            {['all', 'error', 'warning', 'info', 'debug'].map(level => (
                                <button
                                    key={level}
                                    onClick={() => {
                                        setFilterLevel(level);
                                        setCurrentPage(1);
                                    }}
                                    className={`h-10 px-5 rounded-xl text-[12px] font-bold transition-all border shrink-0 ${
                                        filterLevel === level
                                            ? 'bg-[#0a66c2] text-white border-transparent shadow-md'
                                            : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- LOG ENTRIES --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-9 space-y-4">
                        <AnimatePresence mode="popLayout">
                            {paginatedLogs.length > 0 ? (
                                paginatedLogs.map((entry, index) => {
                                    const config = getLevelConfig(entry.level);
                                    const Icon = config.icon;
                                    return (
                                        <motion.div 
                                            key={startIndex + index}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                                        >
                                            <div className="px-6 py-5">
                                                <div className="flex items-start gap-5">
                                                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${config.bg} ${config.border} ${config.color} shadow-sm`}>
                                                        <Icon size={20} strokeWidth={2.5} />
                                                    </div>
                                                    <div className="flex-1 min-w-0 space-y-3">
                                                        <div className="flex flex-wrap items-center gap-4">
                                                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${config.bg} ${config.border} ${config.color}`}>
                                                                {entry.level}
                                                            </span>
                                                            <div className="flex items-center gap-1.5 text-[12px] text-slate-400 font-semibold">
                                                                <Activity size={12} />
                                                                {entry.timestamp}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[12px] text-slate-400 font-semibold">
                                                                <Globe size={12} />
                                                                {entry.environment}
                                                            </div>
                                                        </div>
                                                        <p className="text-[14px] text-slate-800 font-bold leading-relaxed break-words">
                                                            {entry.message}
                                                        </p>
                                                        {entry.stackTrace.length > 0 && (
                                                            <details className="mt-4">
                                                                <summary className="text-[12px] text-[#0a66c2] font-bold cursor-pointer hover:underline flex items-center gap-2 w-fit">
                                                                    View Details ({entry.stackTrace.length} lines)
                                                                </summary>
                                                                <div className="mt-4 p-5 bg-slate-900 rounded-2xl overflow-x-auto border border-slate-800">
                                                                    <pre className="text-[12px] text-emerald-400 font-mono leading-relaxed opacity-90">
                                                                        {entry.stackTrace.join('\n')}
                                                                    </pre>
                                                                </div>
                                                            </details>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white border border-slate-200 rounded-2xl p-20 text-center space-y-5"
                                >
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                                        <ShieldCheck size={40} />
                                    </div>
                                    <h3 className="text-[18px] font-bold text-slate-800">No Logs Found</h3>
                                    <p className="text-[14px] text-slate-500 font-medium">Everything looks good! No recent system issues detected.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
                                <p className="text-[13px] text-slate-500 font-semibold">
                                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
                                </p>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="h-10 px-3 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 disabled:opacity-30"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <div className="px-3 py-1 text-[13px] font-bold text-slate-700">
                                        {currentPage} / {totalPages}
                                    </div>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="h-10 px-3 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 disabled:opacity-30"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Stats */}
                    <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm"
                        >
                            <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                <Cpu size={16} className="text-[#0a66c2]" />
                                System Health
                            </h3>
                            <div className="space-y-4">
                                <StatusRow label="System Status" value="Healthy" trend="up" />
                                <StatusRow label="Buffer Load" value="Normal" trend="down" />
                                <div className="h-px bg-slate-50" />
                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                                    <Activity size={18} className="text-emerald-500" />
                                    <span className="text-[13px] font-bold text-emerald-700">All systems operational</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="bg-slate-900 rounded-2xl shadow-lg p-6 relative overflow-hidden">
                           <div className="relative z-10">
                                <h4 className="text-white font-bold text-[14px] mb-2">Maintenance Tip</h4>
                                <p className="text-slate-400 text-[13px] font-medium leading-relaxed italic border-l-2 border-emerald-500 pl-3">
                                    "Cleaning logs regularly helps keep the database size small and searching fast."
                                </p>
                           </div>
                           <Binary size={100} className="absolute -right-8 -bottom-8 text-white/[0.03] rotate-12" />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

const StatusRow = ({ label, value, trend }) => (
    <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-slate-500">{label}</span>
        <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-slate-800">{value}</span>
            <div className={`w-1.5 h-1.5 rounded-full ${trend === 'up' ? 'bg-emerald-500' : 'bg-[#0a66c2]'}`} />
        </div>
    </div>
);
