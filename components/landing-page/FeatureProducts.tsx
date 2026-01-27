"use cache";

import { Sparkles } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductCard from "../products/ProductCard";
import { getFeaturedProducts } from "@/lib/products/product-select";

// const featureProducts = [
//   {
//     id: 1,
//     name: "IBuildThis",
//     description:
//       "Discover and share the most innovative digital products built by independent makers.",
//     link: "",
//     tags: ["SaaS", "Community", "Showcase"],
//     votes: 842,
//     isFeatured: true,
//   },
//   {
//     id: 2,
//     name: "FocusFlow",
//     description:
//       "A beautiful, minimalist productivity timer designed to keep you in the zone.",
//     link: "",
//     tags: ["Productivity", "Utility", "Design"],
//     votes: 615,
//     isFeatured: true,
//   },
//   {
//     id: 3,
//     name: "DevStats",
//     description:
//       "Detailed analytics for your GitHub profile with beautiful shareable charts.",
//     link: "",
//     tags: ["Developer", "API", "Charts"],
//     votes: 423,
//     isFeatured: true,
//   },
// ];

export default async function FeatureProducts() {
  const featureProducts = await getFeaturedProducts();
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Subtle accent background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SectionHeader
            title="Featured Projects"
            Icon={Sparkles}
            description="The most impressive creations handpicked by our community curators."
          />
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 border-2 group hidden md:flex"
          >
            <Link href="/explore">
              View all projects
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {featureProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex md:hidden justify-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 border-2 w-full"
          >
            <Link href="/explore">View all projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
