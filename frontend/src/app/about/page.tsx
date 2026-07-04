"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Shield, Award, ArrowRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CinematicReveal from "../../components/CinematicReveal";
import TeamCard from "../../components/TeamCard";
import ValueAccordion from "../../components/ValueAccordion";
import PullQuote from "../../components/PullQuote";
import { motionVariants } from "../../components/motion-variants";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  spec: string;
  phone?: string;
}

export default function About() {
  const [revealActive, setRevealActive] = useState(true);
  const [isWiped, setIsWiped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoTiltX, setVideoTiltX] = useState(0);
  
  const imgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Trigger Slide Curtain Wipe on mount
    const timer = setTimeout(() => {
      setRevealActive(false);
    }, 100);

    // 2. Setup IntersectionObserver for clip-path unmask wipe
    const clipObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsWiped(true);
          clipObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (imgRef.current) clipObserver.observe(imgRef.current);

    // 3. Scroll Tilt Listener for Video Card Parallax
    const handleScroll = () => {
      if (videoCardRef.current) {
        const rect = videoCardRef.current.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const cardCenter = rect.top + rect.height / 2;
        // Calculate offset fraction from viewport center (-1 to 1)
        const offsetFraction = (cardCenter - viewHeight / 2) / (viewHeight / 2);
        // Tilt max 6 degrees
        setVideoTiltX(offsetFraction * -5);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      clipObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log(err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const team: TeamMember[] = [
    {
      name: "Debiprasad Deo",
      role: "Real Estate Marketing",
      bio: "Debiprasad brings 8+ years of experience in real estate marketing, ensuring our bespoke architectural masterpieces reach the right visionary clientele across global markets.",
      image: "https://res.cloudinary.com/pctbshnp/image/upload/v1782974948/Debiprasad_Deo_tsg4gr.jpg",
      spec: "Marketing Director"
    },
    {
      name: "Arjun Karthik Bera",
      role: "Partner, CEO",
      bio: "With over a decade of strategic leadership experience at prestigious firms like Bhutani Infra in Delhi, Arjun brings unparalleled expertise to JA Homes. His visionary approach to luxury real estate drives our commitment to delivering bespoke architectural masterpieces.",
      image: "https://res.cloudinary.com/pctbshnp/image/upload/v1782974948/Arjun_ez5php.jpg",
      spec: "CEO",
      phone: "919811086206"
    },
    {
      name: "Harendra Kumar",
      role: "Manager & Sales Head",
      bio: "Harendra possesses an extensive background collaborating with premier real estate brands across Delhi and Bhubaneswar. His deep market insight and dedication to client relations ensure that every bespoke acquisition is a seamless and extraordinary experience.",
      image: "https://res.cloudinary.com/pctbshnp/image/upload/v1782974948/Harendra_kyqarb.jpg",
      spec: "Sales Head",
      phone: "919348402331"
    }
  ];

  // Drop-cap text splitting
  const storyParagraph1 = "JA Homes is a uniquely crafted brand established by two devoted fathers who bring a wealth of experience in the real estate industry. The inspiration for its name comes from the cherished names of their daughters, creating a deeply personal connection to the brand. This thoughtful approach not only infuses each project with emotional significance but also showcases the passion, dedication, and commitment that the founders pour into every home they develop.";
  const dropCapLetter = storyParagraph1[0];
  const storyRestText = storyParagraph1.slice(1);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500 selection:text-black relative">
      
      {/* Signature slideReveal: Horizontal Curtain wipe in warm sand tone */}
      <div
        className={`fixed inset-0 z-50 bg-[#E8E2D7] transition-transform duration-[1100ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
          revealActive ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Shared Header Navigation */}
      <Header />

      {/* Top Spacer */}
      <div className="h-28" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        
        {/* Intro Section / Our Story (Split-Screen layout) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-28">
          
          {/* Left Column: Story Text with Drop-Cap */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <CinematicReveal className="flex flex-col gap-2">
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl font-serif tracking-wide font-light leading-tight">
                A Legacy Born of Family
              </h1>
            </CinematicReveal>

            <CinematicReveal className="flex flex-col gap-6" delay={150}>
              <p className="text-muted text-sm md:text-base leading-relaxed font-sans font-light">
                <span className="float-left text-5xl md:text-6xl font-serif text-amber-550 dark:text-amber-500 leading-none pt-1.5 pr-3 font-semibold select-none">
                  {dropCapLetter}
                </span>
                {storyRestText}
              </p>
              <p className="text-muted text-sm md:text-base leading-relaxed font-sans font-light">
                By infusing their family values directly into the foundations of JA Homes, our founders ensure that every structure is developed not merely as structural concrete, but as a warm, biophilic sanctuary where families will grow and thrive for generations.
              </p>
            </CinematicReveal>
          </div>

          {/* Right Column: Daughters' motif image with horizontal clip-path unmask wipe */}
          <div className="lg:col-span-6 w-full">
            <div
              ref={imgRef}
              className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-border-color shadow-2xl transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                clipPath: isWiped ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80"
                alt="A warm, sun-drenched family moment inside a luxury wooden home"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Supporting Image Spacer 1: Blueprint Close-up */}
        <section className="mb-28">
          <CinematicReveal className="w-full">
            <div className="relative h-[45vh] w-full rounded-3xl overflow-hidden border border-border-color shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                alt="Architectural blueprint and schematic detailing draft closeup"
                fill
                sizes="100vw"
                className="object-cover opacity-80 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10 pointer-events-none" />
              <div className="absolute bottom-6 left-8 z-20 font-mono text-[9px] text-white/60 tracking-widest uppercase">
                SPECIFICATION: MAPPING BIOPHILIC SCHEMATICS
              </div>
            </div>
          </CinematicReveal>
        </section>

        {/* Values Section: Journey / Vision / Accordion Layout */}
        <section className="max-w-4xl mx-auto mb-28">
          <div className="text-center mb-16">
            <CinematicReveal className="flex flex-col gap-3">
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em]">
                Core Architecture
              </span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide font-light text-foreground">
                How We Build
              </h2>
            </CinematicReveal>
          </div>

          <CinematicReveal delay={150}>
            <ValueAccordion />
          </CinematicReveal>
        </section>

        {/* Supporting Image Spacer 2: Construction Work Detail */}
        <section className="mb-28">
          <CinematicReveal className="w-full">
            <div className="relative h-[45vh] w-full rounded-3xl overflow-hidden border border-border-color shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
                alt="Architectural concrete framing and slate stonework construction"
                fill
                sizes="100vw"
                className="object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10 pointer-events-none" />
              <div className="absolute bottom-6 left-8 z-20 font-mono text-[9px] text-white/60 tracking-widest uppercase">
                CRAFT: MASONRY CONCRETE AND SLATE DETAILING
              </div>
            </div>
          </CinematicReveal>
        </section>

        {/* Cinematic Showcase Section: Rounded elevated card with 3D tilt-on-scroll */}
        <section className="mb-28 max-w-5xl mx-auto px-2">
          <div className="text-center mb-12">
            <CinematicReveal className="flex flex-col gap-2">
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.3em] block">
                Precision Sourcing
              </span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide font-light text-foreground">
                Precision Sourced & Assembled
              </h2>
            </CinematicReveal>
          </div>

          <CinematicReveal delay={150}>
            <div
              ref={videoCardRef}
              className="relative rounded-3xl overflow-hidden glass-panel border border-border-color shadow-2xl bg-black aspect-video transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(1200px) rotateX(${videoTiltX}deg)`,
                willChange: "transform"
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-85 scale-100 group-hover:scale-102 transition-transform duration-1000 ease-out"
              >
                <source src="https://res.cloudinary.com/dtmqv7oqq/video/upload/v1782279962/JA_Homes_Built_With_Precision_202606231542_ib78yo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.3em] mb-2 block">
                      Cinematic Showcase
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif tracking-wide font-light text-[#faf9f6] max-w-lg mb-2">
                      Built With Precision
                    </h3>
                    <p className="text-muted/80 text-xs md:text-sm max-w-md font-sans font-light leading-relaxed">
                      A cinematic journey through our structural envelopes, biophilic layouts, and precision-cut organic materials.
                    </p>
                  </div>
                  
                  {/* Media Controls */}
                  <div className="flex gap-3 self-start md:self-auto pointer-events-auto">
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full glass-panel border border-border-color hover:border-amber-500/30 flex items-center justify-center text-[#faf9f6] hover:text-amber-500 transition-all active:scale-95 cursor-pointer shadow-lg bg-black/40"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 rounded-full glass-panel border border-border-color hover:border-amber-500/30 flex items-center justify-center text-[#faf9f6] hover:text-amber-500 transition-all active:scale-95 cursor-pointer shadow-lg bg-black/40"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CinematicReveal>
        </section>

        {/* Staggered Grid Pillars (Display as 3 cards, alternating image/icon reveal, lifts with shadow bloom) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mb-40 pt-10">
          
          {/* Pillar 1: Biophilic Design */}
          <CinematicReveal className="h-full">
            <div className="glass-panel p-8 rounded-2xl border border-border-color flex flex-col gap-5 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(41,105,194,0.3)] hover:border-amber-500/30">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Compass size={18} />
              </div>
              <h3 className="text-lg font-serif font-light text-foreground">Biophilic Design</h3>
              <p className="text-muted text-xs md:text-sm font-sans font-light leading-relaxed">
                Our structures are designed to match local topography, leveraging natural wind currents, solar seasonal angles, and geothermal resources to minimize active energy footprint.
              </p>
            </div>
          </CinematicReveal>

          {/* Pillar 2: Material Integrity (Alternating Image Reveal & translated lower for stagger) */}
          <CinematicReveal className="h-full lg:translate-y-10" delay={150}>
            <div className="relative p-8 rounded-2xl border border-border-color flex flex-col justify-end gap-5 h-full min-h-[300px] overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(41,105,194,0.3)] hover:border-amber-500/30">
              {/* Background Image Reveal */}
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
                alt="Tactile timber and stone detailing close-up"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/85 z-10 transition-opacity duration-500 group-hover:opacity-75" />

              {/* Content */}
              <div className="relative z-20 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500 self-start">
                  <Shield size={18} />
                </div>
                <h3 className="text-lg font-serif font-light text-[#faf9f6]">Material Integrity</h3>
                <p className="text-white/70 text-xs md:text-sm font-sans font-light leading-relaxed">
                  We source materials exclusively from carbon-certified forests and quarries. Solid cedar timbers, premium marble slabs, and Belgian linens are selected for texture and lifetime endurance.
                </p>
              </div>
            </div>
          </CinematicReveal>

          {/* Pillar 3: Next-Gen Intelligence */}
          <CinematicReveal className="h-full" delay={300}>
            <div className="glass-panel p-8 rounded-2xl border border-border-color flex flex-col gap-5 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(41,105,194,0.3)] hover:border-amber-500/30">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Award size={18} />
              </div>
              <h3 className="text-lg font-serif font-light text-foreground">Next-Gen Intelligence</h3>
              <p className="text-muted text-xs md:text-sm font-sans font-light leading-relaxed">
                Every home integrates high-efficiency automated systems. Smart glazing tints automatically based on UV metrics, while bioethanol double-sided hearths provide clean warmth.
              </p>
            </div>
          </CinematicReveal>
        </section>

        {/* Pull-Quote Section: Large italic serif quote from founders */}
        <section className="mb-28 border-t border-b border-border-color/30">
          <PullQuote
            quote="We do not construct buildings; we build sanctuaries. Every beam placed, every stone set, carries the promise we make to our daughters: to leave behind a more sustainable, beautiful footprint for the families of tomorrow."
            author="JA Homes Founders"
            role="Devoted Fathers & Principal Craftsmen"
          />
        </section>

        {/* Supporting Image Spacer 3: Family Moment / Modern Deck Detail */}
        <section className="mb-28">
          <CinematicReveal className="w-full">
            <div className="relative h-[45vh] w-full rounded-3xl overflow-hidden border border-border-color shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Modern wood clad architecture bathed in twilight warmth"
                fill
                sizes="100vw"
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10 pointer-events-none" />
              <div className="absolute bottom-6 left-8 z-20 font-mono text-[9px] text-white/60 tracking-widest uppercase">
                HERITAGE: ARCHITECTURAL LEGACIES IN EQUILIBRIUM
              </div>
            </div>
          </CinematicReveal>
        </section>

        {/* Creators / Team Section: portrait cards with grayscale->color transitions */}
        <section className="pt-10 mb-28">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <CinematicReveal className="flex flex-col gap-3">
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] block">
                The Creators
              </span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide font-light">
                Meet Our Designers & Engineers
              </h2>
              <p className="text-muted text-xs md:text-sm font-light mt-4">
                A collaborative conspiracy of visionaries, interior architects, and sustainability engineers dedicated to custom luxury.
              </p>
            </CinematicReveal>
          </div>

          {/* Staggered Rotate-in entrance Portrait Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, idx) => (
              <TeamCard
                key={idx}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
                spec={member.spec}
                phone={member.phone}
                delay={idx * 150}
              />
            ))}
          </div>
        </section>

        {/* CTA to Portfolio */}
        <section className="max-w-4xl mx-auto mb-16">
          <CinematicReveal>
            <div className="bg-foreground/[0.02] border border-border-color p-10 md:p-16 rounded-3xl text-center flex flex-col items-center gap-6 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 noise-overlay z-10" />
              
              <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] relative z-20">Get Started</span>
              
              <h2 className="text-2xl md:text-4xl font-serif font-light tracking-wide max-w-xl text-foreground relative z-20">
                Let's Co-Design Your Custom Sanctuary
              </h2>
              
              <p className="text-muted text-xs md:text-sm font-sans font-light max-w-md leading-relaxed relative z-20">
                Connect with our architects to configure structural blueprints, select quarry slabs, and map ecological automation.
              </p>
              
              <div className="flex gap-4 mt-2 relative z-20">
                <Link
                  href="/projects"
                  className={`bg-gold-gradient text-black text-xs font-semibold uppercase tracking-widest px-6 py-3.5 rounded-full flex items-center gap-2 ${motionVariants.ctaInteractive}`}
                >
                  Explore Projects <ArrowRight size={14} />
                </Link>
                <Link
                  href="/book"
                  className={`bg-foreground/5 hover:bg-foreground/10 text-foreground text-xs font-semibold uppercase tracking-widest px-6 py-3.5 rounded-full ${motionVariants.ctaInteractive}`}
                >
                  Schedule Tour
                </Link>
              </div>
            </div>
          </CinematicReveal>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
