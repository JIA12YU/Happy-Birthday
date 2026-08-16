"use client";

import { useEffect, useRef, useState } from "react";
import AutumnExploration2025 from "../chapters/AutumnExploration2025";
import Connection2024 from "../chapters/Connection2024";
import Encounter2024 from "../chapters/Encounter2024";
import SpringConnection2025 from "../chapters/SpringConnection2025";
import SummerGrowth2026 from "../chapters/SummerGrowth2026";

const chapters = [
  { label: "2024 Summer", content: <Encounter2024 /> },
  { label: "2024 Autumn", content: <Connection2024 /> },
  { label: "2025 Spring", content: <SpringConnection2025 /> },
  { label: "2025 Autumn", content: <AutumnExploration2025 /> },
  { label: "2026 Summer", content: <SummerGrowth2026 /> },
];

export default function ChapterCarousel() {
  const [activeChapter, setActiveChapter] = useState(0);
  const panelsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.chapterIndex);
        if (Number.isFinite(index)) setActiveChapter(index);
      },
      { threshold: [0.35, 0.55, 0.72], rootMargin: "-12% 0px -12% 0px" },
    );

    panelsRef.current.forEach((panel) => panel && observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="journey-chapter-carousel"
      aria-label="Memory book chapters"
    >
      <div className="journey-chapter-track">
        {chapters.map((chapter, index) => (
          <article
            className={`journey-chapter-panel${index === activeChapter ? " is-active" : ""}`}
            key={chapter.label}
            data-chapter-index={index}
            ref={(element) => { panelsRef.current[index] = element; }}
          >
            {chapter.content}
          </article>
        ))}
      </div>
    </section>
  );
}
