import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { Terminal, RefreshCw, Trash2, AlertCircle, Info, AlertTriangle, XCircle, ChevronLeft, ChevronRight, Search } from "lucide-react";

export default function Logs({ auth, logs = "" }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLevel, setFilterLevel] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleRefresh = () => {
        router.reload({ only: ['logs'] });
    };

    const handleClearLogs = () => {
        if (confirm("Are you sure you want to clear all logs?")) {
            router.post(route('admin.maintenance.logs.clear'), {}, {
                preserveScroll: true
            });
        }
    };

    // Parse logs into structured entries
    const parseLogEntries = (logText) => {
        if (!logText) return [];
        
        const lines = logText.split('\n').filter(line => line.trim());
        const entries = [];
        let currentEntry = null;

        lines.forEach(line => {
            // Check if line starts with a log level indicator
            const levelMatch = line.match(/^\[([\d\-\s:]+)\]\s+(local|production|testing)\.(\w+):/);
            
            if (levelMatch) {
                // Save previous entry if exists
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
                // Add to stack trace
                currentEntry.stackTrace.push(line);
            }
        });

        // Add last entry
        if (currentEntry) entries.push(currentEntry);
        
        return entries.reverse(); // Most recent first
    };

    const logEntries = parseLogEntries(logs);

    // Filter logs
    const filteredLogs = logEntries.filter(entry => {
        const matchesSearch = searchTerm === "" || 
            entry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.stackTrace.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLevel = filterLevel === "all" || entry.level.toLowerCase() === filterLevel.toLowerCase();
        
        return matchesSearch && matchesLevel;
    });

    // Pagination
    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

    const getLevelIcon = (level) => {
        switch(level.toLowerCase()) {
            case 'error': return <XCircle size={18} className="text-red-500" />;
            case 'warning': return <AlertTriangle size={18} className="text-amber-500" />;
            case 'info': return <Info size={18} className="text-blue-500" />;
            default: return <AlertCircle size={18} className="text-slate-500" />;
        }
    };

    const getLevelBadgeClass = (level) => {
        switch(level.toLowerCase()) {
            case 'error': return 'bg-red-50 text-red-700 border-red-200';
            case 'warning': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'info': return 'bg-blue-50 text-blue-700 border-blue-200';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="System Logs" />

            <div className="max-w-9xl mx-auto space-y-4 font-sans antialiased text-slate-900 pb-12">
                {/* Header Section - LinkedIn Style Top Card */}
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-[#0a66c2]">
                                <Terminal size={24} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-tight">System Activity Logs</h1>
                                <p className="text-[13px] text-slate-500 mt-0.5 font-medium">Monitor real-time server errors and system events.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handleRefresh}
                                className="h-9 px-5 bg-white border border-slate-200 text-slate-600 rounded-full font-bold text-[13px] hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
                            >
                                <RefreshCw size={15} />
                                Refresh
                            </button>
                            <button 
                                onClick={handleClearLogs}
                                className="h-9 px-5 bg-red-50 text-red-600 border border-red-100 rounded-full font-bold text-[13px] hover:bg-red-100 transition-all flex items-center gap-2 shadow-sm"
                            >
                                <Trash2 size={15} />
                                Clear Logs
                            </button>
                        </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search logs..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full h-9 pl-10 pr-4 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/20 focus:border-[#0a66c2]"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['all', 'error', 'warning', 'info'].map(level => (
                                <button
                                    key={level}
                                    onClick={() => {
                                        setFilterLevel(level);
                                        setCurrentPage(1);
                                    }}
                                    className={`h-9 px-4 rounded-full text-[12px] font-bold transition-all ${
                                        filterLevel === level
                                            ? 'bg-[#0a66c2] text-white'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Log Entries */}
                <div className="space-y-3">
                    {paginatedLogs.length > 0 ? (
                        paginatedLogs.map((entry, index) => (
                            <div key={startIndex + index} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="px-5 py-4">
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 mt-0.5">
                                            {getLevelIcon(entry.level)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getLevelBadgeClass(entry.level)}`}>
                                                    {entry.level}
                                                </span>
                                                <span className="text-[11px] text-slate-500 font-medium">
                                                    {entry.timestamp}
                                                </span>
                                                <span className="text-[11px] text-slate-400 font-medium">
                                                    {entry.environment}
                                                </span>
                                            </div>
                                            <p className="text-[13px] text-slate-900 font-medium leading-relaxed mb-2">
                                                {entry.message}
                                            </p>
                                            {entry.stackTrace.length > 0 && (
                                                <details className="mt-3">
                                                    <summary className="text-[12px] text-[#0a66c2] font-semibold cursor-pointer hover:underline">
                                                        View Stack Trace ({entry.stackTrace.length} lines)
                                                    </summary>
                                                    <div className="mt-2 p-3 bg-slate-900 rounded-lg overflow-x-auto">
                                                        <pre className="text-[11px] text-slate-300 font-mono leading-relaxed">
                                                            {entry.stackTrace.join('\n')}
                                                        </pre>
                                                    </div>
                                                </details>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Terminal size={32} className="text-slate-300" />
                            </div>
                            <h3 className="text-[16px] font-bold text-slate-900 mb-1">No Logs Found</h3>
                            <p className="text-[13px] text-slate-500">
                                {searchTerm || filterLevel !== 'all' 
                                    ? 'Try adjusting your filters or search term.'
                                    : 'Your system is running smoothly with no errors to report.'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="bg-white border border-slate-200 rounded-lg px-6 py-4 flex items-center justify-between">
                        <p className="text-[13px] text-slate-600 font-medium">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="text-[13px] font-semibold text-slate-900 px-3">
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
