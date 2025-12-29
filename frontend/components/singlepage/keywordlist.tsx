/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { setKeyword } from "@/redux/features/getImages/getImageSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

interface ImageProps {
    image: any;
}

export const KeywordList: React.FC<ImageProps> = ({ image }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleTagClick = (keyword: string) => {
        // Set keyword in Redux store
        dispatch(setKeyword(keyword));
        
        // Redirect to homepage with keyword parameter
        router.push(`/?keyword=${encodeURIComponent(keyword)}`);
    };

    return (
        <div className="flex flex-row flex-wrap items-center gap-1.5">
            {image?.image?.keywords?.map((item: any) => {
                return (
                    <button 
                        className="bg-[#eaeaea] hover:bg-[#d5d5d5] text-black/80 rounded py-1.5 px-1.5 cursor-pointer transition-colors" 
                        key={item.id} 
                        onClick={() => handleTagClick(item.slug)} 
                        type="button"
                    >
                        <span className="text-xs">{item.name}</span>
                    </button>
                );
            })}
        </div>
    );
}