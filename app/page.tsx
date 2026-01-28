import FeatureProducts from "@/components/landing-page/FeatureProducts";
import HeroSection from "@/components/landing-page/Hero-section";
import RecentlyLaunchedProducts from "@/components/landing-page/RecentlyLaunchedProducts";
import { Suspense } from "react";
import ProductSkeleton from "@/components/products/ProductSkeleton";

export default function Home() {
  return (
    <main className="space-y-20 pb-20">
      <HeroSection />

      <div className="container mx-auto px-4 md:px-6">
        <Suspense fallback={<ProductSkeleton />}>
          <FeatureProducts />
        </Suspense>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <Suspense fallback={<ProductSkeleton />}>
          <RecentlyLaunchedProducts />
        </Suspense>
      </div>
    </main>
  );
}
