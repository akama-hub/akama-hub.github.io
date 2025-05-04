"use client";

import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import nextConfig from "@/next.config";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

const BASE_PATH = nextConfig.basePath || "";

// ----------------------------- 型定義 -----------------------------------------
interface NewsItem {
  date: string;
  title: string;
  link: string;
}

interface EventItem {
  title: string;
  date: string;
  location: string;
  image: string;
  link?: string;
}

interface MarqueeImage {
  src: string;
  alt: string;
}

// --------------------------- ダミーデータ --------------------------------------
const newsItems: NewsItem[] = [
  { date: "2025.05.04", title: "大阪城公園で春のバラまつり開催！", link: "#" },
  {
    date: "2025.05.03",
    title: "天王寺公園の新しい遊具エリアがオープン",
    link: "#",
  },
  {
    date: "2025.05.02",
    title: "鶴見緑地でホタル観賞イベント開催予定",
    link: "#",
  },
];

const events: EventItem[] = [
  {
    title: "バラまつり2025",
    date: "2025年5月15日〜5月30日",
    location: "大阪城公園",
    image: `${BASE_PATH}/images/rose.jpg`,
    link: "#",
  },
  {
    title: "夏の夜市",
    date: "2025年7月20日〜8月31日",
    location: "天王寺公園",
    image: `${BASE_PATH}/images/night.jpg`,
    link: "#",
  },
  {
    title: "ホタル観賞会",
    date: "2025年6月1日〜6月15日",
    location: "鶴見緑地",
    image: `${BASE_PATH}/images/firefly.jpg`,
    link: "#",
  },
];

const parkImages: MarqueeImage[] = [
  { src: `${BASE_PATH}/images/park.jpg`, alt: "桜が咲く大阪城公園の春の風景" },
  { src: `${BASE_PATH}/images/park2.jpg`, alt: "夕暮れの天王寺公園と通天閣" },
  { src: `${BASE_PATH}/images/park3.jpg`, alt: "緑豊かな鶴見緑地の木漏れ日" },
];

const gardenImages: MarqueeImage[] = [
  {
    src: `${BASE_PATH}/images/garden.jpg`,
    alt: "大阪の公園で咲く色とりどりの花々",
  },
  {
    src: `${BASE_PATH}/images/garden2.jpg`,
    alt: "大阪の公園で咲く色とりどりの花々",
  },
  {
    src: `${BASE_PATH}/images/garden3.jpg`,
    alt: "大阪の公園で咲く色とりどりの花々",
  },
  {
    src: `${BASE_PATH}/images/garden4.jpg`,
    alt: "大阪の公園で咲く色とりどりの花々",
  },
  {
    src: `${BASE_PATH}/images/garden5.jpg`,
    alt: "大阪の公園で咲く色とりどりの花々",
  },
];

