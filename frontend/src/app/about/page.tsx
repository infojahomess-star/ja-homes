"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Shield, Award, Users, ArrowRight } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  spec: string;
}

export default function About() {
  const team: TeamMember[] = [
    {
      name: "Julian Sterling",
      role: "Founding Principal & Architect",
      bio: "Julian is the visionary lead behind the biophilic architectures at JA Homes. With over 20 years in high-end sustainable architecture, he crafts spaces that naturally integrate with their geological surroundings.",
      image: "/team1.jpg", // placeholder, but can be generated or rendered beautifully
      spec: "Yale M.Arch, LEED Fellow"
    },
    {
      name: "Sophia Vance",
      role: "Director of Interior Architecture",
      bio: "Sophia specializes in minimal tactile luxury. She curates raw material palettes—from Tuscan travertine stone to brushed smoked oak—creating a harmonious dialog between structural timber and internal sanctuaries.",
      image: "/team2.jpg",
      spec: "Milan Design Academy"
    },
    {
      name: "Dr. Aris Thorne",
      role: "Eco-Engineering Director",
      bio: "Aris leads our structural engineering division, pioneering high-performance envelope designs, custom bioethanol double-sided hearth integrations, and carbon-neutral geothermal heating systems.",
      image: "/team3.jpg",
      spec: "MIT PhD, Environmental Engineering"
    },
    {
      name: "Elena Rostova",
      role: "Director of Concierge Relations",
      bio: "Elena coordinates private tours and co-design contracts. She ensures every client's custom envelope and flooring configuration matches their lifestyle requirements with absolute confidentiality.",
      image: "/team4.jpg",
      spec: "Oxford Business School"
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
        <section className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] mb-3 block">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-serif tracking-wide font-light mb-6">
            Architectural Sanctuaries
          </h1>
          <p className="text-muted text-sm md:text-base leading-relaxed font-light font-sans">
            JA Homes represents the intersection of luxury craftsmanship and eco-conscious engineering. 
            We design residential monuments that offer absolute comfort while honoring the earth through carbon-neutral materials, sustainable sourcing, and modern off-grid intelligence.
          </p>
        </section>

        {/* Brand Core Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="glass-panel p-8 rounded-2xl border border-border-color flex flex-col gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Compass size={18} />
            </div>
            <h3 className="text-lg font-serif font-light text-foreground">Biophilic Design</h3>
            <p className="text-muted text-xs md:text-sm font-sans font-light leading-relaxed">
              Our structures are designed to match local topography, leveraging natural wind currents, solar seasonal angles, and geothermal resources to minimize active energy footprint.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-border-color flex flex-col gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Shield size={18} />
            </div>
            <h3 className="text-lg font-serif font-light text-foreground">Material Integrity</h3>
            <p className="text-muted text-xs md:text-sm font-sans font-light leading-relaxed">
              We source materials exclusively from carbon-certified forests and quarries. Solid cedar timbers, premium marble slabs, and Belgian linens are selected for texture and lifetime endurance.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-border-color flex flex-col gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Award size={18} />
            </div>
            <h3 className="text-lg font-serif font-light text-foreground">Next-Gen Intelligence</h3>
            <p className="text-muted text-xs md:text-sm font-sans font-light leading-relaxed">
              Every home integrates high-efficiency automated systems. Smart glazing tints automatically based on UV metrics, while bioethanol double-sided hearths provide clean warmth.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="border-t border-border-color pt-20 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-500 text-xs font-mono uppercase tracking-[0.4em] mb-3 block">
              The Creators
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide font-light">
              Meet Our Designers & Engineers
            </h2>
            <p className="text-muted text-xs md:text-sm font-light mt-4">
              A collaborative conspiracy of visionaries, interior architects, and sustainability engineers dedicated to custom luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden flex flex-col border border-border-color hover:border-amber-500/20"
              >
                {/* Visual Avatar with beautiful initials styling for a premium architectural vibe */}
                <div className="h-64 bg-foreground/5 relative flex items-center justify-center overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/10 z-10" />
                  <span className="text-6xl font-serif text-amber-500/10 group-hover:scale-110 transition-transform duration-700 select-none">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                  
                  {/* Absolute positioning details */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {member.spec}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-serif font-light text-foreground">{member.name}</h3>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider mb-3 block">
                    {member.role}
                  </span>
                  <p className="text-muted text-xs font-sans font-light leading-relaxed flex-1">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA to Portfolio */}
        <section className="bg-foreground/2 border border-border-color p-10 md:p-16 rounded-3xl text-center flex flex-col items-center gap-6 mt-16 max-w-4xl mx-auto">
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
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
