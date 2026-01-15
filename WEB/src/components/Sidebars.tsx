"use client";

import { Box, Card, Flex, Text, Avatar, Button, ScrollArea, IconButton } from "@radix-ui/themes";
import { HomeIcon, ChatBubbleIcon, PersonIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationSidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { label: "פיד", icon: <HomeIcon width="18" height="18" />, path: "/" },
        { label: "צ'אטים", icon: <ChatBubbleIcon width="18" height="18" />, path: "/chat" },
        { label: "חברים", icon: <PersonIcon width="18" height="18" />, path: "/friends" },
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
                                    paddingRight: '12px',
                                    boxSizing: 'border-box'
                                }}
                            >
                                <Box ml="2">{item.icon}</Box>
                                <Text>{item.label}</Text>
                            </Button>
                        </Link>
                    );
                })}
            </Flex>
        </Card>
    );
};

export const WidgetsSidebar = () => {
    return (
        <Flex direction="column" gap="4">
            {/* Stories Widget */}
            <Card size="2">
                <Flex justify="between" align="center" mb="3">
                    <Text size="3" weight="bold">סיפורים</Text>
                </Flex>
                <Flex gap="3" style={{ overflowX: 'auto', paddingBottom: '10px' }}>
                    {/* Add Story */}
                    <Box style={{ minWidth: '70px', textAlign: 'center' }}>
                        <Flex
                            align="center"
                            justify="center"
                            style={{
                                width: '70px',
                                height: '100px',
                                background: 'var(--gray-3)',
                                borderRadius: '12px',
                                marginBottom: '8px'
                            }}
                        >
                            <PlusIcon />
                        </Flex>
                        <Text size="1">הוסף סיפור</Text>
                    </Box>
                    {/* Story Item 1 */}
                    <Box style={{ minWidth: '70px', textAlign: 'center' }}>
                        <Box
                            style={{
                                width: '70px',
                                height: '100px',
                                background: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)',
                                borderRadius: '12px',
                                marginBottom: '8px'
                            }}
                        />
                        <Text size="1">בוב</Text>
                    </Box>
                    {/* Story Item 2 */}
                    <Box style={{ minWidth: '70px', textAlign: 'center' }}>
                        <Box
                            style={{
                                width: '70px',
                                height: '100px',
                                background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                                borderRadius: '12px',
                                marginBottom: '8px'
                            }}
                        />
                        <Text size="1">אליס</Text>
                    </Box>
                </Flex>
            </Card>

            {/* Suggestions Widget */}
            <Card size="2">
                <Flex justify="between" align="center" mb="3">
                    <Text size="3" weight="bold">הצעות</Text>
                </Flex>
                <Flex direction="column" gap="3">
                    {['אליס כהן', 'בוב לוי', 'צ\'ארלי בראון'].map((name, i) => (
                        <Flex key={i} justify="between" align="center">
                            <Flex gap="2" align="center">
                                <Avatar fallback={name[0]} size="3" radius="full" color="indigo" variant="soft" />
                                <Box>
                                    <Text size="2" weight="medium" as="div">{name}</Text>
                                    <Text size="1" color="gray" as="div">חבר משותף</Text>
                                </Box>
                            </Flex>
                            <Button size="1" variant="soft">הוסף</Button>
                        </Flex>
                    ))}
                </Flex>
            </Card>
        </Flex>
    );
}
