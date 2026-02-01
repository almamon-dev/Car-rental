/**
 * Contact Us Page
 * 
 * Provides a formal communication channel for users to reach out,
 * including a message submission form and official contact information.
 * 
 * @author AL Mamon
 * @version 1.1.0
 */

import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { 
    Mail, Phone, MapPin, Send, MessageSquare, 
    Linkedin, Github, Twitter, ExternalLink, Globe,
    Facebook, Instagram, Youtube
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Contact Component
 * 
 * @param {Object} props
 * @param {Object} props.auth - Authentication context
 * @returns {JSX.Element}
 */
export default function Contact({ auth }) {
    const { settings, errors: pageErrors } = usePage().props;
    const { data, setData, post, processing, reset, errors: formErrors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const errors = { ...pageErrors, ...formErrors };

    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSuccessMessage("Thanks for reaching out! We'll get back to you shortly.");
                setTimeout(() => setSuccessMessage(null), 5000);
            },
            onError: (err) => {
               
            }
        });
    };

    return (
        <UserLayout>
            <Head title="Contact Us" />
            
            <div className="bg-[#f3f2ef] min-h-screen mt-20 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    
                   

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Left Column: Contact Info (LinkedIn Profile Style) */}
                        <div className="lg:col-span-1 space-y-4">
                            
                            {/* Company Info Card */}
                            <div className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-6">
                                <h2 className="text-[16px] font-bold text-gray-900 mb-4">Get in touch</h2>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="text-gray-500 mt-1" size={20} />
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900">Headquarters</h3>
                                            <p className="text-[14px] text-gray-500">
                                                {settings?.contact_address || settings?.company_address || "123 Premium Drive, Auto City, Dhaka, Bangladesh"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <Mail className="text-gray-500 mt-1" size={20} />
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900">Email</h3>
                                            <a href={`mailto:${settings?.contact_email || settings?.company_email || 'support@fleet.rentals'}`} className="text-[14px] text-[#0a66c2] hover:underline font-bold">
                                                {settings?.contact_email || settings?.company_email || 'support@fleet.rentals'}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <Phone className="text-gray-500 mt-1" size={20} />
                                        <div>
                                            <h3 className="text-[14px] font-bold text-gray-900">Phone</h3>
                                            <p className="text-[14px] text-gray-500">
                                                {settings?.contact_phone || settings?.company_phone || "+880 1700-000000"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links Card */}
                            <div className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-4">
                                <h3 className="text-[12px] font-bold text-gray-500 mb-3 uppercase tracking-wide">Social Media Profiles</h3>
                                <div className="flex flex-col gap-1">
                                    {settings?.linkedin_url && <SocialLink icon={Linkedin} label="LinkedIn" href={settings.linkedin_url} />}
                                    {settings?.twitter_url && <SocialLink icon={Twitter} label="Twitter / X" href={settings.twitter_url} />}
                                    {settings?.facebook_url && <SocialLink icon={Facebook} label="Facebook" href={settings.facebook_url} />}
                                    {settings?.instagram_url && <SocialLink icon={Instagram} label="Instagram" href={settings.instagram_url} />}
                                    {settings?.youtube_url && <SocialLink icon={Youtube} label="YouTube" href={settings.youtube_url} />}
                                    <SocialLink icon={Globe} label="Official Website" href="/" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact Form (LinkedIn Feed Post Style) */}
                        <div className="lg:col-span-2">
                             <div className="bg-white rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden">
                                <div className="border-b border-gray-100 p-4">
                                    <h2 className="text-[16px] font-bold text-gray-900">Send us a message</h2>
                                </div>
                                
                                <div className="p-6">
                                    {successMessage && (
                                        <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6 text-sm font-medium border border-green-100 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                                            {successMessage}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <InputGroup 
                                                label="Full Name" 
                                                name="name"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                error={errors.name}
                                                placeholder="e.g. John Doe"
                                            />
                                            <InputGroup 
                                                label="Email Address" 
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                error={errors.email}
                                                placeholder="e.g. john@example.com"
                                            />
                                        </div>

                                        <InputGroup 
                                            label="Subject" 
                                            name="subject"
                                            value={data.subject}
                                            onChange={e => setData('subject', e.target.value)}
                                            error={errors.subject}
                                            placeholder="What is this regarding?"
                                        />

                                        <div className="space-y-1">
                                            <label htmlFor="message" className="block text-sm font-bold text-gray-700">Message</label>
                                            <textarea 
                                                name="message"
                                                id="message"
                                                rows="6"
                                                className={`w-full rounded-md border-gray-300 shadow-sm focus:border-[#0a66c2] focus:ring-[#0a66c2] transition-colors resize-none placeholder:text-gray-400 text-sm ${errors.message ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                                placeholder="Write your message here..."
                                                value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                            />
                                            {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
                                        </div>

                                        <div className="pt-2 flex justify-end">
                                            <button 
                                                type="submit" 
                                                disabled={processing}
                                                className="bg-[#0a66c2] text-white px-6 py-2 rounded-full font-bold text-[15px] hover:bg-[#004182] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm min-w-[140px] justify-center"
                                            >
                                                {processing ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send size={16} />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                             </div>
                        </div>

                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

const InputGroup = ({ label, type = "text", value, onChange, error, placeholder, name }) => (
    <div className="space-y-1">
        <label htmlFor={name} className="block text-sm font-bold text-gray-700">{label}</label>
        <input 
            type={type} 
            name={name}
            id={name}
            className={`w-full rounded-md border-gray-300 shadow-sm focus:border-[#0a66c2] focus:ring-[#0a66c2] transition-colors py-2 px-3 text-sm placeholder:text-gray-400 ${error ? 'border-red-500 ring-1 ring-red-500' : ''}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
        {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
);

const SocialLink = ({ icon: Icon, label, href }) => (
    <a href={href} className="flex items-center justify-between p-2 rounded hover:bg-gray-100 transition-colors group">
        <div className="flex items-center gap-3">
             <Icon size={18} className="text-gray-500 group-hover:text-[#0a66c2] transition-colors" />
             <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">{label}</span>
        </div>
        <ExternalLink size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
);
