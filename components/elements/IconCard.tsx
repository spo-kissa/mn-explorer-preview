"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

interface IconCardProps {
    icon?: string;
    title: string;
    value?: string;
}

export default function IconCard({ icon, title, value }: IconCardProps) {
    const prevValueRef = useRef<string | undefined>(value);
    const [glowing, setGlowing] = useState(false);

    useEffect(() => {
        if (value !== prevValueRef.current) {
            prevValueRef.current = value;
            setGlowing(true);
        }
    }, [value]);

    const handleAnimationEnd = useCallback((e: React.AnimationEvent) => {
        if (e.animationName === "subtle-glow") setGlowing(false);
    }, []);

    const defaultIconSvg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M9 12h6M12 9v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
    
    // SVGをURLエンコードしてデータURIに変換
    const defaultIconDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(defaultIconSvg)}`;

    if (!icon) {
        icon = defaultIconDataUri;
    }

    return (
        <div className="flex flex-row items-center w-full justify-center rounded-md overflow-visible">
            <div
                className={`flex flex-row items-center justify-center w-full rounded-md overflow-visible
                    border-[1px] border-gray-300 dark:border-zinc-700 p-2
                    bg-white dark:bg-zinc-900/50
                    ${glowing ? "icon-card-glowing" : ""}`}
                onAnimationEnd={handleAnimationEnd}
            >
                <Image src={icon} alt="Icon" width={48} height={48} unoptimized className="bg-gray-100 rounded-md object-contain ml-1" />
                <div className="flex flex-col w-full items-start justify-start mt-1 ml-2">
                    <span className="flex items-center justify-center text-xs font-medium">{title}</span>
                    <span className="flex items-center justify-end w-full text-xl font-bold text-right font-mono pr-1">{value}</span>
                </div>
            </div>
        </div>
    );
}