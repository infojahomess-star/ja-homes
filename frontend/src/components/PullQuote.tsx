"use client";

import React, { useEffect, useRef, useState } from "react";

interface PullQuoteProps {
  quote: string;
  author: string;
  role: string;
}

export default function PullQuote({ quote, author, role }: PullQuoteProps) {
  const [isVisible, setIsVisible] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    const currentEl = quoteRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  return (
    <div
      ref={quoteRef}
      className="relative max-w-4xl mx-auto px-6 py-20 text-center z-20 overflow-hidden"
    >
      {/* Ambient background quotation mark */}
      <span className="text-[14rem] font-serif text-amber-550/5 dark:text-amber-500/5 leading-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] -z-10 pointer-events-none">
        “
      </span>

      {/* Quote text with spacing reveal */}
      <blockquote
        className={`text-xl md:text-3xl font-serif font-light text-foreground italic leading-relaxed transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible
            ? "opacity-100 tracking-normal"
            : "opacity-0 tracking-[0.15em]"
        }`}
      >
        "{quote}"
      </blockquote>

      {/* Author details fading in shortly after */}
      <div
        className={`flex flex-col items-center gap-1 mt-8 transition-opacity duration-1000 delay-[800ms] ${
          isVisible ? "opacity-80" : "opacity-0"
        }`}
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-foreground font-bold">
          — {author}
        </span>
        <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block">
          {role}
        </span>
      </div>
    </div>
  );
}
