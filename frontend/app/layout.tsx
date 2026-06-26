import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/providers";
import Notification from "@/components/notification/notification";
import Scrollbar from "@/components/scrollbar/scrollbar";
import Script from "next/script";

const interFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    // ... your existing metadata
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="robots" content="index, follow" />
                <meta name="theme-color" content="#ffffff" />
            </head>
            <body className={`${interFont.variable} antialiased`}>
                <ReduxProvider>
                    <Scrollbar />
                    <Notification />
                    {children}
                </ReduxProvider>

                {/* Google AdSense */}
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6545209183027710"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />

                {/* AMP Ad Library */}
                <Script
                    async
                    custom-element="amp-ad"
                    src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}