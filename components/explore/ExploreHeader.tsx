"use client";

import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const POPULAR_TAGS = [
  "SaaS",
  "AI",
  "Open Source",
  "Design",
  "DevTools",
  "Mobile",
];

export default function ExploreHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }
    const timeout = setTimeout(() => {
      router.push(`/explore?${params.toString()}`, { scroll: false });
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const toggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    const lowercaseTag = tag.toLowerCase();
    const currentTags = params.get("tags")?.split(",") || [];

    let newTags;
    if (currentTags.includes(lowercaseTag)) {
      newTags = currentTags.filter((t) => t !== lowercaseTag);
    } else {
      newTags = [...currentTags, lowercaseTag];
    }

    if (newTags.length > 0) {
      params.set("tags", newTags.join(","));
    } else {
      params.delete("tags");
    }
    router.push(`/explore?${params.toString()}`, { scroll: false });
  };

  const selectedTags = searchParams.get("tags")?.split(",") || [];

  return (
    <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
          <Sparkles size={12} />
          Explore the Ecosystem
        </div>
        <h1 className="text-4xl md:text-6xl font-black lowercase tracking-tighter sm:text-7xl">
          discover <span className="text-primary italic">greatness</span>.
        </h1>
        <p className="max-w-[600px] mx-auto text-muted-foreground text-sm md:text-base lowercase italic">
          search through hundreds of projects built by independent creators
          across the globe.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto group">
        <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl group-focus-within:bg-primary/20 transition-all duration-500" />
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for projects, stacks, or makers..."
            className="h-16 pl-12 pr-4 bg-background/50 backdrop-blur-xl border-border/40 rounded-2xl text-lg font-bold placeholder:font-medium placeholder:opacity-30 focus-visible:ring-primary focus-visible:border-primary transition-all shadow-2xl shadow-primary/5"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
        {POPULAR_TAGS.map((tag) => {
          const isSelected = selectedTags.includes(tag.toLowerCase());
          return (
            <Badge
              key={tag}
              variant={isSelected ? "default" : "secondary"}
              onClick={() => toggleTag(tag)}
              className={`h-8 px-4 rounded-full cursor-pointer transition-all lowercase font-black text-[10px] tracking-tight border border-border/40 ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                  : "bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/20"
              }`}
            >
              {tag}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
