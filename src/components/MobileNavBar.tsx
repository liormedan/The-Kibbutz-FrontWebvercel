"use client";

import { Flex, IconButton, Box, Text } from "@radix-ui/themes";
import { HomeIcon, MagnifyingGlassIcon, ChatBubbleIcon, BellIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileNavBar = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { href: "/", icon: <HomeIcon width="24" height="24" />, label: "בית" },
        { href: "/search", icon: <MagnifyingGlassIcon width="24" height="24" />, label: "חיפוש" },
        { href: "/chat", icon: <ChatBubbleIcon width="24" height="24" />, label: "צ'אט" },
        { href: "/notifications", icon: <BellIcon width="24" height="24" />, label: "התראות" },
        { href: "/profile", icon: <PersonIcon width="24" height="24" />, label: "פרופיל" },
    ];

    return (
        <Box
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'var(--color-background)',
                borderTop: '1px solid var(--gray-alpha-5)',
                zIndex: 100,
                paddingBottom: 'env(safe-area-inset-bottom)', // Support for iPhone notch area
                height: '60px', // Fixed height
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
            }}
            // Only show on mobile (hidden on md and up)
            display={{ initial: 'block', md: 'none' }}
        >
            <Flex justify="between" align="center" style={{ width: '100%', maxWidth: '500px', height: '100%', padding: '0 16px' }}>
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} style={{ textDecoration: 'none', flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <Flex direction="column" align="center" gap="1" style={{ opacity: isActive(item.href) ? 1 : 0.6 }}>
                            <IconButton
                                variant="ghost"
                                color={isActive(item.href) ? "teal" : "gray"}
                                style={{
                                    color: isActive(item.href) ? 'var(--accent-9)' : 'var(--gray-11)',
                                    width: 'auto',
                                    height: 'auto',
                                    padding: '4px'
                                }}
                            >
                                {item.icon}
                            </IconButton>
                            {/* Optional: Add labels if desired, currently hidden for cleaner look */}
                            {/* <Text size="1" color={isActive(item.href) ? "teal" : "gray"}>{item.label}</Text> */}
                        </Flex>
                    </Link>
                ))}
            </Flex>
        </Box>
    );
};
