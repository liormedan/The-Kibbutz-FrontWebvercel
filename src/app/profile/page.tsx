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
                            src="/yairarnondemo.png"
                            fallback="\u05D9"
                            radius="full"
                            style={{ border: '4px solid var(--color-background)' }}
                        />
                        <Flex gap="3" mb="2">
                            <Button variant="surface"><Share1Icon /> {"\u05E9\u05EA\u05E3 \u05E4\u05E8\u05D5\u05E4\u05D9\u05DC"}</Button>
                            <Button variant="solid">{"\u05E2\u05E8\u05D5\u05DA \u05E4\u05E8\u05D5\u05E4\u05D9\u05DC"}</Button>
                        </Flex>
                    </Flex>

                    {/* User Info */}
                    <Box mt="3">
                        <Text size="6" weight="bold" as="div">{"\u05D9\u05D0\u05D9\u05E8 \u05D0\u05E8\u05E0\u05D5\u05DF"}</Text>
                        <Text size="3" color="gray" as="div">@Yair_Arnon</Text>
                        <Text size="3" mt="2" as="div">
                            {"\u05DE\u05E4\u05EA\u05D7 \u05D5\u05DE\u05E2\u05E6\u05D1 \u05DE\u05D5\u05E6\u05E8, \u05D0\u05D5\u05D4\u05D1 \u05E7\u05D4\u05D9\u05DC\u05D4 \u05D5\u05D8\u05DB\u05E0\u05D5\u05DC\u05D5\u05D2\u05D9\u05D4. \u05E4\u05E2\u05D9\u05DC \u05DE\u05D0\u05D6 2020."}
                        </Text>

                        <Flex gap="4" mt="3">
                            <Flex gap="1">
                                <Text weight="bold">520</Text>
                                <Text color="gray">{"\u05E2\u05D5\u05E7\u05D1\u05D9\u05DD"}</Text>
                            </Flex>
                            <Flex gap="1">
                                <Text weight="bold">240</Text>
                                <Text color="gray">{"\u05E2\u05D5\u05E7\u05D1"}</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Card>

            {/* content Tabs */}
            <Tabs.Root defaultValue="posts">
                <Tabs.List justify="center">
                    <Tabs.Trigger value="posts">{"\u05E4\u05D5\u05E1\u05D8\u05D9\u05DD"}</Tabs.Trigger>
                    <Tabs.Trigger value="media">{"\u05DE\u05D3\u05D9\u05D4"}</Tabs.Trigger>
                    <Tabs.Trigger value="about">{"\u05D0\u05D5\u05D3\u05D5\u05EA"}</Tabs.Trigger>
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
                            <Text>{"\u05E7\u05E6\u05EA \u05E2\u05DC\u05D9\u05D9 \u05D9\u05EA\u05D5\u05E1\u05E3 \u05DB\u05D0\u05DF \u05D1\u05D4\u05DE\u05E9\u05DA..."}</Text>
                        </Card>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </Flex>
    );
}








