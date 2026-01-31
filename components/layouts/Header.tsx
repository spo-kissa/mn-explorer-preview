'use client';

import SearchElement from "../elements/SearchElement";
import MainMenu from "../elements/MainMenu";
import SelectLanguage from "../elements/SelectLanguage";
import Logo from "../elements/Logo";

export default function Header() {

  return (
    <header className="!sticky top-0 z-50 flex flex-row items-center justify-between w-full px-6 py-4 bg-white/70 dark:bg-black/70 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm opacity-90 hover:opacity-95">
      <Logo />
      <div className="flex-justify-end flex-items-middle w-[500px]">
        <SearchElement />
      </div>
      <div className="flex items-center">
        <MainMenu />
      </div>
      <SelectLanguage />
    </header>
  );
}