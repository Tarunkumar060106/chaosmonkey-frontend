"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Zap,
  Menu,
  X,
  Github,
  LayoutGrid,
  Activity,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#features", label: "Features", icon: Activity },
    { href: "#simulator", label: "Simulator", icon: LayoutGrid },
    { href: "#stats", label: "Stats", icon: TrendingUp },
    { href: "#pricing", label: "Pricing", icon: Shield },
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-amber-500/20 shadow-lg shadow-black/50"
          : "glass border-b border-amber-500/10"
      } px-4 sm:px-8 py-4`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="bg-amber-500 p-1.5 rounded-sm shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/60 transition-all group-hover:scale-110">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white uppercase italic">
            Chaos
            <span className="text-amber-500 group-hover:text-amber-400 transition-colors">
              Monkey
            </span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-gray-400 hover:text-amber-500 transition-all relative group"
            >
              <span className="flex items-center gap-2">
                <item.icon className="w-3 h-3" />
                {item.label}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="http://localhost:8000/auth/github/login"
            className="bg-amber-500 text-black text-[11px] font-black uppercase px-6 py-2.5 tracking-widest hover:bg-white transition-all industrial-border hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105 flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>Get Started</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white p-2 hover:bg-amber-500/10 rounded transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 py-4 border-t border-amber-500/10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="flex items-center gap-3 text-gray-400 hover:text-amber-500 transition-colors text-sm font-bold uppercase tracking-wider px-4 py-2 hover:bg-amber-500/5 rounded"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 px-4 pt-4 border-t border-amber-500/10">
            <a
              href="http://localhost:8000/auth/github/login"
              className="bg-amber-500 text-black text-[11px] font-black uppercase px-6 py-2.5 tracking-widest hover:bg-white transition-all industrial-border text-center flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Get Started</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
