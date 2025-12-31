/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SERVER_URL } from "@/utils/api";
import { ReactIcons } from "@/utils/reactIcons";
import React, { useEffect, useState, useRef } from "react";

interface ImageProps {
    image: any;
}

interface SizeOption {
    label: string;
    size: 'large' | 'medium' | 'small';
    url: string;
    width?: number;
    height?: number;
    fileSize: number | null;
}

export const Download: React.FC<ImageProps> = ({ image }) => {
    const { HiOutlineDownload, HiChevronDown } = ReactIcons;
    const [sizeOptions, setSizeOptions] = useState<SizeOption[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!image?.image) return;

        const fetchFileSizes = async () => {
            setIsLoading(true);
            const options: SizeOption[] = [];

            // Large size
            if (image.image.url) {
                const largeSize = await getFileSize(image.image.url);
                const img = new window.Image();
                img.src = image.image.url;
                options.push({
                    label: 'Large',
                    size: 'large',
                    url: image.image.url,
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                    fileSize: largeSize,
                });
            }

            // Medium size
            if (image.image.main_url) {
                const mediumSize = await getFileSize(image.image.main_url);
                const img = new window.Image();
                img.src = image.image.main_url;
                options.push({
                    label: 'Medium',
                    size: 'medium',
                    url: image.image.main_url,
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                    fileSize: mediumSize,
                });
            }

            // Small size
            if (image.image.small_url) {
                const smallSize = await getFileSize(image.image.small_url);
                const img = new window.Image();
                img.src = image.image.main_url;
                options.push({
                    label: 'Small',
                    size: 'small',
                    url: image.image.small_url,
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                    fileSize: smallSize,
                });
            }

            setSizeOptions(options);
            setIsLoading(false);
        };

        fetchFileSizes();
    }, [image?.image]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getFileSize = async (url: string): Promise<number | null> => {
        try {
            const res = await fetch(url, { method: "HEAD" });
            const length = res.headers.get("Content-Length");
            return length ? parseInt(length, 10) : null;
        } catch (err) {
            console.error("Failed to fetch file size", err);
            return null;
        }
    };

    const formatFileSize = (bytes: number | null): string => {
        if (bytes === null) return "--";
        if (bytes < 1024) return bytes + " B";
        else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    const handleDownloadImage = (size: 'large' | 'medium' | 'small') => {
        const url = `${SERVER_URL}/images/download/${image?.image?.cloudflare_id}?size=${size}`;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsDropdownOpen(false);
    };

    if (isLoading || sizeOptions.length === 0) {
        return null;
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Main Download Button */}
            <button
                className="flex flex-row flex-wrap items-center gap-x-2.5 w-fit py-3 px-4 md:px-5 cursor-pointer text-sm md:text-base text-white bg-[#0077A2] rounded order-1 md:order-4"
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div className="flex items-center gap-x-2.5">
                    <HiOutlineDownload className="text-xl md:text-2xl" />
                    <span>Free Download</span>
                </div>
                <HiChevronDown
                    className={`text-lg md:text-xl transition-transform ${
                        isDropdownOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full md:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="py-2">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-b">
                            Select Size
                        </div>
                        {sizeOptions.map((option) => (
                            <button
                                key={option.size}
                                onClick={() => handleDownloadImage(option.size)}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex flex-col gap-1 border-b last:border-b-0"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-gray-800">
                                        {option.label}
                                    </span>
                                    <span className="text-sm font-medium text-[#0077A2]">
                                        {formatFileSize(option.fileSize)}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                    {option.width && option.height ? (
                                        `${option.width} × ${option.height} pixels`
                                    ) : (
                                        'Dimensions unavailable'
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};