"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block">
      <ul className="flex space-x-8">
        <li>
          <Link
            href="/"
            className={`hover:text-gray-600 dark:hover:text-gray-300 transition-colors
              ${pathname === "/" ? "text-blue-600 dark:text-blue-400" : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/stamp-rally"
            className={`hover:text-gray-600 dark:hover:text-gray-300 transition-colors
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
            href="/landing"
            className={`hover:text-gray-600 dark:hover:text-gray-300 transition-colors
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
  );
}
