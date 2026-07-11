"use client";

/**
 * CinematicScrollVideo — Native <video> scroll-scrub (Apple / Stripe style)
 *
 * SCRUB ENGINE: gsap.timeline({ scrollTrigger: { trigger, start, end, pin, scrub } })
 *   GSAP pins the hero video container, scrubs the video.currentTime property,
 *   and reveals the next content section seamlessly only after the video is scrubbed.
 *
 * SEEK THROTTLING:
 *   programmatic video seeking is heavily resource-intensive. To prevent browser
 *   video decoders from lagging and choking under continuous frame seeking, we
 *   throttle seeks. We only assign video.currentTime = targetTime when the video
 *   is not currently seeking (using the "seeked" event as gate).
 *
 * LOADING GATE: A poster <img> sits above the video and crossfades out (400ms)
 *   once video.readyState >= 3 (HAVE_FUTURE_DATA). No blank/black flash.
 *
 * MOBILE: iOS Safari has severe limitations with rapid programmatic seeking.
 *   Detected via UA string + maxTouchPoints (covers iPadOS masquerading as macOS).
 *   Falls back to autoplay loop in a 100vh hero — no scroll-sync on iOS/mobile.
 *
 * REDUCED MOTION: Skips video entirely; shows static poster image.
 */

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CinematicScrollVideoProps {
  /** URL of the scroll-scrubbed video. Re-encode with -g 2 for smooth seeking. */
  videoSrc: string;
  /** Explicit duration (seconds). Used as fallback if video.duration is NaN. */
  videoDuration?: number;
  /**
   * Poster image shown while video buffers (crossfades to video on readyState >= 3).
   * Use a high-quality still that matches the opening frame of the video.
   */
  posterSrc?: string;
  /** Hero headline + CTA buttons — rendered over the video on all device types. */
  heroContent?: React.ReactNode;
  /** All page sections that scroll over the sticky video backdrop. */
  children?: React.ReactNode;
}

// ─── iOS / low-power device detection ─────────────────────────────────────────
function detectIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/iPhone|iPod/.test(ua)) return true;
  if (/iPad/.test(ua)) return true;
  if (
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1 &&
    /Mac/.test(ua)
  )
    return true;
  return false;
}

