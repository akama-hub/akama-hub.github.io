/* app/layout.tsx */
import { Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

/* 可変フォントを variable フォントとして読み込み */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${noto.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
