'use client';

import { useDarkMode } from "@/app/hooks/useDarkMode";
import { getExtrinsicColor } from "@/lib/extrinsic"

export function ExtrinsicColor({ section, method, showSection = true, showMethod = true }: { section: string; method: string; showSection?: boolean; showMethod?: boolean; })
{
    let dotted = '';
    if (showSection && showMethod) {
        dotted = '.';
    }

    const isDarkMode = useDarkMode();
    const mode = isDarkMode ? 'dark' : 'light';

    const colors = getExtrinsicColor(mode, section, method);

    return (
        <span
            className="px-1 py-1 border rounded-md font-semibold"
            style={{borderColor: colors.border, color: colors.text}}>
            {showSection ? section : ''}{dotted}{showMethod ? method : ''}
        </span>
    )
}