"use client";

import { Box, Card, Flex, Text, Avatar } from "@radix-ui/themes";
import Link from "next/link";

export const ProfileCard = () => {
    return (
        <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <Card size="2" style={{ padding: 0, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
                {/* Cover Image */}
                <Box style={{
                    height: '80px',
                    background: 'url(https://images.unsplash.com/photo-1548544149-4835e62ee5b3?w=800&q=80) center/cover no-repeat'
                }} />

                {/* Profile Info */}
                <Flex direction="column" align="center" pb="3" style={{ marginTop: '-40px' }}>
                    <Avatar
                        size="5"
                        src="/yairarnondemo.png"
                        fallback="\u05D9"
                        radius="full"
                        style={{ border: '4px solid white' }}
                    />
                    <Text size="3" weight="bold" mt="2">{"\u05D9\u05D0\u05D9\u05E8 \u05D0\u05E8\u05E0\u05D5\u05DF"}</Text>
                    <Text size="2" color="gray" style={{ direction: 'ltr' }}>@Yair_Arnon</Text>
                </Flex>
            </Card>
        </Link>
    );
};