export default function CinematicScrollVideo({
  videoSrc,
  videoDuration = 20,
  posterSrc,
  heroContent,
  children,
}: CinematicScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gsapCtxRef = useRef<gsap.Context | null>(null);

  const [videoReady, setVideoReady] = useState(false); // controls poster → video crossfade
  const [hasEntered, setHasEntered] = useState(false); // controls hero text entry curtain
  const [isIOS, setIsIOS] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // ── Mount: capability detection ──────────────────────────────────────────────
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsIOS(detectIOS());
      setPrefersReduced(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    });
    const t = setTimeout(() => setHasEntered(true), 80);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(t);
    };
  }, []);

  // ── Desktop GSAP scrub wiring ────────────────────────────────────────────────
  useEffect(() => {
    if (isIOS || prefersReduced) return;

    const video = videoRef.current;
    const pinnedSection = pinnedSectionRef.current;
    const hero = heroRef.current;
    const content = contentRef.current;
    if (!video || !pinnedSection || !hero || !content) return;

    gsap.registerPlugin(ScrollTrigger);

    // Hard-suppress autonomous playback immediately on mount
    video.muted = true;
    video.pause();
    video.currentTime = 0;

    let targetTime = 0;
    let isSeeking = false;

    // Seek-throttling mechanism to avoid browser frame decoder queue backlog
    const updateVideoTime = () => {
      if (!video) return;
      if (!isSeeking) {
        const diff = Math.abs(video.currentTime - targetTime);
        // Only seek if the scroll position has moved beyond 40ms threshold
        if (diff > 0.04) {
          isSeeking = true;
          video.currentTime = targetTime;
        }
      }
    };

    const handleSeeked = () => {
      isSeeking = false;
      updateVideoTime(); // check if targetTime changed while the seek was active
    };

    video.addEventListener("seeked", handleSeeked);

    const initScrub = () => {
      video.pause();
      setVideoReady(true);

      // Resolve duration — use actual metadata if available, fall back to prop
      const dur =
        isFinite(video.duration) && video.duration > 0
          ? video.duration
          : videoDuration;

      // Clean up any previous context (hot-reload safety)
      gsapCtxRef.current?.revert();

      gsapCtxRef.current = gsap.context(() => {
        // Create scroll timeline pinning the video section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinnedSection,
            start: "top top",
            end: "+=300%", // Pin for 3 viewports worth of scroll length
            scrub: 0.3, // tight responsive scrubbing
            pin: true,
            pinSpacing: true,
          },
        });

        // 1. Scrub progress using a dummy object target to throttle currentTime seeks
        const scrollObj = { progress: 0 };
        tl.to(
          scrollObj,
          {
            progress: 1,
            ease: "none",
            duration: 10,
            onUpdate: () => {
              targetTime = scrollObj.progress * dur;
              updateVideoTime();
            },
          },
          0
        );

        // 2. Fade out and scale down the Hero content in first 35% of the scroll timeline
        tl.to(
          hero,
          {
            opacity: 0,
            y: -60,
            scale: 0.96,
            ease: "power1.inOut",
            duration: 3.5,
          },
          0
        );

        // 3. Keep downstream content section hidden, then fade in + slide up in the last 30% of scroll (from 70% to 100%)
        tl.fromTo(
          content,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 3,
          },
          7
        );
      });
    };

    // Gate on readyState >= 3 (HAVE_FUTURE_DATA)
    if (video.readyState >= 3) {
      initScrub();
    } else {
      video.addEventListener("canplay", initScrub, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", initScrub);
      video.removeEventListener("seeked", handleSeeked);
      gsapCtxRef.current?.revert();
    };
  }, [isIOS, prefersReduced, videoDuration]);

  // ════════════════════════════════════════════════════════════════════════════
  // REDUCED MOTION — static poster, zero video
  // ════════════════════════════════════════════════════════════════════════════
  if (prefersReduced) {
    return (
      <div className="relative">
        <div className="relative h-screen w-full flex items-end justify-center pb-24 overflow-hidden bg-[#080808]">
          {posterSrc && (
            <img
              src={posterSrc}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85 pointer-events-none" />
          <div className="relative z-10 text-center">{heroContent}</div>
        </div>
        {/* Children render in normal dark flow */}
        <div className="relative z-10 bg-[#0a0a0a]">{children}</div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // iOS / MOBILE — autoplay loop in hero viewport only (no scroll-sync)
  // ════════════════════════════════════════════════════════════════════════════
  if (isIOS) {
    return (
      <div>
        <div className="relative h-screen w-full flex items-end justify-center pb-24 overflow-hidden bg-black">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
          <div className="relative z-10 text-center">{heroContent}</div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 font-mono text-[9px] text-white/50 uppercase tracking-[0.25em] pointer-events-none">
            <span className="inline-block animate-bounce">↓ Scroll to explore</span>
          </div>
        </div>
        <div className="relative z-10 bg-[#090909]">{children}</div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // DESKTOP — Scroll-scrubbed sticky video with GSAP pinned timeline
  // ════════════════════════════════════════════════════════════════════════════
  return (
    <div ref={containerRef} className="relative w-full bg-black">
      {/* ── Pinned Section: Video and Hero Content ── */}
      <div
        ref={pinnedSectionRef}
        className="relative h-screen w-full overflow-hidden bg-black z-20"
      >
        {/* Poster Loading Gate */}
        <div
          className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-[400ms] ease-out ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        >
          {posterSrc ? (
            <img
              src={posterSrc}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-black" />
          )}
        </div>

        {/* Video element */}
        <video
          ref={videoRef}
          src={videoSrc}
          preload="auto"
          muted
          playsInline
          disablePictureInPicture
          className="w-full h-full object-cover"
          aria-hidden="true"
        />

        {/* Gradient and vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/75 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] pointer-events-none z-10" />

        {/* Pure black entry curtain */}
        <div
          className={`absolute inset-0 z-30 bg-black pointer-events-none transition-opacity duration-[1400ms] ease-out ${
            hasEntered ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        />

        {/* Hero content layer */}
        <div
          ref={heroRef}
          className="absolute inset-0 z-20 flex items-center justify-center text-center"
        >
          {heroContent}
        </div>

        {/* Scroll cue */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 font-mono text-[9px] text-white/50 uppercase tracking-[0.25em] pointer-events-none transition-opacity duration-1000 delay-[2000ms] ${
            hasEntered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="inline-block animate-bounce">↓ Scroll to explore</span>
        </div>
      </div>

      {/* ── Content Section: downstream pages ── */}
      <div
        ref={contentRef}
        className="relative z-30 bg-background opacity-0"
      >
        {children}
      </div>
    </div>
  );
}
