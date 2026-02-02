"use client";

import { useState } from "react";
import { Box, Card, Flex, Text, Avatar, TextArea, IconButton, Button } from "@radix-ui/themes";
import { ImageIcon, FaceIcon, PaperPlaneIcon, Cross2Icon } from "@radix-ui/react-icons";

interface ShareComposerProps {
    onSend: (message: string) => void;
    onCancel?: () => void;
    placeholder?: string;
    sharedContent?: string; // Preview of what's being shared
    showCancel?: boolean;
}

export const ShareComposer = ({ 
    onSend, 
    onCancel, 
    placeholder = "מה אתה חושב על זה?", 
    sharedContent,
    showCancel = true 
}: ShareComposerProps) => {
    const [shareText, setShareText] = useState("");

    const handleSend = () => {
        if (!shareText.trim()) return;
        onSend(shareText);
        setShareText("");
    };

    const handleCancel = () => {
        setShareText("");
        if (onCancel) onCancel();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Card size="2" style={{ padding: '12px', marginTop: '12px', border: '2px solid var(--accent-9)' }}>
            {sharedContent && (
                <Box 
                    mb="3" 
                    p="2" 
                    style={{ 
                        background: 'var(--gray-3)', 
                        borderRadius: '8px',
                        border: '1px solid var(--gray-5)'
                    }}
                >
                    <Text size="1" color="gray" mb="1" as="div">משתף:</Text>
                    <Text size="2" style={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {sharedContent}
                    </Text>
                </Box>
            )}
            <Flex gap="3">
                <Avatar fallback="JD" radius="full" size="2" />
                <Box style={{ flexGrow: 1 }}>
                    <TextArea
                        placeholder={placeholder}
                        variant="soft"
                        size="2"
                        style={{ height: '60px', resize: 'none' }}
                        value={shareText}
                        onChange={(e) => setShareText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Flex justify="between" mt="3" align="center">
                        <Flex gap="2">
                            <IconButton variant="ghost" color="gray" size="1">
                                <ImageIcon />
                            </IconButton>
                            <IconButton variant="ghost" color="gray" size="1">
                                <FaceIcon />
                            </IconButton>
                        </Flex>
                        <Flex gap="2">
                            {showCancel && onCancel && (
                                <IconButton 
                                    variant="ghost" 
                                    color="gray" 
                                    size="2"
                                    onClick={handleCancel}
                                >
                                    <Cross2Icon />
                                </IconButton>
                            )}
                            <IconButton 
                                size="2" 
                                variant="solid"
                                onClick={handleSend}
                                disabled={!shareText.trim()}
                                style={{ 
                                    backgroundColor: 'var(--accent-9)', 
                                    color: 'var(--color-white)',
                                    border: 'none'
                                }}
                            >
                                <PaperPlaneIcon />
                            </IconButton>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Card>
    );
};

