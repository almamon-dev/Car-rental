import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useLanguage } from '@/Contexts/LanguageContext';
import { Camera, Mail, User as UserIcon, Loader2 } from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const { t } = useLanguage();
    const user = usePage().props.auth.user;
    const photoInput = useRef();
    const [photoPreview, setPhotoPreview] = useState(null);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            photo: null,
            _method: 'PATCH',
        });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => setPhotoPreview(null),
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo', file);
            const reader = new FileReader();
            reader.onload = (e) => setPhotoPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">
                    {t.profile.profile_information}
                </h2>
                <p className="mt-1 text-[13px] text-slate-500 font-medium">
                    Update your identity and digital presence.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                {/* Profile Photo Section - Clean Minimal Box */}
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-100/50 transition-all hover:bg-slate-50 mb-4">
                    <div className="relative group">
                        <div className="w-16 h-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-white relative">
                            {photoPreview ? (
                                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <img 
                                    src={user.profile_photo_url || `https://ui-avatars.com/api/?name=${user.name}&background=0a66c2&color=fff&size=200`} 
                                    alt={user.name} 
                                    className="w-full h-full object-cover" 
                                />
                            )}
                            
                            {/* Minimal Upload Overlay */}
                            <button 
                                type="button"
                                onClick={() => photoInput.current.click()}
                                className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]"
                            >
                                <Camera size={16} strokeWidth={2.5} />
                            </button>
                        </div>
                        
                        <input 
                            type="file" 
                            ref={photoInput} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-0.5 text-center sm:text-left">
                        <p className="text-[14px] font-bold text-slate-800">{t.profile.avatar_label}</p>
                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">PNG, JPG, or WEBP. Max 2MB.</p>
                        <InputError className="mt-1" message={errors.photo} />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <InputLabel htmlFor="name" value={t.auth.name} className="text-[14px] font-bold text-gray-700 ml-0.5" />
                        <TextInput
                            id="name"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-[#0a66c2] focus:ring-[#0a66c2] py-2 px-3 text-[14px] font-medium placeholder:text-gray-400"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoComplete="name"
                            placeholder="Full Name"
                        />
                        <InputError className="mt-1" message={errors.name} />
                    </div>

                    <div className="space-y-1">
                        <InputLabel htmlFor="email" value={t.auth.email} className="text-[14px] font-bold text-gray-700 ml-0.5" />
                        <TextInput
                            id="email"
                            type="email"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-[#0a66c2] focus:ring-[#0a66c2] py-2 px-3 text-[14px] font-medium placeholder:text-gray-400"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                            placeholder="Email Address"
                        />
                        <InputError className="mt-1" message={errors.email} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl flex items-start gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                             <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-[14px] text-amber-900 font-bold">
                                {t.profile.email_unverified}
                            </p>
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="mt-1 text-[#0a66c2] text-[13px] font-bold hover:underline underline-offset-4"
                            >
                                {t.profile.trigger_verification}
                            </Link>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-[12px] font-bold text-emerald-600 uppercase tracking-widest">
                                    {t.profile.verification_sent}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                    <button 
                        disabled={processing}
                        className="bg-[#0f172a] text-white px-8 py-2.5 rounded-full font-bold text-[14px] hover:bg-black hover:shadow-lg transition-all flex items-center justify-center gap-2 relative disabled:opacity-50"
                    >
                        {processing && <Loader2 size={16} className="animate-spin" />}
                        {t.listing.save}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-500"
                        enterFrom="opacity-0 translate-x-4"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0 -translate-x-4"
                    >
                        <p className="text-[14px] font-bold text-emerald-600 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            {t.profile.protocol_synchronized}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
