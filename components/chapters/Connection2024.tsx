"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { withBasePath } from "@/lib/basePath";

const connectionPages = [
  {
    title: "The First Photograph",
    image: "/assets/chapter1/connection-first-photograph.png",
    alt: "Watercolor illustration of the first photograph",
    lines: [
      "在汉教英雄会的交流现场，",
      "我代表北理学生团队进行汇报。",
      "您作为本场点评嘉宾，",
      "在交流中给予我们指导，",
      "并在最后为我们颁发",
      "“最佳智慧教育团队”荣誉，",
      "这也是我与您的第一张合影。",
    ],
  },
  {
    title: "A Teacher's Voice",
    image: "/assets/chapter2/teacher-voice.png",
    alt: "Watercolor illustration of a teacher speaking during the review session",
    lines: [
      "在点评环节，",
      "您从自己的教学实践出发，",
      "分享了对于汉语教学的理解与思考。",
      "由此，",
      "让我对您的课堂产生了无限的向往。",
    ],
  },
  {
    title: "A Scholar's Perspective",
    image: "/assets/chapter2/scholar-perspective.png",
    alt: "Watercolor illustration of a scholar speaking at an academic conference",
    lines: [
      "在世界汉语教学学会年会上，",
      "我听您讲到老舍与中文。",
      "您引经据典，",
      "从文学到语言，",
      "从文化到教学，",
      "展现了中文教育的深度与广度。",
    ],
  },
];

export default function Connection2024() {
  const [turnKey, setTurnKey] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const currentPage = connectionPages[pageIndex];

  const turnPage = (direction: 1 | -1 = 1) => {
    if (isTurning) {
      return;
    }

    setTurnKey((value) => value + 1);
    setIsTurning(true);
    window.setTimeout(() => {
      setPageIndex((value) => {
        const next = value + direction;
        if (next < 0) {
          return connectionPages.length - 1;
        }
        return next % connectionPages.length;
      });
    }, 430);
    window.setTimeout(() => setIsTurning(false), 1060);
  };

  return (
    <main className="chapter-book-shell chapter-book-shell-autumn">
      <motion.header
        className="chapter-book-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1>
          <span>2024 Autumn</span>
          <span>Admiration</span>
        </h1>
      </motion.header>

      <button
        type="button"
        className="chapter-book-hitarea"
        onClick={() => turnPage(1)}
        aria-label="Turn the admiration memory page"
      >
        <motion.div
          className="chapter-book"
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: -4 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="chapter-book-shadow" />
          <div className="chapter-book-pages">
            <div className="chapter-page chapter-page-left">
              <motion.figure
                key={`${pageIndex}-image`}
                className="chapter-memory-photo chapter-memory-photo-connection"
                initial={{ opacity: 0, scale: 0.985, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={withBasePath(currentPage.image)}
                  alt={currentPage.alt}
                />
              </motion.figure>
            </div>

            <div className="chapter-page chapter-page-right">
              <motion.div
                key={`${pageIndex}-text`}
                className="chapter-memory-text chapter-memory-text-autumn"
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

      <button
        type="button"
        className="chapter-book-arrow chapter-book-arrow-left"
        onClick={() => turnPage(-1)}
        aria-label="Previous admiration page"
      >
        <span />
      </button>
      <button
        type="button"
        className="chapter-book-arrow chapter-book-arrow-right"
        onClick={() => turnPage(1)}
        aria-label="Next admiration page"
      >
        <span />
      </button>

      <div className="chapter-book-dots" aria-hidden="true">
        {connectionPages.map((page, index) => (
          <span key={page.title} className={index === pageIndex ? "is-active" : ""} />
        ))}
      </div>
    </main>
  );
}
