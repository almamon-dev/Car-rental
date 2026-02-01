/**
 * Admin - Dashboard Overview
 * 
 * Provides a clear and user-friendly summary of the rental platform's 
 * performance, including bookings, revenue, and fleet status.
 * 
 * @author AL Mamon
 * @version 1.2.0
 */

import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import {
    Users,
    ShoppingCart,
    Car,
    ClipboardList,
    TrendingUp,
    Calendar,
    ArrowRight,
    MapPin,
    BarChart3,
    Package,
    Activity,
    ShieldCheck,
    Globe
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useLanguage } from "@/Contexts/LanguageContext";
import { motion } from "framer-motion";

// Components
import StatCard from "@/Components/admin/dashboard/StatCard";
import SmallInfoCard from "@/Components/admin/dashboard/SmallInfoCard";
import InfoRow from "@/Components/admin/dashboard/InfoRow";

/**
 * Dashboard Component
 * 
 * @param {Object} props
 * @param {Object} props.auth - Authenticated session data
 * @param {Object} props.stats - Operational data points
 * @param {Array} props.chartData - Performance data for the chart
 * @returns {JSX.Element}
 */
export default function Dashboard({ auth, stats, chartData }) {
    const { t } = useLanguage();

    // Default data if none provided
    const displayChartData = chartData && chartData.length > 0 ? chartData : [
        { name: 'Jan', bookings: 45, revenue: 2400 },
        { name: 'Feb', bookings: 52, revenue: 1398 },
        { name: 'Mar', bookings: 48, revenue: 9800 },
        { name: 'Apr', bookings: 61, revenue: 3908 },
        { name: 'May', bookings: 55, revenue: 4800 },
        { name: 'Jun', bookings: 67, revenue: 3800 },
        { name: 'Jul', bookings: 72, revenue: 4300 },
    ];

    return (
        <AdminLayout user={auth.user}>
            <Head title={`${t.nav.dashboard} | Admin Panel`} />
            
            <div className="space-y-8 animate-in fade-in duration-500">
                
                {/* --- HEADER: WELCOME SECTION --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-4 bg-[#0a66c2] rounded-full" />
                            <span className="text-[13px] font-bold text-[#0a66c2]">Analytics Overview</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome Back, {auth.user.name.split(' ')[0]}!</h1>
                        <p className="text-slate-500 text-[14px] font-medium">Here is what's happening with your car rental business today.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="bg-white border border-slate-200 rounded-xl px-5 py-2.5 flex items-center gap-3 shadow-sm">
                            <Calendar size={16} className="text-[#0a66c2]" />
                            <span className="text-[13px] font-semibold text-slate-600">Last 30 Days</span>
                        </div>
                        <button className="bg-[#0a66c2] text-white px-6 py-2.5 rounded-xl text-[13px] font-bold shadow-md shadow-[#0a66c2]/10 hover:bg-[#084d92] transition-all">
                            Export Report
                        </button>
                    </div>
                </div>

                {/* --- STAT CARDS: QUICK LOOK --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Cars"
                        value={stats.total_cars}
                        change="+5 new this month"
                        color="bg-[#0a66c2]"
                        icon={<Car size={24} />}
                    />
                    <StatCard
                        title="Active Bookings"
                        value={stats.active_bookings}
                        change={`${stats.booking_growth > 0 ? '+' : ''}${stats.booking_growth}% from last month`}
                        color="bg-emerald-500"
                        icon={<ClipboardList size={24} />}
                    />
                    <StatCard
                        title="Registered Users"
                        value={stats.total_users}
                        change="+12 since yesterday"
                        color="bg-slate-700"
                        icon={<Users size={24} />}
                    />
                    <StatCard
                        title="Total Revenue"
                        value={`৳${stats.total_revenue.toLocaleString()}`}
                        change="+18% vs last period"
                        color="bg-indigo-500"
                        icon={<Activity size={24} />}
                    />
                </div>

                {/* --- MAIN ANALYTICS SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Booking Trend Chart */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                    <BarChart3 size={20} className="text-[#0a66c2]" />
                                    Booking Trends
                                </h3>
                                <p className="text-slate-400 text-[12px] mt-1 font-medium">Monthly reservation volume and growth</p>
                            </div>
                            <div className="flex items-center gap-4 text-[12px] font-semibold">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#0a66c2]" />
                                    <span className="text-slate-500">Bookings</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={displayChartData}>
                                    <defs>
                                        <linearGradient id="colorBook" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0a66c2" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#0a66c2" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}} 
                                    />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '10px' }}
                                        itemStyle={{ fontSize: '13px', fontWeight: '700', color: '#0a66c2' }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="bookings" 
                                        stroke="#0a66c2" 
                                        strokeWidth={3}
                                        fillOpacity={1} 
                                        fill="url(#colorBook)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Regional Performance & Promo Card */}
                    <div className="space-y-8">
                         <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
                        >
                            <h3 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
                                Top Locations
                                <button className="text-[12px] font-bold text-[#0a66c2] hover:underline">View All</button>
                            </h3>
                            <div className="space-y-4">
                                <InfoRow
                                    icon={<MapPin size={18} className="text-[#0a66c2]" />}
                                    label="Dhaka Central"
                                    value="124 Units"
                                    bgColor="bg-blue-50"
                                />
                                <InfoRow
                                    icon={<MapPin size={18} className="text-emerald-500" />}
                                    label="Chittagong Port"
                                    value="86 Units"
                                    bgColor="bg-emerald-50"
                                />
                                <InfoRow
                                    icon={<MapPin size={18} className="text-indigo-500" />}
                                    label="Sylhet Gateway"
                                    value="45 Units"
                                    bgColor="bg-indigo-50"
                                />
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-900 p-8 rounded-2xl shadow-xl relative overflow-hidden group"
                        >
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <ShieldCheck size={18} className="text-emerald-400" />
                                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Premium Features</span>
                                </div>
                                <h4 className="text-white font-bold text-xl mb-2">Fleet Analytics Pro</h4>
                                <p className="text-slate-400 text-[14px] mb-6 font-medium leading-relaxed">Upgrade to unlock predictive analytics and real-time GPS tracking for your fleet.</p>
                                <button className="w-full bg-[#0a66c2] text-white px-5 py-3 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 group-hover:gap-3 transition-all shadow-lg shadow-[#0a66c2]/30">
                                    Get Pro Access <ArrowRight size={16} />
                                </button>
                            </div>
                            <Globe size={180} className="absolute -right-10 -bottom-10 text-white/[0.04] rotate-12 transition-transform duration-1000 group-hover:scale-110" />
                        </motion.div>
                    </div>
                </div>

                {/* --- ADDITIONAL FINANCIAL INSIGHTS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
                    <SmallInfoCard
                        title="Net Operating Income"
                        value="৳845,798"
                        change="+35% this period"
                    />
                    <SmallInfoCard
                        title="Outstanding Payments"
                        value="৳48,988"
                        change="+5% from last month"
                    />
                    <SmallInfoCard
                        title="Maintenance Costs"
                        value="৳8,980"
                        change="+4% this month"
                        isNegative
                    />
                    <SmallInfoCard
                        title="User Trust Score"
                        value="98.2%"
                        change="+2.4% vs last period"
                        icon={<ShieldCheck size={16} />}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
