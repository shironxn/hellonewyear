import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
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
  title: {
    default: "Hello New Year — Countdown & Wishes",
    template: "%s | Hello New Year",
  },
  description:
    "Welcome the new year with gratitude and hope. Share your wishes, receive inspiration from others, and celebrate together with our interactive New Year countdown.",
  keywords: [
    "new year",
    "countdown",
    "wishes",
    "2027",
    "hello new year",
    "new year wishes",
    "new year countdown",
    "celebration",
    "happy new year",
  ],
  authors: [{ name: "Shiron", url: "https://www.shironstudio.com" }],
  creator: "Shiron",
  publisher: "Shiron Studio",
  metadataBase: new URL("https://hny.shironstudio.com"),
  alternates: {
    canonical: "https://hny.shironstudio.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hny.shironstudio.com",
    title: "Hello New Year — Countdown & Wishes",
    description:
      "Welcome the new year with gratitude and hope. Share your wishes, receive inspiration from others, and celebrate together.",
    siteName: "Hello New Year",
    images: [
      {
        url: "/og-image.png",
        width: 1920,
        height: 1080,
        alt: "Hello New Year - New Year Countdown & Wishes",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello New Year — Countdown & Wishes",
    description:
      "Welcome the new year with gratitude and hope. Share your wishes, receive inspiration from others, and celebrate together.",
    creator: "@shironxn",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
        <JsonLd />
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
