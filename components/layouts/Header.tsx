'use client';

import Link from "next/link";
import SearchElement from "../elements/SearchElement";
import SelectLanguage from "../elements/SelectLanguage";
import Logo from "../elements/Logo";
import { useI18n } from "@/i18n";

export default function Header() {
  const { t } = useI18n();

  return (
    <header className="!sticky top-0 z-50 flex flex-row items-center justify-between w-full px-6 py-4 bg-white/70 dark:bg-black/70 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm opacity-90 hover:opacity-95">
      <Logo />
      <div className="flex-justify-end flex-items-middle w-[500px]">
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
      </div>
      <SelectLanguage />
    </header>
  );
}