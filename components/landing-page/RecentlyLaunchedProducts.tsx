"use cache";

import SectionHeader from "../common/SectionHeader";
import { Calendar, Zap } from "lucide-react";
import ProductCard from "../products/ProductCard";
import EmptyState from "../common/EmptyState";
import { Button } from "../ui/button";
import Link from "next/link";
import { getRecentlyLaunchedProducts } from "@/lib/products/product-select";

export default async function RecentlyLaunchedProducts() {
  const recentlyLaunchedProducts = await getRecentlyLaunchedProducts();
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SectionHeader
            title="recently launched"
            Icon={Zap}
            description="The freshest tools and toys arriving on the platform today."
          />
          <Button
            asChild
            variant="ghost"
            className="rounded-full px-6 group hidden md:flex text-muted-foreground hover:text-primary transition-colors"
          >
            <Link href="/latest">
              View latest arrivals
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {recentlyLaunchedProducts.length > 0 ? (
            recentlyLaunchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-12">
              <EmptyState
                message="No products found in our recent arrivals."
                Icon={Calendar}
              />
            </div>
          )}
        </div>

        <div className="mt-12 flex md:hidden justify-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 border-2 w-full"
          >
            <Link href="/latest">View latest arrivals</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
