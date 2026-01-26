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
    Package
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

// Separate Components Import
import StatCard from "@/Components/admin/dashboard/StatCard";
import SmallInfoCard from "@/Components/admin/dashboard/SmallInfoCard";
import InfoRow from "@/Components/admin/dashboard/InfoRow";

export default function Dashboard({ auth, stats, chartData }) {
    const { t } = useLanguage();

    // Default chart data if none provided
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
            <Head title={t.nav.dashboard} />
            <div className="p-4 md:p-6 bg-[#f3f2ef] min-h-screen">
                
                {/* Dashboard Header */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Insights</h1>
                        <p className="text-slate-500 text-sm mt-1">Detailed overview of your fleet performance and revenue.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
                            <Calendar size={16} className="text-[#0a66c2]" />
                            <span className="text-sm font-semibold text-slate-700">Last 30 Days</span>
                        </div>
                        <button className="bg-[#0a66c2] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#004182] transition-all">
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Top Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <StatCard
                        title="Fleet Size"
                        value={stats.total_cars}
                        change="+5"
                        color="bg-[#0a66c2]"
                        icon={<Car />}
                    />
                    <StatCard
                        title="Active Bookings"
                        value={stats.active_bookings}
                        change={`${stats.booking_growth > 0 ? '+' : ''}${stats.booking_growth}%`}
                        color="bg-emerald-600"
                        icon={<ClipboardList />}
                    />
                    <StatCard
                        title="Registered Users"
                        value={stats.total_users}
                        change="+12"
                        color="bg-slate-700"
                        icon={<Users />}
                    />
                    <StatCard
                        title="Total Revenue"
                        value={`৳${stats.total_revenue.toLocaleString()}`}
                        change="+18%"
                        color="bg-amber-500"
                        icon={<ShoppingCart />}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Main Chart Area */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-200 shadow-sm relative group overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                    <BarChart3 size={20} className="text-[#0a66c2]" />
                                    Booking Trends
                                </h3>
                                <p className="text-slate-400 text-xs mt-1 font-medium italic">Tracking car reservations per month</p>
                            </div>
                            <div className="flex items-center gap-4 text-[11px] font-bold">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-[#0a66c2]"></span>
                                    <span className="text-slate-600">Bookings</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                                    <span className="text-slate-600">Growth</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={displayChartData}>
                                    <defs>
                                        <linearGradient id="colorBook" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0a66c2" stopOpacity={0.15}/>
                                            <stop offset="95%" stopColor="#0a66c2" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 12, fill: '#64748b', fontWeight: 500}} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 12, fill: '#64748b', fontWeight: 500}} 
                                    />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="bookings" 
                                        stroke="#0a66c2" 
                                        strokeWidth={3}
                                        fillOpacity={1} 
                                        fill="url(#colorBook)" 
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Overall Info Column */}
                    <div className="space-y-6">
                         <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
                                Operating Hubs
                                <button className="text-[11px] text-[#0a66c2] hover:underline uppercase tracking-wider">All Cities</button>
                            </h3>
                            <div className="space-y-4">
                                <InfoRow
                                    icon={<MapPin size={18} className="text-[#0a66c2]" />}
                                    label="Dhaka Central"
                                    value="124"
                                    bgColor="bg-blue-50"
                                />
                                <InfoRow
                                    icon={<MapPin size={18} className="text-emerald-500" />}
                                    label="Chittagong Port"
                                    value="86"
                                    bgColor="bg-emerald-50"
                                />
                                <InfoRow
                                    icon={<MapPin size={18} className="text-amber-500" />}
                                    label="Sylhet Hub"
                                    value="45"
                                    bgColor="bg-amber-50"
                                />
                            </div>
                        </div>

                        {/* Recent Activity Mini Widget */}
                        <div className="bg-[#0a66c2] p-6 rounded-lg shadow-lg relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-white font-bold mb-2">Upgrade to Fleet Plus</h4>
                                <p className="text-blue-100 text-xs mb-4">Get advanced analytics and real-time GPS tracking for all vehicles.</p>
                                <button className="bg-white text-[#0a66c2] px-4 py-2 rounded font-bold text-xs flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Learn More <ArrowRight size={14} />
                                </button>
                            </div>
                            <Package size={80} className="absolute -right-4 -bottom-4 text-white/10 rotate-12 transition-transform group-hover:scale-110" />
                        </div>
                    </div>
                </div>

                {/* Secondary Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <SmallInfoCard
                        title="Net Profit"
                        value="৳845,798"
                        change="+35%"
                    />
                    <SmallInfoCard
                        title="Booking Dues"
                        value="৳48,988"
                        change="+5%"
                    />
                    <SmallInfoCard
                        title="Maintenance Cost"
                        value="৳8,980"
                        change="+41%"
                        isNegative
                    />
                    <SmallInfoCard
                        title="Total Refunds"
                        value="৳7,458"
                        change="-20%"
                        isNegative
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
