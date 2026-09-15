"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/basePath";

export default function ParticleFinale() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const clearFade = useCallback(() => {
    if (fadeTimerRef.current !== null) {
      window.clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const fadeAudio = useCallback((targetVolume: number, pauseWhenDone = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    const startVolume = audio.volume;
    const startedAt = performance.now();
    const duration = 1500;
    fadeTimerRef.current = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = startVolume + (targetVolume - startVolume) * eased;
      if (progress >= 1) {
        clearFade();
        if (pauseWhenDone) {
          audio.pause();
          setIsMusicPlaying(false);
        }
      }
    }, 40);
  }, [clearFade]);

  const toggleMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0;
      try {
        await audio.play();
        setIsMusicPlaying(true);
        fadeAudio(0.72);
      } catch {
        setIsMusicPlaying(false);
      }
      return;
    }
    fadeAudio(0, true);
  }, [fadeAudio]);

  useEffect(() => {
    let lastScene = "particles";
    const syncScene = (force = false) => {
      const section = sectionRef.current;
      const frame = frameRef.current;
      if (!section || !frame?.contentWindow) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      const scene = progress > 0.42 ? "cake" : "particles";
      if (force || scene !== lastScene) {
        lastScene = scene;
        frame.contentWindow.postMessage({ type: "birthday-scene", scene }, window.location.origin);
      }
    };

    const handleViewportChange = () => syncScene();
    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange);
    const handleLoad = () => syncScene(true);
    const handleFrameMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== "birthday-scroll") return;
      window.scrollBy({ top: Number(event.data.deltaY) || 0, behavior: "auto" });
    };
    frameRef.current?.addEventListener("load", handleLoad);
    window.addEventListener("message", handleFrameMessage);
    syncScene(true);
    return () => {
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      frameRef.current?.removeEventListener("load", handleLoad);
      window.removeEventListener("message", handleFrameMessage);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && audioRef.current && !audioRef.current.paused) {
          fadeAudio(0, true);
        }
      },
      { threshold: 0.02 },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      clearFade();
    };
  }, [clearFade, fadeAudio]);

  return (
    <section ref={sectionRef} className="journey-particle-finale" aria-label="Interactive birthday finale and cake">
      <div className="journey-particle-stage">
        <iframe
          ref={frameRef}
          src={withBasePath("/particle-system.html")}
          title="Hand gesture birthday particle finale and cake"
          allow="camera"
        />
        <audio ref={audioRef} src={withBasePath("/audio/birthday-piano.mp3")} preload="metadata" loop />
        <button
          type="button"
          className={`journey-music-toggle${isMusicPlaying ? " is-playing" : ""}`}
          onClick={toggleMusic}
          aria-label={isMusicPlaying ? "Pause birthday piano music" : "Play birthday piano music"}
          aria-pressed={isMusicPlaying}
        >
          <img
            className="journey-music-gift"
            src={withBasePath("/assets/ui/music-gift.png")}
            alt=""
            draggable="false"
            aria-hidden="true"
          />
          <span className="journey-music-state" aria-hidden="true">
            {isMusicPlaying ? "Ⅱ" : "♪"}
          </span>
        </button>
      </div>
    </section>
  );
}
