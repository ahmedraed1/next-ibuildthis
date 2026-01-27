export default function StatsCard() {
  return (
    <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-700">
      {[
        { label: "Active Makers", value: "2,500+" },
        { label: "Projects Launched", value: "10k+" },
        { label: "Total Upvotes", value: "50k+" },
      ].map((stat, i) => (
        <div key={i} className="flex flex-col items-center space-y-1">
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
            {stat.value}
          </span>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
