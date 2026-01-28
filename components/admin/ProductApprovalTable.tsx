"use client";

import { useTransition, useState, useMemo } from "react";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import {
  Check,
  X,
  ExternalLink,
  User,
  Calendar,
  Loader2,
  Search,
  Eye,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { updateProductStatusAction } from "@/lib/products/product-action";
import { cn } from "@/lib/utils";
import ProjectDetailsModal from "./ProjectDetailsModal";

type Product = InferSelectModel<typeof products>;

type StatusFilter = "all" | "pending" | "approved" | "rejected";

export default function ProductApprovalTable({
  products: initialProducts,
}: {
  products: Product[];
}) {
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.submittedBy?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || product.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [initialProducts, searchQuery, statusFilter]);

  const handleStatusUpdate = async (
    productId: number,
    status: "approved" | "rejected" | "pending",
  ) => {
    startTransition(async () => {
      const result = await updateProductStatusAction(productId, status);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const openPreview = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/50 backdrop-blur-xl p-6 rounded-[2rem] border border-border/40 shadow-xl shadow-primary/5">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search projects or submitters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 bg-background/50 border-border/40 rounded-2xl focus-visible:ring-primary"
          />
        </div>

        <div className="flex bg-muted/30 p-1 rounded-2xl border border-border/20">
          {(["all", "pending", "approved", "rejected"] as StatusFilter[]).map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  statusFilter === status
                    ? "bg-background text-primary shadow-sm border border-border/20"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {status}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="rounded-[2.5rem] bg-card/50 backdrop-blur-xl border border-border/40 shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/40">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                  Product
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                  Details
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 text-center">
                  Status
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="group hover:bg-primary/[0.02] transition-colors"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-muted/50 border border-border/40 flex items-center justify-center font-black text-primary/40 text-xl group-hover:scale-110 transition-transform">
                        {product.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold lowercase tracking-tight">
                          {product.name}
                        </p>
                        <a
                          href={product.websiteUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-muted-foreground/60 hover:text-primary flex items-center gap-1 mt-1 transition-colors"
                        >
                          {new URL(product.websiteUrl || "").hostname}{" "}
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground lowercase italic">
                        <User size={12} /> {product.submittedBy}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60 lowercase italic">
                        <Calendar size={12} />{" "}
                        {product.createdAt?.toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "lowercase text-[10px] font-black tracking-widest px-3 py-1",
                        product.status === "pending" &&
                          "bg-amber-500/10 text-amber-600 border-amber-500/20",
                        product.status === "approved" &&
                          "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                        product.status === "rejected" &&
                          "bg-rose-500/10 text-rose-600 border-rose-500/20",
                      )}
                    >
                      {product.status}
                    </Badge>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90"
                        onClick={() => openPreview(product)}
                      >
                        <Eye size={18} />
                      </Button>
                      {product.status === "pending" && (
                        <>
                          <Button
                            size="icon"
                            variant="outline"
                            disabled={isPending}
                            onClick={() =>
                              handleStatusUpdate(product.id, "approved")
                            }
                            className="h-10 w-10 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-600 hover:border-emerald-500/30 transition-all active:scale-90"
                          >
                            {isPending ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Check size={18} />
                            )}
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            disabled={isPending}
                            onClick={() =>
                              handleStatusUpdate(product.id, "rejected")
                            }
                            className="h-10 w-10 rounded-xl hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-500/30 transition-all active:scale-90"
                          >
                            {isPending ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <X size={18} />
                            )}
                          </Button>
                        </>
                      )}
                      {product.status !== "pending" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled={isPending}
                          onClick={() =>
                            handleStatusUpdate(product.id, "pending")
                          }
                          className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 transition-all text-muted-foreground/40"
                        >
                          Revert
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProjectDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
