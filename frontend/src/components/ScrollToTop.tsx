"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed ${
            isHomePage ? "bottom-[88px] right-[30px]" : "bottom-6 right-6"
          } z-40 w-11 h-11 rounded-full glass-panel border border-border-color hover:border-amber-500/30 text-foreground hover:text-amber-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg active:scale-95 flex items-center justify-center cursor-pointer`}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
