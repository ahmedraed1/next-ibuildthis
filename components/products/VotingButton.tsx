"use client";

import { useOptimistic, useTransition, useState } from "react";
import { ArrowBigUp, Loader2, Check } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { voteProductAction } from "@/lib/products/product-action";
import { useAuth, useClerk } from "@clerk/nextjs";
import { toast } from "sonner";

interface VotingButtonProps {
  productId: number;
  initialVotes: number;
}

export default function VotingButton({
  productId,
  initialVotes,
}: VotingButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { userId } = useAuth();
  const { openSignIn } = useClerk();
  const [hasVoted, setHasVoted] = useState(false);

  const [optimisticVotes, addOptimisticVote] = useOptimistic(
    initialVotes,
    (state) => state + 1,
  );

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      if (openSignIn) {
        openSignIn({ forceRedirectUrl: window.location.href });
      }
      return;
    }

    if (hasVoted) return;

    startTransition(async () => {
      addOptimisticVote(1);
      const result = await voteProductAction(productId);
      if (!result.success) {
        if (result.message.includes("already voted")) {
          setHasVoted(true);
          toast.error(result.message);
        } else {
          toast.error("Failed to add vote");
        }
        console.error(result.message);
      } else {
        setHasVoted(true);
        toast.success("Vote added successfully!");
      }
    });
  };

  return (
    <Button
      size="icon"
      variant="outline"
      disabled={isPending || hasVoted}
      onClick={handleVote}
      className={cn(
        "h-12 w-14 flex flex-col gap-0 rounded-2xl border-border/40 transition-all duration-500 relative overflow-hidden shadow-sm",
        hasVoted
          ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/40 cursor-default scale-105"
          : "glass-surface hover:bg-primary/5 hover:border-primary/40 group/vote active:scale-95",
        isPending && "opacity-80 cursor-wait",
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center transition-all duration-500",
          isPending ? "opacity-0 scale-50" : "opacity-100 scale-100",
        )}
      >
        {hasVoted ? (
          <Check className="h-4 w-4 animate-in zoom-in spin-in-12 duration-500" />
        ) : (
          <ArrowBigUp className="h-5 w-5 group-hover/vote:-translate-y-1 transition-transform duration-300" />
        )}
        <span className="text-[10px] font-black mt-0.5 tracking-tighter lowercase">
          {optimisticVotes}
        </span>
      </div>

      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </div>
      )}

      {/* Background decoration */}
      {!hasVoted && (
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </Button>
  );
}
