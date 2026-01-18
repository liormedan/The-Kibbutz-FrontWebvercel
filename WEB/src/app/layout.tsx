import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { AppLayout } from "../components/AppLayout";
import { NavigationSidebar } from "../components/MainMenuRight";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <style dangerouslySetInnerHTML={{
          __html: `
          body[data-scroll-locked], body[style*="overflow: hidden"] {
            overflow-y: scroll !important;
            padding-right: 0 !important;
            padding-left: 0 !important;
            margin-right: 0 !important;
            margin-left: 0 !important;
          }
          
          /* Forced Color Overrides to fight Radix Specificity */
          :root, .radix-themes, [data-is-root-theme="true"] {
             --color-background: #fbf1f1 !important;
             --color-foreground: #6a6f7d !important;
             
             --accent-9: #6a6f7d !important;
             --accent-10: #5a5f6b !important;
             --accent-11: #fbf1f1 !important;
             --accent-a9: #6a6f7d !important;
             
             --secondary: #f1dab0 !important;
             --gray-surface: #bedce4 !important;
          }
          
          .rt-Card {
             border-color: var(--accent-9) !important;
          }
        `}} />
        <ThemeProvider>
          <AppLayout navigation={<NavigationSidebar />}>
            {children}
          </AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
