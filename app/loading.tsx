import { Pickaxe } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 [animation:float_3s_ease-in-out_infinite]">
          <Pickaxe size={40} className="animate-pulse" />
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-2">
        <h2 className="text-xl font-black tracking-tighter lowercase">
          IBuild<span className="text-primary italic">This</span>
        </h2>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
