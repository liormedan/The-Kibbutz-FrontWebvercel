"use client";

import { Box, Flex, Text, Avatar, Button, Tabs, Card, Grid } from "@radix-ui/themes";
import { PostCard } from "../../components/Feed";
import { Share1Icon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { ProfileEditDialog, UserProfile } from "@/components/profile/ProfileEditDialog";

const DEFAULT_PROFILE: UserProfile = {
    name: "יאיר ארנון",
    handle: "@Yair_Arnon",
    bio: "מפתח ומעצב מוצר, אוהב קהילה וטכנולוגיה. פעיל מאז 2020.",
    avatar: "/yairarnondemo.png",
    cover: "linear-gradient(90deg, #6366f1 0%, #a855f7 100%)", // Default gradient if image fails or not provided, handled in render
    followers: 520,
    following: 240
};

export default function ProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    // Initialize state from local storage or default
    useEffect(() => {
        const savedProfile = localStorage.getItem('kibbutz_user_profile');
        if (savedProfile) {
            try {
                setUser(JSON.parse(savedProfile));
            } catch (e) {
                console.error("Failed to parse profile", e);
                setUser(DEFAULT_PROFILE);
            }
        } else {
            setUser(DEFAULT_PROFILE);
        }
    }, []);

    const handleSaveProfile = (updatedProfile: UserProfile) => {
        setUser(updatedProfile);
        localStorage.setItem('kibbutz_user_profile', JSON.stringify(updatedProfile));
    };

    const handleShare = async () => {
        const shareData = {
            title: `הפרופיל של ${user?.name}`,
            text: user?.bio,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("הקישור לפרופיל הועתק ללוח!");
        }
    };

    if (!user) return null; // Or meaningful loading spinner

    // Determine cover style: if it's a gradient string use it, otherwise assume URL
    const coverStyle = user.cover.startsWith("linear-gradient") || user.cover.startsWith("#")
        ? { background: user.cover }
        : { backgroundImage: `url(${user.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' };

    return (
        <Flex direction="column" gap="4" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>

            {/* Profile Header Card */}
            <Card size="2" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Cover Image */}
                <Box style={{
                    height: '200px',
                    margin: '-12px -12px 0 -12px',
                    backgroundColor: '#ddd', // fallback
                    ...coverStyle
                }} />

                <Flex direction="column" px="4" pb="2">
                    {/* Avatar & Action Buttons */}
                    <Flex justify="between" align="end" style={{ marginTop: '-40px', position: 'relative' }}>
                        <Avatar
                            size="8"
                            src={user.avatar}
                            fallback={user.name[0]}
                            radius="full"
                            style={{
                                border: '4px solid var(--color-background)',
                                backgroundColor: 'var(--gray-3)'
                            }}
                        />
                        <Flex gap="2" mb="2" align="end" direction={{ initial: 'column', xs: 'row' }}>
                            <Button
                                variant="outline"
                                color="gray"
                                onClick={handleShare}
                                style={{ borderRadius: '6px', cursor: 'pointer' }}
                            >
                                <Share1Icon /> שתף פרופיל
                            </Button>
                            <Button
                                variant="solid"
                                onClick={() => setIsEditOpen(true)}
                                style={{
                                    backgroundColor: '#2b868a', // Matching the requested teal color
                                    color: 'white',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                ערוך פרופיל
                            </Button>
                        </Flex>
                    </Flex>

                    {/* User Info */}
                    <Box mt="3">
                        <Text size="6" weight="bold" as="div">{user.name}</Text>
                        <Text size="3" color="gray" as="div">{user.handle}</Text>
                        <Text size="3" mt="2" as="div" style={{ whiteSpace: 'pre-wrap' }}>
                            {user.bio}
                        </Text>

                        <Flex gap="4" mt="3">
                            <Flex gap="1">
                                <Text weight="bold">{user.followers}</Text>
                                <Text color="gray">עוקבים</Text>
                            </Flex>
                            <Flex gap="1">
                                <Text weight="bold">{user.following}</Text>
                                <Text color="gray">עוקב</Text>
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
                            <Text>קצת עליי יתווסף כאן בהמשך...</Text>
                        </Card>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>

            <ProfileEditDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                initialData={user}
                onSave={handleSaveProfile}
            />

        </Flex>
    );
}
