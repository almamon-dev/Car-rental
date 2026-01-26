import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { useLanguage } from '@/Contexts/LanguageContext';
import { KeyRound, ShieldCheck, Lock, Loader2 } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const { t } = useLanguage();
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">
                    {t.profile.security_protocol}
                </h2>
                <p className="mt-1 text-[13px] text-slate-500 font-medium">
                    {t.profile.security_subtitle}
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div className="space-y-1.5">
                    <InputLabel
                        htmlFor="current_password"
                        value={t.profile.current_password}
                        className="text-[14px] font-bold text-gray-700 ml-0.5"
                    />
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-[#0a66c2] focus:ring-[#0a66c2] py-2 px-3 text-[14px] font-medium placeholder:text-gray-400"
                        autoComplete="current-password"
                        placeholder="Current Password"
                    />
                    <InputError message={errors.current_password} className="mt-1" />
                </div>

                <div className="space-y-6">
                    <div className="space-y-1.5">
                        <InputLabel htmlFor="password" value={t.profile.new_password} className="text-[14px] font-bold text-gray-700 ml-0.5" />
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-[#0a66c2] focus:ring-[#0a66c2] py-2 px-3 text-[14px] font-medium placeholder:text-gray-400"
                            autoComplete="new-password"
                            placeholder="New Password"
                        />
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    <div className="space-y-1.5">
                        <InputLabel htmlFor="password_confirmation" value={t.profile.confirm_password} className="text-[14px] font-bold text-gray-700 ml-0.5" />
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-[#0a66c2] focus:ring-[#0a66c2] py-2 px-3 text-[14px] font-medium placeholder:text-gray-400"
                            autoComplete="new-password"
                            placeholder="Confirm New Password"
                        />
                        <InputError message={errors.password_confirmation} className="mt-1" />
                    </div>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                    <button 
                        disabled={processing}
                        className="bg-[#0f172a] text-white px-8 py-2.5 rounded-full font-bold text-[14px] hover:bg-black hover:shadow-lg transition-all flex items-center justify-center gap-2 relative disabled:opacity-50"
                    >
                        {processing && <Loader2 size={16} className="animate-spin" />}
                        {t.profile.update_sequence}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-500"
                        enterFrom="opacity-0 translate-x-4"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0 -translate-x-4"
                    >
                        <p className="text-[13px] font-bold text-emerald-600 flex items-center gap-2">
                             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                             {t.profile.security_updated}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
