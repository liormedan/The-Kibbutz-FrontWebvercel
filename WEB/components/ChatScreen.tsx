'use client';

import { Card, Box, Flex, Text, Button, Avatar, IconButton, TextField, ScrollArea, Separator } from '@radix-ui/themes';
import { HomeIcon, MagnifyingGlassIcon, GearIcon, BellIcon, PersonIcon, ExitIcon, PaperPlaneIcon, PlusIcon } from '@radix-ui/react-icons';
import { paletteColors } from '@/theme/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import ChatList from './ChatList';
import Link from 'next/link';

export default function ChatScreen() {
    const { t } = useLanguage();
    
    return (
        <Box style={{ height: '100vh', display: 'flex', overflow: 'hidden' }}>
            {/* 1. Left Sidebar (Navigation) */}
            <Box style={{ width: 80, backgroundColor: paletteColors.darkSlateGray, color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
                <Box mb="6">
                    <Link href="/">
                        <Avatar fallback="K" variant="solid" color="orange" style={{ cursor: 'pointer' }} />
                    </Link>
                </Box>
                <Flex direction="column" gap="4">
                    <Link href="/feed">
                        <IconButton variant="ghost" color="gray" style={{ color: 'white' }}><HomeIcon width="24" height="24" /></IconButton>
                    </Link>
                    <IconButton variant="ghost" color="gray" style={{ color: 'white' }}><BellIcon width="24" height="24" /></IconButton>
                    <Link href="/profile">
                        <IconButton variant="ghost" color="gray" style={{ color: 'white' }}><PersonIcon width="24" height="24" /></IconButton>
                    </Link>
                    <IconButton variant="ghost" color="gray" style={{ color: 'white' }}><GearIcon width="24" height="24" /></IconButton>
                </Flex>
                <Box mt="auto">
                    <IconButton variant="ghost" color="gray" style={{ color: 'white' }}><ExitIcon width="24" height="24" /></IconButton>
                </Box>
            </Box>

            {/* 2. Middle Pane (Active Chat) */}
            <Flex direction="column" style={{ flex: 1, borderRight: '1px solid var(--gray-4)' }}>
                {/* Chat Header */}
                <Box style={{ padding: '16px', borderBottom: '1px solid var(--gray-4)', backgroundColor: 'white' }}>
                    <Flex justify="between" align="center">
                        <Flex gap="3" align="center">
                            <Avatar fallback="AS" radius="full" size="3" color="teal" />
                            <Box>
                                <Text as="div" size="3" weight="bold">Alice Smith</Text>
                                <Flex align="center" gap="1">
                                    <Box style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--green-9)' }} />
                                    <Text as="div" size="1" color="gray">{t('chat.online')}</Text>
                                </Flex>
                            </Box>
                        </Flex>
                        <IconButton variant="ghost" color="gray"><GearIcon /></IconButton>
                    </Flex>
                </Box>

                {/* Chat Messages */}
                <ScrollArea type="auto" scrollbars="vertical" style={{ flex: 1, padding: '20px', backgroundColor: 'var(--gray-2)' }}>
                    <Flex direction="column" gap="4">
                        <Flex justify="start">
                            <Box style={{ backgroundColor: 'white', padding: '12px', borderRadius: 'var(--radius-3)', maxWidth: '70%', boxShadow: 'var(--shadow-1)' }}>
                                <Text size="2">Hey, are we still on for the meeting tomorrow?</Text>
                            </Box>
                        </Flex>
                        <Flex justify="end">
                            <Box style={{ backgroundColor: paletteColors.steelBlue, color: 'white', padding: '12px', borderRadius: 'var(--radius-3)', maxWidth: '70%', boxShadow: 'var(--shadow-1)' }}>
                                <Text size="2">Yes, absolutely! 10 AM works for me.</Text>
                            </Box>
                        </Flex>
                        <Flex justify="start">
                            <Box style={{ backgroundColor: 'white', padding: '12px', borderRadius: 'var(--radius-3)', maxWidth: '70%', boxShadow: 'var(--shadow-1)' }}>
                                <Text size="2">Perfect. sending you the agenda shortly.</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </ScrollArea>

                {/* Input Area */}
                <Box p="4" style={{ backgroundColor: 'white', borderTop: '1px solid var(--gray-4)' }}>
                    <Flex gap="3">
                        <IconButton variant="ghost" color="gray"><PlusIcon /></IconButton>
                        <TextField.Root placeholder={t('chat.typeMessage')} size="3" style={{ flex: 1 }}>
                        </TextField.Root>
                        <IconButton variant="solid" style={{ backgroundColor: paletteColors.steelBlue }}><PaperPlaneIcon /></IconButton>
                    </Flex>
                </Box>
            </Flex>

            {/* 3. Right Pane (Chat List) */}
            <Box style={{ width: 350, backgroundColor: 'white' }}>
                <ChatList />
            </Box>
        </Box>
    );
}
