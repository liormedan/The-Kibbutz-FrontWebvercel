"use client";

import { Box, Text } from "@radix-ui/themes";
import { GenericComposer } from "./GenericComposer";

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
    const header = sharedContent ? (
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
    ) : null;

    return (
        <GenericComposer
            onSend={onSend}
            onCancel={onCancel}
            placeholder={placeholder}
            header={header}
            showCancel={showCancel}
        />
    );
};
