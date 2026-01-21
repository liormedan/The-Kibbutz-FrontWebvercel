"use client";

import { Box, Flex, Text, Avatar, Button, Card, Grid, TextField, Select } from "@radix-ui/themes";
import { MagnifyingGlassIcon, PersonIcon } from "@radix-ui/react-icons";
import { useState } from "react";

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
                            <TextField.Root placeholder="חפש חברים..." style={{ textAlign: 'right', direction: 'rtl' }}>
                                <TextField.Slot side="left">
                                    <MagnifyingGlassIcon />
                                </TextField.Slot>
                            </TextField.Root>
                        </Box>
                        <Select.Root defaultValue="all">
                            <Select.Trigger style={{ direction: 'rtl' }} />
                            <Select.Content position="popper" style={{ direction: 'rtl' }}>
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
                    <FriendCard key={i} friend={friend} />
                ))}
            </Grid>
        </Flex>
    );
}

const FriendCard = ({ friend }: { friend: any }) => {
    const [requestStatus, setRequestStatus] = useState<"none" | "sent" | "muting">("none");

    const handleAddFriend = () => {
        if (requestStatus === "none") {
            setRequestStatus("sent");
        } else {
            setRequestStatus("none");
        }
    };

    return (
        <Card>
            <Flex gap="3" align="center">
                <Avatar
                    fallback={friend.name[0]}
                    size="4"
                    radius="full"
                    style={{
                        backgroundColor: '#FF0000',
                        color: 'var(--color-white)'
                    }}
                />
                <Box style={{ flexGrow: 1 }}>
                    <Text weight="bold" as="div">{friend.name}</Text>
                    <Text size="1" color="gray" as="div">{friend.role}</Text>
                    <Flex gap="1" align="center" mt="1">
                        <PersonIcon width="12" height="12" style={{ color: 'var(--color-gray-text)' }} />
                        <Text size="1" color="gray">{friend.mutual} חברים משותפים</Text>
                    </Flex>
                </Box>
            </Flex>
            <Flex gap="2" mt="3">
                <Button
                    variant={requestStatus === "sent" ? "outline" : "solid"}
                    color={requestStatus === "sent" ? "green" : undefined}
                    style={{
                        flexGrow: 1,
                        cursor: 'pointer',
                        backgroundColor: requestStatus === "sent" ? undefined : 'var(--accent-9)',
                        color: requestStatus === "sent" ? undefined : 'var(--color-white)',
                        border: requestStatus === "sent" ? undefined : 'none'
                    }}
                    onClick={handleAddFriend}
                >
                    {requestStatus === "sent" ? "בקשה נשלחה ✓" : "הוסף חבר"}
                </Button>
                <Button
                    variant="soft"
                    color={undefined}
                    style={{
                        flexGrow: 1,
                        cursor: 'pointer',
                        backgroundColor: 'var(--friends-message-btn-bg)',
                        color: 'var(--color-white)',
                        border: 'none',
                    }}
                >
                    הודעה
                </Button>
            </Flex>
        </Card>
    );
};
