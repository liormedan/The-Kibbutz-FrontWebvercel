'use client';

import { Card, Box, Flex, Text, Avatar, TextField, ScrollArea } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { paletteColors } from '@/theme/theme';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ChatList() {
    const { t } = useLanguage();
    const chats = [
        { name: 'Alice Smith', msg: 'Hey, are we still on?', time: '2m' },
        { name: 'Bob Jones', msg: 'Sent the documents.', time: '1h' },
        { name: 'Community Group', msg: 'New event posted!', time: '3h' },
        { name: 'David Lee', msg: 'Thanks!', time: '1d' },
    ];

    return (
        <Card size="2" style={{ height: '100%', minHeight: 400, padding: 0, display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box style={{ backgroundColor: paletteColors.darkSlateGray, padding: '16px', borderBottom: '1px solid var(--gray-5)' }}>
                <Flex justify="between" align="center" mb="3">
                    <Text size="5" weight="bold" style={{ color: 'white' }}>{t('nav.messages')}</Text>
                </Flex>
                <TextField.Root placeholder={t('chat.search')} size="2" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}>
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" color="white" />
                    </TextField.Slot>
                </TextField.Root>
            </Box>

            {/* List */}
            <ScrollArea type="auto" scrollbars="vertical" style={{ height: 300 }}>
                <Box p="0">
                    {chats.map((chat, i) => (
                        <Box key={i} style={{ padding: '12px 16px', borderBottom: '1px solid var(--gray-4)', cursor: 'pointer' }}>
                            <Flex gap="3" align="center">
                                <Avatar fallback={chat.name[0]} radius="full" size="3" color="indigo" />
                                <Box flexGrow="1" style={{ minWidth: 0 }}>
                                    <Flex justify="between" align="baseline">
                                        <Text size="3" weight="bold" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.name}</Text>
                                        <Text size="1" color="gray" style={{ flexShrink: 0, marginLeft: 8 }}>{chat.time}</Text>
                                    </Flex>
                                    <Text size="2" color="gray" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                                        {chat.msg}
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                    ))}
                </Box>
            </ScrollArea>
        </Card>
    );
}
