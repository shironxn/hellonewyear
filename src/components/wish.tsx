"use client";

import { createWish, type Wish } from "@/app/actions";
import React, { useState, useTransition } from "react";
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
import { Loader2, Send, Sparkles } from "lucide-react";

function WishForm({ onSuccess }: { onSuccess: () => void }) {
  const [wish, setWish] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!wish.trim()) return;

    startTransition(async () => {
      const result = await createWish(wish);
      if (result?.success) {
        setWish("");
        onSuccess();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        value={wish}
        onChange={(e) => setWish(e.target.value)}
        placeholder={`What's your ${new Date().getFullYear() + 1} wish?`}
        disabled={isPending}
        className="text-center md:text-left"
      />
      <Button
        type="submit"
        disabled={isPending || !wish.trim()}
        className="w-full"
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
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
            className="group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 w-full py-8 text-lg font-medium hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50"
          >
            <Send className="pointer-events-none shrink-0 size-4 mr-2" />
            Share Your Wish
          </button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Make a New Year Wish</DialogTitle>
          <DialogDescription>
            Let’s start the year with big dreams! Your wish will inspire others.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <WishForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function GetWishModal({ wishes }: { wishes: Wish[] }) {
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleOpen = () => {
    if (wishes.length === 0) return;

    startTransition(async () => {
      // Simulate some anticipation
      await new Promise((resolve) => setTimeout(resolve, 800));
      const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
      setSelectedWish(randomWish);
      setOpen(true);
    });
  };

  return (
    <div>
      <Button
        variant="outline"
        size="lg"
        className="w-full py-8 text-lg font-medium"
        onClick={handleOpen}
        disabled={isPending || wishes.length === 0}
      >
        {isPending ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-5 w-5" />
        )}
        Receive a Wish
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />A Special Wish for
              You
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg min-h-160px text-center italic">
            <p className="text-xl font-medium">
              &ldquo;{selectedWish?.message}&rdquo;
            </p>
          </div>
          {selectedWish?.timestamp && (
            <p className="text-xs text-muted-foreground text-center">
              Shared on {new Date(selectedWish.timestamp).toLocaleDateString()}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
