'use client';

import { Box, Grid, Flex, Card, Text, TextField, IconButton, Avatar, Button, ScrollArea, Separator } from '@radix-ui/themes';
import { MagnifyingGlassIcon, HomeIcon, ChatBubbleIcon, PersonIcon, GearIcon, BellIcon, ImageIcon, VideoIcon, FaceIcon } from '@radix-ui/react-icons';
import { paletteColors } from '@/theme/theme';
import PostCard from './PostCard';
import StoryCard from './StoryCard';
import SuggestionCard from './SuggestionCard';
import CreatePostModal from './CreatePostModal';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useState } from 'react';

export default function PostFeed() {
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const { t, dir } = useLanguage();

    return (
        <Box style={{ height: '100%', minHeight: '100vh', backgroundColor: 'var(--gray-2)', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navbar */}
            <Box style={{ backgroundColor: 'white', padding: '12px 24px', borderBottom: '1px solid var(--gray-4)', position: 'sticky', top: 0, zIndex: 10 }}>
                <Flex justify="between" align="center">
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Text size="5" weight="bold" style={{ color: paletteColors.steelBlue, cursor: 'pointer' }}>The Kibbutz</Text>
                    </Link>

                    <Box style={{ width: 400 }}>
                        <TextField.Root placeholder={t('nav.search')} size="2">
                            <TextField.Slot>
                                <MagnifyingGlassIcon height="16" width="16" />
                            </TextField.Slot>
                        </TextField.Root>
                    </Box>

                    <Flex gap="4" align="center">
                        <LanguageSwitcher />
                        <Link href="/chat">
                            <IconButton variant="ghost" color="gray"><ChatBubbleIcon /></IconButton>
                        </Link>
                        <IconButton variant="ghost" color="gray"><BellIcon /></IconButton>
                        <Link href="/profile">
                            <Avatar fallback="JD" radius="full" size="2" style={{ backgroundColor: paletteColors.moccasin, color: paletteColors.darkSlateGray, cursor: 'pointer' }} />
                        </Link>
                    </Flex>
                </Flex>
            </Box>

            {/* Main Layout Grid */}
            <Grid 
                columns={dir === 'rtl' ? "250px 1fr 300px" : "250px 1fr 300px"} 
                gap="4" 
                p="4" 
                style={{ 
                    flex: 1, 
                    maxWidth: 1200, 
                    margin: '0 auto', 
                    width: '100%',
                    direction: dir
                }}
            >
                {/* Stories Sidebar - Left side in RTL */}
                <Box style={{ order: dir === 'rtl' ? 3 : 3 }}>
                    <Card size="2" style={{ marginBottom: 16 }}>
                        <Text size="3" weight="bold" mb="3" as="div" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('feed.stories')}</Text>
                        <Flex gap="2" style={{ overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'thin' }}>
                            <StoryCard name={t('feed.stories.add')} isAddStory />
                            <StoryCard name="Alice" />
                            <StoryCard name="Bob" />
                            <StoryCard name="Charlie" />
                            <StoryCard name="Diana" />
                        </Flex>
                    </Card>

                    <Card size="2">
                        <Text size="3" weight="bold" mb="3" as="div" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('feed.suggestions')}</Text>
                        <Flex direction="column" gap="2">
                            <SuggestionCard name="Alice Smith" mutualFriend="John Doe" />
                            <SuggestionCard name="Bob Jones" status={t('feed.suggestions.newMember')} />
                            <SuggestionCard name="Charlie Brown" mutualFriend="Jane Doe" />
                        </Flex>
                    </Card>
                </Box>

                {/* Main Feed Column */}
                <Box style={{ order: 2 }}>
                    {/* Create Post */}
                    <Card size="2" style={{ marginBottom: 16 }}>
                        <Flex gap="3" align="center" mb="3" style={{ direction: dir }}>
                            <Avatar
                                fallback="JD"
                                size="3"
                                radius="full"
                                style={{
                                    backgroundColor: paletteColors.moccasin,
                                    color: paletteColors.darkSlateGray,
                                    order: dir === 'rtl' ? 2 : 1,
                                }}
                            />
                            <Box
                                onClick={() => setIsCreatePostOpen(true)}
                                style={{
                                    flex: 1,
                                    backgroundColor: 'var(--gray-3)',
                                    padding: '10px 16px',
                                    borderRadius: 'var(--radius-4)',
                                    color: 'var(--gray-10)',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    textAlign: dir === 'rtl' ? 'right' : 'left',
                                    direction: dir,
                                }}
                                className="hover:bg-gray-4"
                            >
                                {t('feed.createPost.placeholder')}
                            </Box>
                        </Flex>
                        <Separator size="4" mb="3" />
                        <Flex justify="between">
                            <Button
                                variant="ghost"
                                color="gray"
                                onClick={() => setIsCreatePostOpen(true)}
                            >
                                <ImageIcon /> {t('feed.createPost.photo')}
                            </Button>
                            <Button
                                variant="ghost"
                                color="gray"
                                onClick={() => setIsCreatePostOpen(true)}
                            >
                                <VideoIcon /> {t('feed.createPost.video')}
                            </Button>
                            <Button
                                variant="ghost"
                                color="gray"
                                onClick={() => setIsCreatePostOpen(true)}
                            >
                                <FaceIcon /> {t('feed.createPost.feeling')}
                            </Button>
                        </Flex>
                    </Card>

                    {/* Create Post Modal */}
                    <CreatePostModal
                        open={isCreatePostOpen}
                        onOpenChange={setIsCreatePostOpen}
                        authorName="John Doe"
                        authorInitials="JD"
                    />

                    {/* Posts */}
                    <Flex direction="column" gap="3">
                        <PostCard
                            author="Sarah Cohen"
                            authorInitials="SC"
                            content="Just finished planting the new garden! The community is coming together beautifully 🌱 #CommunityGarden #TheKibbutz"
                            timeAgo="1 hour ago"
                            likes={24}
                            comments={5}
                        />
                        <PostCard
                            author="David Levi"
                            authorInitials="DL"
                            content="Our weekly community meeting was a huge success! Great discussions about sustainable living and shared resources."
                            timeAgo="3 hours ago"
                            likes={18}
                            comments={8}
                            showImage={false}
                        />
                        <PostCard
                            author="Rachel Green"
                            authorInitials="RG"
                            content="Beautiful sunset from the kibbutz tonight 🌅"
                            timeAgo="5 hours ago"
                            likes={42}
                            comments={12}
                        />
                    </Flex>
                </Box>

                {/* Navigation Sidebar - Right side in RTL */}
                <Box style={{ order: dir === 'rtl' ? 1 : 1 }}>
                    <Card size="2">
                        <Flex direction="column" gap="2">
                            <Link href="/feed" style={{ textDecoration: 'none' }}>
                                <Button variant="ghost" color="gray" style={{ justifyContent: dir === 'rtl' ? 'flex-end' : 'flex-start', padding: 12, width: '100%' }}>
                                    <HomeIcon /> <Text ml="2">{t('nav.feed')}</Text>
                                </Button>
                            </Link>
                            <Link href="/chat" style={{ textDecoration: 'none' }}>
                                <Button variant="ghost" color="gray" style={{ justifyContent: dir === 'rtl' ? 'flex-end' : 'flex-start', padding: 12, width: '100%' }}>
                                    <ChatBubbleIcon /> <Text ml="2">{t('nav.chats')}</Text>
                                </Button>
                            </Link>
                            <Link href="/profile" style={{ textDecoration: 'none' }}>
                                <Button variant="ghost" color="gray" style={{ justifyContent: dir === 'rtl' ? 'flex-end' : 'flex-start', padding: 12, width: '100%' }}>
                                    <PersonIcon /> <Text ml="2">{t('nav.friends')}</Text>
                                </Button>
                            </Link>
                            <Separator my="2" />
                            <Button variant="ghost" color="gray" style={{ justifyContent: dir === 'rtl' ? 'flex-end' : 'flex-start', padding: 12 }}>
                                <GearIcon /> <Text ml="2">{t('nav.settings')}</Text>
                            </Button>
                        </Flex>
                    </Card>
                </Box>
            </Grid>
        </Box>
    );
}
