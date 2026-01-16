"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <Theme direction="rtl" accentColor="indigo">
                {children}
            </Theme>
        </NextThemesProvider>
    );
}
