import type { Metadata } from "next";
import { Montserrat, Geist } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700"]
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"]
})

export const metadata: Metadata = {
  title: "Hello New Year",
  description:
    "Countdown to the New Year, share your wishes, and celebrate with friends in a fun, simple app!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="nord" className={cn("font-sans", geist.variable)}>
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased flex flex-col items-center min-h-screen`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
