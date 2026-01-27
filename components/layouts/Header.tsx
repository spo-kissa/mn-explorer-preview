'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SearchElement from "../elements/SearchElement";
import { useI18n } from "@/i18n";

export default function Header() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  return (
    <header className="!sticky top-0 z-50 flex flex-row items-center justify-between w-full px-6 py-4 bg-white/70 dark:bg-black/70 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
      <h1 className="relative inline-block max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          {t("common.siteName")}
        </Link>
        <span className="absolute -top-3 -right-12 rounded-md border border-current px-2 py-0.5 text-xs font-medium bg-black text-white">
          {t("common.preview")}
        </span>
      </h1>
      <div className="flex-justify-end w-[500px]">
        <SearchElement />
      </div>
      <div className="flex items-center gap-4">
        <nav className="flex flex-justify-end">
          <span className="text-medium">
            <Link href="/block">{t("header.blocks")}</Link>
          </span>
          &nbsp;/&nbsp;
          <span className="text-medium">{t("header.transactions")}</span>
          &nbsp;/&nbsp;
          <span className="text-medium">{t("header.contracts")}</span>
          &nbsp;/&nbsp;
          <span className="text-medium">{t("header.addresses")}</span>
        </nav>
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <span className="uppercase tracking-wide">{locale}</span>
            <span
              className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
            >
              ▼
            </span>
          </button>
          {open && (
            <div className="absolute right-0 mt-1 w-28 overflow-hidden rounded-md border border-zinc-200 bg-white text-xs shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
              <button
                type="button"
                onClick={() => {
                  setLocale("en");
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  locale === "en" ? "bg-zinc-100 dark:bg-zinc-800" : ""
                }`}
              >
                <span>English</span>
                {locale === "en" && <span>●</span>}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLocale("ja");
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  locale === "ja" ? "bg-zinc-100 dark:bg-zinc-800" : ""
                }`}
              >
                <span>日本語</span>
                {locale === "ja" && <span>●</span>}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}