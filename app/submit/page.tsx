import SectionHeader from "@/components/common/SectionHeader";
import ProductSubmitForm from "@/components/products/ProductSubmitForm";
import { Plus } from "lucide-react";

export default function page() {
  return (
    <section className="min-h-screen py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SectionHeader
            title="submit a project"
            description="Share your hard work with our community of makers and creators."
            Icon={Plus}
          />
        </div>

        <ProductSubmitForm />
      </div>
    </section>
  );
}
