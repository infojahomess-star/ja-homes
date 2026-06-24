"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, User, LogOut, Menu, X } from "lucide-react";
import { useTheme } from "../app/context/ThemeContext";
import { useAuth } from "../app/context/AuthContext";
import AuthModal from "./AuthModal";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  
  const [bookingCount, setBookingCount] = useState(0);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    // Read bookings from localStorage to show badge
    const updateBadge = () => {
      const saved = localStorage.getItem("ja_homes_bookings");
      if (saved) {
        try {
          const bookings = JSON.parse(saved);
          setBookingCount(Array.isArray(bookings) ? bookings.length : 0);
        } catch {
          setBookingCount(0);
        }
      } else {
        setBookingCount(0);
      }
    };

    updateBadge();
    // Watch localstorage custom event or focus
    window.addEventListener("storage", updateBadge);
    window.addEventListener("focus", updateBadge);
    return () => {
      window.removeEventListener("storage", updateBadge);
      window.removeEventListener("focus", updateBadge);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass-panel h-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-serif tracking-widest text-gold font-light">JA HOMES</span>
            <span className="text-[8px] font-mono tracking-[0.3em] text-muted uppercase">Luxury Real Estate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider uppercase">
            <Link
              href="/"
              className={`hover:text-amber-500 transition-colors ${
                pathname === "/" ? "text-amber-500 font-semibold" : "text-foreground/80"
              }`}
            >
              Experience
            </Link>
            <Link
              href="/about"
              className={`hover:text-amber-500 transition-colors ${
                pathname === "/about" ? "text-amber-500 font-semibold" : "text-foreground/80"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/projects"
              className={`hover:text-amber-500 transition-colors ${
                pathname === "/projects" ? "text-amber-500 font-semibold" : "text-foreground/80"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className={`hover:text-amber-500 transition-colors ${
                pathname === "/contact" ? "text-amber-500 font-semibold" : "text-foreground/80"
              }`}
            >
              Contact Us
            </Link>
            <Link
              href="/book"
              className={`hover:text-amber-500 transition-colors ${
                pathname === "/book" ? "text-amber-500 font-semibold" : "text-foreground/80"
              }`}
            >
              Booking
            </Link>
            {bookingCount > 0 && (
              <Link
                href="/book#bookings-dashboard"
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                Passes
                <span className="bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {bookingCount}
                </span>
              </Link>
            )}
          </nav>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            {/* Day / Night Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-foreground/5 text-foreground transition-colors cursor-pointer"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Authentication Action */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/30 px-3 py-1.5 rounded-full text-xs font-mono text-amber-500 cursor-pointer"
                >
                  <User size={14} />
                  <span className="max-w-[80px] truncate">{user.name}</span>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass-panel rounded-xl border border-amber-500/20 shadow-xl py-2 animate-fade-in-up">
                    <div className="px-4 py-2 border-b border-border-color text-xs">
                      <span className="text-muted block">Signed in as</span>
                      <span className="font-semibold text-foreground truncate block">{user.email}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-xs text-rose-400 hover:bg-rose-500/5 transition-colors cursor-pointer"
                    >
                      <LogOut size={13} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="bg-gold-gradient text-black hover:scale-105 active:scale-95 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 cursor-pointer"
                id="cta-auth-header"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 text-foreground hover:bg-foreground/5 rounded-full transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden glass-panel border-t-0 border-x-0 w-full absolute top-20 left-0 py-6 px-6 flex flex-col gap-4 animate-fade-in-up shadow-xl">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium tracking-wider uppercase py-1 ${
                pathname === "/" ? "text-amber-500 font-semibold" : "text-foreground"
              }`}
            >
              Experience
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium tracking-wider uppercase py-1 ${
                pathname === "/about" ? "text-amber-500 font-semibold" : "text-foreground"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium tracking-wider uppercase py-1 ${
                pathname === "/projects" ? "text-amber-500 font-semibold" : "text-foreground"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium tracking-wider uppercase py-1 ${
                pathname === "/contact" ? "text-amber-500 font-semibold" : "text-foreground"
              }`}
            >
              Contact Us
            </Link>
            <Link
              href="/book"
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-medium tracking-wider uppercase py-1 ${
                pathname === "/book" ? "text-amber-500 font-semibold" : "text-foreground"
              }`}
            >
              Booking
            </Link>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
