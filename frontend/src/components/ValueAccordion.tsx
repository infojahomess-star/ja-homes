"use client";

import React, { useState, useEffect, useRef } from "react";

interface AccordionItem {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  iconPath: string;
  viewBox: string;
}

export default function ValueAccordion() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const items: AccordionItem[] = [
    {
      id: 0,
      title: "The Journey",
      subtitle: "Bespoke foundations anchored in family legacy",
      content: "JA Homes is a uniquely crafted brand established by two devoted fathers who bring a wealth of experience in the real estate industry. The inspiration for its name comes from the cherished names of their daughters, creating a deeply personal connection to the brand. This thoughtful approach not only infuses each project with emotional significance but also showcases the passion, dedication, and commitment that the founders pour into every home they develop. Each residence they create is a testament to their desire to build living spaces that families will cherish for years to come.",
      // Footsteps / Winding Path icon
      iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
      viewBox: "0 0 24 24"
    },
    {
      id: 1,
      title: "Our Vision",
      subtitle: "Co-designing spaces that elevate the human experience",
      content: "Our vision is to transform the real estate industry by fostering communities where individuals and families feel a true sense of belonging. We aim to provide innovative, sustainable housing solutions that enhance the quality of life while promoting responsible development and environmental stewardship. Through collaboration and transparency, we aspire to empower our clients and partners, creating spaces that inspire and elevate the human experience in every neighborhood we touch.",
      // Vision Eye icon
      iconPath: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
      viewBox: "0 0 24 24"
    },
    {
      id: 2,
      title: "Mission & Values",
      subtitle: "Integrity, innovation, and biophilic excellence",
      content: "Our mission is to seamlessly merge architectural elegance with family-centric design, constructing premium homes that serve as emotional anchors for the families who inhabit them. At our core, we value family, integrity, and innovation. We believe that true luxury is found not just in aesthetics, but in the enduring quality and emotional resonance of a space. We remain committed to sustainable practices, ensuring that every foundation laid is built upon trust and a relentless pursuit of perfection.",
      // Shield outline icon
      iconPath: "M12 2S3 5 3 12c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12 0-7-9-10-9-10zm0 19.9c-3.75-1-6.9-5.11-7-9.9 0-.07 0-.14.01-.2 1.48-.3 5.43-1.31 6.99-4.8 1.56 3.49 5.51 4.5 6.99 4.8.01.06.01.13.01.2-.1 4.79-3.25 8.9-7 9.9z",
      viewBox: "0 0 24 24"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="w-full flex flex-col gap-6">
      {/* SVG Draw Keyframe Style Block */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawAccordionPath {
          from {
            stroke-dashoffset: 120;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .draw-accordion-svg path {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: drawAccordionPath 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {items.map((item) => {
        const isOpen = activeIndex === item.id;
        
        return (
          <div
            key={item.id}
            className={`border rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 ${
              isOpen
                ? "bg-amber-500/[0.03] border-amber-500/30 shadow-[0_4px_25px_-12px_rgba(41,105,194,0.15)]"
                : "bg-card/30 border-border-color hover:border-amber-500/20 hover:bg-card/50"
            }`}
          >
            {/* Header Button */}
            <button
              onClick={() => setActiveIndex(isOpen ? -1 : item.id)}
              className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* SVG Icon drawing on reveal */}
                <span className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <svg
                    className={`w-5 h-5 fill-none stroke-current stroke-[1.5] ${
                      isRevealed ? "draw-accordion-svg" : ""
                    }`}
                    viewBox={item.viewBox}
                  >
                    <path d={item.iconPath} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                <div>
                  <h3 className="text-base font-serif font-light text-foreground">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider block mt-0.5">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              {/* Expansion indicator */}
              <span className="text-muted/60 transition-transform duration-350 pr-2">
                <span className={`inline-block transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-500" : ""}`}>
                  ▼
                </span>
              </span>
            </button>

            {/* Expandable Content Container */}
            <div
              className="transition-all duration-500 ease-in-out overflow-hidden"
              style={{
                maxHeight: isOpen ? "350px" : "0px",
                opacity: isOpen ? 1 : 0
              }}
            >
              <div className="px-6 pb-6 pt-2 border-t border-border-color/10">
                <p className="text-muted text-xs md:text-sm font-sans font-light leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
