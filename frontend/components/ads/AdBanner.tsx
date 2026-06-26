// components/ads/AdBanner.tsx
"use client";

import { useEffect, useRef } from "react";

export const AdBanner = () => {
    const adRef = useRef<HTMLModElement>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        try {
            const adsbygoogle = (window as any).adsbygoogle;
            if (adsbygoogle) {
                adsbygoogle.push({});
            }
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <div className="w-full overflow-hidden">
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-6545209183027710"
                data-ad-slot="8484109801"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};