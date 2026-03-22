"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { Coffee, Github, Globe, Info, Instagram } from "lucide-react";
import { useState } from "react";

function InfoModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Info className="h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl">
            About Hello New Year
          </DialogTitle>
          <DialogDescription className="text-lg md:text-xl">
            Welcome the new year with gratitude and hope.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          <section className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">About the App</h3>
            <p className="text-base md:text-lg text-muted-foreground">
              Hello New Year is a place to welcome the new year with gratitude
              and hope. Share your wishes, receive inspiration from others, and
              celebrate together.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">About the Creator</h3>
            <p className="text-base md:text-lg text-muted-foreground">
              Just an IT enthusiast who builds things from scratch, solo.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold">Links</h3>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com/shironxn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Instagram className="h-6 w-6" />
                </Button>
              </a>
              <a
                href="https://github.com/shironxn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Github className="h-6 w-6" />
                </Button>
              </a>
              <a
                href="https://ko-fi.com/shironxn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Coffee className="h-6 w-6" />
                </Button>
              </a>
              <a
                href="https://www.shironstudio.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Globe className="h-6 w-6" />
                </Button>
              </a>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-transparent">
      <span className="text-xl font-bold">HNY</span>
      <div className="flex items-center gap-2">
        <InfoModal />
        <ThemeToggle />
      </div>
    </nav>
  );
}