const MarqueeRow = ({
  images,
  direction = "right",
  speed = 30, // アニメーション秒数（小さいほど速い）
}: {
  images: MarqueeImage[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const duplicated = [...images, ...images];
  const animationName = direction === "left" ? "marquee-left" : "marquee-right";
  const style: HTMLAttributes<HTMLDivElement>["style"] = {
    animation: `${animationName} ${speed}s linear infinite`,
  };

  return (
    <div className="relative h-36 overflow-hidden select-none" aria-hidden>
      <div className="flex w-max gap-4" style={style}>
        {duplicated.map(({ src, alt }, idx) => (
          <div key={`${src}-${idx}`} className="relative h-36 w-64 shrink-0">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="256px"
              className="object-cover rounded-lg"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// ------------------------------ Page ------------------------------------------
export default function Landing() {
  return (
    <div>
      {/* --- ヘッダー ---------------------------------------------------------- */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
        <nav
          aria-label="サイト全体のナビゲーション"
          className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4"
        >
          <div className="text-xl font-bold text-emerald-700">
            みどりの都市・大阪
          </div>
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link href="/landing" className="hover:text-emerald-700">
                公園を探す
              </Link>
            </li>
            <li>
              <Link href="/landing" className="hover:text-emerald-700">
                イベント
              </Link>
            </li>
            <li>
              <Link href="/landing" className="hover:text-emerald-700">
                サイトについて
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main" className="min-h-screen">
        {/* ---------- Hero Section (2 段マルキー) ---------------------------- */}
        <section
          aria-label="都市の緑を感じるヒーローイメージ"
          className="relative bg-black"
        >
          {/* オーバーレイ */}
          <div className="absolute inset-0 z-10 bg-black/40" />

          {/* マルキー 2 段 */}
          <div className="relative z-0 flex flex-col gap-4 py-8">
            {/* 上段：左→右に流れる */}
            <MarqueeRow direction="right" speed={40} images={parkImages} />
            {/* 下段：右→左に流れる */}
            <MarqueeRow direction="left" speed={40} images={gardenImages} />
          </div>

          {/* キャッチコピー */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
                都市と自然が調和する <wbr /> 大阪の公園へ
              </h1>
              <p className="text-lg md:text-2xl text-white/90">
                心地よい緑に包まれた憩いの時間をお過ごしください
              </p>
            </div>
          </div>

          {/* グローバル keyframes */}
          <style jsx global>{`
            @keyframes marquee-left {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            @keyframes marquee-right {
              0% {
                transform: translateX(-50%);
              }
              100% {
                transform: translateX(0%);
              }
            }
          `}</style>
        </section>

        {/* News Section – 最新 3 件のみ表示 + もっと見る */}
        <section
          className="py-16 bg-white dark:bg-gray-900"
          aria-labelledby="news-heading"
        >
          <div className="mx-auto max-w-7xl px-4">
            <h2 id="news-heading" className="text-3xl font-bold mb-8">
              最新のお知らせ
            </h2>
            <div className="space-y-4">
              {newsItems.map(({ date, title, link }, idx) => (
                <div
                  key={`${title}-${idx}`}
                  className="border-b border-gray-200 dark:border-gray-700 pb-4"
                >
                  <Link
                    href={link}
                    className="group flex items-start p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <time
                      dateTime={date.replace(/\./g, "-")}
                      className="w-32 text-gray-600 dark:text-gray-400 shrink-0"
                    >
                      {date}
                    </time>
                    <span className="flex-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                      {title}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/news" className="inline-block">
                <Button variant="outline">お知らせ一覧を見る</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Events Section – Card コンポーネントで視覚階層化 */}
        <section
          className="py-16 bg-gray-50 dark:bg-gray-800"
          aria-labelledby="event-heading"
        >
          <div className="mx-auto max-w-7xl px-4">
            <h2 id="event-heading" className="text-3xl font-bold mb-8">
              注目イベント
            </h2>
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-3" role="list">
              {events.map(({ title, date, location, image, link }) => (
                <li key={title}>
                  <Card className="overflow-hidden focus-within:ring-2 focus-within:ring-emerald-600">
                    <Link href={link ?? "#"} aria-label={`${title} の詳細`}>
                      <div className="relative h-48 w-full">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                          {title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-400 mb-1">
                          {date}
                        </p>
                        <p className="text-gray-700 dark:text-gray-400">
                          {location}
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <Button variant="outline">
                <Link href="/events">すべてのイベントを見る</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section
          className="py-16 bg-emerald-700 dark:bg-green-800"
          aria-labelledby="cta-heading"
        >
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 id="cta-heading" className="text-3xl font-bold text-white mb-4">
              公園でスタンプラリーに参加しよう！
            </h2>
            <p className="text-xl text-white/95 mb-8">
              緑あふれる公園を巡って、スタンプを集めましょう
            </p>
            <Link
              href="/stamp-rally"
              className="inline-block text-white text-lg border rounded-4xl w-[250px] h-[50px] p-2 border-white/50 hover:border-white/100 transition-colors"
            >
              スタンプラリーに参加する
            </Link>
          </div>
        </section>
      </main>

      {/* フッター – SNS 動線を固定 */}
      <footer
        className="bg-gray-100 dark:bg-gray-900 py-8"
        aria-label="フッター"
      >
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-600 dark:text-gray-400">
          <nav aria-label="SNS リンク">
            <ul className="flex gap-4">
              <li>
                <Link
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700"
                >
                  X (旧Twitter)
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700"
                >
                  Facebook
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
