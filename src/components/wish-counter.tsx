"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import { Sparkles } from "lucide-react";

export function WishCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const wishesRef = ref(database, "wishes");
    const unsubscribe = onValue(wishesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCount(Object.keys(data).length);
      } else {
        setCount(0);
      }
    });

    return () => unsubscribe();
  }, []);

  if (count === null) return null;

  return (
    <p className="text-muted-foreground text-lg md:text-xl text-center flex items-center justify-center gap-2">
      <Sparkles className="h-5 w-5 text-primary" />
      {count} wishes shared
    </p>
  );
}
