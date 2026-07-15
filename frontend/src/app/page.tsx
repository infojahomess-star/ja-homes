"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HotspotPanorama from "../components/HotspotPanorama";
import TestimonialMarquee from "../components/TestimonialMarquee";
import CinematicReveal from "../components/CinematicReveal";
import TextType from "../components/TextType";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  // Card 1 (Main Card) Drag State
  const [img1Pos, setImg1Pos] = useState({ x: 0, y: 0 });
  const [isDraggingImg1, setIsDraggingImg1] = useState(false);
  const [dragStart1, setDragStart1] = useState({ x: 0, y: 0 });

  // Card 2 (Secondary Card) Drag State
  const [img2Pos, setImg2Pos] = useState({ x: 0, y: 0 });
  const [isDraggingImg2, setIsDraggingImg2] = useState(false);
  const [dragStart2, setDragStart2] = useState({ x: 0, y: 0 });

  const handlePointerDownImg1 = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDraggingImg1(true);
    setDragStart1({
      x: e.clientX - img1Pos.x,
      y: e.clientY - img1Pos.y,
    });
  };

  const handlePointerMoveImg1 = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingImg1) return;
    setImg1Pos({
      x: e.clientX - dragStart1.x,
      y: e.clientY - dragStart1.y,
    });
  };

  const handlePointerUpImg1 = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDraggingImg1(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handlePointerDownImg2 = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDraggingImg2(true);
    setDragStart2({
      x: e.clientX - img2Pos.x,
      y: e.clientY - img2Pos.y,
    });
  };

  const handlePointerMoveImg2 = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingImg2) return;
    setImg2Pos({
      x: e.clientX - dragStart2.x,
      y: e.clientY - dragStart2.y,
    });
  };

  const handlePointerUpImg2 = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDraggingImg2(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const resetPositions = () => {
    setImg1Pos({ x: 0, y: 0 });
    setImg2Pos({ x: 0, y: 0 });
  };

  // Laptop interactive states
  const [isLaptopOn, setIsLaptopOn] = useState(true);
  const [laptopRotation, setLaptopRotation] = useState({ x: 6, y: -8 });

  const handleMouseMoveLaptop = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates from -0.5 to 0.5
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    
    // Calculate rotation: Y-axis mouse tilt tilts X-rot, X-axis tilts Y-rot
    setLaptopRotation({
      x: 6 - y * 24, // tilt up/down by 12 degrees
      y: -8 + x * 32, // tilt left/right by 16 degrees
    });
  };

  const handleMouseLeaveLaptop = () => {
    setLaptopRotation({ x: 6, y: -8 });
  };

  const [isAtmosphereActive, setIsAtmosphereActive] = useState(false);
  const [isTactilityActive, setIsTactilityActive] = useState(false);
  const [isLegacyActive, setIsLegacyActive] = useState(false);
  const [isNextStepsActive, setIsNextStepsActive] = useState(false);

  const atmosphereRef = React.useRef<HTMLDivElement>(null);
  const tactilityRef = React.useRef<HTMLDivElement>(null);
  const legacyRef = React.useRef<HTMLDivElement>(null);
  const nextStepsRef = React.useRef<HTMLDivElement>(null);

  const [parallaxY, setParallaxY] = useState(0);
  const [legacyExitY, setLegacyExitY] = useState(0);
  const [legacyExitOpacity, setLegacyExitOpacity] = useState(1);

  useEffect(() => {
    // Cinematic entry
    const t = setTimeout(() => setHasEntered(true), 100);

    // Scroll progress, parallax, and exit animations
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);

      // Section 3 (Tactility) Parallax
      if (tactilityRef.current) {
        const rect = tactilityRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const diff = sectionCenter - viewportCenter;
        setParallaxY(diff * -0.05); // Tiny Parallax factor
      }

      // Section 5 (Legacy) exit animation
      if (legacyRef.current) {
        const rect = legacyRef.current.getBoundingClientRect();
        if (rect.top < 0) {
          const scrolledAmount = Math.abs(rect.top);
          const exitProgress = Math.min(1, scrolledAmount / rect.height);
          setLegacyExitY(-scrolledAmount * 0.15); // moves upward
          setLegacyExitOpacity(1 - exitProgress * 0.4); // fades out slightly
        } else {
          setLegacyExitY(0);
          setLegacyExitOpacity(1);
        }
      }
    };

    // IntersectionObserver to trigger animations once
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -150px 0px", // Trigger when entering viewport (around 70-80% height)
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === atmosphereRef.current) {
            setIsAtmosphereActive(true);
            observer.unobserve(entry.target);
          } else if (entry.target === tactilityRef.current) {
            setIsTactilityActive(true);
            observer.unobserve(entry.target);
          } else if (entry.target === legacyRef.current) {
            setIsLegacyActive(true);
            observer.unobserve(entry.target);
          } else if (entry.target === nextStepsRef.current) {
            setIsNextStepsActive(true);
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    if (atmosphereRef.current) observer.observe(atmosphereRef.current);
    if (tactilityRef.current) observer.observe(tactilityRef.current);
    if (legacyRef.current) observer.observe(legacyRef.current);
    if (nextStepsRef.current) observer.observe(nextStepsRef.current);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500 selection:text-black relative transition-colors duration-300">

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

      {/* Shared Header Navigation */}
      <Header />

      {/* ─── HERO SECTION WITH TILTED LAYERED IMAGES ───────────────────────── */}
      <section className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-background z-30 transition-colors duration-300">
        {/* Ambient background glows */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 -z-10 w-[400px] h-[400px] bg-[#2969c2]/[0.08] blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 -z-10 w-[500px] h-[500px] bg-[#1e40af]/[0.06] blur-[150px] rounded-full pointer-events-none" />
        
        {/* SVG Noise Texture Overlay */}
        <div className="absolute inset-0 noise-overlay pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full z-10">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6 text-left relative z-20">
            {/* Eyebrow Badge */}
            <div
              className={`flex h-9 items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 font-mono text-[9px] md:text-xs font-medium uppercase text-amber-500 tracking-wider transition-all duration-1000 delay-[200ms] ${
                hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Exclusive Sustainable Residences
            </div>

            {/* Headline */}
            <div className="min-h-[100px] md:min-h-[140px] flex items-center">
              {hasEntered && (
                <TextType
                  text="Crafting Architectural Sanctuaries"
                  as="h1"
                  className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground tracking-wide font-light leading-tight"
                  typingSpeed={60}
                  initialDelay={400}
                  showCursor={true}
                  cursorCharacter="|"
                  loop={false}
                />
              )}
            </div>

            {/* Subtitle / Intro paragraph */}
            <p
              className={`text-muted text-xs md:text-sm font-light leading-relaxed font-sans max-w-md transition-all duration-1000 delay-[1000ms] ${
                hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Discover homes where structural artistry meets ecological intelligence. 
              We construct low-impact legacies designed to endure for generations.
            </p>

            {/* CTA buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mt-2 transition-all duration-1000 delay-[1200ms] ${
                hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Link
                href="/projects"
                className="group relative bg-gold-gradient text-white font-semibold text-xs uppercase tracking-widest pl-7 pr-2 py-2 h-12 rounded-full flex items-center justify-between gap-4 shadow-lg shadow-amber-500/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-px active:scale-[0.98] active:translate-y-0 cursor-pointer"
                id="hero-explore-projects"
              >
                <span>Explore Projects</span>
                <div className="w-8 h-8 rounded-full bg-white text-[#1e3a8a] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </Link>
              <Link
                href="/book"
                className="group relative glass-panel text-foreground border border-amber-500/25 hover:border-amber-500/50 hover:bg-amber-500/10 font-semibold text-xs uppercase tracking-widest pl-7 pr-2 py-2 h-12 rounded-full flex items-center justify-between gap-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-px active:scale-[0.98] active:translate-y-0 cursor-pointer"
                id="hero-schedule-tour"
              >
                <span>Book Private Tour</span>
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:bg-amber-500/20">
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Reference UI Tilted Layered Image Cards */}
          <div
            className={`lg:col-span-7 relative flex items-center justify-center w-full h-[450px] md:h-[600px] lg:h-[650px] transition-all duration-1000 delay-[600ms] ${
              hasEntered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            {/* Draggable Wrapper for Main Card (Image 1: Villa Exterior at Dusk) */}
            <div
              className="absolute w-[90%] h-[90%] md:w-[85%] md:h-[85%] lg:w-[95%] lg:h-[95%] select-none z-10 touch-none active:scale-[1.01]"
              style={{
                transform: `translate3d(${img1Pos.x}px, ${img1Pos.y}px, 0)`,
                cursor: isDraggingImg1 ? "grabbing" : "grab",
                transition: isDraggingImg1 ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onPointerDown={handlePointerDownImg1}
              onPointerMove={handlePointerMoveImg1}
              onPointerUp={handlePointerUpImg1}
              onPointerCancel={handlePointerUpImg1}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-white/10 transform rotate-[-4deg] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-[-2deg] hover:scale-[1.02] group animate-float-slow">
                {/* Background Image */}
                <Image
                  src="/hero_final_frame.jpg"
                  alt="Luxury sustainable residence exterior at dusk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                  priority
                />
                
                {/* Luxury gradient overlay for readability and contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 z-20 pointer-events-none" />
                
                {/* Giant elegant JA HOMES watermark text inside the card, styled in the style of Behance */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 pointer-events-none select-none">
                  <span className="text-[10vw] lg:text-[7vw] font-black tracking-[0.25em] text-[#faf9f6]/8 uppercase font-sans">
                    JA HOMES
                  </span>
                </div>

                {/* Bottom text inside the tilted card */}
                <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
                  <div className="flex flex-col gap-1">
                    <span className="text-amber-500 font-mono text-[9px] uppercase tracking-widest">
                      THE EXTERIOR
                    </span>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-serif text-[#faf9f6] tracking-wide font-light max-w-xs leading-tight">
                      Where tranquility meets modern living.
                    </h3>
                  </div>
                  <div className="text-[9px] md:text-[10px] tracking-widest text-[#faf9f6]/60 uppercase font-mono mt-2 md:mt-0">
                    WE BUILD MODERN HOUSES
                  </div>
                </div>
              </div>
            </div>

            {/* Draggable Wrapper for Overlapping Secondary Card (Image 2: Living Room Interior) */}
            <div
              className="absolute bottom-[-25px] right-[3%] md:bottom-[-35px] md:right-[5%] lg:bottom-[-40px] lg:right-[6%] w-[55%] h-[45%] md:w-[50%] md:h-[48%] lg:w-[52%] lg:h-[50%] select-none z-20 touch-none active:scale-[1.03]"
              style={{
                transform: `translate3d(${img2Pos.x}px, ${img2Pos.y}px, 0)`,
                cursor: isDraggingImg2 ? "grabbing" : "grab",
                transition: isDraggingImg2 ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onPointerDown={handlePointerDownImg2}
              onPointerMove={handlePointerMoveImg2}
              onPointerUp={handlePointerUpImg2}
              onPointerCancel={handlePointerUpImg2}
            >
              <div 
                className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/20 bg-black/40 backdrop-blur-md p-1.5 transform rotate-[5deg] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-[3deg] hover:scale-[1.04] group/sec"
                style={{ animation: "float-slow 7s infinite ease-in-out reverse", animationDelay: "1s" }}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/villa_interior.jpg"
                    alt="Minimalist modern luxury interior lounge room"
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover/sec:scale-105 pointer-events-none"
                  />
                  
                  {/* Secondary card overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />

                  {/* Small indicator badge */}
                  <div className="absolute top-2.5 left-2.5 z-20 flex h-5 items-center rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-2.5 text-[8px] font-mono uppercase text-amber-500 tracking-wider">
                    02 / INTERIOR
                  </div>

                  {/* Bottom title in secondary card */}
                  <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                    <span className="text-[10px] font-serif text-[#faf9f6]/90 tracking-wide font-light">
                      Sensory sanctuaries
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Glassmorphic Reset Button */}
            {(img1Pos.x !== 0 || img1Pos.y !== 0 || img2Pos.x !== 0 || img2Pos.y !== 0) && (
              <button
                onClick={resetPositions}
                className="absolute bottom-[-30px] md:bottom-[-45px] left-1/2 -translate-x-1/2 z-35 px-4 py-2 text-[9px] md:text-xs font-mono tracking-widest uppercase bg-black/80 backdrop-blur-md border border-amber-500/30 hover:border-amber-500 text-amber-500 hover:text-white rounded-full transition-all duration-300 shadow-xl active:scale-95 cursor-pointer flex items-center gap-2 group"
                title="Reset card positions to default"
              >
                <RotateCcw size={11} className="transition-transform duration-500 group-hover:rotate-[-180deg]" />
                <span>Reset Layout</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── NATURAL SCROLL FLOW WRAPPER FOR DOWNSTREAM CONTENT ────────────── */}
      <main className="relative z-30 bg-background w-full overflow-hidden transition-colors duration-300">

        {/* ── 01 · BIOPHILIC HARMONY ─────────────────────────────────────── */}
        <section className="min-h-screen flex items-center py-20 relative z-30">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text — dark glass panel for readability over video */}
            <CinematicReveal className="h-full">
              <div className="flex flex-col gap-6 bg-black/60 backdrop-blur-sm rounded-3xl border border-white/[0.08] p-8 md:p-12 h-full justify-center">
                <div className="inline-flex self-start items-center h-7 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-1 font-mono text-[9px] md:text-xs font-medium uppercase text-amber-500 tracking-wider">
                  01 / INTEGRATION
                </div>
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

            {/* Interactive Before/After Image Slider */}
            <CinematicReveal className="w-full" delay={150}>
              <BeforeAfterSlider
                beforeSrc="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80"
                afterSrc="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                beforeAlt="Villa under construction concrete framing"
                afterAlt="Finished biophilic luxury villa"
                beforeLabel="Raw Concrete & Timber Framing"
                afterLabel="Finished Biophilic Masterpiece"
              />
            </CinematicReveal>
          </div>
        </section>

        {/* ── ARCHITECTURAL DETAILING — Hotspot Panorama ─────────────────── */}
        <HotspotPanorama />

        {/* ── 02 · LUXURY REDEFINED ──────────────────────────────────────── */}
        <section ref={atmosphereRef} className="min-h-screen flex items-center py-20 relative z-30">
          {/* Ambient Floating Glow behind cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-amber-500/[0.035] blur-[150px] rounded-full animate-glow-drift pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Laptop Mockup UI (Left) */}
            <div className={`w-full order-2 lg:order-1 flex flex-col items-center justify-center transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isAtmosphereActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}>
              {/* Laptop Control Panel */}
              <div className="flex gap-4 mb-4 z-20">
                <button
                  onClick={() => setIsLaptopOn(!isLaptopOn)}
                  className={`px-4 py-1.5 text-[10px] font-mono tracking-wider uppercase rounded-full border transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md ${
                    isLaptopOn
                      ? "border-amber-500/30 text-amber-500 bg-amber-500/5 hover:bg-amber-500/10"
                      : "border-red-500/30 text-red-500 bg-red-500/5 hover:bg-red-500/10"
                  }`}
                  title="Toggle Laptop Screen Power"
                >
                  <span className={`w-2 h-2 rounded-full ${isLaptopOn ? "bg-amber-500 animate-pulse" : "bg-red-500"}`} />
                  Screen: {isLaptopOn ? "ON" : "OFF"}
                </button>
              </div>

              <div 
                className="relative w-full max-w-[550px] md:max-w-[650px] lg:max-w-[700px] aspect-[16/10] flex flex-col items-center justify-center transition-all duration-300 ease-out group/laptop"
                style={{
                  transform: `perspective(1200px) rotateX(${laptopRotation.x}deg) rotateY(${laptopRotation.y}deg) rotateZ(2deg)`,
                }}
                onMouseMove={handleMouseMoveLaptop}
                onMouseLeave={handleMouseLeaveLaptop}
              >
                {/* Screen Wrapper */}
                <div className="relative w-[90%] aspect-[16/10] bg-[#0c0c0c] rounded-t-2xl p-[1.5%] border-t border-x border-white/15 shadow-2xl flex flex-col justify-center overflow-hidden">
                  {/* Screen Bezel Notch / Camera & Power LED */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[3%] bg-[#0c0c0c] rounded-b-md z-30 flex items-center justify-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                    <div className={`w-0.5 h-0.5 rounded-full ${isLaptopOn ? "bg-amber-500" : "bg-red-500"}`} />
                  </div>
                  
                  {/* Inner Screen Content */}
                  <div className={`relative w-full h-full bg-[#081121] rounded-lg overflow-hidden border border-white/5 group/screen transition-all duration-500 ${
                    isLaptopOn ? "opacity-100" : "opacity-0 bg-black"
                  }`}>
                    {/* Scrollable Container (Simulating Webpage scroll) */}
                    <div className="w-full h-full overflow-y-auto scrollbar-none hover:scrollbar-thin scroll-smooth select-none">
                      <div className="relative w-full h-[240%] flex flex-col">
                        
                        {/* Slide 1: Hero */}
                        <div className="relative w-full h-[100%] shrink-0">
                          <Image
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                            alt="Sander House luxury sustainable residence"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover pointer-events-none"
                            priority
                          />
                          <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none" />
                          
                          {/* Screen Interface Overlay */}
                          <div className="absolute inset-0 z-20 flex flex-col justify-between p-3 md:p-5 text-left pointer-events-none">
                            <div className="flex justify-between items-center w-full text-[6px] md:text-[8px] font-mono tracking-widest text-[#faf9f6]/90 uppercase">
                              <span>JA HOMES</span>
                              <span className="border border-white/30 px-1 rounded-sm text-[5px] md:text-[7px]">MODERN EDITION</span>
                            </div>
                            
                            <div className="flex flex-col gap-1 md:gap-2 max-w-[85%]">
                              <span className="text-[6px] md:text-[8px] font-mono text-amber-500 uppercase tracking-widest leading-none">02 / ATMOSPHERE</span>
                              <h4 className="text-base md:text-xl font-serif text-white tracking-wide leading-tight font-light uppercase">
                                Sander House
                              </h4>
                              <span className="text-[5px] md:text-[7px] text-[#faf9f6]/80 leading-normal font-sans font-light">
                                Where tranquility meets modern sustainable structural design.
                              </span>
                            </div>

                            <div className="flex justify-between items-end w-full">
                              <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-0.5 text-[5px] md:text-[7px] text-white font-mono uppercase tracking-wider font-semibold">
                                Scroll Down ↓
                              </div>
                              <div className="text-[5px] md:text-[7px] text-[#faf9f6]/60 font-mono tracking-wider uppercase">
                                Hover & Scroll Screen
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Slide 2: Details */}
                        <div className="relative w-full h-[70%] shrink-0 bg-[#0a1220] border-t border-white/15 p-4 flex flex-col justify-center gap-3 text-left">
                          <div className="flex flex-col gap-1">
                            <span className="text-[6px] md:text-[8px] font-mono text-amber-500 uppercase tracking-widest">02 / DETAILS</span>
                            <h5 className="text-xs md:text-sm font-serif text-white font-light uppercase">Biophilic Interior</h5>
                          </div>
                          <div className="relative w-full h-[55%] rounded-lg overflow-hidden border border-white/10">
                            <Image
                              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
                              alt="Minimalist lounge room"
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover pointer-events-none"
                            />
                          </div>
                          <p className="text-[5px] md:text-[7px] text-[#faf9f6]/70 leading-relaxed font-sans font-light">
                            Crafted with split-face Tivoli travertine and hand-finished cedar slabs to evoke a grounded sense of place.
                          </p>
                        </div>

                        {/* Slide 3: Final Call */}
                        <div className="relative w-full h-[70%] shrink-0 bg-[#080f1a] border-t border-white/15 p-4 flex flex-col justify-center items-center text-center gap-3">
                          <h5 className="text-xs md:text-sm font-serif text-white font-light uppercase tracking-wide">Begin Your Legacy</h5>
                          <p className="text-[5px] md:text-[7px] text-[#faf9f6]/65 max-w-[80%] font-sans font-light">
                            Collaborate with our design architects to craft your low-impact ecological estate.
                          </p>
                          <div className="bg-amber-500 text-black text-[5px] md:text-[7px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full hover:scale-105 transition-transform duration-300">
                            Book Private Tour
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                {/* Keyboard Base (Bottom deck) */}
                <div className="relative w-full h-[6%] bg-gradient-to-b from-[#1b1b1c] to-[#0c0c0d] rounded-b-2xl border-b-2 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center z-20">
                  <div className="w-[18%] h-[35%] bg-black/60 rounded-b-sm border-t border-white/5" />
                </div>
              </div>
            </div>

            {/* Text Card (Right) */}
            <div className="h-full order-1 lg:order-2">
              <div 
                className={`flex flex-col gap-6 bg-black/60 backdrop-blur-sm rounded-3xl border border-white/[0.08] p-8 md:p-12 h-full justify-center hover:-translate-y-2.5 hover:scale-[1.01] hover:shadow-2xl hover:shadow-amber-500/[0.06] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isAtmosphereActive ? "opacity-100 translate-x-0 animate-float-slow" : "opacity-0 translate-x-12"
                }`}
              >
                <div 
                  className={`inline-flex self-start items-center h-7 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-1 font-mono text-[9px] md:text-xs font-medium uppercase text-amber-500 tracking-wider transition-all duration-[1000ms] ease-out ${
                    isAtmosphereActive ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
                  }`}
                >
                  02 / ATMOSPHERE
                </div>
                <h2 
                  className={`text-3xl md:text-5xl font-serif text-[#faf9f6] tracking-wide font-light leading-tight transition-all duration-[1000ms] delay-[150ms] ease-out ${
                    isAtmosphereActive ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
                  }`}
                >
                  Luxury Redefined
                </h2>
                <p 
                  className={`text-white/65 text-xs md:text-sm font-light leading-relaxed font-sans max-w-lg transition-all duration-[1000ms] delay-[300ms] ease-out ${
                    isAtmosphereActive ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
                  }`}
                >
                  True luxury is the quiet presence of quality. We curate materials
                  that age gracefully, spaces that foster mindfulness, and layouts
                  that flow effortlessly between private retreats and majestic
                  outdoor panoramas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CINEMATIC BREATHING ROOM — "video-only" moment ─────────────── */}
        {/* No opaque panel here; the scroll video plays unobstructed */}
        <section className="min-h-[60vh] relative z-30 flex items-center justify-center py-16">
          <CinematicReveal className="text-center px-6 max-w-3xl flex flex-col items-center gap-4">
            <div className="inline-flex items-center h-7 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-1 font-mono text-[9px] md:text-xs font-medium uppercase text-amber-500 tracking-wider">
              Sustainable Futures
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] tracking-wide font-light">
              Engineering Tomorrow&apos;s Heritage
            </h2>
            <p className="text-white/55 text-xs md:text-sm font-light max-w-md leading-relaxed font-sans">
              Blending carbon-neutral building sciences with ancient, enduring
              masonry techniques to construct smart sanctuaries that last for
              generations.
            </p>
          </CinematicReveal>
        </section>

        {/* ── 03 · SENSORY DETAILING ─────────────────────────────────────── */}
        <section ref={tactilityRef} className="min-h-screen flex items-center py-20 relative z-30 transition-transform duration-100 ease-out" style={{ transform: `translateY(${parallaxY}px)` }}>
          {/* Drifting Cinematic Particles / Ambient Dust Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-amber-500/40 animate-dust-1" />
            <div className="absolute top-1/2 left-2/3 w-2 h-2 rounded-full bg-amber-500/30 animate-dust-2" />
            <div className="absolute top-2/3 left-1/4 w-1 h-1 rounded-full bg-amber-500/50 animate-dust-1" style={{ animationDelay: "3s" }} />
            <div className="absolute top-1/3 left-3/4 w-2 h-2 rounded-full bg-amber-500/20 animate-dust-2" style={{ animationDelay: "5s" }} />
          </div>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content (Clipping Mask Reveal) */}
            <div className={`clip-vertical-reveal ${isTactilityActive ? "active" : ""}`}>
              <div className="flex flex-col gap-6 bg-black/60 backdrop-blur-sm rounded-3xl border border-white/[0.08] p-8 md:p-12 h-full justify-center">
                <div className="inline-flex self-start items-center h-7 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-1 font-mono text-[9px] md:text-xs font-medium uppercase text-amber-500 tracking-wider">
                  03 / TACTILITY
                </div>
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
            </div>

            {/* Right Image (Blur & scale reveal from inside) */}
            <div className="w-full">
              <div 
                className={`relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isTactilityActive ? "scale-100 blur-0" : "scale-125 blur-md"
                }`}
              >
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                  alt="Tactile mockup of brushed marble slabs, warm cedar woods, and brass fixtures"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
        <TestimonialMarquee />

        {/* ── 04 · BESPOKE SANCTUARIES ───────────────────────────────────── */}
        <section 
          ref={legacyRef} 
          className="min-h-screen flex items-center py-20 relative z-30 transition-all duration-300 ease-out"
          style={{ transform: `translateY(${legacyExitY}px)`, opacity: legacyExitOpacity }}
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image (Diagonal Wipe Reveal) */}
            <div className="w-full order-2 lg:order-1">
              <div 
                className={`relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl clip-diagonal-reveal ${
                  isLegacyActive ? "active" : ""
                }`}
              >
                <Image
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern architectural villa glowing warmly during twilight hours"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Text (Word-by-word / Line-by-line reveal) */}
            <div 
              className={`h-full order-1 lg:order-2 transition-all duration-[1400ms] cubic-bezier(0.16,1,0.3,1) ${
                isLegacyActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div className="flex flex-col gap-6 bg-black/60 backdrop-blur-sm rounded-3xl border border-white/[0.08] p-8 md:p-12 h-full justify-center">
                <div 
                  className={`inline-flex self-start items-center h-7 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-1 font-mono text-[9px] md:text-xs font-medium uppercase text-amber-500 tracking-wider transition-all duration-[1000ms] ease-out ${
                    isLegacyActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  04 / LEGACY
                </div>
                <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] tracking-wide font-light leading-tight">
                  <span className={`inline-block transition-all duration-[800ms] delay-[100ms] ${isLegacyActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Bespoke</span>{" "}
                  <span className={`inline-block transition-all duration-[800ms] delay-[350ms] ${isLegacyActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Sanctuaries</span>
                </h2>
                <div className="flex flex-col gap-4 text-white/65 text-xs md:text-sm font-light leading-relaxed font-sans max-w-lg">
                  <p className={`transition-all duration-[1000ms] delay-[500ms] ${isLegacyActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    A house is more than shelter; it is an heirloom.
                  </p>
                  <p className={`transition-all duration-[1000ms] delay-[750ms] ${isLegacyActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    By combining net-zero systems, structural cedar, high-efficiency smart glazing, and custom detailing, JA Homes constructs legacies designed to protect your family and endure across lifetimes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEXT STEPS CTA PANELS ──────────────────────────────────────── */}
        <section ref={nextStepsRef} className="min-h-screen flex items-center py-20 relative z-30 overflow-hidden">
          {/* Subtle animated gradient background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[400px] bg-gradient-to-tr from-amber-500/[0.02] to-transparent blur-[120px] rounded-full animate-glow-drift pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

            <div 
              className={`flex flex-col items-center text-center mb-16 gap-3 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isNextStepsActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.95]"
              }`}
            >
              <div className="inline-flex items-center h-7 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-1 font-mono text-[9px] md:text-xs font-medium uppercase text-amber-500 tracking-wider">
                Next Steps
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-[#faf9f6] tracking-wide font-light">
                Craft Your Sanctuary
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

              {/* Panel 1: Explore Projects */}
              <div 
                className={`w-full transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isNextStepsActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-[80px] scale-[0.9]"
                }`}
              >
                <Link
                  href="/projects"
                  className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group flex flex-col justify-end p-8 md:p-12 hover:border-amber-500/30 hover:shadow-amber-500/[0.05] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <Image
                    src="/alpine_crest.jpg"
                    alt="Scenic Alpine Crest luxury estate"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
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
              </div>

              {/* Panel 2: Book Private Tour (Staggered by 0.18s) */}
              <div 
                className={`w-full transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[180ms] ${
                  isNextStepsActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-[80px] scale-[0.9]"
                }`}
              >
                <Link
                  href="/book"
                  className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group flex flex-col justify-end p-8 md:p-12 hover:border-amber-500/30 hover:shadow-amber-500/[0.05] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <Image
                    src="/zenith_penthouse.jpg"
                    alt="Modern luxury estate interior looking over skyline"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-800 ease-out group-hover:scale-105"
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
              </div>

            </div>
          </div>
        </section>

        {/* ── GET STARTED CTA SECTION (Behance Style) ────────────────────── */}
        <section className="relative min-h-[50vh] md:min-h-[60vh] w-full flex items-center justify-center overflow-hidden border-t border-white/5 py-20">
          {/* Background Image with Pool and Luxury House */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/azure_cove.jpg"
              alt="Luxury modern villa architecture with swimming pool"
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark Vignette Overlay for Premium Feel and text contrast */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 z-10" />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
            {/* Decorative Eyebrow */}
            <div className="inline-flex items-center h-7 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[9px] md:text-xs font-medium uppercase text-amber-500 tracking-wider">
              05 / DESTINATION
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-wide font-light leading-tight">
              Find Your Dream Home Faster
            </h2>

            {/* Subtext */}
            <p className="text-white/70 text-xs md:text-sm font-light max-w-2xl leading-relaxed font-sans">
              Explore and uncover your ideal dream home more quickly than ever before, with our
              innovative tools and resources designed to streamline your search.
            </p>

            {/* Button */}
            <Link
              href="/book"
              className="group relative bg-[#faf9f6] text-black font-semibold text-xs uppercase tracking-widest pl-7 pr-2 py-2 h-12 rounded-full flex items-center justify-between gap-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xl mt-2"
            >
              <span>Get Started Now</span>
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>
        </section>

      </main>
      {/* ═══════════════════════════════════════════════════════════════════════
          Footer lives OUTSIDE the scroll-driver — scrolls in normally below the
          last CTA section. The scroll-synced video does NOT play under the footer.
          ═══════════════════════════════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
