import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/providers";
import Notification from "@/components/notification/notification";
import Scrollbar from "@/components/scrollbar/scrollbar";
import { DOMAIN_NAME } from "@/utils/api";

const interFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Download Free PNG Images with Transparent Background | PNGPoint",
    description: "Explore thousands of free PNG images with transparent backgrounds. Perfect for presentations, graphic design, and social media posts",
    
    keywords: [
        "free png images",
        "png free",
        "png free download",
        "png images free download",
        "vector png",
        "royalty free png",
        "download png images",
        "free png photos",
        "free png pictures",
        "smoke png",
        "free unlimited png download",
        "lens flare png",
        "emojis png",
        "torn paper png",
        "flower png",
        "free png background",
        "png photo download",
        "png pictures download",
        "free png img",
        "free png pics",
        "png downloader",
        "free sticker png",
        "png images free download for android",
        "png files download",
        "png illustration",
        "gold confetti png",
        "png download hd",
        "water splash png",
        "1k followers png",
        "emoji transparent background",
        "design png free download",
        "blood drop png",
        "blood splash png",
        "blood splatter png",
        "car cartoon png",
        "cartoon character png",
        "cartoon eye png",
        "cartoon face png",
        "cartoon images png",
        "cartoon mouth png",
        "cartoon png background",
        "certificate border png"
    ],
    authors: [{ name: "pngpoint" }],
    creator: "pngpoint",
    publisher: "pngpoint",
    metadataBase: new URL(`${DOMAIN_NAME}`),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Download Free PNG Images with Transparent Background | PNGPoint",
        description: "Explore thousands of free PNG images with transparent backgrounds. Perfect for presentations, graphic design, and social media posts",
        url: `${DOMAIN_NAME}`,
        siteName: "PNGPoint",
        type: "website",
        images: [
            {
                url: `${DOMAIN_NAME}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "PNGPoint",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Download Free PNG Images with Transparent Background | PNGPoint",
        description: "Explore thousands of free PNG images with transparent backgrounds. Perfect for presentations, graphic design, and social media posts",
        images: [`${DOMAIN_NAME}/og-image.png`],
        creator: "@PNGPoint",
    },
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
            </body>
        </html>
    );
}
