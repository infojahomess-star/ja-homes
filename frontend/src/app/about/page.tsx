"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Shield, Award, ArrowRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  spec: string;
}

export default function About() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      spec: "CEO"
    },
    {
      name: "Harendra Kumar",
      role: "Manager & Sales Head",
      bio: "Harendra possesses an extensive background collaborating with premier real estate brands across Delhi and Bhubaneswar. His deep market insight and dedication to client relations ensure that every bespoke acquisition is a seamless and extraordinary experience.",
      image: "https://res.cloudinary.com/pctbshnp/image/upload/v1782974948/Harendra_kyqarb.jpg",
      spec: "Sales Head"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Shared Header Navigation */}
      <Header />

      {/* Spacer */}
      <div className="h-28" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        {/* Intro Section */}
        <section className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
          <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] mb-3 block">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-serif tracking-wide font-light mb-12">
            A Legacy Built for Families
          </h1>
          <div className="flex flex-col gap-10 text-muted text-sm md:text-base leading-relaxed font-light font-sans text-left md:text-center">
            <div>
              <h3 className="text-foreground font-serif text-xl mb-3 tracking-wide">The Journey</h3>
              <p>
                JA Homes is a uniquely crafted brand established by two devoted fathers who bring a wealth of experience in the real estate industry. The inspiration for its name comes from the cherished names of their daughters, creating a deeply personal connection to the brand. This thoughtful approach not only infuses each project with emotional significance but also showcases the passion, dedication, and commitment that the founders pour into every home they develop. Each residence they create is a testament to their desire to build living spaces that families will cherish for years to come.
              </p>
            </div>
            <div>
              <h3 className="text-foreground font-serif text-xl mb-3 tracking-wide">Our Vision</h3>
              <p>
                Our vision is to transform the real estate industry by fostering communities where individuals and families feel a true sense of belonging. We aim to provide innovative, sustainable housing solutions that enhance the quality of life while promoting responsible development and environmental stewardship. Through collaboration and transparency, we aspire to empower our clients and partners, creating spaces that inspire and elevate the human experience in every neighborhood we touch.
              </p>
            </div>
            <div>
              <h3 className="text-foreground font-serif text-xl mb-3 tracking-wide">Mission & Values</h3>
              <p>
                Our mission is to seamlessly merge architectural elegance with family-centric design, constructing premium homes that serve as emotional anchors for the families who inhabit them. At our core, we value family, integrity, and innovation. We believe that true luxury is found not just in aesthetics, but in the enduring quality and emotional resonance of a space. We remain committed to sustainable practices, ensuring that every foundation laid is built upon trust and a relentless pursuit of perfection.
              </p>
            </div>
          </div>
        </section>

        {/* Cinematic Showcase Section */}
        <ScrollReveal className="mb-24">
          <section className="rounded-3xl overflow-hidden glass-panel border border-border-color relative group aspect-video max-w-5xl mx-auto shadow-2xl">
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
                  <h2 className="text-2xl md:text-4xl font-serif tracking-wide font-light text-foreground max-w-lg mb-2">
                    Built With Precision
                  </h2>
                  <p className="text-muted text-xs md:text-sm max-w-md font-sans font-light leading-relaxed">
                    A cinematic journey through our structural envelopes, biophilic layouts, and precision-cut organic materials.
                  </p>
                </div>
                
                {/* Media Controls */}
                <div className="flex gap-3 self-start md:self-auto">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full glass-panel border border-border-color hover:border-amber-500/30 flex items-center justify-center text-foreground hover:text-amber-500 transition-all active:scale-95 cursor-pointer shadow-lg"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full glass-panel border border-border-color hover:border-amber-500/30 flex items-center justify-center text-foreground hover:text-amber-500 transition-all active:scale-95 cursor-pointer shadow-lg"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Brand Core Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <ScrollReveal delay={100} className="h-full">
            <div className="glass-panel p-8 rounded-2xl border border-border-color flex flex-col gap-4 h-full">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Compass size={18} />
              </div>
              <h3 className="text-lg font-serif font-light text-foreground">Biophilic Design</h3>
              <p className="text-muted text-xs md:text-sm font-sans font-light leading-relaxed">
                Our structures are designed to match local topography, leveraging natural wind currents, solar seasonal angles, and geothermal resources to minimize active energy footprint.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="h-full">
            <div className="glass-panel p-8 rounded-2xl border border-border-color flex flex-col gap-4 h-full">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Shield size={18} />
              </div>
              <h3 className="text-lg font-serif font-light text-foreground">Material Integrity</h3>
              <p className="text-muted text-xs md:text-sm font-sans font-light leading-relaxed">
                We source materials exclusively from carbon-certified forests and quarries. Solid cedar timbers, premium marble slabs, and Belgian linens are selected for texture and lifetime endurance.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300} className="h-full">
            <div className="glass-panel p-8 rounded-2xl border border-border-color flex flex-col gap-4 h-full">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Award size={18} />
              </div>
              <h3 className="text-lg font-serif font-light text-foreground">Next-Gen Intelligence</h3>
              <p className="text-muted text-xs md:text-sm font-sans font-light leading-relaxed">
                Every home integrates high-efficiency automated systems. Smart glazing tints automatically based on UV metrics, while bioethanol double-sided hearths provide clean warmth.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Team Section */}
        <section className="pt-20 mb-16">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] mb-3 block">
              The Creators
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide font-light">
              Meet Our Designers & Engineers
            </h2>
            <p className="text-muted text-xs md:text-sm font-light mt-4">
              A collaborative conspiracy of visionaries, interior architects, and sustainability engineers dedicated to custom luxury.
            </p>
          </ScrollReveal>

          {/* Staggered Alternating Profiles */}
          <div className="flex flex-col gap-12 max-w-5xl mx-auto">
            {team.map((member, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <ScrollReveal key={idx} delay={idx * 50}>
                  <div className={`glass-card rounded-3xl overflow-hidden border border-border-color hover:border-amber-500/20 flex flex-col lg:flex-row ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}>
                    {/* Visual Avatar Box */}
                    <div className="lg:w-2/5 h-64 lg:h-72 bg-foreground/5 relative flex items-center justify-center overflow-hidden group shrink-0 border-b lg:border-b-0 lg:border-r border-border-color">
                      {member.image.includes("res.cloudinary.com") ? (
                        <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
                      ) : (
                        <span className="text-7xl font-serif text-amber-500/10 group-hover:scale-110 transition-transform duration-700 select-none">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20 z-10 pointer-events-none" />
                      
                      {/* Absolute positioning details */}
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {member.spec}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 lg:p-10 flex flex-col justify-center flex-1">
                      <span className="text-amber-550 dark:text-amber-500 text-[10px] font-mono uppercase tracking-[0.3em] mb-2 block">
                        {member.role}
                      </span>
                      <h3 className="text-2xl font-serif font-light text-foreground mb-4">{member.name}</h3>
                      <p className="text-muted text-sm font-sans font-light leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* CTA to Portfolio */}
        <ScrollReveal>
          <section className="bg-foreground/2 border border-border-color p-10 md:p-16 rounded-3xl text-center flex flex-col items-center gap-6 mt-16 max-w-4xl mx-auto shadow-lg">
            <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em]">Get Started</span>
            <h2 className="text-2xl md:text-4xl font-serif font-light tracking-wide max-w-xl text-foreground">
              Let's Co-Design Your Custom Sanctuary
            </h2>
            <p className="text-muted text-xs md:text-sm font-sans font-light max-w-md leading-relaxed">
              Connect with our architects to configure structural blueprints, select quarry slabs, and map ecological automation.
            </p>
            <div className="flex gap-4 mt-2">
              <Link
                href="/projects"
                className="bg-gold-gradient text-black hover:scale-105 active:scale-95 text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full flex items-center gap-2 transition-transform duration-300"
              >
                Explore Projects <ArrowRight size={14} />
              </Link>
              <Link
                href="/book"
                className="bg-foreground/5 hover:bg-foreground/10 text-foreground text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full transition-transform duration-300"
              >
                Schedule Tour
              </Link>
            </div>
          </section>
        </ScrollReveal>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
