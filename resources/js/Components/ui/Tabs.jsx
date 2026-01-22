import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export const Tabs = ({ defaultValue, value, onValueChange, className, children }) => {
    const [internalTab, setInternalTab] = useState(defaultValue);
    
    const activeTab = value !== undefined ? value : internalTab;
    const setActiveTab = (newValue) => {
        if (onValueChange) {
            onValueChange(newValue);
        } else {
            setInternalTab(newValue);
        }
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={`w-full ${className}`}>{children}</div>
        </TabsContext.Provider>
    );
};

export const TabsList = ({ className, children }) => {
    return (
        <div className={`flex items-center border-b border-gray-200 ${className}`}>
            {children}
        </div>
    );
};

export const TabsTrigger = ({ value, children, className }) => {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    const isActive = activeTab === value;
    
    return (
        <button
            type="button"
            onClick={() => setActiveTab(value)}
            className={`px-4 py-2 text-sm font-medium transition-all relative
                ${isActive ? 'text-[#0a66c2]' : 'text-gray-500 hover:text-gray-700'}
                ${className}
            `}
        >
            {children}
            {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0a66c2]" />
            )}
        </button>
    );
};

export const TabsContent = ({ value, children, className }) => {
    const { activeTab } = useContext(TabsContext);
    if (activeTab !== value) return null;
    return <div className={className}>{children}</div>
};
