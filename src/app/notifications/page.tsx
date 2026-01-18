"use client";

import { Box, Card, Flex, Text, Avatar, Button, Separator } from "@radix-ui/themes";
import { HeartIcon, ChatBubbleIcon, PersonIcon, BellIcon } from "@radix-ui/react-icons";

export default function NotificationsPage() {
    const notifications = [
        { id: 1, type: 'like', text: 'שרה כהן עשתה לייק לפוסט שלך', time: 'לפני 5 דקות', unread: true },
        { id: 2, type: 'comment', text: 'יוחנן הגיב: "נראה מעולה!"', time: 'לפני 20 דקות', unread: true },
        { id: 3, type: 'friend', text: 'דני לוי שלח לך בקשת חברות', time: 'לפני שעה', unread: false },
        { id: 4, type: 'like', text: 'מיכל אהבה את התמונה שלך', time: 'לפני 3 שעות', unread: false },
        { id: 5, type: 'comment', text: 'נועה הגיבה בפורום הגינה', time: 'אתמול', unread: false },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'like': return <HeartIcon color="var(--red-9)" />;
            case 'comment': return <ChatBubbleIcon color="var(--blue-9)" />;
            case 'friend': return <PersonIcon color="var(--indigo-9)" />;
            default: return <BellIcon />;
        }
    };

    return (
        <Flex direction="column" gap="4" p="4">
            <Text size="5" weight="bold" mb="2">התראות</Text>

            <Flex direction="column" gap="2">
                {notifications.map((notif) => (
                    <Card key={notif.id} style={{
                        backgroundColor: notif.unread ? 'var(--accent-2)' : 'transparent',
                        transition: 'background-color 0.2s'
                    }}>
                        <Flex align="center" gap="3">
                            <Box
                                style={{
                                    padding: '10px',
                                    borderRadius: '50%',
                                    background: 'var(--gray-3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {getIcon(notif.type)}
                            </Box>
                            <Box style={{ flexGrow: 1 }}>
                                <Text as="div" size="2" weight={notif.unread ? "bold" : "regular"}>
                                    {notif.text}
                                </Text>
                                <Text as="div" size="1" color="gray">
                                    {notif.time}
                                </Text>
                            </Box>
                            {notif.unread && (
                                <Box style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-9)' }} />
                            )}
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </Flex>
    );
}
