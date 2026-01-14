import type { Metadata } from "next";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import "./globals.css";
import { LanguageProvider } from '@/contexts/LanguageContext';

export const metadata: Metadata = {
  title: "The Kibbutz",
  description: "Connect, Share, and Thrive together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <LanguageProvider>
          <Theme appearance="light" accentColor="indigo" grayColor="slate" radius="medium">
            <div style={{ backgroundColor: 'var(--gray-2)', minHeight: '100vh' }}>
              {children}
            </div>
          </Theme>
        </LanguageProvider>
      </body>
    </html>
  );
}
