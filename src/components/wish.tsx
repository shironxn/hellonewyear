"use client";

import { createWish, type Wish } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import confetti from "canvas-confetti";
import { Heart, Loader2, Send, Sparkles } from "lucide-react";
import React, { useState, useTransition, useRef } from "react";

function WishForm({ onSuccess }: { onSuccess: () => void }) {
  const [wish, setWish] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const fireConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#C0C0C0", "#FFFFFF", "#FFE066", "#F0F0F0"],
    });
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!wish.trim()) return;

    startTransition(async () => {
      const result = await createWish(wish);
      if (result?.success) {
        setWish("");
        fireConfetti();
        setIsSuccess(true);
      }
    });
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <Heart className="h-20 w-20 text-primary" />
        <div className="flex flex-col gap-2">
          <p className="text-2xl md:text-3xl font-bold">
            Your wish has been shared!
          </p>
          <p className="text-lg md:text-xl text-muted-foreground">
            May your dreams come true in {new Date().getFullYear() + 1}
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full py-6 text-lg md:text-xl"
          onClick={() => {
            const shareText = `I just made a wish for ${new Date().getFullYear() + 1}! ✨ Make yours too: https://hellonewyear.vercel.app`;

            if (navigator.share) {
              navigator.share({
                title: "New Year Wish",
                text: shareText,
                url: "https://hellonewyear.vercel.app",
              }).catch(() => {});
            } else {
              navigator.clipboard.writeText(shareText).then(() => {
                alert("Copied to clipboard! 📋");
              });
            }
          }}
        >
          <Send className="mr-2 h-5 w-5" />
          Share to Friends
        </Button>
        <Button
          className="w-full py-6 text-lg md:text-xl"
          onClick={onSuccess}
        >
          Close
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        value={wish}
        onChange={(e) => setWish(e.target.value)}
        placeholder={`What's your ${new Date().getFullYear() + 1} wish?`}
        disabled={isPending}
        className="text-center md:text-left text-lg md:text-xl py-6"
      />
      <Button
        type="submit"
        disabled={isPending || !wish.trim()}
        className="w-full py-6 md:py-8 text-lg md:text-xl"
      >
        {isPending ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Send className="mr-2 h-5 w-5" />
        )}
        Share Your Wish
      </Button>
    </form>
  );
}

export function CreateWishModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 w-full py-10 md:py-12 text-xl md:text-2xl font-medium hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50"
          >
            <Send className="pointer-events-none shrink-0 size-6 mr-2" />
            Share Your Wish
          </button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">
            Make a New Year Wish
          </DialogTitle>
          <DialogDescription className="text-base md:text-lg">
            Let's start the year with big dreams! Your wish will inspire others.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <WishForm key={open ? "open" : "closed"} onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function GetWishModal({ wishes }: { wishes: Wish[] }) {
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const usedIdsRef = useRef<Set<string>>(new Set());

  const handleOpen = () => {
    if (wishes.length === 0) return;

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      let availableWishes = wishes.filter((w) => !usedIdsRef.current.has(w.id));

      if (availableWishes.length === 0) {
        usedIdsRef.current = new Set();
        availableWishes = wishes;
      }

      const randomWish =
        availableWishes[Math.floor(Math.random() * availableWishes.length)];

      usedIdsRef.current.add(randomWish.id);

      setSelectedWish(randomWish);
      setOpen(true);
    });
  };

  return (
    <div>
      <Button
        variant="outline"
        size="lg"
        className="w-full py-10 md:py-12 text-xl md:text-2xl font-medium"
        onClick={handleOpen}
        disabled={isPending || wishes.length === 0}
      >
        {isPending ? (
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-6 w-6" />
        )}
        Receive a Wish
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg md:text-xl font-semibold">
              <Sparkles className="h-5 w-5 text-primary" />A Special Wish for
              You
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg min-h-160px text-center italic">
            <p className="text-2xl md:text-3xl font-medium">
              &ldquo;{selectedWish?.message}&rdquo;
            </p>
          </div>
          {selectedWish?.timestamp && (
            <p className="text-sm md:text-lg text-muted-foreground text-center">
              Shared on {new Date(selectedWish.timestamp).toLocaleDateString()}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
