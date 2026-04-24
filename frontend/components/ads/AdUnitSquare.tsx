"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

export default function AdUnitSquare() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-6545209183027710"
            data-ad-slot="1943271705"
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
}