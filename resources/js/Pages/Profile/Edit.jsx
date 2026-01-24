import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UserSidebar from '@/Components/Navigation/User/Sidebar';
import { useLanguage } from '@/Contexts/LanguageContext';
import { User, Shield, Key, Trash2, ChevronRight, Settings } from 'lucide-react';

export default function Edit({ auth, mustVerifyEmail, status, stats }) {
    const { t } = useLanguage();
    return (
        <GuestLayout>
            <Head title={t.nav.settings_privacy} />

            <div className="bg-[#f3f2ef] min-h-screen py-8 font-sans antialiased text-[#000000e6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-12 gap-5">
                        
                        <UserSidebar user={auth.user} stats={stats} />

                        {/* Right Content */}
                        <main className="col-span-12 lg:col-span-9 space-y-4">
                            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-[#0a66c2]">
                                    <Settings size={28} />
                                </div>
                                <div>
                                    <h1 className="text-[20px] font-semibold">{t.profile.account_preferences}</h1>
                                    <p className="text-[14px] text-gray-500">{t.profile.preferences_subtitle}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Profile Info */}
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="p-6">
                                        <UpdateProfileInformationForm
                                            mustVerifyEmail={mustVerifyEmail}
                                            status={status}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Security Info */}
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="p-6">
                                        <UpdatePasswordForm className="w-full" />
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden border-red-100">
                                    <div className="p-6">
                                        <DeleteUserForm className="w-full" />
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
