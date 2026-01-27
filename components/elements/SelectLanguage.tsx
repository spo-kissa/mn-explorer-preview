'use client';

import { useI18n } from "@/i18n";
import { useEffect, useRef, useState } from "react";

export default function SelectLanguage() {
    const { locale, setLocale } = useI18n();
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
    );
}