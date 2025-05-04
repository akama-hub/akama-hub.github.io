"use client";
import nextConfig from "@/next.config";
import { motion, useAnimation, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";

type Location = {
  id: number;
  name: string;
  lat: number;
  lon: number;
  description: string;
  image: string;
};
const BASE_PATH = nextConfig.basePath || "";
const LOCATIONS: Location[] = [
  {
    id: 1,
    name: "大阪城公園",
    lat: 34.687315,
    lon: 135.525767,
    description: "大阪のシンボル、大阪城公園です。",
    image: `${BASE_PATH}/images/castle.jpg`,
  },
  {
    id: 2,
    name: "天王寺公園",
    lat: 34.647785,
    lon: 135.511455,
    description: "大阪市内最大級の都市公園です。",
    image: `${BASE_PATH}/images/tennoji.jpg`,
  },
  //   {
  //     id: 3,
  //     name: "靱公園",
  //     latitude: 34.684866,
  //     longitude: 135.486595,
  //     description: "バラ園が有名な都会のオアシスです。",
  //   },
  {
    id: 4,
    name: "長居公園",
    lat: 34.616157,
    lon: 135.523257,
    description: "スポーツ施設も充実した総合公園です。",
    image: `${BASE_PATH}/images/nagai.jpg`,
  },
  {
    id: 5,
    name: "鶴見緑地",
    lat: 34.708611,
    lon: 135.575556,
    description: "広大な敷地を持つ都市公園です。",
    image: `${BASE_PATH}/images/tsurumi.jpg`,
  },
];

/* ────────── Animation helpers ────────── */
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  },
});
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ────────── Utility fn ────────── */
const distanceM = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const dφ = ((lat2 - lat1) * Math.PI) / 180;
  const dλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(dλ / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

/* ────────── Component ────────── */
export default function StampRally() {
  const [stamps, setStamps] = useState<number[]>([]);
  const [pos, setPos] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState("");
  const confetti = useAnimation(); // 祝賀アニメ
  const progress = (stamps.length / LOCATIONS.length) * 100;

  /* ── 初期読込 & 位置ウォッチ ── */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("collectedStamps") || "[]");
    setStamps(saved);

    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (p) => {
          setPos(p);
          setError("");
        },
        () => setError("位置情報の取得に失敗しました。設定を確認してください。")
      );
      return () => navigator.geolocation.clearWatch(id);
    } else setError("お使いのブラウザは位置情報をサポートしていません。");
  }, []);

  /* ── 全スタンプ取得時に紙吹雪 ── */
  useEffect(() => {
    if (stamps.length === LOCATIONS.length)
      confetti.start({
        opacity: [0, 1, 0],
        scale: [0.8, 1, 0.8],
        rotate: [0, 720],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      });
  }, [stamps.length, confetti]);

  /* ── 位置に近づいたらスタンプ ── */
  const tryCollect = (id: number) => {
    if (!pos) return setError("現在地を取得できていません");
    const loc = LOCATIONS.find((l) => l.id === id)!;
    const d = distanceM(
      pos.coords.latitude,
      pos.coords.longitude,
      loc.lat,
      loc.lon
    );
    if (d <= 200) {
      if (!stamps.includes(id)) {
        const newStamps = [...stamps, id];
        setStamps(newStamps);
        localStorage.setItem("collectedStamps", JSON.stringify(newStamps));
      }
    } else setError("スポットまで近づいてください（200m以内）");
  };

  /* ── JSX ── */
  return (
    <section className="relative isolate overflow-hidden py-20  to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      {/* aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,var(--tw-gradient-stops))] from-[rgb(var(--accent)_/_0.15)] via-transparent to-transparent"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-5xl px-4"
      >
        <motion.h1
          variants={fadeUp()}
          className="font-heading text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-slate-100"
        >
          公園を廻ろう スタンプラリー
        </motion.h1>

        {/* エラーバナー */}
        {error && (
          <motion.div
            variants={fadeUp(0.1)}
            className="mx-auto mt-6 max-w-lg bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-6 py-3 rounded-xl"
          >
            {error}
          </motion.div>
        )}

        {/* カードグリッド */}
        <motion.div
          variants={stagger}
          className="mt-16 grid gap-8 sm:grid-cols-2"
        >
          {LOCATIONS.map((l, idx) => {
            const collected = stamps.includes(l.id);
            const d =
              pos &&
              Math.round(
                distanceM(
                  pos.coords.latitude,
                  pos.coords.longitude,
                  l.lat,
                  l.lon
                )
              );
            const near = d !== null && d <= 200;

            return (
              <motion.article
                key={l.id}
                variants={fadeUp(idx * 0.05)}
                className="relative backdrop-blur-sm bg-white/70 dark:bg-slate-800/60 ring-1 ring-slate-900/5 dark:ring-white/10 rounded-2xl overflow-hidden transition-all"
              >
                {/* image */}
                <Image
                  src={l.image}
                  alt={l.name}
                  width={500}
                  height={320}
                  className="h-40 w-full object-cover"
                  priority={idx < 2}
                />
                {/* body */}
                <div className="p-6 flex flex-col gap-4">
                  <h2 className="font-semibold text-lg">{l.name}</h2>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-300 line-clamp-3">
                    {l.description}
                  </p>

                  {/* distance badge */}
                  {pos && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${
                        near
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-800/50 dark:text-emerald-300"
                          : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {d}m
                    </span>
                  )}

                  {/* action */}
                  {collected ? (
                    <span className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-800/50 text-emerald-700 dark:text-emerald-300 rounded-md mt-2">
                      スタンプ獲得済み！
                    </span>
                  ) : (
                    <button
                      onClick={() => tryCollect(l.id)}
                      className={`mt-2 px-4 py-2 rounded-md font-medium transition-colors ${
                        near
                          ? "bg-[rgb(var(--accent)_/_1)] text-white hover:opacity-90"
                          : "bg-gray-300 dark:bg-slate-600 text-white cursor-not-allowed"
                      }`}
                      disabled={!near}
                    >
                      {near ? "スタンプゲット" : "スポットに近づいて下さい"}
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* 進捗バー */}
        <motion.div variants={fadeUp(0.3)} className="mt-20 max-w-md mx-auto">
          <h3 className="font-semibold mb-3 text-center">進捗状況</h3>
          <div className="h-4 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[rgb(var(--accent)_/_1)] to-emerald-400 dark:to-emerald-500"
            />
          </div>
          <p className="mt-2 text-center text-sm">
            {stamps.length} / {LOCATIONS.length} スポット完了
          </p>
        </motion.div>

        {/* 祝賀モーション */}
        {stamps.length === LOCATIONS.length && (
          <motion.div
            animate={confetti}
            className="pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(circle_at_center,theme(colors.yellow.400)_0%,transparent_70%)]"
          />
        )}
      </motion.div>

      {/* 現在地リクエスト (モバイルで押しやすい) */}
      <button
        onClick={() =>
          navigator.geolocation.getCurrentPosition(
            () => {},
            () =>
              setError(
                "位置情報を更新できませんでした。設定を確認してください。"
              )
          )
        }
        aria-label="現在地を更新"
        className="fixed bottom-6 right-6 grid place-items-center w-12 h-12 rounded-full bg-[rgb(var(--accent)_/_1)] text-white shadow-lg hover:scale-110 transition-transform"
      >
        <HiLocationMarker className="w-6 h-6" />
      </button>
    </section>
  );
}
