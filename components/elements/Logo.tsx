import Link from "next/link";
import { useI18n } from "@/i18n";
import Image from "next/image";

export default function Logo() {
    const { t } = useI18n();
    const isPreview = process.env.NETWORK !== "mainnet";
    return (
        <h1 className="relative inline-block max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            <Link href="/" className="hover:opacity-80 transition-opacity">
                {t("common.siteName")}
            </Link>
            {isPreview && (
            <span className="absolute -top-3 -right-12 rounded-md border border-current px-2 py-0.5 text-xs font-medium bg-black text-white">
                {t("common.preview")}
          </span>
        )}
      </h1>
    );
}