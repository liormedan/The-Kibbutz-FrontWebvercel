"use client";

import { Box, Card, Flex, Text, Button } from "@radix-ui/themes";
import { HomeIcon, ChatBubbleIcon, PersonIcon, GearIcon, BackpackIcon, ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfileCard } from "./ProfileCard";

export const NavigationSidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { label: "פיד", icon: <HomeIcon width="20" height="20" />, path: "/" },
        { label: "תיקי עבודות", icon: <BackpackIcon width="18" height="18" />, path: "/portfolios" },
        { label: "צ'אטים", icon: <ChatBubbleIcon width="20" height="20" />, path: "/chat" },
        { label: "חברים", icon: <PersonIcon width="20" height="20" />, path: "/friends" },
        { label: "הגדרות", icon: <GearIcon width="20" height="20" />, path: "/settings" },
    ];

    return (
        <Flex direction="column" gap="4" style={{ width: '100%' }}>

            {/* 1. Profile Card Section */}
            <ProfileCard />

            {/* 2. Navigation Section */}
            <Card size="2" style={{ padding: '8px' }}>
                <Flex direction="column" gap="1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.label} href={item.path} style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="ghost"
                                    style={{
                                        justifyContent: "space-between",
                                        height: "48px",
                                        width: "100%",
                                        color: 'var(--color-white)',
                                        backgroundColor: isActive ? 'var(--accent-3)' : 'transparent',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        padding: '0 16px',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <Flex align="center" gap="3">
                                        <Box style={{
                                            background: isActive ? 'var(--color-white)' : 'var(--gray-3)',
                                            padding: '6px',
                                            borderRadius: '8px',
                                            display: 'flex'
                                        }}>
                                            {item.icon}
                                        </Box>
                                        <Text>{item.label}</Text>
                                    </Flex>
                                </Button>
                            </Link>
                        );
                    })}
                </Flex>
            </Card>

            <Link href="/settings" style={{ textDecoration: 'none' }}>
                <Button variant="ghost" style={{ width: '100%', justifyContent: 'center' }}>
                    <Text>הגדרות</Text>
                </Button>
            </Link>

        </Flex>
    );
};
