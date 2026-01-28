"use client";

import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";
import { ExternalLink, Calendar, User, Globe } from "lucide-react";

type Product = InferSelectModel<typeof products>;

interface ProjectDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsModal({
  product,
  isOpen,
  onClose,
}: ProjectDetailsModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto rounded-[3rem] border border-border/40 bg-card/95 backdrop-blur-2xl p-0 shadow-2xl overflow-hidden">
        <div className="relative h-40 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="absolute -bottom-8 left-12 w-24 h-24 rounded-3xl bg-background border-4 border-card flex items-center justify-center shadow-xl">
            <span className="text-4xl font-black text-primary/40">
              {product.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="p-12 pt-16 space-y-8">
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
            <DialogTitle className="text-4xl font-black lowercase tracking-tighter sm:text-5xl">
              {product.name}
            </DialogTitle>
            <DialogDescription className="text-xl text-muted-foreground italic font-medium lowercase">
              {product.tagline}
            </DialogDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/50">
                Submission Story
              </h4>
              <p className="text-muted-foreground leading-relaxed font-medium whitespace-pre-wrap lowercase">
                {product.description}
              </p>
            </div>

            <div className="space-y-8">
              <div className="p-6 rounded-3xl bg-muted/30 border border-border/20 space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/50">
                  Metadata
                </h4>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 leading-none">
                        Submitter
                      </p>
                      <p className="font-bold lowercase italic text-sm">
                        {product.submittedBy}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 leading-none">
                        Submitted On
                      </p>
                      <p className="font-bold lowercase italic text-sm">
                        {product.createdAt
                          ? new Date(product.createdAt).toLocaleDateString()
                          : "Unknown"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe size={16} className="text-muted-foreground" />
                    <a
                      href={product.websiteUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold lowercase italic text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      {new URL(product.websiteUrl || "").hostname}{" "}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <blockquote className="text-sm italic text-muted-foreground/50 lowercase leading-relaxed">
                  Review the submission carefully. Ensure the content adheres to
                  community guidelines before approval.
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
