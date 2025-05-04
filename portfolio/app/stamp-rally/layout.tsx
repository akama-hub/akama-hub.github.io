/* app/layout.tsx */
import Header from "@/components/Header";
import { Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
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
      className={`${inter.variable} ${noto.variable} ${jetbrains.variable} bg-gradient-to-br from-indigo-50 via-sky-50`}
    >
      <body>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
