"use client";

import { Domine } from "next/font/google";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import Navigation from "./Navigation";
const domine = Domine({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-domine",
  style: "normal",
});

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 mb-8">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link
          href="/"
          className={`text-2xl font-bold hover:opacity-80 ${domine.className} `}
        >
          Akama&nbsp;System
        </Link>
        <div className="flex items-center">
          <Navigation />
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
}
