import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700"],
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
          inter.variable,
          montserrat.variable,
          "font-sans min-h-screen bg-background text-foreground flex flex-col items-center"
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
