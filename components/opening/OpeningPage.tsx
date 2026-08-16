"use client";

import { useEffect, useRef, useState } from "react";
import ChapterCarousel from "../journey/ChapterCarousel";
import ParticleFinale from "../journey/ParticleFinale";
import PhotoTrailMemory from "../journey/PhotoTrailMemory";
import LivingBackground from "./LivingBackground";
import StartButton from "./StartButton";

export default function OpeningPage() {
  const [started, setStarted] = useState(false);
  const [startVisible] = useState(true);
  const [activeBridge, setActiveBridge] = useState<"photo" | "particle" | null>(null);
  const nextSectionRef = useRef<HTMLElement | null>(null);
  const photoBridgeRef = useRef<HTMLDivElement | null>(null);
  const particleBridgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const resetFrame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    return () => {
      window.cancelAnimationFrame(resetFrame);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const bridges = [photoBridgeRef.current, particleBridgeRef.current].filter(
      (bridge): bridge is HTMLDivElement => Boolean(bridge),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActiveBridge((visible.target as HTMLElement).dataset.bridge as "photo" | "particle");
      },
      { threshold: [0.18, 0.34, 0.52], rootMargin: "-12% 0px -12% 0px" },
    );
    bridges.forEach((bridge) => observer.observe(bridge));
    return () => observer.disconnect();
  }, []);

  const beginJourney = () => {
    if (started) return;
    setStarted(true);
    window.setTimeout(() => {
      const top = nextSectionRef.current?.offsetTop ?? window.innerHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }, 720);
  };

  return (
    <main className="min-h-screen bg-[#f5efd8] text-[#31422e]">
      <section className="relative h-screen min-h-[620px] w-full overflow-hidden">
        <LivingBackground started={started} />
        <div className="absolute inset-0 z-30 flex translate-y-[8vh] items-center justify-center px-6">
          <StartButton started={started} visible={startVisible} onStart={beginJourney} />
        </div>
      </section>

      <section
        ref={nextSectionRef}
        className="journey-chapters-section"
      >
        <ChapterCarousel />
      </section>

      <div
        ref={photoBridgeRef}
        data-bridge="photo"
        className={`journey-scene-bridge journey-photo-bridge${activeBridge === "photo" ? " is-active" : ""}`}
      >
        <PhotoTrailMemory />
      </div>
      <div
        ref={particleBridgeRef}
        data-bridge="particle"
        className={`journey-scene-bridge journey-particle-bridge${activeBridge === "particle" ? " is-active" : ""}`}
      >
        <ParticleFinale />
      </div>
    </main>
  );
}
