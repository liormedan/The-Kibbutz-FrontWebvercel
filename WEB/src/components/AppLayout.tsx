"use client";

import { Box, Container, Grid, Flex, TextField, IconButton, Avatar, Text } from "@radix-ui/themes";
import Link from "next/link";
import { ReactNode } from "react";

import { MagnifyingGlassIcon, BellIcon, PersonIcon, HomeIcon, ChatBubbleIcon } from "@radix-ui/react-icons";

export const Header = () => (
    <Box
        style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--gray-alpha-5)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
        }}
        py="3"
    >
        <Container size="4">
            <Flex justify="between" align="center">
                {/* Right: Logo */}
                <Box>
                    <Text size="5" weight="bold" style={{ color: 'var(--accent-9)' }}>הקיבוץ</Text>
                </Box>

                {/* Center: Search */}
                <Box style={{ width: '400px' }}>
                    <TextField.Root placeholder="חיפוש..." radius="large">
                        <TextField.Slot side="left">
                            <MagnifyingGlassIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                </Box>

                {/* Left: Icons & Profile */}
                <Flex gap="4" align="center">
                    <Link href="/">
                        <IconButton variant="ghost" color="gray">
                            <HomeIcon width="18" height="18" />
                        </IconButton>
                    </Link>
                    <Link href="/chat">
                        <IconButton variant="ghost" color="gray">
                            <ChatBubbleIcon width="18" height="18" />
                        </IconButton>
                    </Link>
                    <IconButton variant="ghost" color="gray">
                        <BellIcon width="18" height="18" />
                    </IconButton>
                    <Link href="/profile">
                        <Avatar
                            size="2"
                            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                            fallback="JD"
                            radius="full"
                            style={{ cursor: 'pointer' }}
                        />
                    </Link>
                </Flex>
            </Flex>
        </Container>
    </Box>
);

interface AppLayoutProps {
    children: ReactNode;
    navigation: ReactNode;
    widgets: ReactNode;
}

export const AppLayout = ({ children, navigation, widgets }: AppLayoutProps) => {
    return (
        <Box>
            <Header />
            <Container size="4" mt="4">
                <Grid
                    columns={widgets ? "240px 1fr 300px" : "240px 1fr"}
                    gap="4"
                    align="start" // Ensure alignment doesn't stretch weirdly
                >
                    <Box position="sticky" style={{ top: '80px', height: 'fit-content' }}>
                        {navigation}
                    </Box>
                    <Box style={{ maxWidth: '100%', minWidth: 0 }}> {/* Prevent overflow */}
                        {children}
                    </Box>
                    {widgets && (
                        <Box position="sticky" style={{ top: '80px', height: 'fit-content' }}>
                            {widgets}
                        </Box>
                    )}
                </Grid>
            </Container>
        </Box>
    );
};
