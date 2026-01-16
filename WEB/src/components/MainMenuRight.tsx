"use client";

import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { HomeIcon, ChatBubbleIcon, PersonIcon, GearIcon, BellIcon, BackpackIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationSidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { label: "פיד", icon: <HomeIcon width="18" height="18" />, path: "/" },
        { label: "תיקי עבודות", icon: <BackpackIcon width="18" height="18" />, path: "/portfolios" },
        { label: "צ'אטים", icon: <ChatBubbleIcon width="18" height="18" />, path: "/chat" },
        { label: "חברים", icon: <PersonIcon width="18" height="18" />, path: "/friends" },
        { label: "התראות", icon: <BellIcon width="18" height="18" />, path: "/notifications" },
        { label: "הגדרות", icon: <GearIcon width="18" height="18" />, path: "/settings" },
    ];

    return (
        <Card size="2">
            <Flex direction="column" gap="1">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.label} href={item.path} style={{ textDecoration: 'none' }}>
                            <Button
                                variant="ghost" // Always ghost to prevent layout shift
                                style={{
                                    justifyContent: "flex-start",
                                    height: "44px",
                                    width: "100%",
                                    color: isActive ? 'var(--accent-11)' : 'var(--gray-11)',
                                    backgroundColor: isActive ? 'var(--accent-3)' : 'transparent', // Manual background
                                    fontSize: '15px',
                                    border: '1px solid transparent',
                                    paddingInline: '12px',
                                    boxSizing: 'border-box'
                                }}
                            >
                                {item.icon}
                                <Text weight="bold">{item.label}</Text>
                            </Button>
                        </Link>
                    );
                })}
            </Flex>
        </Card>
    );
};
