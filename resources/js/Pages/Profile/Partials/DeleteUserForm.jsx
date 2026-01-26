import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useLanguage } from '@/Contexts/LanguageContext';

export default function DeleteUserForm({ className = '' }) {
    const { t } = useLanguage();
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header className="mb-1">
                <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">
                    {t.profile.delete_account}
                </h2>

                <p className="mt-0 text-[13px] text-slate-500 font-medium">
                    {t.profile.delete_subtitle}
                </p>
            </header>

            <div className="pt-4 border-t border-slate-100">
                <DangerButton 
                    onClick={confirmUserDeletion}
                    className="rounded-full px-8 py-2.5 text-[14px] font-bold"
                >
                    {t.profile.delete_account}
                </DangerButton>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {t.profile.delete_confirm_title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        {t.profile.delete_confirm_subtitle}
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value={t.auth.password}
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#0a66c2] focus:ring-[#0a66c2] py-2 px-3 text-[14px] font-medium placeholder:text-gray-400"
                            isFocused
                            placeholder={t.auth.password}
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            {t.profile.cancel}
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            {t.profile.delete_account}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
