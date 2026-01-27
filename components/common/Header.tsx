"use client";

import Link from "next/link";
import {
  Pickaxe,
  Menu,
  X,
  Home,
  Compass,
  Plus,
  LoaderIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, Suspense } from "react";
import { cn } from "@/lib/utils";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Logo = () => {
  return (
    <Link href="/" className="group flex items-center gap-2.5 transition-all">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
        <Pickaxe size={22} className="relative z-10" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <span className="text-xl font-black tracking-tight text-foreground lowercase">
        IBuildThis
      </span>
    </Link>
  );
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "home", href: "/", icon: Home },
    { name: "explore", href: "/explore", icon: Compass },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 md:px-6 md:py-4",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-2 md:py-3"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-12">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors lowercase tracking-wide"
              >
                <link.icon className="size-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <SignedIn>
              <Link
                href="/submit"
                className="flex items-center gap-1.5 text-sm font-black text-primary hover:opacity-80 transition-opacity lowercase tracking-wide"
              >
                <Plus className="size-4" />
                submit project
              </Link>
            </SignedIn>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Suspense
            fallback={
              <div>
                <LoaderIcon />
              </div>
            }
          >
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="rounded-full px-6 font-bold text-sm lowercase transition-all hover:bg-primary/5 hover:text-primary"
                >
                  sign in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="rounded-full px-6 font-black text-sm lowercase shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all">
                  sign up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "h-10 w-10 rounded-xl border-2 border-primary/20 hover:border-primary/50 transition-colors",
                  },
                }}
              />
            </SignedIn>
          </Suspense>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 md:hidden animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-lg font-bold text-muted-foreground hover:text-foreground transition-colors lowercase"
              >
                <link.icon className="size-5" />
                {link.name}
              </Link>
            ))}
            <SignedIn>
              <Link
                href="/submit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-lg font-black text-primary hover:opacity-80 transition-opacity lowercase"
              >
                <Plus className="size-5" />
                submit project
              </Link>
            </SignedIn>
          </nav>
          <div className="flex flex-col gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="w-full rounded-2xl h-12 font-bold lowercase"
                >
                  sign in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="w-full rounded-2xl h-12 font-black lowercase">
                  sign up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4 p-2 bg-muted/50 rounded-2xl">
                <UserButton showName />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}
