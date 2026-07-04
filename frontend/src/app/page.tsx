"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HotspotPanorama from "../components/HotspotPanorama";
import TestimonialMarquee from "../components/TestimonialMarquee";
import CinematicReveal from "../components/CinematicReveal";
import CinematicScrollVideo from "../components/CinematicScrollVideo";
import TextType from "../components/TextType";
import { motionVariants } from "../components/motion-variants";

// ─── Video config ─────────────────────────────────────────────────────────────
// NOTE: For production, re-encode with:
//   ffmpeg -i input.mp4 -c:v libx264 -g 2 -keyint_min 1 -sc_threshold 0
//          -crf 23 -preset slow -movflags +faststart -an output_scrub.mp4
// Then replace SCROLL_VIDEO_SRC with the re-uploaded URL.
// Short GOP (-g 2) ensures every frame is a keyframe → smooth seeking.
// Poster image: shown while video buffers; crossfades out (400ms) when readyState >= 3.
// Ideally use a screenshot of video frame 0; this luxury villa still is a close match.
const SCROLL_VIDEO_POSTER =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80";

const SCROLL_VIDEO_SRC =
  "https://res.cloudinary.com/pctbshnp/video/upload/v1783064057/JA_homes_Home_Page_sdxzja.mp4";
const SCROLL_VIDEO_DURATION = 20; // seconds

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // Cinematic entry
    const t = setTimeout(() => setHasEntered(true), 100);

    // Scroll progress for the right-edge indicator bar
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ─── Hero content (rendered over the video on both desktop + mobile) ──────
  const heroContent = (
    <div className="max-w-3xl flex flex-col items-center gap-6 px-6">
      {/* Eyebrow */}
      <span
        className={`text-amber-500 text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] transition-all duration-1000 delay-[600ms] ${
          hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Exclusive Sustainable Residences
      </span>

      {/* Typed headline */}
      <div className="min-h-[60px] md:min-h-[110px] flex items-center justify-center">
        {hasEntered && (
          <TextType
            text="Crafting Architectural Sanctuaries"
            as="h1"
            className="text-4xl md:text-6xl font-serif text-[#faf9f6] tracking-wide font-light leading-tight"
            typingSpeed={60}
            initialDelay={500}
            showCursor={true}
            cursorCharacter="|"
            loop={false}
          />
        )}
      </div>

      {/* CTA buttons */}
      <div
        className={`flex flex-col sm:flex-row gap-4 mt-4 transition-all duration-1000 delay-[1200ms] ${
          hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Link
          href="/projects"
          className={`bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full flex items-center gap-2 shadow-lg shadow-amber-500/20 ${motionVariants.ctaInteractive}`}
          id="hero-explore-projects"
        >
          Explore Projects <ArrowRight size={14} />
        </Link>
        <Link
          href="/book"
          className={`glass-panel text-[#faf9f6] border border-amber-500/25 hover:border-amber-500/50 hover:bg-amber-500/10 text-xs font-semibold uppercase tracking-widest px-8 py-3.5 rounded-full ${motionVariants.ctaInteractive}`}
          id="hero-schedule-tour"
        >
          Book Private Tour
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-[#faf9f6] flex flex-col selection:bg-amber-500 selection:text-black relative">

      {/* Right-edge scroll progress indicator */}
      <div
        className="fixed right-3 top-1/4 h-1/2 w-[2px] bg-white/10 z-40 rounded-full pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <div
          className="w-full bg-amber-500 rounded-full transition-all duration-75"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919811086206?text=Hi%2C%20I%27m%20interested%20in%20JA%20Homes."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#1ebe5d] transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
        <svg
          viewBox="0 0 32 32"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 relative z-10"
          aria-hidden="true"
        >
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.504L4 29l7.697-1.81A12.93 12.93 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917a10.9 10.9 0 0 1-5.57-1.527l-.399-.237-4.573 1.076 1.1-4.456-.261-.408A10.867 10.867 0 0 1 5.083 15C5.083 8.97 9.97 4.083 16 4.083S26.917 8.97 26.917 15 22.03 25.917 16 25.917zm5.98-8.134c-.328-.164-1.94-.956-2.24-1.065-.3-.11-.518-.164-.736.163-.219.328-.847 1.065-1.038 1.283-.19.219-.382.246-.71.082-.328-.164-1.383-.51-2.634-1.625-.974-.869-1.63-1.942-1.821-2.27-.19-.327-.02-.504.143-.667.147-.147.328-.383.491-.574.164-.191.219-.328.328-.547.11-.218.055-.41-.027-.574-.082-.163-.736-1.776-1.009-2.432-.266-.637-.536-.55-.736-.56-.19-.009-.41-.011-.628-.011-.218 0-.574.082-.874.41-.3.328-1.146 1.12-1.146 2.733 0 1.613 1.174 3.17 1.337 3.389.164.218 2.31 3.526 5.598 4.945.783.338 1.393.54 1.87.69.785.25 1.5.215 2.065.13.63-.093 1.94-.793 2.214-1.558.273-.765.273-1.42.191-1.558-.081-.137-.3-.218-.628-.382z" />
        </svg>
      </a>

      {/* Shared Header Navigation */}
      <Header />

      {/* ═══════════════════════════════════════════════════════════════════════
          CINEMATIC SCROLL VIDEO — wraps everything from Hero to last CTA section.
          Footer lives outside this wrapper and scrolls in normally below.
          ═══════════════════════════════════════════════════════════════════════ */}
      <CinematicScrollVideo
        videoSrc={SCROLL_VIDEO_SRC}
        videoDuration={SCROLL_VIDEO_DURATION}
        posterSrc={SCROLL_VIDEO_POSTER}
        heroContent={heroContent}
      >

        {/* ── 01 · BIOPHILIC HARMONY ─────────────────────────────────────── */}
        <section className="min-h-screen flex items-center py-20 relative z-30">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text — dark glass panel for readability over video */}
            <CinematicReveal className="h-full">
              <div className="flex flex-col gap-6 bg-black/60 backdrop-blur-sm rounded-3xl border border-white/[0.08] p-8 md:p-12 h-full">
                <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block">
                  01 / INTEGRATION
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] tracking-wide font-light leading-tight">
                  Biophilic Harmony
                </h2>
                <p className="text-white/65 text-xs md:text-sm font-light leading-relaxed font-sans max-w-lg">
                  We design structures that do not sit on the land, but emerge
                  organically from it. Every threshold is calibrated to harmonise
                  with natural topography, seasonal sun angles, and local
                  ecosystems—fostering deep wellness and connection to nature.
                </p>
              </div>
            </CinematicReveal>

            {/* Image */}
            <CinematicReveal className="w-full" delay={150}>
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern cantilevered villa exterior set in lush forest"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </CinematicReveal>
          </div>
        </section>

        {/* ── ARCHITECTURAL DETAILING — Hotspot Panorama ─────────────────── */}
        <HotspotPanorama />

        {/* ── 02 · LUXURY REDEFINED ──────────────────────────────────────── */}
        <section className="min-h-screen flex items-center py-20 relative z-30">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <CinematicReveal className="w-full order-2 lg:order-1" delay={150}>
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury poolside lounge at sunset overlooking mountain vistas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </CinematicReveal>

            {/* Text */}
            <CinematicReveal className="h-full order-1 lg:order-2">
              <div className="flex flex-col gap-6 bg-black/60 backdrop-blur-sm rounded-3xl border border-white/[0.08] p-8 md:p-12 h-full">
                <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block">
                  02 / ATMOSPHERE
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] tracking-wide font-light leading-tight">
                  Luxury Redefined
                </h2>
                <p className="text-white/65 text-xs md:text-sm font-light leading-relaxed font-sans max-w-lg">
                  True luxury is the quiet presence of quality. We curate materials
                  that age gracefully, spaces that foster mindfulness, and layouts
                  that flow effortlessly between private retreats and majestic
                  outdoor panoramas.
                </p>
              </div>
            </CinematicReveal>
          </div>
        </section>

        {/* ── CINEMATIC BREATHING ROOM — "video-only" moment ─────────────── */}
        {/* No opaque panel here; the scroll video plays unobstructed */}
        <section className="min-h-[60vh] relative z-30 flex items-center justify-center py-16">
          <CinematicReveal className="text-center px-6 max-w-3xl flex flex-col items-center gap-4">
            <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em]">
              Sustainable Futures
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] tracking-wide font-light">
              Engineering Tomorrow's Heritage
            </h2>
            <p className="text-white/55 text-xs md:text-sm font-light max-w-md leading-relaxed font-sans">
              Blending carbon-neutral building sciences with ancient, enduring
              masonry techniques to construct smart sanctuaries that last for
              generations.
            </p>
          </CinematicReveal>
        </section>

        {/* ── 03 · SENSORY DETAILING ─────────────────────────────────────── */}
        <section className="min-h-screen flex items-center py-20 relative z-30">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <CinematicReveal className="h-full">
              <div className="flex flex-col gap-6 bg-black/60 backdrop-blur-sm rounded-3xl border border-white/[0.08] p-8 md:p-12 h-full">
                <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block">
                  03 / TACTILITY
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] tracking-wide font-light leading-tight">
                  Sensory Detailing
                </h2>
                <p className="text-white/65 text-xs md:text-sm font-light leading-relaxed font-sans max-w-lg">
                  From the raw texture of split-face Tivoli travertine to the matte
                  fragrance of hand-finished Northwest cedar, our surfaces are
                  selected to be felt. Sensory details are deliberately orchestrated
                  to evoke grounded, tranquil permanence.
                </p>
              </div>
            </CinematicReveal>

            {/* Image */}
            <CinematicReveal className="w-full" delay={150}>
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                  alt="Tactile mockup of brushed marble slabs, warm cedar woods, and brass fixtures"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </CinematicReveal>
          </div>
        </section>

        {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
        <TestimonialMarquee />

        {/* ── 04 · BESPOKE SANCTUARIES ───────────────────────────────────── */}
        <section className="min-h-screen flex items-center py-20 relative z-30">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <CinematicReveal className="w-full order-2 lg:order-1" delay={150}>
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern architectural villa glowing warmly during twilight hours"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </CinematicReveal>

            {/* Text */}
            <CinematicReveal className="h-full order-1 lg:order-2">
              <div className="flex flex-col gap-6 bg-black/60 backdrop-blur-sm rounded-3xl border border-white/[0.08] p-8 md:p-12 h-full">
                <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block">
                  04 / LEGACY
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] tracking-wide font-light leading-tight">
                  Bespoke Sanctuaries
                </h2>
                <p className="text-white/65 text-xs md:text-sm font-light leading-relaxed font-sans max-w-lg">
                  A house is more than shelter; it is an heirloom. By combining
                  net-zero systems, structural cedar, high-efficiency smart glazing,
                  and custom detailing, JA Homes constructs legacies designed to
                  protect your family and endure across lifetimes.
                </p>
              </div>
            </CinematicReveal>
          </div>
        </section>

        {/* ── NEXT STEPS CTA PANELS ──────────────────────────────────────── */}
        <section className="min-h-screen flex items-center py-20 relative z-30 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

            <CinematicReveal className="flex flex-col items-center text-center mb-16">
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] mb-2">
                Next Steps
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] tracking-wide font-light">
                Craft Your Sanctuary
              </h2>
            </CinematicReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

              {/* Panel 1: Explore Projects */}
              <CinematicReveal className="w-full">
                <Link
                  href="/projects"
                  className={`relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group flex flex-col justify-end p-8 md:p-12 ${motionVariants.ctaInteractive}`}
                >
                  <Image
                    src="/alpine_crest.jpg"
                    alt="Scenic Alpine Crest luxury estate"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 noise-overlay z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10" />
                  <div className="relative z-20 flex flex-col gap-2">
                    <span className="text-amber-500 text-[10px] font-mono uppercase tracking-[0.3em]">
                      DESIGN PORTFOLIO
                    </span>
                    <h3 className="text-2xl font-serif text-[#faf9f6] font-light tracking-wide flex items-center gap-2 group-hover:text-amber-300 transition-colors">
                      Explore Our Completed Projects{" "}
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
                      />
                    </h3>
                    <p className="text-white/60 text-[11px] md:text-xs font-light max-w-sm leading-relaxed font-sans mt-1">
                      Inspect completed residences and active construction showcases
                      designed to set the benchmark for luxury biophilic builds.
                    </p>
                  </div>
                </Link>
              </CinematicReveal>

              {/* Panel 2: Book Private Tour */}
              <CinematicReveal className="w-full" delay={150}>
                <Link
                  href="/book"
                  className={`relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group flex flex-col justify-end p-8 md:p-12 ${motionVariants.ctaInteractive}`}
                >
                  <Image
                    src="/zenith_penthouse.png"
                    alt="Modern Zenith Penthouse interior looking over skyline"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 noise-overlay z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10" />
                  <div className="relative z-20 flex flex-col gap-2">
                    <span className="text-amber-500 text-[10px] font-mono uppercase tracking-[0.3em]">
                      PRIVATE ACCESS
                    </span>
                    <h3 className="text-2xl font-serif text-[#faf9f6] font-light tracking-wide flex items-center gap-2 group-hover:text-amber-300 transition-colors">
                      Schedule Private Consultation{" "}
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
                      />
                    </h3>
                    <p className="text-white/60 text-[11px] md:text-xs font-light max-w-sm leading-relaxed font-sans mt-1">
                      Book a private tour or align with our principal architects to
                      begin planning your bespoke eco-friendly sustainable estate.
                    </p>
                  </div>
                </Link>
              </CinematicReveal>

            </div>
          </div>
        </section>

      </CinematicScrollVideo>
      {/* ═══════════════════════════════════════════════════════════════════════
          Footer lives OUTSIDE the scroll-driver — scrolls in normally below the
          last CTA section. The scroll-synced video does NOT play under the footer.
          ═══════════════════════════════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
