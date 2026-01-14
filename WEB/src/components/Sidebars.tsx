"use client";

import { Box, Card, Flex, Text, Avatar, Button, ScrollArea, IconButton } from "@radix-ui/themes";
import { HomeIcon, ChatBubbleIcon, PersonIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";

export const NavigationSidebar = () => {
    const navItems = [
        { label: "פיד", icon: <HomeIcon width="18" height="18" /> },
        { label: "צ'אטים", icon: <ChatBubbleIcon width="18" height="18" /> },
        { label: "חברים", icon: <PersonIcon width="18" height="18" /> },
        { label: "הגדרות", icon: <GearIcon width="18" height="18" /> },
    ];

    return (
        <Card size="2">
            <Flex direction="column" gap="1">
                {navItems.map((item) => (
                    <Button
                        key={item.label}
                        variant="ghost"
                        color="gray"
                        style={{
                            justifyContent: "flex-start",
                            height: "44px",
                            color: 'var(--gray-11)',
                            fontSize: '15px'
                        }}
                    >
                        <Box ml="2">{item.icon}</Box>
                        {item.label}
                    </Button>
                ))}
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
