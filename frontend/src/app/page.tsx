"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import TextType from "../components/TextType";

interface Hotspot {
  id: number;
  top: string;
  left: string;
  title: string;
  description: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Testimonials Slider State
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [fadeTestimonial, setFadeTestimonial] = useState(true);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  // Testimonials Archive
  const testimonials = [
    {
      quote: "JA Homes exceeded our wildest expectations. The biophilic design integration and floor-to-ceiling travertine fireplace have turned our mountain villa into an absolute sanctuary.",
      client: "Sarah & Robert K., Aspen Collection",
      stars: 5
    },
    {
      quote: "The attention to detail and carbon-certified timber construction are unparalleled. Working with Julian and Sophia to co-design our coastal residence was a seamless, premium experience.",
      client: "Michael D., Malibu Cove",
      stars: 5
    },
    {
      quote: "Absolute luxury matched with modern off-grid intelligence. Our home automatically regulates solar seasonal angles and geothermal heating, providing sustainable comfort year-round.",
      client: "Dr. Elena V., Manhattan Heights",
      stars: 5
    }
  ];

  const handleNextTestimonial = () => {
    setFadeTestimonial(false);
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      setFadeTestimonial(true);
    }, 200);
  };

  const handlePrevTestimonial = () => {
    setFadeTestimonial(false);
    setTimeout(() => {
      setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setFadeTestimonial(true);
    }, 200);
  };

  // Hotspots Data
  const hotspots: Hotspot[] = [
    {
      id: 1,
      top: "62%",
      left: "32%",
      title: "Custom Travertine Fireplace",
      description: "Built with floor-to-ceiling split-face Italian travertine stone, housing a clean-burning bioethanol double-sided hearth with dual glass insulation."
    },
    {
      id: 2,
      top: "14%",
      left: "58%",
      title: "Exposed Cedar Timber Beams",
      description: "Structural solid cedar beams sourced sustainably, sandblasted for texture, and finished with a custom matte natural oil coating."
    },
    {
      id: 3,
      top: "40%",
      left: "82%",
      title: "Triple-Glazed Minimalist Glass",
      description: "12-foot high motorized sliding panels with solar-reflective smart tint and structural silicone joints for absolute panoramas."
    },
    {
      id: 4,
      top: "76%",
      left: "64%",
      title: "Bespoke Italian Lounge Suites",
      description: "Custom-configured modular low-profile sofa in premium stain-resistant Belgian linen, paired with solid black walnut accents."
    }
  ];

  // Disable preloader once video is ready to play
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 3) {
        setLoading(false);
      } else {
        const handleCanPlay = () => {
          setLoading(false);
        };
        video.addEventListener("canplay", handleCanPlay);
        return () => {
          video.removeEventListener("canplay", handleCanPlay);
        };
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500 selection:text-black">
      {/* 1. Loading Preloader */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-700">
          <div className="relative flex flex-col items-center gap-8">
            <h1 className="text-4xl md:text-5xl font-serif tracking-widest text-gold font-light animate-pulse">
              JA Homes
            </h1>
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-2 border-border-color"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-amber-500 animate-spin"></div>
            </div>
            <p className="text-muted tracking-wider text-xs font-mono uppercase">
              Streaming Cinematic Preview
            </p>
          </div>
        </div>
      )}

      {/* Shared Header Navigation */}
      <Header />

      {/* 3. Hero Video Section */}
      <section id="hero" className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
        {/* Local Autoplaying High Quality Video */}
        <video
          ref={videoRef}
          src="/ja_homes_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-85"
          onPlay={() => setLoading(false)}
        />

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

        {/* Dynamic Overlay CTA */}
        <div className="absolute inset-x-0 bottom-16 flex flex-col items-center justify-center px-6 pointer-events-none text-center z-20">
          <div className="max-w-2xl flex flex-col items-center animate-fade-in-up">
            <div className="mt-8 flex flex-col items-center gap-4 pointer-events-auto">
              <span className="text-[9px] tracking-[0.3em] text-amber-500 uppercase font-mono animate-bounce">
                Scroll to enter experience
              </span>
              <div className="flex gap-4">
                <Link
                  href="/projects"
                  className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-white shadow-[0_4px_20px_rgba(14,140,226,0.3)] hover:shadow-[0_6px_25px_rgba(14,140,226,0.5)] text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
                  id="hero-explore-portfolio"
                >
                  View Projects <ArrowRight size={14} />
                </Link>
                <Link
                  href="/book"
                  className="glass-panel text-amber-300 hover:text-white hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-500 text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 border border-amber-500/30 hover:border-transparent hover:shadow-[0_4px_15px_rgba(14,140,226,0.25)]"
                  id="hero-schedule-tour"
                >
                  Book Private Tour
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade Gradient to transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* 4. Interactive Material Tour */}
      <section id="virtual-tour" className="py-24 bg-foreground/2 relative z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Copy */}
            <ScrollReveal className="w-full lg:w-2/5 flex flex-col gap-6">
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block">
                Architectural Detailing
              </span>
              <TextType
                text="Interactive Material Tour"
                as="h2"
                className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light"
                typingSpeed={75}
                showCursor={true}
                cursorCharacter="|"
                loop={false}
                startOnVisible={true}
              />
              <p className="text-muted text-sm md:text-base leading-relaxed font-light font-sans">
                Hover or click on the interactive hotspots in the custom living room design to examine the craftsmanship, source materials, and smart technologies integrated into a typical JA home.
              </p>
              
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <Compass size={14} />
                  </span>
                  <div>
                    <span className="text-xs font-mono text-foreground/80 block">Virtual Compass Integration</span>
                    <span className="text-xs text-muted font-light">Accented spatial positioning for seasonal sun angles.</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <Sparkles size={14} />
                  </span>
                  <div>
                    <span className="text-xs font-mono text-foreground/80 block">Certified Materials Sourcing</span>
                    <span className="text-xs text-muted font-light">Verified carbon-neutral woods and premium stone quarries.</span>
                  </div>
                </div>
              </div>

              {/* Custom Hotspot Description Display */}
              <div className="mt-6 min-h-[140px] p-5 glass-panel rounded-xl border border-amber-500/20 flex flex-col justify-center transition-all duration-300">
                {activeHotspot ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-serif text-amber-550 dark:text-amber-300 tracking-wide font-medium">
                        {activeHotspot.title}
                      </span>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="text-muted hover:text-foreground cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-xs md:text-sm text-muted leading-relaxed font-light font-sans">
                      {activeHotspot.description}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-muted py-4">
                    <p className="text-xs font-mono uppercase tracking-wider mb-1">Interactive Console</p>
                    <p className="text-xs font-light">Click any hotspot indicator on the panorama to inspect detail specifications.</p>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Right Interactive Hotspot Image Container */}
            <ScrollReveal className="w-full lg:w-3/5" delay={150}>
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border-color shadow-2xl">
                <Image
                  src="/villa_interior.png"
                  alt="Luxury Villa Living Room Interior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                {hotspots.map((hotspot) => {
                  const isActive = activeHotspot?.id === hotspot.id;
                  return (
                    <button
                      key={hotspot.id}
                      onClick={() => setActiveHotspot(hotspot)}
                      className="absolute group flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                      style={{ top: hotspot.top, left: hotspot.left }}
                      aria-label={`Hotspot details: ${hotspot.title}`}
                    >
                      <span className={`absolute inset-0 rounded-full bg-amber-500 opacity-60 ${
                        isActive ? "scale-150 animate-ping" : "animate-ping"
                      }`} />
                      <span className={`relative w-4 h-4 rounded-full border border-[#faf9f6] transition-all duration-300 flex items-center justify-center text-[8px] font-bold ${
                        isActive ? "bg-amber-500 text-black scale-125" : "bg-background text-foreground hover:scale-110"
                      }`}>
                        {hotspot.id}
                      </span>
                      <span className="absolute bottom-10 scale-0 group-hover:scale-100 transition-all duration-200 ease-out glass-panel text-[10px] text-foreground px-3 py-1.5 rounded whitespace-nowrap border border-amber-500/20 shadow-xl pointer-events-none">
                        {hotspot.title}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted px-2 font-mono">
                <span>Viewport: Mock 3D Pan (Living Area)</span>
                <span>Active Hotspots: {hotspots.length}</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. What Our Clients Are Saying (Testimonials) */}
      <section className="py-24 bg-foreground/2 border-t border-b border-border-color relative z-30 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
          {/* Header */}
          <ScrollReveal className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-[1px] w-8 bg-amber-500"></span>
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em]">What Our Clients</span>
              <span className="h-[1px] w-8 bg-amber-500"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light uppercase">
              Are Saying
            </h2>
          </ScrollReveal>

          {/* Testimonial Quote Frame */}
          <div className="w-full max-w-3xl min-h-[220px] flex flex-col items-center justify-center text-center mb-10">
            <div className={`transition-all duration-300 flex flex-col items-center ${
              fadeTestimonial ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}>
              {/* Huge Quote Icon */}
              <span className="text-8xl font-serif text-amber-550/10 leading-none select-none">“</span>
              
              <p className="text-lg md:text-xl md:leading-relaxed font-serif font-light text-foreground max-w-2xl -mt-4 mb-6 italic">
                {testimonials[activeTestimonial].quote}
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-3 text-amber-500">
                {Array.from({ length: testimonials[activeTestimonial].stars }).map((_, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>

              {/* Client Info */}
              <span className="text-xs font-mono uppercase tracking-wider text-muted">
                — {testimonials[activeTestimonial].client}
              </span>
            </div>
          </div>

          {/* Slider Controls */}
          <ScrollReveal className="w-full flex items-center justify-center gap-6 md:gap-8 font-mono text-[10px] tracking-widest text-muted uppercase">
            <button
              onClick={handlePrevTestimonial}
              className="hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              ← Prev
            </button>
            <button
              onClick={() => setShowAllTestimonials(true)}
              className="glass-panel hover:bg-amber-500/10 hover:border-amber-500/30 px-5 py-2.5 rounded-none text-foreground border border-border-color transition-all cursor-pointer font-semibold"
            >
              View All Testimonials +
            </button>
            <button
              onClick={handleNextTestimonial}
              className="hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              Next →
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Modal Overlay */}
      {showAllTestimonials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-6">
          <div className="glass-panel w-full max-w-3xl max-h-[85vh] rounded-3xl border border-border-color shadow-2xl p-8 overflow-y-auto flex flex-col animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-border-color pb-4 mb-6">
              <div>
                <span className="text-amber-500 text-[10px] font-mono uppercase tracking-wider block mb-1">Archive</span>
                <h3 className="text-2xl font-serif font-light text-foreground">ALL CLIENT REVIEWS</h3>
              </div>
              <button
                onClick={() => setShowAllTestimonials(false)}
                className="text-muted hover:text-foreground cursor-pointer font-mono text-xs uppercase tracking-widest border border-border-color hover:border-foreground/30 px-3 py-1.5 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex flex-col gap-8 divide-y divide-border-color">
              {testimonials.map((t, idx) => (
                <div key={idx} className={`pt-6 ${idx === 0 ? "pt-0" : ""}`}>
                  <p className="text-sm md:text-base leading-relaxed text-foreground/90 font-serif italic mb-4">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted">
                      — {t.client}
                    </span>
                    <div className="flex gap-0.5 text-amber-500">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <span key={i} className="text-xs">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA section to direct to Projects */}
      <ScrollReveal className="w-full relative bg-black overflow-hidden py-24 px-6 my-12">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="https://res.cloudinary.com/dtmqv7oqq/video/upload/v1782285983/Futuristic_city_skyline_at_night_202606241246_xqfvb1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background pointer-events-none" />

        <div className="relative z-30 text-center flex flex-col items-center gap-6 max-w-4xl mx-auto">
          <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em]">Next Steps</span>
          <TextType
            text="Craft Your Bespoke Residence"
            as="h2"
            className="text-3xl md:text-5xl font-serif text-foreground tracking-wide font-light max-w-xl"
            typingSpeed={75}
            showCursor={true}
            cursorCharacter="|"
            loop={false}
            startOnVisible={true}
          />
          <p className="text-muted text-sm md:text-base max-w-md font-light leading-relaxed font-sans">
            Navigate to our projects showcase to explore current structural completions or co-design your own architectural sanctuary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/projects"
              className="bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              Explore Projects
            </Link>
            <Link
              href="/book"
              className="bg-foreground/5 border border-border-color text-[#faf9f6] hover:bg-foreground/10 text-xs font-semibold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all cursor-pointer backdrop-blur-sm"
            >
              Schedule Private Tour
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919811086206?text=Hello%2C%20I%20am%20interested%20in%20JA%20Homes" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
