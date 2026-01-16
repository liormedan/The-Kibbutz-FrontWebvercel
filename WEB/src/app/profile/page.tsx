"use client";

import { Box, Flex, Text, Avatar, Button, Tabs, Card, Grid } from "@radix-ui/themes";
import { PostCard } from "../../components/Feed";
import { GearIcon, Share1Icon } from "@radix-ui/react-icons";

export default function ProfilePage() {
    return (
        <Flex direction="column" gap="4" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            {/* Profile Header Card */}
            <Card size="2" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Cover Image */}
                <Box style={{
                    height: '200px',
                    background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
                    margin: '-12px -12px 0 -12px'
                }} />

                <Flex direction="column" px="4" pb="2">
                    {/* Avatar & Action Buttons */}
                    <Flex justify="between" align="end" style={{ marginTop: '-40px', position: 'relative' }}>
                        <Avatar
                            size="8"
                            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=80"
                            fallback="JD"
                            radius="full"
                            style={{ border: '4px solid var(--color-background)' }}
                        />
                        <Flex gap="3" mb="2">
                            <Button variant="surface"><Share1Icon /> שתף פרופיל</Button>
                            <Button variant="solid">ערוך פרופיל</Button>
                        </Flex>
                    </Flex>

                    {/* User Info */}
                    <Box mt="3">
                        <Text size="6" weight="bold" as="div">ג'יין דו</Text>
                        <Text size="3" color="gray" as="div">@janedoe</Text>
                        <Text size="3" mt="2" as="div">
                            אוהבת טבע, גינון קהילתי ויוגה. חברה בקיבוץ מ-2020. 🌱
                        </Text>

                        <Flex gap="4" mt="3">
                            <Flex gap="1">
                                <Text weight="bold">520</Text>
                                <Text color="gray">עוקבים</Text>
                            </Flex>
                            <Flex gap="1">
                                <Text weight="bold">240</Text>
                                <Text color="gray">נעקבים</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Card>

            {/* content Tabs */}
            <Tabs.Root defaultValue="posts">
                <Tabs.List justify="center">
                    <Tabs.Trigger value="posts">פוסטים</Tabs.Trigger>
                    <Tabs.Trigger value="media">מדיה</Tabs.Trigger>
                    <Tabs.Trigger value="about">אודות</Tabs.Trigger>
                </Tabs.List>

                <Box pt="4">
                    <Tabs.Content value="posts">
                        <Flex direction="column" gap="4">
                            <PostCard />
                            <PostCard />
                        </Flex>
                    </Tabs.Content>

                    <Tabs.Content value="media">
                        <Grid columns="3" gap="2">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <Box key={i} style={{ aspectRatio: '1/1', background: 'var(--gray-4)', borderRadius: 'var(--radius-2)' }} />
                            ))}
                        </Grid>
                    </Tabs.Content>

                    <Tabs.Content value="about">
                        <Card>
                            <Text>פרטים נוספים על המשתמש...</Text>
                        </Card>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </Flex>
    );
}
