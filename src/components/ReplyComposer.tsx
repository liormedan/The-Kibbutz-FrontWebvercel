"use client";

import { useState } from "react";
import { Box, Card, Flex, Text, Avatar, TextArea, IconButton, Button } from "@radix-ui/themes";
import { ImageIcon, FaceIcon, PaperPlaneIcon, Cross2Icon } from "@radix-ui/react-icons";

interface ReplyComposerProps {
    onSend: (message: string) => void;
    onCancel?: () => void;
    placeholder?: string;
    replyTo?: string; // Name of the person being replied to
    showCancel?: boolean;
}

export const ReplyComposer = ({ 
    onSend, 
    onCancel, 
    placeholder = "כתוב תגובה...", 
    replyTo,
    showCancel = true 
}: ReplyComposerProps) => {
    const [replyText, setReplyText] = useState("");

    const handleSend = () => {
        if (!replyText.trim()) return;
        onSend(replyText);
        setReplyText("");
    };

    const handleCancel = () => {
        setReplyText("");
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
            {replyTo && (
                <Flex align="center" gap="2" mb="2">
                    <Text size="1" color="gray">תגובה ל:</Text>
                    <Text size="1" weight="bold">{replyTo}</Text>
                </Flex>
            )}
            <Flex gap="3">
                <Avatar fallback="JD" radius="full" size="2" />
                <Box style={{ flexGrow: 1 }}>
                    <TextArea
                        placeholder={placeholder}
                        variant="soft"
                        size="2"
                        style={{ height: '60px', resize: 'none' }}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
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
                                disabled={!replyText.trim()}
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

