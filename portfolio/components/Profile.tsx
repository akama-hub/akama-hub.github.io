"use client";
import nextConfig from "@/next.config";
import { motion, Variants } from "framer-motion";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaGamepad,
  FaGithub,
  FaGraduationCap,
  FaMicrochip,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { TbPalette } from "react-icons/tb";

const dancingScript = Dancing_Script({ subsets: ["latin"] });
const BASE_PATH = nextConfig.basePath || "";

/* ────────── Animation helpers ────────── */
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 42 },
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

/* ────────── UI primitives ────────── */
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    variants={fadeUp()}
    className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight
               text-center text-gray-800 dark:text-slate-100"
  >
    {children}
  </motion.h2>
);

const Card = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.article
    variants={fadeUp()}
    whileHover={{
      y: -4,
      rotate: -1,
      filter: "drop-shadow(0 12px 18px rgba(0,0,0,.12))",
    }}
    className="relative rounded-2xl p-5 backdrop-blur-sm bg-white/70 dark:bg-slate-800/60 ring-1 ring-slate-900/5 dark:ring-white/10 transition-all"
  >
    <header className="flex items-center gap-3 mb-3 text-[var(--accent)]">
      {icon}
      <h3 className="font-semibold">{title}</h3>
    </header>
    <div className="text-sm leading-relaxed text-gray-700 dark:text-slate-300">
      {children}
    </div>
  </motion.article>
);

/* ────────── Main component ────────── */
export default function Profile() {
  /* ---------------- Theme 状態管理 ---------------- */
  const colorThemes = ["indigo", "emerald", "rose"] as const;
  const [color, setColor] = useState<(typeof colorThemes)[number]>("indigo");

  /* 初期読み込み：localStorage or OS */
  useEffect(() => {
    const savedColor = (localStorage.getItem("color") ??
      "indigo") as (typeof colorThemes)[number];
    setColor(savedColor);
    document.documentElement.dataset.theme = savedColor;
  }, []);

  const cycleColor = () => {
    const next =
      colorThemes[(colorThemes.indexOf(color) + 1) % colorThemes.length];
    setColor(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("color", next);
  };

  /* ---------------- View ---------------- */
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-50 via-sky-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      {/* ── Hero ─────────────────────────── */}
      <div className="relative h-[42vh] md:h-[56vh]">
        <Image
          src={`${BASE_PATH}/images/tech.jpg`}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        {/* 上に重ねるカラーフィルター */}
        <div className="absolute inset-0 bg-[var(--accent)]/50 mix-blend-multiply" />

        <div
          className="absolute inset-x-0 bottom-0 top-1/2 z-10
                    flex items-center justify-center
                    px-4 text-center text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow ${dancingScript.className}`}
          >
            &nbsp;Shape&nbsp;Tommorow.
            <br></br>
            Step&nbsp;by&nbsp;Step,
          </motion.h1>
        </div>
      </div>

      {/* ── フローティングトグル ── */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* Color */}
        <button
          onClick={cycleColor}
          aria-label="カラーテーマ切替"
          className="grid place-items-center w-11 h-11 rounded-full bg-[var(--accent)] text-white shadow hover:scale-110 transition-transform"
        >
          <TbPalette className="w-5 h-5 text-blue-500" />
        </button>
      </div>

      {/* ── Intro ─────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto max-w-3xl px-4 text-center space-y-6 py-16"
      >
        <SectionTitle>Profile</SectionTitle>
        <motion.p
          variants={fadeUp(0.1)}
          className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-slate-400"
        >
          ソフトウェアエンジニアの <strong>akama-hub</strong> です。本業では
          Python を使用した AI 開発に従事し、副業では Angular や Next.js
          を用いた Web システム開発を行っています。
        </motion.p>
      </motion.div>

      {/* ── Skill & History ──────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-6xl gap-12 px-4 sm:grid-cols-2 pb-20"
      >
        {/* Skill */}
        <motion.div variants={fadeUp(0.2)} className="space-y-6">
          <SectionTitle>Skill</SectionTitle>
          <div className="space-y-5">
            <Card
              icon={<FaPython className="w-5 h-5" />}
              title="AI/ML Development"
            >
              Python, PyTorch による機械学習モデルの開発
            </Card>
            <Card
              icon={<FaReact className="w-5 h-5" />}
              title="Web Development"
            >
              <p>Next.js / Angular によるフロントエンド開発</p>
              <p>Firebase / Supabase を利用した BaaS 統合</p>
            </Card>
            <Card
              icon={<FaMicrochip className="w-5 h-5" />}
              title="Systems Development"
            >
              <p>C による組み込みソフトウェア開発</p>
              <div className="flex items-center gap-2 mt-1">
                <FaGamepad className="w-4 h-4" />
                <p>C# によるゲーム開発</p>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* History */}
        <motion.div variants={fadeUp(0.2)} className="space-y-6">
          <SectionTitle>History</SectionTitle>
          <div className="space-y-5">
            <Card icon={<FaPython className="w-5 h-5" />} title="2024/9 – 現在">
              株式会社 pluszero - AI 開発エンジニア
            </Card>
            <Card icon={<FaReact className="w-5 h-5" />} title="2023/8 – 現在">
              Akama System - Web アプリケーション開発
            </Card>
            <Card
              icon={<FaMicrochip className="w-5 h-5" />}
              title="2023/4 – 2024/8"
            >
              Panasonic 株式会社 - 組み込みソフトウェア開発
            </Card>
            <Card
              icon={<FaGraduationCap className="w-5 h-5" />}
              title="2021/4 – 2023/3"
            >
              大阪大学大学院 情報科学研究科（修士）
              <br />
              情報ネットワーク学専攻
              <br />
              &ldquo;Deep Reinforcement Learning Model Design and Transmission
              for Network Delay Compensation in 3D Online Shooting Game&rdquo;
              の題で、
              <a href="https://ccnc2023.ieee-ccnc.org/detailed-program">
                IEEE Consumer Communications & Networking Conferenc
              </a>
              にて発表
            </Card>
            <Card
              icon={<FaGraduationCap className="w-5 h-5" />}
              title="2017/4 – 2021/3"
            >
              大阪大学 工学部（学士）
              <br />
              電子情報工学科
            </Card>
          </div>
        </motion.div>
      </motion.div>

      {/* ── GitHub CTA ───────────────────── */}
      <motion.div
        variants={fadeUp(0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="pb-20 text-center"
      >
        <a
          href="https://github.com/akama-hub"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold btn-accent shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <FaGithub className="w-5 h-5" />
          GitHub プロフィールを見る
        </a>
      </motion.div>
    </section>
  );
}
