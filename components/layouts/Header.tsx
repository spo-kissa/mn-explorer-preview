import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full px-6 py-6">
            <h1 className="relative inline-block max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    mn-explorer.net
                </Link>
                <span className="absolute -top-3 -right-12 rounded-md border border-current px-2 py-0.5 text-xs font-medium bg-black">
                    preview
                </span>
            </h1>
        </header>
    );
}