"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const memoryPages = [
  {
    title: "The First Lecture",
    image: "/assets/chapter1/first-lecture-watercolor.png",
    alt: "Watercolor illustration of the first lecture",
    lines: [
      "那年夏天，",
      "我第一次走进您的课堂。",
      "坐在第一排，",
      "听您讲述语言学习与世界之间的联系。",
    ],
  },
  {
    title: "A Signed Book",
    image: "/assets/chapter1/signed-book-watercolor.png",
    alt: "Watercolor illustration of a signed book",
    imageClassName: "chapter-memory-photo-wide",
    lines: [
      "下课后，",
      "我捧着《第二语言习得》走向您。",
      "请您留下了",
      "一行珍贵的签名。",
    ],
  },
  {
    title: "A Summer Evening",
    image: "/assets/chapter1/summer-evening-watercolor.png",
    alt: "Watercolor illustration of a summer evening beside Weiming Lake",
    imageClassName: "chapter-memory-photo-wide",
    lines: [
      "那天晚上，",
      "我沿着未名湖散步。",
      "思索着我的人生",
      "是否也能像老师一样充满无限的可能。",
    ],
  },
];

export default function Encounter2024() {
  const [turnKey, setTurnKey] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const currentPage = memoryPages[pageIndex];

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
          return memoryPages.length - 1;
        }
        return next % memoryPages.length;
      });
    }, 430);
    window.setTimeout(() => setIsTurning(false), 1060);
  };

  return (
    <main className="chapter-book-shell">
      <motion.header
        className="chapter-book-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1>
          <span>2024 Summer</span>
          <span>Encounter</span>
        </h1>
      </motion.header>

      <button
        type="button"
        className="chapter-book-hitarea"
        onClick={() => turnPage(1)}
        aria-label="Open the first lecture memory page"
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
                className={`chapter-memory-photo ${currentPage.imageClassName ?? ""}`}
                initial={{ opacity: 0, scale: 0.985, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={currentPage.image}
                  alt={currentPage.alt}
                />
              </motion.figure>
            </div>

            <div className="chapter-page chapter-page-right">
              <motion.div
                key={`${pageIndex}-text`}
                className="chapter-memory-text"
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

                <div className="chapter-narration-lines">
                  {currentPage.lines.map((line, index) => (
                    <motion.p
                      key={line}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.86,
                        delay: 0.95 + index * 0.34,
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
        aria-label="Previous memory page"
      >
        <span />
      </button>
      <button
        type="button"
        className="chapter-book-arrow chapter-book-arrow-right"
        onClick={() => turnPage(1)}
        aria-label="Next memory page"
      >
        <span />
      </button>

      <div className="chapter-book-dots" aria-hidden="true">
        {memoryPages.map((page, index) => (
          <span key={page.title} className={index === pageIndex ? "is-active" : ""} />
        ))}
      </div>
    </main>
  );
}
