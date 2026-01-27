import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { StarIcon, ArrowBigUp, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";

type Product = InferSelectModel<typeof products>;

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative">
      <Link href={`/products/${product.id}`} className="block">
        <Card className="h-full border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 group-hover:-translate-y-1 overflow-hidden">
          {product.voteCount > 10 && (
            <div className="absolute top-0 right-0 p-3 z-10">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 gap-1 px-2 py-0.5 backdrop-blur-md">
                <StarIcon className="h-3 w-3 fill-primary" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  Featured
                </span>
              </Badge>
            </div>
          )}

          <CardHeader className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <span className="text-xl font-black text-primary/40 leading-none">
                  {product.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-10 w-10 md:h-12 md:w-16 flex flex-col gap-0 rounded-xl border-border/50 hover:bg-primary/5 hover:border-primary/30 group/vote transition-all"
                >
                  <ArrowBigUp className="h-5 w-5 md:h-6 md:w-6 group-hover/vote:-translate-y-0.5 transition-transform" />
                  <span className="text-[10px] md:text-xs font-bold">
                    {product.voteCount}
                  </span>
                </Button>
              </div>
            </div>

            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1 mb-2">
              {product.name}
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-6 h-10">
              {product.description}
            </CardDescription>

            <div className="flex flex-wrap gap-2 mt-auto">
              {product.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] font-semibold bg-secondary/30 hover:bg-secondary/50 border-secondary/20 transition-colors uppercase tracking-tight px-2 py-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <div className="px-6 pb-6 pt-0 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              View Details <ExternalLink className="h-3 w-3" />
            </span>
          </div>
        </Card>
      </Link>
    </div>
  );
}
