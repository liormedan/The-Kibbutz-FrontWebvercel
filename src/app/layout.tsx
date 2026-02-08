import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { AppLayout } from "../components/AppLayout";
import { NavigationSidebar } from "../components/MainMenuRight";
import { PortfolioProvider } from "../context/PortfolioContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Kibbutz",
  description: "Community Portfolio Network",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kibbutz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>

        <ThemeProvider>
          <PortfolioProvider>
            <AppLayout navigation={<NavigationSidebar />}>
              {children}
            </AppLayout>
          </PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
