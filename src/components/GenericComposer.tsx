"use client";

import { useState } from "react";
import { Box, Card, Flex, Avatar, TextArea, IconButton } from "@radix-ui/themes";
import { ImageIcon, FaceIcon, PaperPlaneIcon, Cross2Icon } from "@radix-ui/react-icons";

interface GenericComposerProps {
    onSend: (message: string) => void;
    onCancel?: () => void;
    placeholder?: string;
    header?: React.ReactNode;
    showCancel?: boolean;
    sendButtonColor?: string;
}

export const GenericComposer = ({
    onSend,
    onCancel,
    placeholder = "כתוב הודעה...",
    header,
    showCancel = true,
    sendButtonColor = 'var(--accent-9)'
}: GenericComposerProps) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text);
        setText("");
    };

    const handleCancel = () => {
        setText("");
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
            {header}
            <Flex gap="3">
                <Avatar fallback="JD" radius="full" size="2" />
                <Box style={{ flexGrow: 1 }}>
                    <TextArea
                        placeholder={placeholder}
                        variant="soft"
                        size="2"
                        style={{ height: '60px', resize: 'none' }}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
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
                                disabled={!text.trim()}
                                style={{
                                    backgroundColor: sendButtonColor,
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
