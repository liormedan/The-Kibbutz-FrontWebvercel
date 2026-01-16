"use client";

import { Box, Flex, Text, Avatar, Popover, Button, ScrollArea } from "@radix-ui/themes";
import { BellIcon, HeartIcon, ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";

const notifications = [
    { id: 1, text: "שרה כהן אהבה את הפוסט שלך", icon: <HeartIcon color="var(--red-9)" />, time: "לפני 5 דק'" },
    { id: 2, text: "יוסי הגיב לפוסט: 'נראה מעולה!'", icon: <ChatBubbleIcon color="var(--blue-9)" />, time: "לפני 20 דק'" },
    { id: 3, text: "נועה ביקשה להצטרף לקהילה", icon: <PersonIcon color="var(--green-9)" />, time: "לפני שעה" },
    { id: 4, text: "תזכורת: אסיפת קיבוץ מחר", icon: <BellIcon color="var(--orange-9)" />, time: "לפני שעתיים" },
    { id: 5, text: "דניאל התחיל לעקוב אחריך", icon: <PersonIcon color="var(--indigo-9)" />, time: "אתמול" },
];

export const NotificationsPopover = () => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button variant="ghost" color="gray" style={{ padding: 0, width: '36px', height: '36px', color: 'var(--gray-12)' }}>
                    <BellIcon width="24" height="24" />
                </Button>
            </Popover.Trigger>
            <Popover.Content width="300px" style={{ padding: 0, direction: 'rtl' }}>
                <Box p="3" style={{ borderBottom: '1px solid var(--gray-alpha-4)' }}>
                    <Text weight="bold" size="2">התראות</Text>
                </Box>
                <ScrollArea type="auto" style={{ maxHeight: '300px' }}>
                    <Flex direction="column">
                        {notifications.map((notif) => (
                            <Box
                                key={notif.id}
                                p="3"
                                style={{
                                    borderBottom: '1px solid var(--gray-alpha-3)',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                className="hover:bg-gray-100" // Simple hover effect
                            >
                                <Flex gap="3" align="start">
                                    <Box pt="1">{notif.icon}</Box>
                                    <Box>
                                        <Text size="2" style={{ lineHeight: '1.4' }}>{notif.text}</Text>
                                        <Text size="1" color="gray" mt="1">{notif.time}</Text>
                                    </Box>
                                </Flex>
                            </Box>
                        ))}
                    </Flex>
                </ScrollArea>
                <Box p="2">
                    <Button variant="ghost" style={{ width: '100%' }} size="1">
                        סמן הכל כנקרא
                    </Button>
                </Box>
            </Popover.Content>
        </Popover.Root>
    );
};
