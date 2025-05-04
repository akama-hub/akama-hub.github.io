"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

/* ────────── Data & Types ────────── */
type Project = {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  cover?: string;
};

const projects: Project[] = [
  {
    title: "ビル管理システム",
    description:
      "大阪大学との共同研究にて、Next.js × Supabase で構築したビル管理システム。ビルに搭載されたセンサ情報をもとにビル内の異常やセンサの故障を検知",
    technologies: [
      "Next.js",
      "PostgreSQL",
      "Typescript/HTML/CSS",
      "AWS",
      "Bedrock",
    ],
    cover: "/images/building.jpg",
  },
  {
    title: "不動産の分析システム",
    description:
      "Angular × Supabase で構築した不動産の分析システム。東京の不動産データをもとに、価格推移や物件の特徴を分析するシステム",
    technologies: ["Angular", "PostgreSQL", "Typescript/HTML/CSS", "AWS", "S3"],
    cover: "/images/chart.jpg",
  },
  /* 好きなだけ追加可能 */
];

/* ────────── Tiltable Card ────────── */
function TiltCard({ p }: { p: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5〜0.5
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(dx);
    y.set(dy);
  };

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="relative flex-shrink-0 w-80 md:w-96 snap-center rounded-2xl ring-1 ring-slate-900/5 dark:ring-white/10 backdrop-blur-sm bg-white/70 dark:bg-slate-800/60 transition-transform"
    >
      {/* Cover */}
      {p.cover && (
        <div
          className="h-40 w-full bg-cover bg-center rounded-t-2xl"
          style={{ backgroundImage: `url(${p.cover})` }}
        />
      )}
      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-slate-100">
          {p.title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-300 line-clamp-4">
          {p.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2">
          {p.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[rgb(var(--accent)_/_.08)] dark:bg-[rgb(var(--accent)_/_.14)]
                         text-[rgb(var(--accent)_/_1)] text-xs font-medium px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        {/* GitHub */}
        {p.githubUrl && (
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-1 text-sm font-medium
                       text-[rgb(var(--accent)_/_1)] hover:underline"
          >
            <FaGithub className="w-4 h-4" />
            GitHub Repository
          </a>
        )}
      </div>
    </motion.article>
  );
}

/* ────────── Main Component ────────── */
export default function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  /* Scroll helpers */
  const scrollAmount = 320; // px
  const scrollLeft = () =>
    trackRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  const scrollRight = () =>
    trackRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-gradient-to-b from-transparent via-sky-50 to-white dark:via-slate-900 dark:to-slate-900 py-20"
    >
      {/* 背景ぼかし */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10
                   bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]
                   from-[rgb(var(--accent)_/_0.15)] via-transparent to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4">
        <h2
          className="font-heading text-3xl md:text-4xl font-extrabold text-center
                       text-gray-800 dark:text-slate-100"
        >
          Projects
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600 dark:text-slate-400">
          これまでに取り組んだ主な Web アプリケーション開発プロジェクトです。
        </p>

        {/* ── Carousel ── */}
        <div className="relative mt-16">
          {/* Scroll Track */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth
                       snap-mandatory snap-x
                       pb-4 md:pb-6
                       [-webkit-overflow-scrolling:_touch]"
          >
            {projects.map((p) => (
              <TiltCard key={p.title} p={p} />
            ))}
          </div>

          {/* Arrow Buttons (Desktop) */}
          <div className="hidden md:flex absolute inset-y-0 left-0 -translate-x-1/2 items-center">
            <button
              onClick={scrollLeft}
              aria-label="前へ"
              className="grid place-items-center rounded-full bg-white/70 dark:bg-slate-700/70
                         backdrop-blur ring-1 ring-slate-900/10 dark:ring-white/10
                         w-11 h-11 hover:scale-110 transition-transform"
            >
              <HiChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="hidden md:flex absolute inset-y-0 right-0 translate-x-1/2 items-center">
            <button
              onClick={scrollRight}
              aria-label="次へ"
              className="grid place-items-center rounded-full bg-white/70 dark:bg-slate-700/70
                         backdrop-blur ring-1 ring-slate-900/10 dark:ring-white/10
                         w-11 h-11 hover:scale-110 transition-transform"
            >
              <HiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
