"use client";

import { Box, Card, Flex, Text, Avatar, TextArea, IconButton, Separator } from "@radix-ui/themes";
import { ImageIcon, FaceIcon, PaperPlaneIcon, HeartIcon, ChatBubbleIcon, Share1Icon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export const FeedComposer = () => {
    return (
        <Card size="3">
            <Flex gap="3" p="2">
                <Avatar fallback="JD" radius="full" size="3" />
                <Box style={{ flexGrow: 1 }}>
                    <TextArea
                        placeholder="מה אתה חושב, יוחנן?"
                        variant="soft"
                        size="3"
                        style={{ height: '80px', resize: 'none' }}
                    />
                    <Flex justify="between" mt="3" align="center">
                        <Flex gap="3">
                            <ButtonIconText icon={<ImageIcon />} label="תמונה" />
                            <ButtonIconText icon={<FaceIcon />} label="רגש" />
                        </Flex>
                        <IconButton size="2" variant="solid"><PaperPlaneIcon /></IconButton>
                    </Flex>
                </Box>
            </Flex>
        </Card>
    );
};

const ButtonIconText = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <Flex gap="1" align="center" style={{ cursor: 'pointer', color: 'var(--gray-10)' }}>
        {icon}
        <Text size="2">{label}</Text>
    </Flex>
);

export const PostCard = () => {
    return (
        <Card size="1" style={{ overflow: 'hidden' }}>
            {/* Header */}
            <Flex justify="between" align="center" p="3">
                <Flex gap="3" align="center">
                    <Avatar fallback="SC" size="3" radius="full" color="teal" />
                    <Box>
                        <Flex gap="2" align="baseline">
                            <Text weight="bold" size="2">שרה כהן</Text>
                            <Text size="1" color="gray">חבר קהילה</Text>
                        </Flex>
                        <Text size="1" color="gray">לפני שעה</Text>
                    </Box>
                </Flex>
                <IconButton variant="ghost" color="gray"><DotsHorizontalIcon /></IconButton>
            </Flex>

            {/* Content */}
            <Box px="3" pb="3">
                <Text size="3" style={{ lineHeight: '1.5' }}>
                    בדיוק סיימנו לשתול את הגינה החדשה! הקהילה מתגבשת בצורה יפהפייה 🌱 #גינהקהילתית #הקיבוץ
                </Text>
            </Box>

            {/* Image Placeholder */}
            <Box style={{ position: 'relative', width: '100%', height: '300px', background: 'var(--gray-4)' }}>
                {/* Real implementation would use Next.js Image */}
                <Flex align="center" justify="center" style={{ height: '100%' }}>
                    <Text color="gray">תמונת פוסט</Text>
                </Flex>
            </Box>

            {/* Footer */}
            <Box p="3">
                <Flex justify="between" mb="3">
                    <Text size="1" color="gray">24 לייקים</Text>
                    <Text size="1" color="gray">5 תגובות</Text>
                </Flex>
                <Separator size="4" />
                <Flex justify="between" pt="2">
                    <ButtonIconText icon={<HeartIcon />} label="לייק" />
                    <ButtonIconText icon={<ChatBubbleIcon />} label="תגובה" />
                    <ButtonIconText icon={<Share1Icon />} label="שתף" />
                </Flex>
            </Box>
        </Card>
    );
};
