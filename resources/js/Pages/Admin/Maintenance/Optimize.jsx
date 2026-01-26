import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { Zap, Trash2, RefreshCw, Layers, Map, FileCode, Terminal, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Optimize({ auth }) {
    const { flash } = usePage().props;
    const [running, setRunning] = useState(null);

    const handleRunOptimize = (type) => {
        setRunning(type);
        
        router.post(route('admin.maintenance.optimize.run'), { type }, {
            preserveScroll: true,
            onFinish: () => {
                setRunning(null);
            }
        });
    };

    const tools = [
        {
            id: 'optimize',
            title: 'Full Platform Optimization',
            description: 'Hyper-optimize configuration, routes, and compiled views for maximum production velocity.',
            icon: <Zap size={20} />,
            action: 'Run Optimize',
            color: 'text-[#0a66c2] bg-blue-50'
        },
        {
            id: 'cache_clear',
            title: 'Application Cache',
            description: 'Purge all cached application data, including custom tags and database query results.',
            icon: <Trash2 size={20} />,
            action: 'Clear Cache',
            color: 'text-slate-600 bg-slate-50'
        },
        {
            id: 'config_cache',
            title: 'Configuration Cache',
            description: 'Compile all config files into a single high-performance file for faster bootstrapping.',
            icon: <Layers size={20} />,
            action: 'Rebuild Config',
            color: 'text-slate-600 bg-slate-50'
        },
        {
            id: 'route_cache',
            title: 'Route Cache',
            description: 'Pre-compile the entire URL routing table to eliminate runtime route registration overhead.',
            icon: <Map size={20} />,
            action: 'Rebuild Routes',
            color: 'text-slate-600 bg-slate-50'
        },
        {
            id: 'view_clear',
            title: 'Compiled Views',
            description: 'Wipe all pre-rendered PHP view templates to resolve stale UI issues or structural changes.',
            icon: <FileCode size={20} />,
            action: 'Clear Views',
            color: 'text-slate-600 bg-slate-50'
        }
    ];

    return (
        <AdminLayout user={auth.user}>
            <Head title="System Optimization" />

            <div className="max-w-9xl mx-auto space-y-6 font-sans antialiased text-slate-900 pb-12">
                {/* Header Section - LinkedIn Style Top Card */}
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                    <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-[#0a66c2]">
                                <Terminal size={24} strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-tight">System Performance & Cache</h1>
                                <p className="text-[13px] text-slate-500 mt-0.5 font-medium">Platform maintenance, latency reduction and object-cache management.</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-[11px] font-bold uppercase tracking-wider">
                            <CheckCircle2 size={12} /> System Healthy
                        </div>
                    </div>
                </div>

                {/* Maintenance Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <div 
                            key={tool.id} 
                            className="bg-white rounded-lg border border-slate-200 shadow-sm transition-all hover:shadow-md flex flex-col h-full"
                        >
                            <div className="p-6 flex-1">
                                <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center mb-4 border border-current border-opacity-10`}>
                                    {tool.icon}
                                </div>
                                <h3 className="text-[16px] font-bold text-slate-900 mb-2">{tool.title}</h3>
                                <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                                    {tool.description}
                                </p>
                            </div>
                            
                            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                                <button 
                                    onClick={() => handleRunOptimize(tool.id)}
                                    disabled={running}
                                    className={`px-6 py-2 rounded-full font-bold text-[13px] transition-all flex items-center gap-2 
                                        ${running === tool.id 
                                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                            : 'bg-[#0a66c2] hover:bg-[#004182] text-white shadow-sm'}`}
                                >
                                    {running === tool.id ? (
                                        <RefreshCw size={14} className="animate-spin" />
                                    ) : (
                                        <Zap size={14} />
                                    )}
                                    {running === tool.id ? 'Running...' : tool.action}
                                </button>
                                
                                {tool.id === 'optimize' && (
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Recommended</span>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Info Card - Help Center Style */}
                    <div className="bg-[#f3f6f8] rounded-lg border border-slate-200 p-6 flex flex-col justify-center">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-md text-[#0a66c2] border border-slate-100 shadow-sm">
                                <AlertCircle size={20} />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[15px] font-bold text-slate-900">Optimization Protocol</h4>
                                <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                                    Running these commands will flush internal buffers and pre-compile core logic. This is essential after environment changes or code updates to ensure low-latency response times.
                                </p>
                                <a href="#" className="text-[13px] font-bold text-[#0a66c2] hover:underline inline-block">Learn more about system latency →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
