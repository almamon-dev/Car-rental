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
            <header className="mb-8">
                <h2 className="text-[20px] font-semibold text-gray-900 flex items-center gap-2">
                    <KeyRound size={20} className="text-[#0a66c2]" />
                    {t.profile.security_protocol}
                </h2>
                <p className="mt-1 text-[14px] text-gray-500">
                    {t.profile.security_subtitle}
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div className="space-y-1.5">
                    <InputLabel
                        htmlFor="current_password"
                        value={t.profile.current_password}
                        className="text-[13px] font-semibold text-gray-700 pl-0.5"
                    />
                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a66c2] transition-colors" size={18} />
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            className="block w-full pl-10 h-10 bg-white border-gray-300 focus:border-[#0a66c2] focus:ring-0 transition-all rounded-[4px] shadow-none"
                            autoComplete="current-password"
                        />
                    </div>
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <InputLabel htmlFor="password" value={t.profile.new_password} className="text-[13px] font-semibold text-gray-700 pl-0.5" />
                        <div className="relative group">
                            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a66c2] transition-colors" size={18} />
                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="block w-full pl-10 h-10 bg-white border-gray-300 focus:border-[#0a66c2] focus:ring-0 transition-all rounded-[4px] shadow-none"
                                autoComplete="new-password"
                            />
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="space-y-1.5">
                        <InputLabel htmlFor="password_confirmation" value={t.profile.confirm_password} className="text-[13px] font-semibold text-gray-700 pl-0.5" />
                        <div className="relative group">
                            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a66c2] transition-colors" size={18} />
                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="block w-full pl-10 h-10 bg-white border-gray-300 focus:border-[#0a66c2] focus:ring-0 transition-all rounded-[4px] shadow-none"
                                autoComplete="new-password"
                            />
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <button 
                        disabled={processing}
                        className="bg-slate-900 text-white px-8 py-2.5 rounded-full font-semibold text-[14px] hover:bg-black transition-all flex items-center justify-center gap-2 relative disabled:opacity-50"
                    >
                        {t.profile.update_sequence}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-[14px] font-semibold text-green-600 flex items-center gap-2">
                             <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                             {t.profile.security_updated}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
