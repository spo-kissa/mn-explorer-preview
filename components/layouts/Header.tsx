'use client';

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import SearchElement from "../elements/SearchElement";
import MainMenu from "../elements/MainMenu";
import SelectLanguage from "../elements/SelectLanguage";
import Logo from "../elements/Logo";

function useIsClient() {
  return useSyncExternalStore(() => () => {}, () => true, () => false);
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isClient = useIsClient();
  const closeOverlay = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="!sticky top-0 z-50 flex flex-col w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/70 dark:bg-black/70 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm opacity-90 hover:opacity-95">
        {/* 1段目: ロゴ・メニュー・言語 */}
        <div className="flex flex-row items-center justify-between w-full gap-2 sm:gap-4">
          <Logo />
          {/* lg以上: 検索を1段目中央に配置 */}
          <div className="hidden lg:flex flex-1 min-w-0 ml-12 mx-2 justify-center">
            <SearchElement />
          </div>
          {/* md以上: メニュー・言語 */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <MainMenu />
            <SelectLanguage />
          </div>
          {/* md未満: 言語 + ハンバーガー（オーバーレイ表示中は閉じるアイコン） */}
          <div className="flex md:hidden items-center gap-2">
            <SelectLanguage />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              {mobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* 2段目: md〜lg-1 (768px-1023px) で検索を表示 */}
        <div className="hidden md:flex lg:hidden w-full justify-center pt-3">
          <div className="w-full px-12">
            <SearchElement />
          </div>
        </div>
      </header>

      {/* モバイルメニュー: layout の #portal-root へポータル描画（同一 React ツリーなので I18n が有効） */}
      {mobileMenuOpen &&
        isClient &&
        (() => {
          const portalRoot = typeof document !== "undefined" ? document.getElementById("portal-root") : null;
          return portalRoot
            ? createPortal(
                <div
                  className="fixed inset-0 z-[9999] pointer-events-auto md:hidden"
                  role="dialog"
                  aria-modal
                  aria-label="メニュー"
                >
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="absolute inset-0 z-0 bg-black/50"
                    aria-label="メニューを閉じる"
                  />
                  <div className="absolute top-0 right-0 z-10 h-full w-[85%] max-w-sm flex flex-col bg-white dark:bg-zinc-900 shadow-xl">
                    <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">メニュー</span>
                      <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        aria-label="メニューを閉じる"
                      >
                        <CloseIcon className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-auto p-4 space-y-6">
                      <SearchElement onClose={closeOverlay} />
                      <MainMenu vertical onClose={closeOverlay} />
                    </div>
                  </div>
                </div>,
                portalRoot
              )
            : null;
        })()}
    </>
  );
}
