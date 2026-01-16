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
                                        color: isActive ? 'var(--accent-11)' : 'var(--gray-11)',
                                        backgroundColor: isActive ? 'var(--accent-3)' : 'transparent',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        padding: '0 16px',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <Flex align="center" gap="3">
                                        <Box style={{
                                            background: isActive ? 'white' : 'var(--gray-3)',
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

            {/* 3. Footer / Bottom Actions */}
            <Flex direction="column" gap="2" px="2">
                <Button variant="ghost" style={{ justifyContent: 'flex-start', color: 'var(--gray-11)' }}>
                    <Flex gap="2" align="center">
                        <ExitIcon width="16" height="16" />
                        <Text>להתנתק</Text>
                    </Flex>
                </Button>

                <Flex gap="3" wrap="wrap" mt="2">
                    <Text size="1" color="gray" style={{ cursor: 'pointer' }}>הסכם משתמש</Text>
                    <Text size="1" color="gray" style={{ cursor: 'pointer' }}>מדיניות פרטיות</Text>
                    <Text size="1" color="gray" style={{ cursor: 'pointer' }}>מדיניות העוגיות</Text>
                </Flex>

            </Flex>

        </Flex>
    );
};


