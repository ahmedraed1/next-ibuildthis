import { LucideIcon } from "lucide-react";

export default function EmptyState({
  message,
  Icon,
}: {
  message: string;
  Icon?: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 rounded-3xl border-2 border-dashed border-muted-foreground/10 bg-muted/5">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl animate-pulse" />
        {Icon && (
          <div className="relative p-6 rounded-full bg-primary/5 text-primary/30">
            <Icon className="size-12" />
          </div>
        )}
      </div>
      <div className="max-w-[200px] space-y-1">
        <p className="text-sm font-semibold text-foreground italic opacity-80 lowercase">
          {message}
        </p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium opacity-60">
          Come back soon
        </p>
      </div>
    </div>
  );
}
