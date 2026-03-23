"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-center p-6 text-muted-foreground text-base md:text-lg">
      <p className="flex items-center justify-center gap-1.5">
        Made with
        <Heart className="h-4 w-4 text-primary fill-primary" />
        by
        <Link
          href="https://www.shironstudio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors underline underline-offset-4"
        >
          Shiron
        </Link>
        · © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
