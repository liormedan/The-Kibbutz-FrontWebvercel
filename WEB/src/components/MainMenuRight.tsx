"use client";

import { Box, Card, Flex, Text, Button, Avatar } from "@radix-ui/themes";
import { HomeIcon, ChatBubbleIcon, PersonIcon, GearIcon, BackpackIcon, ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
            <Card size="2" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                {/* Cover Image */}
                <Box style={{
                    height: '80px',
                    background: 'url(https://images.unsplash.com/photo-1548544149-4835e62ee5b3?w=800&q=80) center/cover no-repeat'
                }} />

                {/* Profile Info */}
                <Flex direction="column" align="center" pb="3" style={{ marginTop: '-40px' }}>
                    <Avatar
                        size="5"
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                        fallback="תג"
                        radius="full"
                        style={{ border: '4px solid white' }}
                    />
                    <Text size="3" weight="bold" mt="2">תומר גבריאל</Text>
                    <Text size="2" color="gray" style={{ direction: 'ltr' }}>@Tomer_Gabriel_1</Text>
                </Flex>
            </Card>

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


>>>>>>> Stashed changes
            </Flex>

        </Flex>
    );
};

