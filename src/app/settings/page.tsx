"use client";

import { Box, Flex, Text, Card, Tabs, TextField, Button, Switch, Separator, Avatar, Select } from "@radix-ui/themes";
import { PersonIcon, LockClosedIcon, BellIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();

    const isDark = theme === "dark";

    const menuItems = [
        { id: "account", label: "חשבון", icon: <PersonIcon /> },
        { id: "privacy", label: "פרטיות", icon: <LockClosedIcon /> },
        { id: "notifications", label: "התראות", icon: <BellIcon /> },
        { id: "appearance", label: "מראה", icon: <EyeOpenIcon /> },
    ];

    return (
        <Card size="3" style={{ padding: 0, direction: "rtl", textAlign: "right" }}>
            <Tabs.Root defaultValue="account">
                {/* Tabs header */}
                <Box style={{ padding: "16px 16px 0 16px" }}>
                    <Tabs.List style={{ direction: "rtl", justifyContent: "flex-start", gap: "8px", flexWrap: "wrap" }}>
                        {menuItems.map((item) => (
                            <Tabs.Trigger key={item.id} value={item.id}>
                                <Flex align="center" gap="2" style={{ flexDirection: "row-reverse" }}>
                                    {item.icon}
                                    <Text weight="bold">{item.label}</Text>
                                </Flex>
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                </Box>

                <Separator size="4" mt="3" />

                {/* Content */}
                <Box style={{ padding: "16px" }}>
                    <Tabs.Content value="account">
                        <Text size="5" weight="bold" mb="5" as="div">
                            הגדרות חשבון
                        </Text>

                        <Flex direction="column" gap="5" style={{ maxWidth: "600px" }}>
                            <Flex gap="4" align="center">
                                <Avatar fallback="JD" size="6" radius="full" />
                                <Box>
                                    <Button variant="outline" mb="2">
                                        החלף תמונה
                                    </Button>
                                    <Text as="div" size="1" color="gray">
                                        מומלץ גודל 400x400 פיקסלים
                                    </Text>
                                </Box>
                            </Flex>

                            <Separator size="4" />

                            <Flex gap="4" wrap="wrap" style={{ justifyContent: "flex-start" }}>
                                <Box style={{ minWidth: "260px", flex: 1 }}>
                                    <Text size="2" mb="1" weight="bold" as="div">
                                        שם פרטי
                                    </Text>
                                    <TextField.Root placeholder="ישראל" defaultValue="ג'יין" style={{ textAlign: "right", direction: "rtl" }} />
                                </Box>
                                <Box style={{ minWidth: "260px", flex: 1 }}>
                                    <Text size="2" mb="1" weight="bold" as="div">
                                        שם משפחה
                                    </Text>
                                    <TextField.Root placeholder="ישראלי" defaultValue="דו" style={{ textAlign: "right", direction: "rtl" }} />
                                </Box>
                            </Flex>

                            <Box>
                                <Text size="2" mb="1" weight="bold" as="div">
                                    אימייל
                                </Text>
                                <TextField.Root placeholder="email@example.com" defaultValue="jane@kibbutz.co.il" style={{ textAlign: "right", direction: "rtl" }} />
                            </Box>

                            <Box>
                                <Text size="2" mb="1" weight="bold" as="div">
                                    תפקיד בקיבוץ
                                </Text>
                                <Select.Root defaultValue="member">
                                    <Select.Trigger style={{ direction: "rtl", width: "100%" }} />
                                    <Select.Content position="popper" style={{ direction: "rtl" }}>
                                        <Select.Item value="member">חבר קהילה</Select.Item>
                                        <Select.Item value="resident">תושב</Select.Item>
                                        <Select.Item value="guest">אורח</Select.Item>
                                    </Select.Content>
                                </Select.Root>
                            </Box>

                            <Box>
                                <Text size="2" mb="1" weight="bold" as="div">
                                    שפה (Language)
                                </Text>
                                <Select.Root defaultValue="he">
                                    <Select.Trigger style={{ direction: "rtl", width: "100%" }} />
                                    <Select.Content position="popper" style={{ direction: "rtl" }}>
                                        <Select.Item value="he">עברית</Select.Item>
                                        <Select.Item value="en">English</Select.Item>
                                        <Select.Item value="ar">العربية</Select.Item>
                                    </Select.Content>
                                </Select.Root>
                            </Box>

                            <Flex justify="end" mt="4" gap="3">
                                <Button variant="soft" color="gray">
                                    ביטול
                                </Button>
                                <Button size="2" variant="solid">
                                    שמור שינויים
                                </Button>
                            </Flex>
                        </Flex>
                    </Tabs.Content>

                    <Tabs.Content value="privacy">
                        <Text size="5" weight="bold" mb="5" as="div">
                            פרטיות ואבטחה
                        </Text>
                        <Flex direction="column" gap="4" style={{ maxWidth: "600px" }}>
                            <Box>
                                <Text size="3" weight="bold" mb="3" as="div">
                                    שינוי סיסמה
                                </Text>
                                <Flex direction="column" gap="3">
                                    <Box>
                                        <Text size="2" mb="1" as="div">
                                            סיסמה נוכחית
                                        </Text>
                                        <TextField.Root type="password" placeholder="••••••" style={{ textAlign: "right", direction: "rtl" }} />
                                    </Box>
                                    <Box>
                                        <Text size="2" mb="1" as="div">
                                            סיסמה חדשה
                                        </Text>
                                        <TextField.Root type="password" placeholder="••••••" style={{ textAlign: "right", direction: "rtl" }} />
                                    </Box>
                                    <Box>
                                        <Text size="2" mb="1" as="div">
                                            אימות סיסמה חדשה
                                        </Text>
                                        <TextField.Root type="password" placeholder="••••••" style={{ textAlign: "right", direction: "rtl" }} />
                                    </Box>
                                </Flex>
                                <Button mt="3" variant="outline">
                                    עדכן סיסמה
                                </Button>
                            </Box>

                            <Separator size="4" />

                            <Box>
                                <Text size="3" weight="bold" mb="2" as="div" color="red">
                                    אזור מסוכן
                                </Text>
                                <Text size="2" color="gray" mb="3" as="div">
                                    מחיקת החשבון היא פעולה בלתי הפיכה.
                                </Text>
                                <Button color="red" variant="soft">
                                    מחק את החשבון שלי
                                </Button>
                            </Box>
                        </Flex>
                    </Tabs.Content>

                    <Tabs.Content value="notifications">
                        <Text size="5" weight="bold" mb="5" as="div">
                            התראות
                        </Text>
                        <Flex direction="column" gap="4" style={{ maxWidth: "700px" }}>
                                <Flex justify="between" align="center" style={{ direction: "rtl" }}>
                                <Box>
                                    <Text weight="bold" as="div">
                                        הודעות חדשות
                                    </Text>
                                    <Text size="2" color="gray" as="div">
                                        קבל התראה כשמישהו שולח לך הודעה
                                    </Text>
                                </Box>
                                <Switch defaultChecked />
                            </Flex>
                            <Separator />
                                <Flex justify="between" align="center" style={{ direction: "rtl" }}>
                                <Box>
                                    <Text weight="bold" as="div">
                                        תגובות בפוסטים
                                    </Text>
                                    <Text size="2" color="gray" as="div">
                                        התראה כשמישהו מגיב לפוסט שלך
                                    </Text>
                                </Box>
                                <Switch defaultChecked />
                            </Flex>
                            <Separator />
                                <Flex justify="between" align="center" style={{ direction: "rtl" }}>
                                <Box>
                                    <Text weight="bold" as="div">
                                        עדכוני קהילה
                                    </Text>
                                    <Text size="2" color="gray" as="div">
                                        חדשות ועדכונים מהמזכירות
                                    </Text>
                                </Box>
                                <Switch />
                            </Flex>
                        </Flex>
                    </Tabs.Content>

                    <Tabs.Content value="appearance">
                        <Text size="5" weight="bold" mb="5" as="div">
                            מראה (Appearance)
                        </Text>
                        <Flex direction="column" gap="4" style={{ maxWidth: "600px" }}>
                            <Flex justify="between" align="center" style={{ direction: "rtl" }}>
                                <Box>
                                    <Text weight="bold" as="div">
                                        מצב לילה (Dark Mode)
                                    </Text>
                                    <Text size="2" color="gray" as="div">
                                        החלף לממשק כהה
                                    </Text>
                                </Box>
                                <Switch
                                    checked={isDark}
                                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                                />
                            </Flex>
                        </Flex>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </Card>
    );
}
