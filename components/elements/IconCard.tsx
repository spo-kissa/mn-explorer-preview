import Image from "next/image";

interface IconCardProps {
    icon?: string;
    title: string;
    value?: string;
}

export default function IconCard({ icon, title, value }: IconCardProps) {
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
        <div className="flex flex-row items-center justify-center w-full h-16 border-[1px] border-gray-300 dark:border-zinc-700 rounded-md p-2">
            <Image src={icon} alt="Icon" width={48} height={48} unoptimized className="bg-gray-100 rounded-md object-contain" />
            <div className="flex flex-col w-full items-start justify-start ml-2">
                <span className="text-sm font-medium">{title}</span>
                <span className="text-xl font-bold">{value}</span>
            </div>
        </div>
    );
}