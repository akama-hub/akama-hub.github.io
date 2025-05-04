"use client";

import nextConfig from "@/next.config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const BASE_PATH = nextConfig.basePath || "";

type NewsItem = {
  date: string;
  title: string;
  link: string;
};

type Event = {
  title: string;
  date: string;
  location: string;
  image: string;
};

export default function Landing() {
  const [activeSlide, setActiveSlide] = useState(0);

  const newsItems: NewsItem[] = [
    {
      date: "2024.05.04",
      title: "大阪城公園で春のバラまつり開催！",
      link: "#",
    },
    {
      date: "2024.05.03",
      title: "天王寺公園の新しい遊具エリアがオープン",
      link: "#",
    },
    {
      date: "2024.05.02",
      title: "鶴見緑地でホタル観賞イベント開催予定",
      link: "#",
    },
  ];

  const events: Event[] = [
    {
      title: "バラまつり2024",
      date: "2024年5月15日〜5月30日",
      location: "大阪城公園",
      image: `${BASE_PATH}/images/rose.jpg`,
    },
    {
      title: "夏の夜市",
      date: "2024年7月20日〜8月31日",
      location: "天王寺公園",
      image: `${BASE_PATH}/images/night.jpg`,
    },
    {
      title: "ホタル観賞会",
      date: "2024年6月1日〜6月15日",
      location: "鶴見緑地",
      image: `${BASE_PATH}/images/firefly.jpg`,
    },
  ];

  const heroImages = [
    "/images/park.jpg",
    "/images/park2.jpg",
    "/images/park3.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000
              ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
          >
            <div className="absolute inset-0 bg-black/30 z-10" />

            <Image
              src={image}
              alt="公園の風景"
              fill
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              公園へようこそ
            </h1>
            <p className="text-xl md:text-2xl">
              自然と調和する都市の憩いの空間
            </p>
          </div>
        </div>
      </div>

      {/* News Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">お知らせ</h2>
          <div className="space-y-4">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <Link
                  href={item.link}
                  className="group flex items-start hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg transition-colors"
                >
                  <span className="text-gray-600 dark:text-gray-400 w-32">
                    {item.date}
                  </span>
                  <span className="flex-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.title}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">イベント情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    {event.date}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-emerald-500 dark:bg-green-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            公園でスタンプラリーに参加しよう！
          </h2>
          <p className="text-xl text-white/90 mb-8">
            緑あふれる公園を巡って、スタンプを集めましょう
          </p>
          <Link
            href="/stamp-rally"
            className="inline-block bg-white text-emerald-500 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors"
          >
            スタンプラリーに参加する
          </Link>
        </div>
      </section>
    </div>
  );
}
