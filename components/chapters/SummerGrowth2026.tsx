"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const growthPages = [
  {
    layout: "story",
    title: "Towards The Future",
    image: "/assets/chapter5/towards-the-future.png",
    alt: "Watercolor memory of an academic presentation in summer 2026",
    lines: [
      "从课堂学习到项目实践，",
      "在您的指导与启发下，",
      "我开始尝试用自己的思考",
      "参与这一领域的探索。",
      "当看到我们的成果被带到",
      "更大的学术交流平台，",
      "能够参与其中，",
      "我感到无比荣幸与幸福。",
      "您给予了我前行的方向，",
      "也成为我的人生榜样。",
      "未来，",
      "我将沿着这条道路继续探索与成长。",
    ],
  },
  {
    layout: "closing",
    title: "To Be Continued",
    image: "/assets/chapter5/to-be-continued-blank.png",
    alt: "Watercolor closing page with a blank open book in a sunflower field",
    lines: [],
  },
];

export default function SummerGrowth2026() {
  const [turnKey, setTurnKey] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const currentPage = growthPages[pageIndex];
  const hasMultiplePages = growthPages.length > 1;
  const isClosingPage = currentPage.layout === "closing";

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
          return growthPages.length - 1;
        }
        return next % growthPages.length;
      });
    }, 430);
    window.setTimeout(() => setIsTurning(false), 1060);
  };

  return (
    <main className="chapter-book-shell chapter-book-shell-growth">
      <motion.header
        className="chapter-book-header"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1>
          <span>2026 Summer</span>
          <span>Growth</span>
        </h1>
      </motion.header>

      <button
        type="button"
        className="chapter-book-hitarea"
        onClick={() => turnPage(1)}
        aria-label="Turn the summer growth memory page"
      >
        <motion.div
          className="chapter-book"
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: hasMultiplePages ? -4 : 0 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="chapter-book-shadow" />
          <div className={`chapter-book-pages${isClosingPage ? " chapter-book-pages-closing" : ""}`}>
            {isClosingPage ? (
              <motion.figure
                key={`${pageIndex}-closing`}
                className="chapter-closing-spread"
                initial={{ opacity: 0, scale: 0.985, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={currentPage.image} alt={currentPage.alt} />
                <div className="chapter-closing-sunlight" aria-hidden="true" />
                <div className="chapter-closing-clouds" aria-hidden="true" />
                <div className="chapter-closing-breeze" aria-hidden="true" />
                <div className="chapter-floating-petals" aria-hidden="true">
                  {[1, 2, 3, 4, 5, 6].map((petal) => (
                    <span key={petal} className={`chapter-floating-petal chapter-floating-petal-${petal}`} />
                  ))}
                </div>
                <figcaption className="chapter-handwriting-scene">
                  <span className="chapter-handwritten-copy" aria-label="To Be Continued">
                    <span aria-hidden="true">To Be Continue</span>
                    <span className="chapter-handwritten-final-letter" aria-hidden="true">d</span>
                  </span>
                  <svg
                    className="chapter-writing-pen"
                    viewBox="0 0 154 54"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <g transform="rotate(-17 77 27)">
                      <path
                        d="M8 35 24 20l12 12-16 15-8-4Z"
                        fill="#d8b25b"
                        stroke="#735a25"
                        strokeWidth="1.4"
                      />
                      <path d="m8 35 4 8 8 4-3-9Z" fill="#ede0b3" stroke="#735a25" strokeWidth="1.2" />
                      <path d="m8 35 9 3-5 5Z" fill="#3f3528" />
                      <path
                        d="m24 20 85-18c8-2 15 2 17 9l1 3c2 7-2 13-10 15L36 32Z"
                        fill="#2f3c34"
                        stroke="#253028"
                        strokeWidth="1.6"
                      />
                      <path d="m42 16 67-14c5-1 10 0 13 4L39 24Z" fill="rgba(255,255,255,.2)" />
                      <path d="m109 2 26-2c6 0 10 4 11 9s-2 10-8 12l-21 8Z" fill="#26312c" />
                      <path d="m123 5 17-1" stroke="#d3ad54" strokeWidth="2.2" strokeLinecap="round" />
                    </g>
                  </svg>
                </figcaption>
              </motion.figure>
            ) : (
              <>
                <div className="chapter-page chapter-page-left">
                  <motion.figure
                    key={`${pageIndex}-image`}
                    className="chapter-memory-photo chapter-memory-photo-growth"
                    initial={{ opacity: 0, scale: 0.985, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img src={currentPage.image} alt={currentPage.alt} />
                  </motion.figure>
                </div>

                <div className="chapter-page chapter-page-right">
                  <motion.div
                    key={`${pageIndex}-text`}
                    className="chapter-memory-text chapter-memory-text-growth"
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
                            delay: 0.95 + index * 0.23,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </>
            )}

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
            aria-label="Previous summer growth page"
          >
            <span />
          </button>
          <button
            type="button"
            className="chapter-book-arrow chapter-book-arrow-right"
            onClick={() => turnPage(1)}
            aria-label="Next summer growth page"
          >
            <span />
          </button>

          <div className="chapter-book-dots" aria-hidden="true">
            {growthPages.map((page, index) => (
              <span key={page.title} className={index === pageIndex ? "is-active" : ""} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
