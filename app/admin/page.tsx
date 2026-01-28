import React from "react";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAdminProducts } from "@/lib/products/product-select";
import { LayoutDashboard, Package, Clock, CheckCircle } from "lucide-react";
import ProductApprovalTable from "@/components/admin/ProductApprovalTable";
import { cn } from "@/lib/utils";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  const response = await clerkClient();
  const user = await response.users.getUser(userId);

  if (!user || user.publicMetadata?.isAdmin !== true) {
    return redirect("/");
  }

  const products = await getAdminProducts();

  const stats = {
    total: products.length,
    pending: products.filter((p) => p.status === "pending").length,
    approved: products.filter((p) => p.status === "approved").length,
  };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mb-12 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
            <LayoutDashboard size={12} />
            Internal Management
          </div>
          <h1 className="text-4xl md:text-5xl font-black lowercase tracking-tighter sm:text-6xl">
            control <span className="text-primary italic">center</span>.
          </h1>
          <p className="text-muted-foreground text-sm md:text-base lowercase italic">
            monitor the heartbeat of the ecosystem, approve submissions, and
            moderate the community queue.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {[
            {
              label: "Total Submissions",
              value: stats.total,
              icon: Package,
              color: "text-primary",
              bg: "bg-primary/5",
            },
            {
              label: "Pending Review",
              value: stats.pending,
              icon: Clock,
              color: "text-amber-500",
              bg: "bg-amber-500/5",
            },
            {
              label: "Approved Live",
              value: stats.approved,
              icon: CheckCircle,
              color: "text-emerald-500",
              bg: "bg-emerald-500/5",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-8 rounded-[2.5rem] bg-card/50 backdrop-blur-xl border border-border/40 shadow-2xl shadow-primary/5 flex items-center gap-6"
            >
              <div className={cn("p-4 rounded-3xl", stat.bg)}>
                <stat.icon className={stat.color} size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                  {stat.label}
                </p>
                <p className="text-3xl font-black lowercase tracking-tighter">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <ProductApprovalTable products={products} />
        </div>
      </div>
    </main>
  );
}
