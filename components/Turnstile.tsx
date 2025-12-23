import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        turnstile?: any;
    }
}

export const Turnstile: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<number | null>(null);

    useEffect(() => {
        const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITEKEY as string | undefined;
        if (!SITE_KEY) {
            console.warn('VITE_TURNSTILE_SITEKEY is not set. Turnstile will not initialize.');
            return;
        }

        const loadScript = () => {
            return new Promise<void>((resolve) => {
                if ((window as any).turnstile) return resolve();
                if (document.querySelector('script[src*="turnstile"]')) return resolve();

                const s = document.createElement('script');
                s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
                s.async = true;
                s.defer = true;
                s.onload = () => resolve();
                document.head.appendChild(s);
            });
        };

        let cancelled = false;

        loadScript().then(() => {
            if (cancelled) return;
            if (!window.turnstile || !containerRef.current) return;

            // render invisible widget and execute it immediately
            try {
                widgetIdRef.current = window.turnstile.render(containerRef.current, {
                    sitekey: SITE_KEY,
                    size: 'invisible',
                    callback: (token: string) => {
                        // send token to server for verification
                        fetch('/api/verify-turnstile', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ token })
                        }).catch((err) => console.error('Turnstile verification request failed:', err));
                    }
                });

                // execute the invisible widget to get a token on page load
                try {
                    // Some builds may not expose window.turnstile.execute directly - wrap in try/catch
                    if (typeof window.turnstile.execute === 'function') {
                        window.turnstile.execute(widgetIdRef.current!);
                    }
                } catch (err) {
                    console.warn('Turnstile execute failed:', err);
                }
            } catch (err) {
                console.error('Turnstile render failed:', err);
            }
        });

        return () => {
            cancelled = true;
            // optional cleanup: remove widget if present
            try {
                if (widgetIdRef.current != null && window.turnstile && typeof window.turnstile.remove === 'function') {
                    window.turnstile.remove(widgetIdRef.current);
                }
            } catch (err) {
                // ignore
            }
        };
    }, []);

    // hidden container for the invisible widget
    return <div ref={containerRef} style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', left: -9999, top: -9999 }} aria-hidden />;
};
