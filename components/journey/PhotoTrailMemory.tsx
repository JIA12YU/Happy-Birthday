"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { withBasePath } from "@/lib/basePath";

const photos = [
  { src: "/assets/photo-trail/photos/01-garden-pavilion.jpg", position: "50% 55%", ratio: 1.35 },
  { src: "/assets/photo-trail/photos/02-dogwood.jpg", position: "68% 48%", ratio: 0.86 },
  { src: "/assets/photo-trail/photos/03-castle.jpg", position: "52% 55%", ratio: 0.86 },
  { src: "/assets/photo-trail/photos/04-lakeside-tree.jpg", position: "55% 58%", ratio: 0.86 },
  { src: "/assets/photo-trail/photos/05-wetland.jpg", position: "50% 56%", ratio: 0.86 },
  { src: "/assets/photo-trail/photos/06-swans.jpg", position: "53% 68%", ratio: 0.86 },
  { src: "/assets/photo-trail/photos/07-petals.jpg", position: "50% 67%", ratio: 0.86 },
  { src: "/assets/photo-trail/photos/08-classroom-bouquet.jpg", position: "50% 53%", ratio: 1.5 },
  { src: "/assets/photo-trail/photos/09-classroom-portrait.jpg", position: "50% 50%", ratio: 0.97 },
  { src: "/assets/photo-trail/photos/10-international-class.jpg", position: "50% 54%", ratio: 1.33 },
  { src: "/assets/photo-trail/photos/11-conference-speech.jpg", position: "58% 50%", ratio: 1.77 },
  { src: "/assets/photo-trail/photos/12-judge-portrait.jpg", position: "50% 48%", ratio: 1.5 },
  { src: "/assets/photo-trail/photos/13-signing-wall.jpg", position: "58% 50%", ratio: 1.5 },
  { src: "/assets/photo-trail/photos/14-podium-speech.jpg", position: "50% 44%", ratio: 1.36 },
  { src: "/assets/photo-trail/photos/15-panel-microphone.jpg", position: "45% 48%", ratio: 1.5 },
  { src: "/assets/photo-trail/photos/16-stage-thumbs-up.jpg", position: "50% 50%", ratio: 1.5 },
  { src: "/assets/photo-trail/photos/17-stage-group.jpg", position: "50% 50%", ratio: 1.5 },
  { src: "/assets/photo-trail/photos/18-blue-stage.jpg", position: "50% 43%", ratio: 1.79 },
  { src: "/assets/photo-trail/photos/19-literature-lecture.jpg", position: "66% 50%", ratio: 1.4 },
  { src: "/assets/photo-trail/photos/20-ucl-lecture.jpg", position: "55% 50%", ratio: 1.47 },
];

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export default function PhotoTrailMemory() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const imagesRef = useRef<Array<HTMLElement | null>>([]);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const cursor = cursorRef.current;
    const items = imagesRef.current.filter((item): item is HTMLElement => Boolean(item));
    if (!scene || !cursor || items.length === 0) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let itemIndex = 0;
    let zIndex = 10;
    let animationFrame = 0;
    let hasPointer = false;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const previous = { ...pointer };
    const smoothed = { ...pointer };
    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.42, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.42, ease: "power3.out" });

    const showImage = (x: number, y: number, angle: number) => {
      const element = items[itemIndex];
      const photo = photos[itemIndex];
      itemIndex = (itemIndex + 1) % items.length;
      zIndex = zIndex > 10000 ? 10 : zIndex + 1;
      const width = clamp(window.innerWidth * 0.14, 116, 238) * (0.84 + Math.random() * 0.3);
      const height = width / photo.ratio;
      const rotation = clamp(angle * 0.09, -12, 12) + (Math.random() - 0.5) * 4;

      gsap.killTweensOf(element);
      gsap.set(element, {
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
        rotation,
        scale: 0.72,
        opacity: 0,
        zIndex,
        visibility: "visible",
      });
      gsap.timeline()
        .to(element, {
          opacity: 1,
          scale: 1,
          rotation: rotation * 0.45,
          duration: reducedMotion ? 0.01 : 0.52,
          ease: "power3.out",
        })
        .to(element, {
          x: `+=${(Math.random() - 0.5) * 15}`,
          y: `+=${-16 - Math.random() * 18}`,
          scale: 0.84,
          opacity: 0,
          duration: reducedMotion ? 0.2 : 1.36,
          delay: reducedMotion ? 0.05 : 0.68,
          ease: "power2.inOut",
          onComplete: () => gsap.set(element, { visibility: "hidden" }),
        });
    };

    const tick = () => {
      smoothed.x += (pointer.x - smoothed.x) * 0.42;
      smoothed.y += (pointer.y - smoothed.y) * 0.42;
      const deltaX = smoothed.x - previous.x;
      const deltaY = smoothed.y - previous.y;
      if (hasPointer && Math.hypot(deltaX, deltaY) > clamp(window.innerWidth * 0.09, 105, 150)) {
        showImage(smoothed.x, smoothed.y, Math.atan2(deltaY, deltaX) * 180 / Math.PI);
        previous.x = smoothed.x;
        previous.y = smoothed.y;
      }
      animationFrame = window.requestAnimationFrame(tick);
    };

    const movePointer = (event: PointerEvent) => {
      hasPointer = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      cursorX(event.clientX);
      cursorY(event.clientY);
      gsap.to(cursor, { opacity: 1, duration: 0.3, overwrite: true });
    };
    const leaveScene = () => {
      hasPointer = false;
      gsap.to(cursor, { opacity: 0, duration: 0.35, overwrite: true });
    };

    scene.addEventListener("pointermove", movePointer, { passive: true });
    scene.addEventListener("pointerleave", leaveScene);
    animationFrame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      scene.removeEventListener("pointermove", movePointer);
      scene.removeEventListener("pointerleave", leaveScene);
      gsap.killTweensOf([...items, cursor]);
    };
  }, []);

  return (
    <section className="memory-trail-scene" ref={sceneRef} aria-label="再次流动的时间照片画廊">
      <div
        className="memory-trail-background"
        aria-hidden="true"
        style={{ backgroundImage: `url(${withBasePath("/assets/photo-trail/backgrounds/sunflower-watercolor.png")})` }}
      />
      <div className="memory-trail-title">
        <h2>再次流动的时间，是珍贵的礼物。</h2>
        <p>Let time flow again, as a precious gift from my heart.</p>
      </div>
      <div className="memory-trail-photo-layer" aria-hidden="true">
        {photos.map((photo, index) => (
          <figure
            className="memory-trail-photo"
            key={photo.src}
            ref={(element) => { imagesRef.current[index] = element; }}
          >
            <img src={withBasePath(photo.src)} alt="" draggable="false" style={{ objectPosition: photo.position }} />
          </figure>
        ))}
      </div>
      <div className="memory-trail-cursor" ref={cursorRef} aria-hidden="true" />
    </section>
  );
}
