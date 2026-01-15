"use client";

import { Box, Flex, Text, Card, Heading, Avatar, Button, Grid, IconButton } from "@radix-ui/themes";
import { AppLayout } from "../../components/AppLayout";
import { NavigationSidebar, WidgetsSidebar } from "../../components/Sidebars";
import { PlusIcon, HeartIcon, Share1Icon, Cross2Icon } from "@radix-ui/react-icons";

export default function StoriesPage() {
    return (
        <AppLayout
            navigation={<NavigationSidebar />}
            widgets={<WidgetsSidebar />}
        >
            <Flex direction="column" gap="6">
                <Box>
                    <Heading size="6" mb="2">סיפורים (Stories)</Heading>
                    <Text color="gray">מה חדש בקיבוץ היום?</Text>
                </Box>

                <Grid columns="3" gap="4">
                    {/* Add New Story Card */}
                    <Card style={{
                        height: '400px',
                        background: 'var(--gray-3)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: '2px dashed var(--gray-8)'
                    }}>
                        <Flex direction="column" align="center" gap="3">
                            <Box style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <PlusIcon width="30" height="30" />
                            </Box>
                            <Text weight="bold" size="3">הוסף סיפור משלך</Text>
                        </Flex>
                    </Card>

                    {/* Example Story 1 */}
                    <Card style={{
                        height: '400px',
                        padding: 0,
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundImage: 'url(https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=900&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                        {/* Overlay Gradient */}
                        <Box style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent, rgba(0,0,0,0.8))' }} />

                        {/* Top Info */}
                        <Flex justify="between" align="center" p="3" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}>
                            <Flex gap="2" align="center">
                                <Avatar size="2" radius="full" fallback="אכ" color="orange" style={{ border: '2px solid white' }} />
                                <Text weight="bold" style={{ color: 'white' }}>אליס כהן</Text>
                                <Text size="1" style={{ color: 'rgba(255,255,255,0.8)' }}>לפני 2 דק'</Text>
                            </Flex>
                        </Flex>

                        {/* Bottom Actions */}
                        <Flex justify="between" align="center" p="3" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
                            <Flex gap="2">
                                <IconButton variant="ghost" style={{ color: 'white' }}><HeartIcon width="20" height="20" /></IconButton>
                                <IconButton variant="ghost" style={{ color: 'white' }}><Share1Icon width="20" height="20" /></IconButton>
                            </Flex>
                        </Flex>
                    </Card>

                    {/* Example Story 2 */}
                    <Card style={{
                        height: '400px',
                        padding: 0,
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundImage: 'url(https://images.unsplash.com/photo-1543362906-ac1b481287cf?w=600&h=900&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                        <Box style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent, rgba(0,0,0,0.8))' }} />

                        <Flex justify="between" align="center" p="3" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}>
                            <Flex gap="2" align="center">
                                <Avatar size="2" radius="full" fallback="בל" color="blue" style={{ border: '2px solid white' }} />
                                <Text weight="bold" style={{ color: 'white' }}>בוב לוי</Text>
                                <Text size="1" style={{ color: 'rgba(255,255,255,0.8)' }}>לפני שעה</Text>
                            </Flex>
                        </Flex>

                        <Flex justify="between" align="center" p="3" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
                            <Flex gap="2">
                                <IconButton variant="ghost" style={{ color: 'white' }}><HeartIcon width="20" height="20" /></IconButton>
                                <IconButton variant="ghost" style={{ color: 'white' }}><Share1Icon width="20" height="20" /></IconButton>
                            </Flex>
                        </Flex>
                    </Card>
                </Grid>

            </Flex>
        </AppLayout>
    );
}
