import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
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
                <h2 className="text-[17px] font-semibold text-gray-900">
                    {t.profile.profile_information}
                </h2>
                <p className="mt-0.5 text-[13px] text-gray-500">
                    {t.profile.profile_subtitle}
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                {/* Profile Photo Section */}
                <div className="flex flex-col items-center sm:items-start gap-3">
                    <div className="relative group">
                        <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-50 relative">
                            {photoPreview ? (
                                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <img 
                                    src={user.profile_photo_url || `https://ui-avatars.com/api/?name=${user.name}&background=0a66c2&color=fff&size=200`} 
                                    alt={user.name} 
                                    className="w-full h-full object-cover" 
                                />
                            )}
                            
                            {/* Upload Overlay */}
                            <button 
                                type="button"
                                onClick={() => photoInput.current.click()}
                                className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Camera size={18} />
                                <span className="text-[8px] font-semibold mt-0.5">{t.profile.edit}</span>
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
                    
                    <div className="flex flex-col gap-1 text-center sm:text-left">
                        <p className="text-[14px] font-semibold text-gray-900 leading-none">{t.profile.avatar_label}</p>
                        <p className="text-[11px] text-gray-500">{t.profile.avatar_help}</p>
                        <InputError className="mt-2" message={errors.photo} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <InputLabel htmlFor="name" value={t.auth.name} className="text-[13px] font-semibold text-gray-700 pl-0.5" />
                        <div className="relative group">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a66c2] transition-colors" size={18} />
                            <TextInput
                                id="name"
                                className="block w-full pl-10 h-10 bg-white border-gray-300 focus:border-[#0a66c2] focus:ring-0 transition-all rounded-[4px] shadow-none"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                            />
                        </div>
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="space-y-1.5">
                        <InputLabel htmlFor="email" value={t.auth.email} className="text-[13px] font-semibold text-gray-700 pl-0.5" />
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0a66c2] transition-colors" size={18} />
                            <TextInput
                                id="email"
                                type="email"
                                className="block w-full pl-10 h-10 bg-white border-gray-300 focus:border-[#0a66c2] focus:ring-0 transition-all rounded-[4px] shadow-none"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>
                        <InputError className="mt-2" message={errors.email} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
                        <p className="text-[13px] text-amber-800 font-medium">
                            {t.profile.email_unverified}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 text-[#0a66c2] underline hover:no-underline font-semibold"
                            >
                                {t.profile.trigger_verification}
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-[12px] font-semibold text-green-600 uppercase">
                                {t.profile.verification_sent}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <button 
                        disabled={processing}
                        className="bg-[#0a66c2] text-white px-8 py-2.5 rounded-full font-semibold text-[14px] hover:bg-[#004182] transition-all flex items-center justify-center gap-2 relative disabled:opacity-50"
                    >
                        {t.listing.save}
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
                            {t.profile.protocol_synchronized}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
