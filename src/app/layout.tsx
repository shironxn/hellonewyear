import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "New Year Countdown",
  description:
    "A professional and minimalist New Year Countdown with communal wishes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body
        className={cn(
          caveat.variable,
          "font-sans min-h-screen bg-background text-foreground flex flex-col items-center",
        )}
      >
        <ThemeProvider>
          <div className="flex-1 w-full flex flex-col items-center">
            {children}
          </div>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
