import UserLayout from '@/Layouts/UserLayout';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UserSidebar from '@/Components/Navigation/User/Sidebar';
import { useLanguage } from '@/Contexts/LanguageContext';
import { User, Shield, Key, Trash2, ChevronRight, Settings, UserCircle, Lock, ShieldAlert, BadgeCheck } from 'lucide-react';
import { useState } from 'react';

export default function Edit({ auth, mustVerifyEmail, status, stats }) {
    const { t } = useLanguage();
    const isAdmin = auth.user.is_admin;
    const [activeTab, setActiveTab] = useState('profile'); // profile, security, danger

    const tabs = [
        { id: 'profile', label: 'Account Information', sub: 'Name, email, and avatar' },
        { id: 'security', label: 'Security & Access', sub: 'Password and authentication' },
        { id: 'danger', label: 'Data & Privacy', sub: 'Account deletion and visibility' },
    ];

    const content = (
        <div className={`${isAdmin ? 'py-0 md:py-6' : 'bg-[#f3f2ef] min-h-screen py-0 md:py-6'} font-sans antialiased text-slate-900`}>
            <div className={`${isAdmin ? 'max-w-9xl mx-auto' : 'max-w-7xl mx-auto px-4 mt-8 sm:px-6'}`}>
                <div className="grid grid-cols-12 gap-6 md:gap-8">
                    
                    {!isAdmin && <UserSidebar user={auth.user} stats={stats} />}
 
                    {/* Main Content Area - Auto Height & Flexible Width */}
                    <main className={`${isAdmin ? 'col-span-12' : 'col-span-12 lg:col-span-9'} bg-white h-auto flex flex-col`}>
                        
                        {/* Top Section: Title & Tags */}
                        <div className="bg-white text-left mt-2">
                            <div className="px-6 md:px-10 pt-0 pb-1">
                                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                                    {t.nav.settings_privacy}
                                </h1>
                                <p className="text-[12px] text-slate-500 font-medium mt-0">Manage your account settings and privacy preferences</p>
                            </div>
                            
                            {/* Horizontal Tabs - LinkedIn Style */}
                            <div className="px-6 md:px-10 border-b border-slate-100 overflow-x-auto custom-scrollbar">
                                <nav className="flex items-center gap-6 min-w-max">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`relative py-2 transition-all outline-none ${
                                                activeTab === tab.id 
                                                ? 'text-[#0a66c2]' 
                                                : 'text-slate-500 hover:text-slate-800'
                                            }`}
                                        >
                                            <span className={`text-[13px] font-bold whitespace-nowrap transition-colors`}>{tab.label}</span>
                                            
                                            {/* Active Indicator Bar - Sharp LinkedIn Style */}
                                            {activeTab === tab.id && (
                                                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0a66c2] rounded-t-[2px]" />
                                            )}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Content Area - Balanced Spacing */}
                        <div className="flex-1 px-6 md:px-10 py-5 bg-white">
                            <div className="w-full">
                                {activeTab === 'profile' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <UpdateProfileInformationForm
                                            mustVerifyEmail={mustVerifyEmail}
                                            status={status}
                                            className="w-full"
                                        />
                                    </div>
                                )}

                                {activeTab === 'security' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <UpdatePasswordForm className="w-full" />
                                    </div>
                                )}

                                {activeTab === 'danger' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <DeleteUserForm className="w-full" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );

    if (isAdmin) {
        return (
            <AdminLayout user={auth.user}>
                <Head title={t.nav.settings_privacy} />
                {content}
            </AdminLayout>
        );
    }

    return (
        <UserLayout>
            <Head title={t.nav.settings_privacy} />
            {content}
        </UserLayout>
    );
}
