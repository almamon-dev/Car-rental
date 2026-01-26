import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { 
    Car, 
    Trash2,
    ArrowUpRight,
    Heart,
    MapPin,
    Zap,
    Fuel,
    Cog
} from "lucide-react";
import { useLanguage } from "@/Contexts/LanguageContext";
import UserSidebar from "@/Components/Navigation/User/Sidebar";

export default function Index({ auth, favorites, stats }) {
    const { t } = useLanguage();
    const { post, processing } = useForm();

    const handleRemove = (carId) => {
        if (confirm('Are you sure you want to remove this car from your favorites?')) {
            post(route('user.favorites.toggle', carId));
        }
    };

    return (
        <GuestLayout>
            <Head title={t.dashboard.favorites_title} />

            <div className="bg-[#f3f2ef] min-h-screen py-6 font-sans antialiased text-[#000000e6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-12 gap-5">
                        
                        {/* Left Nav */}
                        <UserSidebar user={auth.user} stats={stats} />

                        <main className="col-span-12 lg:col-span-9 space-y-4">
                            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm flex items-center justify-between">
                                <div>
                                    <h1 className="text-[20px] font-semibold text-gray-900">{t.dashboard.favorites_title}</h1>
                                    <p className="text-[13px] text-gray-500 mt-0.5">{t.dashboard.favorites_subtitle}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[14px] font-semibold text-gray-400">{favorites.length} {t.nav.cars}</span>
                                </div>
                            </div>

                            {favorites && favorites.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {favorites.map((fav) => (
                                        <div key={fav.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm group hover:shadow-md transition-all">
                                            <div className="relative h-44 overflow-hidden bg-gray-50">
                                                <img 
                                                    src={fav.car?.image_url || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop'} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <span className="bg-white/90 backdrop-blur-sm text-[10px] font-semibold uppercase px-2 py-0.5 rounded shadow-sm text-[#0a66c2] border border-gray-100">
                                                        {fav.car?.brand?.name}
                                                    </span>
                                                </div>
                                                <button 
                                                    onClick={() => handleRemove(fav.car?.id)}
                                                    disabled={processing}
                                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-600 transition-all shadow-sm border border-gray-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            
                                            <div className="p-4 space-y-4">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-[17px] font-semibold text-gray-900 group-hover:text-[#0a66c2] transition-colors leading-tight">
                                                            {fav.car?.name}
                                                        </h3>
                                                        <p className="text-[12px] text-gray-500 mt-0.5">{fav.car?.category?.name} · {fav.car?.year}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[18px] font-bold text-[#0a66c2]">
                                                            {fav.car?.price_details?.currency || '৳'}
                                                            {Number(fav.car?.price_details?.daily_rate || 0).toLocaleString()}
                                                        </p>
                                                        <p className="text-[10px] text-gray-400 font-semibold uppercase leading-none">{t.listing.daily}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
                                                    <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                                                        <Fuel size={14} className="text-gray-300" />
                                                        <span>{fav.car?.rental_type || 'Gasoline'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                                                        <Cog size={14} className="text-gray-300" />
                                                        <span>Automatic</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 pt-1">
                                                    <Link 
                                                        href={`/car-details/${fav.car?.slug}`}
                                                        className="flex-1 h-9 bg-white border border-[#0a66c2] text-[#0a66c2] rounded-full flex items-center justify-center text-[13px] font-semibold hover:bg-blue-50 transition-all active:scale-[0.98]"
                                                    >
                                                        {t.dashboard.asset_details}
                                                    </Link>
                                                    <Link 
                                                        href={`/car-details/${fav.car?.slug}`}
                                                        className="flex-1 h-9 bg-[#0a66c2] text-white rounded-full flex items-center justify-center text-[13px] font-semibold hover:bg-[#004182] transition-all active:scale-[0.98] shadow-sm"
                                                    >
                                                        {t.dashboard.acquire_asset}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg border border-gray-200 p-16 text-center shadow-sm">
                                    <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-full mx-auto mb-6 border border-gray-100 text-gray-300">
                                        <Heart size={40} />
                                    </div>
                                    <h2 className="text-[20px] font-semibold text-gray-900">{t.dashboard.no_history}</h2>
                                    <p className="text-[14px] text-gray-500 max-w-sm mx-auto mt-2 leading-tight">
                                        {t.dashboard.no_history_desc}
                                    </p>
                                    <Link 
                                        href="/car-list"
                                        className="mt-8 inline-block bg-[#0a66c2] text-white px-8 py-2.5 rounded-full font-semibold text-[15px] hover:bg-[#004182] transition-all shadow-md"
                                    >
                                        {t.dashboard.acquire_asset}
                                    </Link>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
