"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { withBasePath } from "@/lib/basePath";

const springPages = [
  {
    title: "A Wednesday Morning",
    image: "/assets/chapter3/wednesday-morning.png",
    alt: "Watercolor classroom scene on a Wednesday morning",
    lines: [
      "非常感谢老师允许我旁听您的课程。",
      "此后，每周三的清晨，",
      "我都会准时来到教室。",
      "坐在第一排，",
      "感受课堂中的学术氛围与思想碰撞。",
      "这是我一周中最期待、",
      "也最幸福的时刻。",
    ],
  },
  {
    title: "A Meaningful Step",
    image: "/assets/chapter3/meaningful-step.png",
    alt: "Watercolor memory of attending an academic conference at Peking University",
    lines: [
      "这是我第一次参加北大的学术会议。",
      "在这里，",
      "我感受到北大浓厚的学术氛围。",
      "从聆听报告到参与交流，",
      "每一次学习与思考，",
      "都让我更加坚定",
      "继续探索国际中文教育领域的想法。",
    ],
  },
  {
    title: "A Precious Moment",
    image: "/assets/chapter3/precious-moment.png",
    alt: "Watercolor portrait with teacher holding flowers in front of the classroom board",
    lines: [
      "这是我最后一次旁听老师的课。",
      "这一学期，",
      "我收获了许多知识与灵感，",
      "也留下了很多珍贵的记忆。",
      "这张合影记录下了",
      "这段难忘的时光。",
      "期待未来还有机会成为老师的学生，",
      "我会继续坐在您课堂的第一排。",
    ],
  },
];

export default function SpringConnection2025() {
  const [turnKey, setTurnKey] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const currentPage = springPages[pageIndex];
  const hasMultiplePages = springPages.length > 1;

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
          return springPages.length - 1;
        }
        return next % springPages.length;
      });
    }, 430);
    window.setTimeout(() => setIsTurning(false), 1060);
  };

  return (
    <main className="chapter-book-shell chapter-book-shell-spring">
      <motion.header
        className="chapter-book-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1>
          <span>2025 Spring</span>
          <span>Connection</span>
        </h1>
      </motion.header>

      <button
        type="button"
        className="chapter-book-hitarea"
        onClick={() => turnPage(1)}
        aria-label="Turn the spring connection memory page"
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
                className="chapter-memory-photo chapter-memory-photo-spring"
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
                className="chapter-memory-text chapter-memory-text-spring"
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
            aria-label="Previous spring page"
          >
            <span />
          </button>
          <button
            type="button"
            className="chapter-book-arrow chapter-book-arrow-right"
            onClick={() => turnPage(1)}
            aria-label="Next spring page"
          >
            <span />
          </button>

          <div className="chapter-book-dots" aria-hidden="true">
            {springPages.map((page, index) => (
              <span key={page.title} className={index === pageIndex ? "is-active" : ""} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
