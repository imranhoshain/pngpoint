"use client";

import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCategory, setTitle, setKeyword, setPage } from "@/redux/features/getImages/getImageSlice";

export const FooterLogo: React.FC = () => {
    const dispatch = useDispatch();
    const handleLogo = () => {
        dispatch(setTitle(''));
        dispatch(setCategory(''));
        dispatch(setKeyword(''));
        dispatch(setPage(1));
    };

    return (
        <Link className="block w-fit" href={"/"}>
            {/*
             * FIX CLS: Added explicit width + height attributes.
             * Without these the browser allocates 0×0 space for the image,
             * then reflows the footer once dimensions are known — a direct
             * CLS contributor on desktop (was 0.46, target <0.1).
             *
             * Intrinsic size = largest rendered CSS size (xl:w-52 = 208px).
             * Height (56) matches your logo's aspect ratio — adjust if needed.
             *
             * loading="lazy" + decoding="async" kept because the footer is
             * always below the fold — no need to eagerly fetch it.
             */}
            <img
                className="w-40 lg:w-44 xl:w-52 h-auto"
                src="/PNGPOINT-White-logo.webp"
                alt="pngpoint"
                width={208}
                height={56}
                loading="lazy"
                decoding="async"
                onClick={() => handleLogo()}
            />
        </Link>
    );
};