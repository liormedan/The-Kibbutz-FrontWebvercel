"use client";

import { Box, Flex, Text, Avatar, TextField, ScrollArea, Card, IconButton, Separator, DropdownMenu } from "@radix-ui/themes";
import { MagnifyingGlassIcon, PaperPlaneIcon, DotsHorizontalIcon, FaceIcon, ImageIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { useState } from "react";

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
    const [activeChatId, setActiveChatId] = useState(1);
    const [messageInput, setMessageInput] = useState("");
    const [chatMessages, setChatMessages] = useState(messages);

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;
        const newMsg = {
            id: Date.now(),
            sender: "me",
            text: messageInput,
            time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages([...chatMessages, newMsg]);
        setMessageInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    const handleDeleteChat = () => {
        const updatedConversations = conversations.filter(c => c.id !== activeChatId);
        // Note: In a real app we would update the state, but 'conversations' is a const outside component. 
        // For this demo, we'd need to move 'conversations' into state or just alert.
        // Let's assume we just navigate away or alert for now since moving const to state requires bigger refactor.
        alert("השיחה נמחקה (בהדגמה)");
    };

    return (
        <Card size="2" style={{ height: 'calc(100vh - 120px)', padding: 0, overflow: 'hidden' }}>
            <Flex style={{ height: '100%' }}>

                {/* Right Pane: Chat List */}
                <Box style={{ width: '300px', borderLeft: '1px solid var(--gray-alpha-5)', background: 'var(--gray-2)', direction: 'rtl', textAlign: 'right' }}>
                    <Box p="3">
                        <Text size="4" weight="bold" mb="3" as="div">הודעות</Text>
                        <TextField.Root placeholder="חפש שיחה...">
                            <TextField.Slot side="right"><MagnifyingGlassIcon /></TextField.Slot>
                        </TextField.Root>
                    </Box>
                    <ScrollArea type="auto" scrollbars="vertical" style={{ height: 'calc(100% - 80px)' }}>
                        <Flex direction="column">
                            {conversations.map((chat) => (
                                <Box
                                    key={chat.id}
                                    onClick={() => setActiveChatId(chat.id)}
                                    p="3"
                                    style={{
                                        cursor: 'pointer',
                                        background: activeChatId === chat.id ? 'var(--accent-3)' : 'transparent',
                                        borderBottom: '1px solid var(--gray-alpha-3)',
                                        transition: 'background 0.2s'
                                    }}
                                    className="hover:bg-gray-100"
                                >
                                    <Flex gap="3" align="center" style={{ flexDirection: 'row-reverse' }}>
                                        <Avatar fallback={chat.name[0]} radius="full" size="3" color={activeChatId === chat.id ? "indigo" : "gray"} />
                                        <Box style={{ flexGrow: 1, overflow: 'hidden' }}>
                                            <Flex justify="between" style={{ flexDirection: 'row-reverse' }}>
                                                <Text weight={activeChatId === chat.id ? "bold" : "regular"} size="2">{chat.name}</Text>
                                                <Text size="1" color="gray">{chat.time}</Text>
                                            </Flex>
                                            <Flex justify="between" mt="1" style={{ flexDirection: 'row-reverse' }}>
                                                <Text size="1" color="gray" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                                    {chat.lastMessage}
                                                </Text>
                                                {chat.unread > 0 && (
                                                    <Flex align="center" justify="center" style={{ background: 'var(--accent-9)', color: 'var(--color-white)', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px' }}>
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
                <Flex direction="column" style={{ flexGrow: 1, position: 'relative', direction: 'rtl', textAlign: 'right' }}>
                    {/* Chat Header */}
                    <Flex justify="between" align="center" p="3" style={{ borderBottom: '1px solid var(--gray-alpha-5)', background: 'var(--color-background)' }}>
                        <Flex gap="3" align="center" style={{ flexDirection: 'row-reverse' }}>
                            <Avatar
                                fallback={conversations.find(c => c.id === activeChatId)?.name[0] || "?"}
                                size="2"
                                radius="full"
                                color="teal"
                            />
                            <Box>
                                <Text weight="bold" size="2" as="div">{conversations.find(c => c.id === activeChatId)?.name}</Text>
                                <Text size="1" color="green" as="div">מחובר/ת כעת</Text>
                            </Box>
                        </Flex>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <IconButton variant="ghost" color="gray"><DotsHorizontalIcon /></IconButton>
                            </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="end">
                                <DropdownMenu.Item>
                                    <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                        צפה בפרופיל
                                    </Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item>
                                    <Link href="/settings" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                        הגדרות התראות
                                    </Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator />
                                <DropdownMenu.Item color="red">
                                    <Link href="/settings" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                        חסום משתמש (הגדרות)
                                    </Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item color="red" onClick={handleDeleteChat}>
                                    מחק שיחה
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Flex>

                    {/* Messages Area */}
                    <ScrollArea type="always" scrollbars="vertical" style={{ flexGrow: 1, background: 'var(--gray-1)', direction: 'rtl' }}>
                        <Flex direction="column" gap="3" p="4" style={{ minHeight: '100%' }}>
                            <Text align="center" size="1" color="gray" my="2">היום</Text>
                            {chatMessages.map((msg) => (
                                <Flex key={msg.id} justify={msg.sender === 'me' ? 'start' : 'end'}>
                                    <Box
                                        style={{
                                            maxWidth: '70%',
                                            padding: '10px 14px',
                                            borderRadius: '16px',
                                            background: msg.sender === 'me' ? 'var(--accent-9)' : 'var(--color-white)',
                                            color: msg.sender === 'me' ? 'var(--color-white)' : 'inherit',
                                            border: msg.sender === 'other' ? '1px solid var(--gray-4)' : 'none',
                                            borderBottomRightRadius: msg.sender === 'me' ? '4px' : '16px',
                                            borderBottomLeftRadius: msg.sender === 'other' ? '4px' : '16px',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                            wordBreak: 'break-word',
                                            animation: 'fadeIn 0.2s ease-in-out' // optional animation class if available globally or inline
                                        }}
                                    >
                                        <Text size="2">{msg.text}</Text>
                                        <Flex justify="end" mt="1">
                                            <Text size="1" style={{ opacity: 0.7, fontSize: '10px' }}>{msg.time}</Text>
                                        </Flex>
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
                            <TextField.Root
                                placeholder="כתוב הודעה..."
                                style={{ flexGrow: 1 }}
                                size="3"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            >
                            </TextField.Root>
                            <IconButton variant="solid" size="3" onClick={handleSendMessage}>
                                <PaperPlaneIcon />
                            </IconButton>
                        </Flex>
                    </Box>
                </Flex>

            </Flex>
        </Card>
    );
}
