"use client";

import { Box, Flex, Text, Avatar, Button, Card, Grid, TextField, Select } from "@radix-ui/themes";
import { AppLayout } from "../../components/AppLayout";
import { NavigationSidebar, WidgetsSidebar } from "../../components/Sidebars";
import { MagnifyingGlassIcon, PersonIcon } from "@radix-ui/react-icons";

export default function FriendsPage() {
    const friends = [
        { name: "שרה כהן", role: "חבר קהילה", mutual: 12 },
        { name: "יוסי לוי", role: "חבר משק", mutual: 5 },
        { name: "רחל גבאי", role: "מתנדבת", mutual: 8 },
        { name: "דניאל פרידמן", role: "חבר קהילה", mutual: 2 },
        { name: "נועה שחר", role: "אורח", mutual: 0 },
        { name: "אבי ביטון", role: "חבר משק", mutual: 20 },
        { name: "מיכל גולן", role: "חבר קהילה", mutual: 15 },
        { name: "עומר אדרי", role: "מתנדב", mutual: 3 },
    ];

    return (
        <AppLayout
            navigation={<NavigationSidebar />}
            widgets={<WidgetsSidebar />}
        >
            <Flex direction="column" gap="4">
                {/* Header & Search */}
                <Card size="2">
                    <Flex justify="between" align="center" wrap="wrap" gap="3">
                        <Box>
                            <Text size="5" weight="bold">חברים וקהילה</Text>
                            <Text size="2" color="gray" as="div">כל החברים בקיבוץ שלך</Text>
                        </Box>

                        <Flex gap="3" style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                            <Box style={{ minWidth: '200px' }}>
                                <TextField.Root placeholder="חפש חברים...">
                                    <TextField.Slot side="left">
                                        <MagnifyingGlassIcon />
                                    </TextField.Slot>
                                </TextField.Root>
                            </Box>
                            <Select.Root defaultValue="all">
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Item value="all">הכל</Select.Item>
                                    <Select.Item value="community">חברי קהילה</Select.Item>
                                    <Select.Item value="online">מחוברים כעת</Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                    </Flex>
                </Card>

                {/* Friends Grid */}
                <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
                    {friends.map((friend, i) => (
                        <Card key={i}>
                            <Flex gap="3" align="center">
                                <Avatar
                                    fallback={friend.name[0]}
                                    size="4"
                                    radius="full"
                                    color="indigo"
                                />
                                <Box style={{ flexGrow: 1 }}>
                                    <Text weight="bold" as="div">{friend.name}</Text>
                                    <Text size="1" color="gray" as="div">{friend.role}</Text>
                                    <Flex gap="1" align="center" mt="1">
                                        <PersonIcon width="12" height="12" color="var(--gray-9)" />
                                        <Text size="1" color="gray">{friend.mutual} חברים משותפים</Text>
                                    </Flex>
                                </Box>
                            </Flex>
                            <Flex gap="2" mt="3">
                                <Button variant="solid" style={{ flexGrow: 1 }}>הוסף חבר</Button>
                                <Button variant="soft" style={{ flexGrow: 1 }}>הודעה</Button>
                            </Flex>
                        </Card>
                    ))}
                </Grid>
            </Flex>
        </AppLayout>
    );
}
