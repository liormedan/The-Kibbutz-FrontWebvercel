"use client";

import { Flex, Card, Text, TextField, Button, Heading, Box } from "@radix-ui/themes";
import Link from "next/link";

export default function LoginPage() {
    return (
        <Flex align="center" justify="center" style={{ height: '100vh', background: 'var(--gray-2)' }}>
            <Card size="4" style={{ width: '400px' }}>
                <Flex direction="column" gap="4">
                    <Box style={{ textAlign: 'center' }} mb="4">
                        <Heading size="8" style={{ color: 'var(--accent-9)' }}>הקיבוץ</Heading>
                        <Text color="gray">התחבר לחשבון שלך</Text>
                    </Box>

                    <Box>
                        <Text size="2" weight="bold" mb="1" as="div">אימייל</Text>
                        <TextField.Root placeholder="email@example.com" style={{ textAlign: 'right', direction: 'rtl' }} />
                    </Box>

                    <Box>
                        <Text size="2" weight="bold" mb="1" as="div">סיסמה</Text>
                        <TextField.Root type="password" placeholder="••••••" style={{ textAlign: 'right', direction: 'rtl' }} />
                    </Box>

                    <Button size="3" variant="solid" style={{ width: '100%', marginTop: '10px' }}>
                        <Link href="/" style={{ textDecoration: 'none', color: 'white', width: '100%' }}>
                            התחבר
                        </Link>
                    </Button>

                    <Text size="2" align="center" mt="2">
                        אין לך חשבון? <Link href="#" style={{ color: 'var(--accent-9)' }}>הירשם כאן</Link>
                    </Text>
                </Flex>
            </Card>
        </Flex>
    );
}
