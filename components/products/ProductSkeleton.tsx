"use client";

import { Card, CardHeader, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

const Shimmer = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "relative overflow-hidden bg-muted/50 rounded-md before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
      className,
    )}
  />
);

export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          className="h-full border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden"
        >
          <CardHeader className="p-6">
            <div className="flex justify-between items-start mb-4">
              {/* Logo Area Skeleton */}
              <Shimmer className="w-12 h-12 rounded-2xl" />

              {/* Vote Button Skeleton */}
              <div className="flex flex-col items-end gap-2">
                <Shimmer className="h-10 w-10 md:h-12 md:w-16 rounded-xl" />
              </div>
            </div>

            {/* Title Skeleton */}
            <Shimmer className="h-7 w-3/4 mb-4 rounded-lg" />

            {/* Description Skeleton */}
            <div className="space-y-2 mb-6">
              <Shimmer className="h-4 w-full rounded" />
              <Shimmer className="h-4 w-5/6 rounded" />
            </div>

            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2 mt-auto">
              <Shimmer className="h-5 w-16 rounded-full" />
              <Shimmer className="h-5 w-20 rounded-full" />
              <Shimmer className="h-5 w-14 rounded-full" />
            </div>
          </CardHeader>

          {/* View Details Area Skeleton */}
          <div className="px-6 pb-6 pt-0 flex justify-end">
            <Shimmer className="h-4 w-24 rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
}
