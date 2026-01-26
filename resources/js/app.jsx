import "../css/app.css";
import "./bootstrap";

import { createInertiaApp, usePage } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import { useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

function FlashMessages({ children }) {
    const { flash, errors } = usePage().props;
    const lastFlash = useRef({ success: null, error: null });

    useEffect(() => {
        // server side (Flash Success)
        if (flash?.success && flash.success !== lastFlash.current.success) {
            toast.success(flash.success, { 
                id: `success-${flash.success}`,
                position: "bottom-right",
                duration: 4000
            });
            lastFlash.current.success = flash.success;
        }

        // server side (Flash Error)
        if (flash?.error && flash.error !== lastFlash.current.error) {
            toast.error(flash.error, { 
                id: `error-${flash.error}`,
                position: "bottom-right",
                duration: 4000
            });
            lastFlash.current.error = flash.error;
        }

        // Reset tracking if flash is cleared
        if (!flash?.success) lastFlash.current.success = null;
        if (!flash?.error) lastFlash.current.error = null;

    }, [flash, errors]);

    return (
        <>
            <Toaster />
            {children}
        </>
    );
}

import { LanguageProvider } from "./Contexts/LanguageContext";

createInertiaApp({
    title: (title) => {
        const dynamicName = window.siteName || appName;
        return title ? `${title} - ${dynamicName}` : dynamicName;
    },
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        );

        const pageLayout = page.default.layout;

        page.default.layout = (pageNode) => {
            
            let content = pageNode;
            
            if (pageLayout) {
                    content = typeof pageLayout === 'function' 
                    ? pageLayout(pageNode) 
                    : <pageLayout>{pageNode}</pageLayout>;
            }

            return (
                <LanguageProvider>
                    <FlashMessages>
                        {content}
                    </FlashMessages>
                </LanguageProvider>
            );
        };

        return page;
    },
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
        } else {
            createRoot(el).render(<App {...props} />);
        }

        // Remove the server-side preloader
        const loader = document.getElementById('global-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    },
    progress: {
        color: '#4B5563',
    },
});
