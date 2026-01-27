import { LucideIcon } from "lucide-react";

export default function SectionHeader({
  title,
  Icon,
  description,
}: {
  title: string;
  Icon?: LucideIcon;
  description?: string;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 rounded-xl bg-primary/5 border border-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground lowercase">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed italic opacity-80 pl-1">
          {description}
        </p>
      )}
      <div className="h-1.5 w-12 bg-gradient-to-r from-primary to-primary/20 rounded-full mt-2" />
    </div>
  );
}
