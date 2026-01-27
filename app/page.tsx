import FeatureProducts from "@/components/landing-page/FeatureProducts";
import HeroSection from "@/components/landing-page/Hero-section";
import RecentlyLaunchedProducts from "@/components/landing-page/RecentlyLaunchedProducts";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeatureProducts />

      <Suspense fallback={<div>Loading...</div>}>
        <RecentlyLaunchedProducts />
      </Suspense>
    </main>
  );
}
