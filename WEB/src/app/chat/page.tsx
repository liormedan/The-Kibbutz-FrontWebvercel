"use client";

import { Box, Flex, Text, Avatar, TextField, ScrollArea, Card, IconButton, Separator } from "@radix-ui/themes";
import { AppLayout } from "../../components/AppLayout";
import { NavigationSidebar } from "../../components/Sidebars";
import { MagnifyingGlassIcon, PaperPlaneIcon, DotsHorizontalIcon, FaceIcon, ImageIcon } from "@radix-ui/react-icons";

// Mock Data
const conversations = [
    { id: 1, name: "שרה כהן", lastMessage: "נתראה מחר בגינה?", time: "10:30", unread: 2 },
    { id: 2, name: "קבוצת הקיבוץ", lastMessage: "דני: מישהו מגיע לאסיפה?", time: "09:15", unread: 0 },
    { id: 3, name: "יוסי לוי", lastMessage: "תודה על העזרה!", time: "אתמול", unread: 0 },
    { id: 4, name: "רחל גבאי", lastMessage: "העוגה הייתה מעולה", time: "יום ג'", unread: 0 },
    { id: 5, name: "ועדת תרבות", lastMessage: "פרוטוקול ישיבה אחרונה", time: "יום א'", unread: 5 },
];

const messages = [
    { id: 1, sender: "me", text: "היי שרה, מה קורה?", time: "10:00" },
    { id: 2, sender: "other", text: "הכל טוב! מה איתך?", time: "10:05" },
    { id: 3, sender: "me", text: "מעולה. רציתי לשאול לגבי מחר.", time: "10:10" },
    { id: 4, sender: "other", text: "כן, אני באה בטוח. נתראה מחר בגינה?", time: "10:30" },
];

export default function ChatPage() {
    return (
        <AppLayout
            navigation={<NavigationSidebar />}
            widgets={null} // No widgets on chat page to give more space
        >
            <Card size="2" style={{ height: 'calc(100vh - 120px)', padding: 0, overflow: 'hidden' }}>
                <Flex style={{ height: '100%' }}>

                    {/* Right Pane: Chat List */}
                    <Box style={{ width: '300px', borderLeft: '1px solid var(--gray-alpha-5)', background: 'var(--gray-2)' }}>
                        <Box p="3">
                            <Text size="4" weight="bold" mb="3" as="div">הודעות</Text>
                            <TextField.Root placeholder="חפש שיחה...">
                                <TextField.Slot side="left"><MagnifyingGlassIcon /></TextField.Slot>
                            </TextField.Root>
                        </Box>
                        <ScrollArea type="auto" scrollbars="vertical" style={{ height: 'calc(100% - 80px)' }}>
                            <Flex direction="column">
                                {conversations.map((chat) => (
                                    <Box
                                        key={chat.id}
                                        p="3"
                                        style={{
                                            cursor: 'pointer',
                                            background: chat.id === 1 ? 'var(--accent-a3)' : 'transparent',
                                            borderBottom: '1px solid var(--gray-alpha-3)'
                                        }}
                                    >
                                        <Flex gap="3" align="center">
                                            <Avatar fallback={chat.name[0]} radius="full" size="3" />
                                            <Box style={{ flexGrow: 1, overflow: 'hidden' }}>
                                                <Flex justify="between">
                                                    <Text weight="bold" size="2">{chat.name}</Text>
                                                    <Text size="1" color="gray">{chat.time}</Text>
                                                </Flex>
                                                <Flex justify="between" mt="1">
                                                    <Text size="1" color="gray" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                                        {chat.lastMessage}
                                                    </Text>
                                                    {chat.unread > 0 && (
                                                        <Flex align="center" justify="center" style={{ background: 'var(--accent-9)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}>
                                                            {chat.unread}
                                                        </Flex>
                                                    )}
                                                </Flex>
                                            </Box>
                                        </Flex>
                                    </Box>
                                ))}
                            </Flex>
                        </ScrollArea>
                    </Box>

                    {/* Left Pane: Active Chat */}
                    <Flex direction="column" style={{ flexGrow: 1, position: 'relative' }}>
                        {/* Chat Header */}
                        <Flex justify="between" align="center" p="3" style={{ borderBottom: '1px solid var(--gray-alpha-5)', background: 'var(--color-background)' }}>
                            <Flex gap="3" align="center">
                                <Avatar fallback="שכ" size="2" radius="full" color="teal" />
                                <Box>
                                    <Text weight="bold" size="2" as="div">שרה כהן</Text>
                                    <Text size="1" color="green" as="div">מחובר/ת כעת</Text>
                                </Box>
                            </Flex>
                            <IconButton variant="ghost" color="gray"><DotsHorizontalIcon /></IconButton>
                        </Flex>

                        {/* Messages Area */}
                        <ScrollArea type="always" scrollbars="vertical" style={{ flexGrow: 1, background: 'var(--gray-1)' }}>
                            <Flex direction="column" gap="3" p="4" style={{ minHeight: '100%' }}>
                                {messages.map((msg) => (
                                    <Flex key={msg.id} justify={msg.sender === 'me' ? 'start' : 'end'}>
                                        <Box
                                            style={{
                                                maxWidth: '70%',
                                                padding: '10px 14px',
                                                borderRadius: '16px',
                                                background: msg.sender === 'me' ? 'var(--accent-9)' : 'white',
                                                color: msg.sender === 'me' ? 'white' : 'inherit',
                                                border: msg.sender === 'other' ? '1px solid var(--gray-4)' : 'none',
                                                borderBottomRightRadius: msg.sender === 'me' ? '4px' : '16px',
                                                borderBottomLeftRadius: msg.sender === 'other' ? '4px' : '16px',
                                                // Ensure text wrap
                                                wordBreak: 'break-word'
                                            }}
                                        >
                                            <Text size="2">{msg.text}</Text>
                                            <Text size="1" style={{ display: 'block', marginTop: '4px', opacity: 0.7, textAlign: 'end', fontSize: '10px' }}>{msg.time}</Text>
                                        </Box>
                                    </Flex>
                                ))}
                            </Flex>
                        </ScrollArea>

                        {/* Input Area */}
                        <Box p="3" style={{ background: 'var(--color-background)', borderTop: '1px solid var(--gray-alpha-5)' }}>
                            <Flex gap="2">
                                <IconButton variant="ghost" color="gray"><ImageIcon /></IconButton>
                                <IconButton variant="ghost" color="gray"><FaceIcon /></IconButton>
                                <TextField.Root placeholder="כתוב הודעה..." style={{ flexGrow: 1 }} size="3">
                                </TextField.Root>
                                <IconButton variant="solid" size="3"><PaperPlaneIcon /></IconButton>
                            </Flex>
                        </Box>
                    </Flex>

                </Flex>
            </Card>
        </AppLayout>
    );
}
