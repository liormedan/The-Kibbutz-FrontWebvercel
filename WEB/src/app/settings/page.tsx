"use client";

import { Box, Flex, Text, Card, Grid, TextField, Button, Switch, Separator, Avatar, Select } from "@radix-ui/themes";
import { AppLayout } from "../../components/AppLayout";
import { NavigationSidebar, WidgetsSidebar } from "../../components/Sidebars";
import { PersonIcon, LockClosedIcon, BellIcon, EyeOpenIcon, ExitIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("account");

    const menuItems = [
        { id: "account", label: "חשבון", icon: <PersonIcon /> },
        { id: "privacy", label: "פרטיות", icon: <LockClosedIcon /> },
        { id: "notifications", label: "התראות", icon: <BellIcon /> },
        { id: "appearance", label: "מראה", icon: <EyeOpenIcon /> },
    ];

    return (
        <AppLayout
            navigation={<NavigationSidebar />}
            widgets={<WidgetsSidebar />}
        >
            <Grid columns="240px 1fr" gap="4">
                {/* Settings Sidebar */}
                <Card size="2" style={{ height: 'fit-content' }}>
                    <Flex direction="column" gap="1">
                        {menuItems.map((item) => (
                            <Button
                                key={item.id}
                                variant={activeTab === item.id ? "soft" : "ghost"}
                                color="gray"
                                style={{ justifyContent: "flex-start", height: "44px" }}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <Box ml="2">{item.icon}</Box>
                                {item.label}
                            </Button>
                        ))}
                        <Separator my="2" />
                        <Button variant="ghost" color="red" style={{ justifyContent: "flex-start" }}>
                            <Box ml="2"><ExitIcon /></Box>
                            התנתק
                        </Button>
                    </Flex>
                </Card>

                {/* Settings Content */}
                <Flex direction="column" gap="4">

                    {activeTab === "account" && (
                        <Card size="2">
                            <Text size="4" weight="bold" mb="4" as="div">הגדרות חשבון</Text>

                            <Flex direction="column" gap="4" style={{ maxWidth: '500px' }}>
                                <Flex gap="4" align="center">
                                    <Avatar fallback="JD" size="5" radius="full" />
                                    <Button variant="outline">החלף תמונה</Button>
                                </Flex>

                                <Box>
                                    <Text size="2" mb="1" weight="bold" as="div">שם מלא</Text>
                                    <TextField.Root placeholder="השם שלך" defaultValue="ג'יין דו" style={{ textAlign: 'right', direction: 'rtl' }} />
                                </Box>

                                <Box>
                                    <Text size="2" mb="1" weight="bold" as="div">אימייל</Text>
                                    <TextField.Root placeholder="email@example.com" defaultValue="jane@kibbutz.co.il" style={{ textAlign: 'right', direction: 'rtl' }} />
                                </Box>

                                <Box>
                                    <Text size="2" mb="1" weight="bold" as="div">תפקיד בקיבוץ</Text>
                                    <Select.Root defaultValue="member">
                                        <Select.Trigger style={{ direction: 'rtl' }} />
                                        <Select.Content position="popper" style={{ direction: 'rtl' }}>
                                            <Select.Item value="member">חבר קהילה</Select.Item>
                                            <Select.Item value="resident">תושב</Select.Item>
                                            <Select.Item value="guest">אורח</Select.Item>
                                        </Select.Content>
                                    </Select.Root>
                                </Box>

                                <Flex justify="end" mt="4">
                                    <Button size="3" variant="solid">שמור שינויים</Button>
                                </Flex>
                            </Flex>
                        </Card>
                    )}

                    {activeTab === "notifications" && (
                        <Card size="2">
                            <Text size="4" weight="bold" mb="4" as="div">התראות</Text>
                            <Flex direction="column" gap="4">
                                <Flex justify="between" align="center">
                                    <Box>
                                        <Text weight="bold" as="div">הודעות חדשות</Text>
                                        <Text size="2" color="gray" as="div">קבל התראה כשמישהו שולח לך הודעה</Text>
                                    </Box>
                                    <Switch defaultChecked />
                                </Flex>
                                <Separator />
                                <Flex justify="between" align="center">
                                    <Box>
                                        <Text weight="bold" as="div">תגובות בפוסטים</Text>
                                        <Text size="2" color="gray" as="div">התראה כשמישהו מגיב לפוסט שלך</Text>
                                    </Box>
                                    <Switch defaultChecked />
                                </Flex>
                                <Separator />
                                <Flex justify="between" align="center">
                                    <Box>
                                        <Text weight="bold" as="div">עדכוני קהילה</Text>
                                        <Text size="2" color="gray" as="div">חדשות ועדכונים מהמזכירות</Text>
                                    </Box>
                                    <Switch />
                                </Flex>
                            </Flex>
                        </Card>
                    )}

                    {/* Placeholders for other tabs */}
                    {(activeTab === "privacy" || activeTab === "appearance") && (
                        <Card size="2">
                            <Flex direction="column" align="center" justify="center" style={{ height: '200px' }}>
                                <Text color="gray">הגדרות {activeTab === "privacy" ? "פרטיות" : "מראה"} יתווספו בקרוב...</Text>
                            </Flex>
                        </Card>
                    )}

                </Flex>
            </Grid>
        </AppLayout>
    );
}
