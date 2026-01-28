import { getProductById } from "@/lib/products/product-select";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Calendar,
  User,
  Globe,
  Tag as TagIcon,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import VotingButton from "@/components/products/VotingButton";
import { cn } from "@/lib/utils";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Explore
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-8 items-start md:items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 flex items-center justify-center shadow-2xl shadow-primary/5 shrink-0">
              <span className="text-4xl md:text-6xl font-black text-primary/40">
                {product.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {product.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-primary/5 text-primary border-primary/10 text-[10px] uppercase font-black tracking-widest px-3 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-black lowercase tracking-tighter leading-none">
                {product.name}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground italic font-medium lowercase">
                {product.tagline}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-end items-center gap-4 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                support it
              </span>
              <VotingButton
                productId={product.id}
                initialVotes={product.voteCount}
              />
            </div>
            <Button
              asChild
              className="h-14 px-8 rounded-2xl font-black text-lg lowercase shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              <a
                href={product.websiteUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20">
          <div className="lg:col-span-8 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-2xl font-black lowercase tracking-tight mb-6">
                About the project
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium whitespace-pre-wrap">
                {product.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <div className="p-8 rounded-[2.5rem] bg-card/50 backdrop-blur-xl border border-border/40 space-y-8 shadow-2xl shadow-primary/5">
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/50">
                  Details
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <User
                        size={18}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                        Submitted By
                      </p>
                      <p className="font-bold lowercase italic">
                        {product.submittedBy}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Calendar
                        size={18}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                        Launched
                      </p>
                      <p className="font-bold lowercase italic">
                        {product.createdAt
                          ? new Date(product.createdAt).toLocaleDateString()
                          : "Unknown"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <TagIcon
                        size={18}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                        Category
                      </p>
                      <p className="font-bold lowercase italic">
                        {product.tags?.[0] || "General"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border/40">
                <blockquote className="text-sm italic text-muted-foreground/70 lowercase leading-relaxed">
                  &quot;ibuildthis is a community for makers to discover,
                  collaborate, and launch their most ambitious projects.&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
