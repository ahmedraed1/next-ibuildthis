import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { StarIcon, ExternalLink } from "lucide-react";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import VotingButton from "./VotingButton";

type Product = InferSelectModel<typeof products>;

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative">
      <Link href={`/products/${product.id}`} className="block">
        <Card className="h-full glass-card transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.05)] hover:border-primary/30 group-hover:-translate-y-2 overflow-hidden relative">
          {/* subtle inner glow */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors duration-500" />

          {product.voteCount > 10 && (
            <div className="absolute top-0 right-0 p-4 z-10">
              <Badge className="bg-primary/20 text-primary border-primary/20 hover:bg-primary/30 gap-1.5 px-3 py-1 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/10">
                <StarIcon className="h-3 w-3 fill-primary" />
                Featured
              </Badge>
            </div>
          )}

          <CardHeader className="p-8 relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/10 flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-primary/5">
                <span className="text-2xl font-black text-primary/60 leading-none lowercase">
                  {product.name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col items-end gap-2">
                <VotingButton
                  productId={product.id}
                  initialVotes={product.voteCount}
                />
              </div>
            </div>

            <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors line-clamp-1 mb-3 lowercase tracking-tight">
              {product.name}
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed mb-8 h-10 italic lowercase font-medium">
              {product.description}
            </CardDescription>

            <div className="flex flex-wrap gap-2 mt-auto">
              {product.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] font-black bg-primary/5 text-primary/80 hover:bg-primary/10 border-primary/10 transition-all uppercase tracking-[0.1em] px-3 py-1 rounded-lg"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <div className="px-8 pb-8 pt-0 flex justify-end opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest group/link">
              Read Story{" "}
              <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </span>
          </div>
        </Card>
      </Link>
    </div>
  );
}
