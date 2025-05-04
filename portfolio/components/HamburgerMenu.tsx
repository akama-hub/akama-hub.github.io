"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  /** ハンバーガーアイコンをクリック */
  const toggleMenu = () => setIsOpen((prev) => !prev);

  /** ルート移動時は自動で閉じる */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  /** メニュー外クリック／タップで閉じる */
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  /** Esc キーで閉じる */
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  /** 背面スクロールをロック */
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <div className="lg:hidden relative" ref={menuRef}>
      {/* ハンバーガーアイコン */}
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5"
        aria-label="メニュー"
        aria-expanded={isOpen}
        aria-controls="global-nav"
      >
        <span
          className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-transform duration-300
            ${isOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-opacity duration-300
            ${isOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-transform duration-300
            ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div
          id="global-nav"
          role="menu"
          className="absolute z-50 top-full  w-[200px] right-1 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
        >
          <nav className="px-4 py-6">
            <ul className="space-y-4">
              <li>
                <Link
                  role="menuitem"
                  href="/stamp-rally"
                  className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded border-b
                    ${
                      pathname === "/stamp-rally"
                        ? "text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                >
                  スタンプラリー
                </Link>
              </li>
              <li>
                <Link
                  role="menuitem"
                  href="/landing"
                  className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded border-b
                    ${
                      pathname === "/landing"
                        ? "text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                >
                  LP
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
