import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TeachBot - Your Personal AI Learning Companions",
  description:
    "Learn smarter with Hitesh & Piyush - your friendly AI teachers ready to help you grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='dark'
      suppressHydrationWarning
    >
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
