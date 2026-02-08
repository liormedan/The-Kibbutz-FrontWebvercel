"use client";

import { Box, Container, Grid, Flex, TextField, IconButton, Avatar, Text, Card, DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { MagnifyingGlassIcon, BellIcon, PersonIcon, HomeIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { NotificationsPopover } from "./NotificationsPopover";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => (
    <Box
        className="app-header"
        style={{
            backgroundColor: 'var(--color-background)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--gray-alpha-5)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            height: '64px',
            display: 'flex',
            alignItems: 'center'
        }}
    >
        <Container size="4">
            <Flex justify="between" align="center" style={{ height: '100%' }} px={{ initial: '4', md: '2' }}>
                {/* Right: Logo & Icons */}
                <Flex align="center" gap="5">
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Text size="5" weight="bold" style={{ color: 'var(--accent-9)', cursor: 'pointer' }}>הקיבוץ</Text>
                    </Link>

                    {/* Navigation Icons - Hidden on mobile */}
                    <Box display={{ initial: 'none', xs: 'block' }}>
                        <Flex gap="5" align="center">
                            <Link href="/">
                                <IconButton
                                    variant="ghost"
                                    color="gray"
                                    style={{ color: 'var(--gray-12)', width: '36px', height: '36px' }}
                                >
                                    <HomeIcon width="24" height="24" />
                                </IconButton>
                            </Link>

                            <Link href="/chat">
                                <IconButton
                                    variant="ghost"
                                    color="gray"
                                    style={{ color: 'var(--gray-12)', width: '36px', height: '36px' }}
                                >
                                    <ChatBubbleIcon width="24" height="24" />
                                </IconButton>
                            </Link>
                        </Flex>
                    </Box>
                </Flex>

                {/* Center: Search - Hidden on mobile */}
                <Box style={{ width: '100%', maxWidth: '400px' }} display={{ initial: 'none', xs: 'block' }}>
                    <TextField.Root placeholder="חיפוש..." radius="large">
                        <TextField.Slot side="right">
                            <MagnifyingGlassIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                </Box>

                {/* Left: Profile & Notifications */}
                <Flex gap="4" align="center">
                    <ThemeToggle showLabel={false} />
                    <NotificationsPopover />

                    <DropdownMenu.Root modal={false}>
                        <DropdownMenu.Trigger>
                            <Avatar
                                size="2"
                                src="/yairarnondemo.png"
                                fallback="JD"
                                radius="full"
                                style={{ cursor: 'pointer' }}
                            />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="end">
                            <DropdownMenu.Item style={{ textAlign: 'right', flexDirection: 'row-reverse' }}>
                                <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit', width: '100%', textAlign: 'right', display: 'block' }}>
                                    הפרופיל שלי
                                </Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item style={{ textAlign: 'right', flexDirection: 'row-reverse' }}>
                                <Link href="/settings" style={{ textDecoration: 'none', color: 'inherit', width: '100%', textAlign: 'right', display: 'block' }}>
                                    הגדרות
                                </Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item color="gray" style={{ textAlign: 'right', flexDirection: 'row-reverse' }}>
                                <Link href="/help" style={{ textDecoration: 'none', color: 'inherit', width: '100%', textAlign: 'right', display: 'block' }}>
                                    מרכז עזרה
                                </Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item color="red" style={{ textAlign: 'right', flexDirection: 'row-reverse' }}>
                                <Link href="/login" style={{ textDecoration: 'none', color: 'inherit', width: '100%', textAlign: 'right', display: 'block' }}>
                                    התנתק
                                </Link>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            </Flex>
        </Container>
    </Box>
);

interface AppLayoutProps {
    children: ReactNode;
    navigation?: ReactNode;
    widgets?: ReactNode;
}

// ... existing imports

import { MobileNavBar } from "./MobileNavBar";

export const AppLayout = ({ children, navigation, widgets }: AppLayoutProps) => {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    const columns = {
        initial: "1fr",
        md: navigation && widgets ? "240px 1fr 300px" : navigation ? "240px 1fr" : widgets ? "1fr 300px" : "1fr",
        lg: navigation && widgets ? "240px 1fr 300px" : navigation ? "240px 1fr" : widgets ? "1fr 300px" : "1fr",
    };

    return (
        <Box style={{ backgroundColor: 'var(--gray-1)', minHeight: '100vh', paddingBottom: '60px' }}> {/* Padding bottom for mobile nav */}
            <Header />
            <Container style={{ maxWidth: '1200px', margin: '0 auto', padding: '84px 16px 24px 16px', minHeight: '100vh' }}>
                <Grid
                    columns={columns}
                    gap="4"
                    align="start"
                >
                    {/* Fixed Sidebar Column - Hidden on mobile */}
                    {navigation && (
                        <Box display={{ initial: 'none', md: 'block' }}>
                            <Box style={{ width: '240px', position: 'sticky', top: '84px', height: 'calc(100vh - 100px)' }}>
                                {navigation}
                            </Box>
                        </Box>
                    )}

                    <Card size="3" style={{ padding: '16px', minWidth: 0, border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}>
                        {/* Removed default card styling to blend better on mobile, or keep it consistent? 
                             Let's keep the card but maybe adjust padding for mobile if needed. 
                             Actually, for "App-like" feel, the main feed often isn't inside a visible card on mobile 
                             but rather full width. Let's keep it simple for now and just handle the layout.
                         */}
                        <Box style={{ width: '100%' }}>
                            {children}
                        </Box>
                    </Card>

                    {widgets && (
                        <Box display={{ initial: 'none', md: 'block' }}>
                            <Box style={{ width: '300px', position: 'sticky', top: '84px', height: 'calc(100vh - 100px)' }}>
                                {widgets}
                            </Box>
                        </Box>
                    )}
                </Grid>
            </Container>
            <Box display={{ initial: 'block', md: 'none' }}>
                <MobileNavBar />
            </Box>
        </Box>
    );
};
