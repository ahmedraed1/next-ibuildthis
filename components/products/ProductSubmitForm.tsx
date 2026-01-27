"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Rocket,
  Globe,
  Tag,
  AlignLeft,
  AtSign,
  Loader2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { addProductAction } from "@/lib/products/product-action";
import { FormState } from "react-hook-form";

export default function ProductSubmitForm() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    websiteUrl: "",
    tags: "",
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, name, slug }));
  };

  const handleSubmit = async (
    formData: FormData,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    "use server";
    event.preventDefault();
    const result = await addProductAction(formData);
    console.log(result);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <Card className="border-border/40 bg-card/50 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-indigo-500 to-rose-500" />

        <CardHeader className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Rocket size={20} />
            </div>
            <CardTitle className="text-2xl font-black lowercase tracking-tight">
              Project Identity
            </CardTitle>
          </div>
          <CardDescription className="text-muted-foreground lowercase italic">
            Tell us the basics of what you&apos;ve built.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 pt-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="space-y-3 group">
                <Label
                  htmlFor="name"
                  className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors"
                >
                  <Tag size={14} /> Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. ibuildthis"
                  className="h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary focus-visible:border-primary transition-all text-lg font-bold placeholder:font-medium placeholder:opacity-30"
                  value={formData.name}
                  onChange={handleNameChange}
                  required
                />
              </div>

              {/* Slug Field (Readonlyish) */}
              <div className="space-y-3 opacity-80 group">
                <Label
                  htmlFor="slug"
                  className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors"
                >
                  <AtSign size={14} /> URL Slug
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 text-sm font-bold">
                    ibuildthis.com/
                  </span>
                  <Input
                    id="slug"
                    className="h-12 pl-[105px] rounded-xl border-border/50 bg-muted/20 text-muted-foreground cursor-not-allowed font-medium lowercase"
                    value={formData.slug}
                    readOnly
                  />
                </div>
              </div>

              {/* Website URL */}
              <div className="col-span-full md:col-span-2 space-y-3 group">
                <Label
                  htmlFor="websiteUrl"
                  className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors"
                >
                  <Globe size={14} /> Live Website
                </Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://yourproject.com"
                  className="h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary transition-all font-medium"
                  value={formData.websiteUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      websiteUrl: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              {/* Tagline */}
              <div className="col-span-full space-y-3 group">
                <div className="flex justify-between items-end">
                  <Label
                    htmlFor="tagline"
                    className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors"
                  >
                    <Sparkles size={14} /> Tagline
                  </Label>
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-tighter",
                      formData.tagline.length > 150
                        ? "text-rose-500"
                        : "text-muted-foreground/40",
                    )}
                  >
                    {formData.tagline.length} / 200
                  </span>
                </div>
                <Input
                  id="tagline"
                  placeholder="A one-sentence pitch for your product"
                  maxLength={200}
                  className="h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary transition-all font-semibold italic opacity-90"
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tagline: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              {/* Description */}
              <div className="col-span-full space-y-3 group">
                <Label
                  htmlFor="description"
                  className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors"
                >
                  <AlignLeft size={14} /> Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Explain what your project does, who it's for, and the tech stack you used..."
                  className="min-h-[160px] rounded-2xl border-border/50 bg-background/50 focus-visible:ring-primary transition-all font-medium leading-relaxed p-6"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              {/* Tags */}
              <div className="col-span-full space-y-3 group">
                <Label
                  htmlFor="tags"
                  className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors"
                >
                  <Tag size={14} /> Tags
                </Label>
                <Input
                  id="tags"
                  placeholder="SaaS, Open Source, AI (comma separated)"
                  className="h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary transition-all font-medium"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tags: e.target.value }))
                  }
                />
                <p className="text-[10px] text-muted-foreground lowercase opacity-60 italic">
                  Tip: Use broad categories to help people find your project.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-border/30 flex justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="h-14 px-12 rounded-2xl font-black text-lg lowercase shadow-xl shadow-primary/10 hover:shadow-primary/20 active:scale-95 transition-all group overflow-hidden relative"
              >
                {isPending ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <span className="relative z-10 flex items-center gap-2">
                    Submit Project{" "}
                    <Rocket
                      size={20}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-500 to-rose-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className="mt-8 text-center text-xs text-muted-foreground lowercase italic opacity-60">
        By submitting, you agree to our community guidelines. Every project is
        reviewed by moderators before going live.
      </p>
    </div>
  );
}
