import { Badge } from "@/components/ui/badge";
import { Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StatsCard from "./stats-card";

const LiveBadge = ({ text }: { text: string }) => {
  return (
    <div className="[animation:float_4s_ease-in-out_infinite]">
      <Badge
        className="gap-2 px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-1000"
        variant="outline"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        {text}
      </Badge>
    </div>
  );
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-background py-24 lg:py-32">
      {/* Dynamic Background with Mesh Effect and animated blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden noise-bg">
        {/* Colorful Mesh Gradient */}
        <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(at_0%_0%,var(--color-primary)_0,transparent_50%),radial-gradient(at_50%_0%,oklch(0.65_0.22_260)_0,transparent_50%),radial-gradient(at_100%_0%,oklch(0.6_0.2_300)_0,transparent_50%),radial-gradient(at_0%_100%,oklch(0.5_0.25_280)_0,transparent_50%),radial-gradient(at_50%_100%,oklch(0.7_0.15_220)_0,transparent_50%),radial-gradient(at_100%_100%,oklch(0.8_0.15_240)_0,transparent_50%)]" />

        {/* Animated Blobs */}
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] [animation:drift_15s_ease-in-out_infinite]" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[140px] [animation:drift_18s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/5 rounded-[100%] blur-[140px] [animation:pulse-slow_10s_ease-in-out_infinite]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-12 max-w-5xl mx-auto">
          <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
            <LiveBadge text="Launching on IBuildThis" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Share what you&apos;ve{" "}
            <span className="text-primary italic inline-block hover:scale-105 transition-transform duration-500 cursor-default">
              built
            </span>
            ,
            <br className="hidden md:block" /> discover what&apos;s{" "}
            <span className="relative inline-block mt-2 md:mt-0 px-6 py-2">
              <span className="relative z-10 text-primary italic font-serif font-light">
                launching
              </span>
              <div className="absolute inset-0 bg-primary/5 border border-primary/20 rounded-2xl glass-surface -rotate-1 skew-x-1 shadow-xl shadow-primary/5" />
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl leading-relaxed italic font-medium lowercase animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            The ultimate community for makers to showcase their latest projects
            and find inspiration for their next big idea.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Button
              size="lg"
              className="relative overflow-hidden rounded-full px-10 h-14 text-lg font-bold group bg-primary text-primary-foreground"
            >
              <Link href="/submit">
                <span className="relative z-10 flex items-center gap-2">
                  Share your project
                  <Rocket className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-10 h-14 text-lg font-bold group border-2"
            >
              <Link href="/explore">
                <span className="flex items-center gap-2">
                  Explore Projects
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
          </div>

          {/* Social Proof / Stats */}
          <StatsCard />
        </div>
      </div>
    </section>
  );
}
