import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export default function SettingsTabs({ activeTab }) {
    const [expandedGroups, setExpandedGroups] = useState({
        platform: true,
        business: false,
        integration: false,
    });

    const tabGroups = [
        {
            id: 'platform',
            label: 'Platform',
            tabs: [
                { id: 'general', label: 'General', path: route('admin.settings.general') },
                { id: 'branding', label: 'Branding', path: route('admin.settings.branding') },
                { id: 'seo', label: 'SEO', path: route('admin.settings.seo') },
                { id: 'social', label: 'Social Media', path: route('admin.settings.social') },
            ]
        },
        {
            id: 'business',
            label: 'Business',
            tabs: [
                { id: 'business', label: 'Company Info', path: route('admin.settings.business') },
                { id: 'contact', label: 'Contact', path: route('admin.settings.contact') },
                { id: 'booking', label: 'Booking Rules', path: route('admin.settings.booking') },
                { id: 'legal', label: 'Legal Policies', path: route('admin.settings.legal') },
            ]
        },
        {
            id: 'integration',
            label: 'Integration',
            tabs: [
                { id: 'email', label: 'Email SMTP', path: route('admin.settings.email') },
                { id: 'sslcommerz', label: 'Payment Gateway', path: route('admin.settings.sslcommerz') },
                { id: 'notifications', label: 'Notifications', path: route('admin.settings.notifications') },
            ]
        },
    ];

    // Find which group contains the active tab
    const activeGroup = tabGroups.find(group => 
        group.tabs.some(tab => tab.id === activeTab)
    );

    // Only show tabs from the active group
    const visibleTabs = activeGroup ? activeGroup.tabs : tabGroups[0].tabs;

    return (
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
            {visibleTabs.map((tab) => (
                <Link
                    key={tab.id}
                    href={tab.path}
                    className={`relative py-3 px-1 text-[13px] font-semibold transition-all whitespace-nowrap flex items-center gap-2
                        ${activeTab === tab.id 
                            ? 'text-[#0a66c2]' 
                            : 'text-[#00000099] hover:text-[#000000e6]'
                        }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0a66c2] rounded-t-full" />
                    )}
                </Link>
            ))}
            
            {/* Group Indicator */}
            {activeGroup && (
                <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {activeGroup.label}
                </div>
            )}
        </div>
    );
}
