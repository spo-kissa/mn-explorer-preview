import Link from "next/link";
import SearchBox from "../elements/SearchBox";

export default function Header() {
    return (
        <header className="!sticky top-0 z-50 flex flex-row items-center justify-between w-full px-6 py-4 bg-white/70 dark:bg-black/70 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
            <h1 className="relative inline-block max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    mn-explorer.net
                </Link>
                <span className="absolute -top-3 -right-12 rounded-md border border-current px-2 py-0.5 text-xs font-medium bg-black">
                    preview
                </span>
            </h1>
            <div className="flex-justify-end w-[500px]">
                <SearchBox />
            </div>
            <div className="flex flex-justify-end">
                <span className="text-medium">Blocks</span>&nbsp;/&nbsp;
                <span className="text-medium">Transactions</span>&nbsp;/&nbsp;
                <span className="text-medium">Contracts</span>&nbsp;/&nbsp;
                <span className="text-medium">Addresses</span>
            </div>
        </header>
    );
}