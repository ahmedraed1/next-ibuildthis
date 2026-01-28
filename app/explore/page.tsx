import { getAllApprovedProducts } from "@/lib/products/product-select";
import ExploreHeader from "@/components/explore/ExploreHeader";
import ExploreGrid from "@/components/explore/ExploreGrid";
import { Suspense } from "react";
import ProductSkeleton from "@/components/products/ProductSkeleton";

export default async function ExplorePage() {
  const products = await getAllApprovedProducts();

  return (
    <section className="min-h-screen py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <ExploreHeader />

        <div className="mt-12">
          <Suspense fallback={<ProductSkeleton />}>
            <ExploreGrid initialProducts={products} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
