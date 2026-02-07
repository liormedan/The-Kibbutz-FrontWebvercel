"use client";

import { Flex, Text } from "@radix-ui/themes";
import { GenericComposer } from "./GenericComposer";

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
    const header = replyTo ? (
        <Flex align="center" gap="2" mb="2">
            <Text size="1" color="gray">תגובה ל:</Text>
            <Text size="1" weight="bold">{replyTo}</Text>
        </Flex>
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
