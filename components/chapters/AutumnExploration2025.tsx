"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { withBasePath } from "@/lib/basePath";

const autumnPages = [
  {
    title: "Across The Distance",
    image: "/assets/chapter4/across-the-distance.png",
    alt: "Watercolor memory of the teacher speaking at UCL Institute of Education",
    lines: [
      "在UCL IOE大楼，",
      "时隔四个月，",
      "我再一次见到老师。",
      "从北京到伦敦，",
      "跨越万里的距离，",
      "我再次感受到您在国际中文教育领域",
      "持续探索的学术力量。",
    ],
  },
  {
    title: "Following Your Footsteps",
    image: "/assets/chapter4/following-footsteps.png",
    alt: "Watercolor memory of a misty autumn day in Cambridge",
    lines: [
      "深秋的剑桥，",
      "细雨与薄雾交织。",
      "漫步在古老的小镇与学院之间，",
      "追寻您求学岁月中",
      "留下的足迹。",
    ],
  },
  {
    title: "A Step Forward",
    image: "/assets/chapter4/a-step-forward.png",
    alt: "Watercolor memory of teaching practice and a classroom presentation",
    lines: [
      "在您的指导与影响下，",
      "我开始勇敢地迎接新的挑战。",
      "从课堂学习到教学实践，",
      "每一次尝试都是一次成长。",
      "在不断探索与突破的过程中，",
      "我也逐渐看见了更加成熟的自己。",
    ],
  },
];

export default function AutumnExploration2025() {
  const [turnKey, setTurnKey] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const currentPage = autumnPages[pageIndex];
  const hasMultiplePages = autumnPages.length > 1;

  const turnPage = (direction: 1 | -1 = 1) => {
    if (isTurning || !hasMultiplePages) {
      return;
    }

    setTurnKey((value) => value + 1);
    setIsTurning(true);
    window.setTimeout(() => {
      setPageIndex((value) => {
        const next = value + direction;
        if (next < 0) {
          return autumnPages.length - 1;
        }
        return next % autumnPages.length;
      });
    }, 430);
    window.setTimeout(() => setIsTurning(false), 1060);
  };

  return (
    <main className="chapter-book-shell chapter-book-shell-distance">
      <motion.header
        className="chapter-book-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1>
          <span>2025 Autumn</span>
          <span>Exploration</span>
        </h1>
      </motion.header>

      <button
        type="button"
        className="chapter-book-hitarea"
        onClick={() => turnPage(1)}
        aria-label="Turn the autumn exploration memory page"
      >
        <motion.div
          className="chapter-book"
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: hasMultiplePages ? -4 : 0 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="chapter-book-shadow" />
          <div className="chapter-book-pages">
            <div className="chapter-page chapter-page-left">
              <motion.figure
                key={`${pageIndex}-image`}
                className="chapter-memory-photo chapter-memory-photo-distance"
                initial={{ opacity: 0, scale: 0.985, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={withBasePath(currentPage.image)} alt={currentPage.alt} />
              </motion.figure>
            </div>

            <div className="chapter-page chapter-page-right">
              <motion.div
                key={`${pageIndex}-text`}
                className="chapter-memory-text chapter-memory-text-distance"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.45 }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.64, ease: [0.22, 1, 0.36, 1] }}
                >
                  {currentPage.title}
                </motion.h2>

                <div className="chapter-narration-lines chapter-narration-lines-dense">
                  {currentPage.lines.map((line, index) => (
                    <motion.p
                      key={line}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.86,
                        delay: 0.95 + index * 0.28,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="chapter-page-gutter" />
            <div className="chapter-page-stack chapter-page-stack-left" />
            <div className="chapter-page-stack chapter-page-stack-right" />

            <motion.div
              key={turnKey}
              className="chapter-turning-page"
              initial={turnKey === 0 ? { opacity: 0, rotateY: -5 } : { opacity: 1, rotateY: -4 }}
              animate={
                turnKey === 0 || !isTurning
                  ? { opacity: 0, rotateY: -5 }
                  : { opacity: 0, rotateY: -174 }
              }
              transition={{ duration: 1.05, ease: [0.77, 0, 0.175, 1] }}
            />
          </div>
        </motion.div>
      </button>

      {hasMultiplePages && (
        <>
          <button
            type="button"
            className="chapter-book-arrow chapter-book-arrow-left"
            onClick={() => turnPage(-1)}
            aria-label="Previous autumn page"
          >
            <span />
          </button>
          <button
            type="button"
            className="chapter-book-arrow chapter-book-arrow-right"
            onClick={() => turnPage(1)}
            aria-label="Next autumn page"
          >
            <span />
          </button>

          <div className="chapter-book-dots" aria-hidden="true">
            {autumnPages.map((page, index) => (
              <span key={page.title} className={index === pageIndex ? "is-active" : ""} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
