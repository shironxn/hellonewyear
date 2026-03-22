import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
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
  title: "Hello New Year — Countdown & Wishes",
  description:
    "Welcome the new year with gratitude and hope. Share your wishes, receive inspiration from others, and celebrate together.",
  keywords: [
    "new year",
    "countdown",
    "wishes",
    "2027",
    "hello new year",
    "new year wishes",
  ],
  authors: [{ name: "Shiron", url: "https://www.shironstudio.com" }],
  creator: "Shiron",
  metadataBase: new URL("https://hellonewyear.vercel.app"),
  openGraph: {
    type: "website",
    url: "https://hellonewyear.vercel.app",
    title: "Hello New Year — Countdown & Wishes",
    description:
      "Welcome the new year with gratitude and hope. Share your wishes, receive inspiration from others, and celebrate together.",
    siteName: "Hello New Year",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello New Year — Countdown & Wishes",
    description:
      "Welcome the new year with gratitude and hope. Share your wishes, receive inspiration from others, and celebrate together.",
    creator: "@shironxn",
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <Navbar />
          <div className="flex-1 w-full flex flex-col items-center">
            {children}
          </div>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
