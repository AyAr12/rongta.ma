"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import ResellerDialog from "@/components/ResellerDialog";
import QuoteListButton from "@/components/QuoteListButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg">
            <Image
              src="/logo.png"
              alt="Rongta Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Rongta
            <span className="text-primary">.ma</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right cluster — Quote list + Reseller CTA */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quote list button — visible on all screens */}
          <QuoteListButton />

          {/* Desktop CTA — Devenir revendeur */}
          <div className="hidden lg:block">
            <ResellerDialog>
              <Button
                size="sm"
                className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20"
              >
                <Handshake className="h-4 w-4" />
                Devenir revendeur
              </Button>
            </ResellerDialog>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden hover:bg-accent transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-border pt-4">
                <ResellerDialog>
                  <Button className="w-full justify-center gap-1.5">
                    <Handshake className="h-4 w-4" />
                    Devenir revendeur
                  </Button>
                </ResellerDialog>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}