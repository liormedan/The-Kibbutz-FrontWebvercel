"use client";

import { Box, Card, Flex, Text, Button, Separator } from "@radix-ui/themes";
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
            <Card size="2" style={{ padding: '12px' }}>
                <Flex direction="column" gap="1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.label} href={item.path} style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="ghost"
                                    style={{
                                        height: "48px",
                                        width: "100%",
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        padding: 0,
                                        margin: '4px',
                                        backgroundColor: 'transparent',
                                    }}
                                >
                                    <Flex
                                        align="center"
                                        gap="3"
                                        style={{
                                            justifyContent: "flex-start",
                                            height: "48px",
                                            width: "100%",
                                            padding: '0 16px',
                                            borderRadius: '14px',
                                            overflow: 'hidden',
                                            backgroundColor: isActive ? '#2b868a' : 'transparent',
                                            border: isActive ? '1px solid #2b868a' : '1px solid transparent',
                                            boxShadow: isActive ? '0 2px 10px rgba(0,0,0,0.08)' : 'none',
                                            color: isActive ? 'var(--color-white)' : 'var(--color-foreground)',
                                            direction: 'rtl',
                                        }}
                                    >
                                        <Flex
                                            align="center"
                                            gap="3"
                                            style={{
                                                direction: 'rtl',
                                                width: '100%',
                                                justifyContent: 'flex-start',
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    background: isActive ? 'var(--color-white)' : 'var(--gray-3)',
                                                    padding: '6px',
                                                    borderRadius: '10px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    minWidth: '32px',
                                                    minHeight: '32px'
                                                }}
                                            >
                                                <Box
                                                    style={{
                                                        color: isActive ? '#2b868a' : 'var(--color-foreground)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    {item.icon}
                                                </Box>
                                            </Box>
                                            <Text style={{ textAlign: 'right' }}>{item.label}</Text>
                                        </Flex>
                                    </Flex>
                                </Button>
                            </Link>
                        );
                    })}

                    <Separator my="2" />

                    <Button
                        variant="ghost"
                        color="red"
                        style={{
                            height: "48px",
                            width: "100%",
                            padding: '0 16px',
                            borderRadius: '14px',
                            justifyContent: 'flex-start',
                            margin: '4px',
                            direction: 'rtl',
                        }}
                    >
                        <Flex align="center" gap="3" style={{ direction: 'rtl' }}>
                            <Box
                                style={{
                                    background: 'var(--gray-3)',
                                    padding: '6px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: '32px',
                                    minHeight: '32px'
                                }}
                            >
                                <ExitIcon width="20" height="20" />
                            </Box>
                            <Text style={{ textAlign: 'right' }}>התנתקות</Text>
                        </Flex>
                    </Button>
                </Flex>
            </Card>

        </Flex>
    );
};
