import { getAllApprovedProducts } from "@/lib/products/product-select";
import ProductCard from "@/components/products/ProductCard";
import { Sparkles, LayoutGrid } from "lucide-react";

export default async function ProductsPage() {
  const products = await getAllApprovedProducts();

  return (
    <main className="min-h-screen pt-32 pb-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
            <LayoutGrid size={12} />
            The Catalogue
          </div>
          <h1 className="text-4xl md:text-6xl font-black lowercase tracking-tighter">
            all <span className="text-primary italic">projects</span>.
          </h1>
          <p className="text-muted-foreground text-sm md:text-base lowercase italic">
            browse through the entire collection of innovative digital products,
            side projects, and platforms built by our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="p-4 rounded-2xl bg-muted/50 w-fit mx-auto">
              <Sparkles className="text-muted-foreground/30 h-8 w-8" />
            </div>
            <p className="text-muted-foreground lowercase italic">
              no projects found yet. maybe it&apos;s time to launch yours?
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
