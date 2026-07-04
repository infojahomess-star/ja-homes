"use client";

/**
 * CinematicScrollVideo — Native <video> scroll-scrub (Apple / Stripe style)
 *
 * SCRUB ENGINE: gsap.to(video, { currentTime: duration, scrollTrigger: { scrub: 0.5 } })
 *   GSAP directly tweens the video.currentTime property — no manual onUpdate loop.
 *   scrub: 0.5 adds a 0.5s smoothing lag so seeks feel creamy rather than jagged.
 *   video.play() is NEVER called; the element stays permanently paused.
 *
 * LOADING GATE: A poster <img> sits above the video and crossfades out (400ms)
 *   once video.readyState >= 3 (HAVE_FUTURE_DATA). No blank/black flash.
 *
 * MOBILE: iOS Safari has severe limitations with rapid programmatic seeking.
 *   Detected via UA string + maxTouchPoints (covers iPadOS masquerading as macOS).
 *   Falls back to autoplay loop in a 100vh hero — no scroll-sync on iOS/mobile.
 *
 * REDUCED MOTION: Skips video entirely; shows static poster image.
 *
 * ASSET PREP (manual step — required for smooth seeking on desktop):
 *   ffmpeg -i input.mp4 \
 *     -g 2 -keyint_min 2 -sc_threshold 0 \
 *     -c:v libx264 -crf 20 -pix_fmt yuv420p \
 *     -an output_seekable.mp4
 *   -g 2 = keyframe every 2 frames → seek hits a keyframe within 1 frame → no stutter.
 *   -an   = strip audio (video is muted anyway, saves bandwidth).
 *   Also produce a 720p version for mobile if/when scroll-scrub is enabled there.
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
// Covers: iPhone, iPad (classic UA), iPad running iPadOS 13+ (masquerades as macOS
// desktop — detected via maxTouchPoints > 1 on a "MacIntel" platform).
function detectIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/iPhone|iPod/.test(ua)) return true;
  if (/iPad/.test(ua)) return true;
  // iPadOS 13+: reports as "MacIntel" but has touch
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
  // containerRef = the outer "scroll driver" div that ScrollTrigger watches
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const gsapCtxRef = useRef<gsap.Context | null>(null);

  const [videoReady, setVideoReady] = useState(false); // controls poster → video crossfade
  const [hasEntered, setHasEntered] = useState(false); // controls hero text entry curtain
  const [isIOS, setIsIOS] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // ── Mount: capability detection ──────────────────────────────────────────────
  useEffect(() => {
    setIsIOS(detectIOS());
    setPrefersReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const t = setTimeout(() => setHasEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  // ── Desktop GSAP scrub wiring ────────────────────────────────────────────────
  useEffect(() => {
    if (isIOS || prefersReduced) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    gsap.registerPlugin(ScrollTrigger);

    // Hard-suppress autonomous playback immediately on mount
    video.muted = true;
    video.pause();
    video.currentTime = 0;

    const initScrub = () => {
      // Pause again after any browser autoplay attempt triggered by preload
      video.pause();
      setVideoReady(true);

      // Resolve duration — use actual metadata if available, fall back to prop
      const dur =
        isFinite(video.duration) && video.duration > 0
          ? video.duration
          : videoDuration;

      // Clean up any previous context (hot-reload safety)
      gsapCtxRef.current?.revert();

      // gsap.to() directly tweens video.currentTime from 0 → dur as the user scrolls.
      // scrub: 0.5  →  GSAP keeps a 0.5-second "lag" behind raw scroll position,
      //                smoothing out rapid microstutter from low-GOP seeking.
      gsapCtxRef.current = gsap.context(() => {
        gsap.to(video, {
          currentTime: dur,
          ease: "none", // linear mapping: scroll% = video%
          scrollTrigger: {
            trigger: container,
            start: "top top",   // video scrub begins when container top hits viewport top
            end: "bottom bottom", // ends when container bottom hits viewport bottom
            scrub: 0.5,
          },
        });
      });
    };

    // Gate on readyState >= 3 (HAVE_FUTURE_DATA) — enough buffered to seek cleanly
    if (video.readyState >= 3) {
      initScrub();
    } else {
      // canplay fires at readyState >= 3
      video.addEventListener("canplay", initScrub, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", initScrub);
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
        {/* Children render in normal dark flow — no video involved */}
        <div className="relative z-10 bg-[#0a0a0a]">{children}</div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // iOS / MOBILE — autoplay loop in hero viewport only (no scroll-sync)
  // Content sections scroll below in normal document flow.
  // ════════════════════════════════════════════════════════════════════════════
  if (isIOS) {
    return (
      <div>
        {/* Autoplay loop capped to 100vh hero */}
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
        {/* Remaining sections — dark background, normal scroll */}
        <div className="relative z-10 bg-[#090909]">{children}</div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // DESKTOP — Scroll-scrubbed sticky video (the real experience)
  // ════════════════════════════════════════════════════════════════════════════
  return (
    /*
     * containerRef is the ScrollTrigger target.
     * Natural height is set by the content layer (children + hero section).
     * The sticky video holds position for the ENTIRE container height —
     * exactly as long as the user is scrolling through all content sections.
     */
    <div ref={containerRef} className="relative">

      {/* ── Sticky video backdrop ───────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden bg-black">

        {/*
         * POSTER LOADING GATE
         * The <img> sits ABOVE the <video> and fades OUT with a 400ms crossfade
         * once videoReady=true (triggered by readyState >= 3 in initScrub).
         * This prevents any black/blank flash while the video buffers.
         */}
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
            /* Fallback if no poster provided: smooth dark veil */
            <div className="w-full h-full bg-black" />
          )}
        </div>

        {/* The scroll-scrubbed video — never plays, only seeked */}
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

        {/* Persistent gradient overlay — text legibility at ALL video frames */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/75 pointer-events-none" />
        {/* Corner vignette — kills blown-out edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      </div>

      {/* ── Content layer ───────────────────────────────────────────────────── */}
      {/*
       * -mt-[100vh]: pulls the content layer UP to overlap the sticky video
       *   from pixel 0, so Hero text appears immediately over the first frame.
       * z-10: renders above the z-0 sticky video.
       */}
      <div className="relative z-10 -mt-[100vh]">

        {/* Hero: full-viewport section, transparent — video gradient is the bg */}
        <section className="h-screen relative flex items-end justify-center pb-28 overflow-hidden">
          {/* Entry curtain: pure black, fades out 1.4s after mount */}
          <div
            className={`absolute inset-0 z-30 bg-black pointer-events-none transition-opacity duration-[1400ms] ease-out ${
              hasEntered ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden="true"
          />
          {/* Hero text — fades + slides in after curtain lifts */}
          <div
            className={`relative z-10 text-center transition-all duration-[1000ms] delay-[300ms] ${
              hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {heroContent}
          </div>
          {/* Scroll cue */}
          <div
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 font-mono text-[9px] text-white/50 uppercase tracking-[0.25em] pointer-events-none transition-opacity duration-1000 delay-[2000ms] ${
              hasEntered ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="inline-block animate-bounce">↓ Scroll to explore</span>
          </div>
        </section>

        {/* All downstream page sections */}
        {children}
      </div>
    </div>
  );
}
