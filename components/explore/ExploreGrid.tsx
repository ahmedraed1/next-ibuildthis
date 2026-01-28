"use client";

import { useSearchParams } from "next/navigation";
import ProductCard from "../products/ProductCard";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import { Rocket } from "lucide-react";

type Product = InferSelectModel<typeof products>;

export default function ExploreGrid({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";
  const tagsStr = searchParams.get("tags") || "";
  const selectedTags = tagsStr ? tagsStr.split(",") : [];

  const filteredProducts = initialProducts.filter((product) => {
    // Search match
    const searchMatch =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.tagline?.toLowerCase().includes(q) ||
      product.description?.toLowerCase().includes(q);

    // Tags match
    const productTags = product.tags?.map((t) => t.toLowerCase()) || [];
    const tagsMatch =
      selectedTags.length === 0 ||
      selectedTags.every((st) => productTags.includes(st));

    return searchMatch && tagsMatch;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="p-6 rounded-3xl bg-muted/20 border border-border/40 backdrop-blur-xl relative group">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <Rocket size={48} className="text-muted-foreground/30 rotate-180" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black lowercase tracking-tight">
            no cosmic discoveries
          </h3>
          <p className="max-w-[300px] mx-auto text-muted-foreground text-sm lowercase italic">
            we couldn&apos;t find any projects matching your current filters.
            try broadening your search?
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
