"use client";

import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 md:text-lg p-4 text-center">
      <aside>
        <p className="flex items-center justify-center gap-1">
          Copyright © {new Date().getFullYear()} - All right reserved by shiron,
          built with <Heart className="h-4 w-4" />
        </p>
      </aside>
    </footer>
  );
}
