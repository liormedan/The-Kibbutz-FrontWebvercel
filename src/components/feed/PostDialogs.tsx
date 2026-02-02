"use client";

import { Dialog, Flex, Button, TextArea, Text, RadioGroup, Box } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { ExclamationTriangleIcon, TrashIcon } from "@radix-ui/react-icons";

// --- Report Dialog ---
interface ReportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onReport: (reason: string) => void;
}

export const ReportDialog = ({ open, onOpenChange, onReport }: ReportDialogProps) => {
    const [reason, setReason] = useState("spam");

    const handleSubmit = () => {
        onReport(reason);
        onOpenChange(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>דווח על פוסט</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    אנא בחר את הסיבה לדיווח. הדיווח יישלח לבדיקת צוות הקהילה.
                </Dialog.Description>

                <RadioGroup.Root value={reason} onValueChange={setReason} mb="4">
                    <Flex gap="2" direction="column">
                        <Text as="label" size="2">
                            <Flex gap="2">
                                <RadioGroup.Item value="spam" /> ספאם או פרסום לא מורשה
                            </Flex>
                        </Text>
                        <Text as="label" size="2">
                            <Flex gap="2">
                                <RadioGroup.Item value="harassment" /> הטרדה או בריונות
                            </Flex>
                        </Text>
                        <Text as="label" size="2">
                            <Flex gap="2">
                                <RadioGroup.Item value="inappropriate" /> תוכן לא הולם
                            </Flex>
                        </Text>
                        <Text as="label" size="2">
                            <Flex gap="2">
                                <RadioGroup.Item value="other" /> אחר
                            </Flex>
                        </Text>
                    </Flex>
                </RadioGroup.Root>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">ביטול</Button>
                    </Dialog.Close>
                    <Button color="red" onClick={handleSubmit}>
                        <ExclamationTriangleIcon /> דווח
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

// --- Edit Dialog ---
interface EditPostDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialContent: string;
    onSave: (newContent: string) => void;
}

export const EditPostDialog = ({ open, onOpenChange, initialContent, onSave }: EditPostDialogProps) => {
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        if (open) setContent(initialContent);
    }, [open, initialContent]);

    const handleSave = () => {
        onSave(content);
        onOpenChange(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content style={{ maxWidth: 500 }}>
                <Dialog.Title>ערוך פוסט</Dialog.Title>

                <TextArea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="ערוך את הפוסט שלך..."
                    rows={6}
                    style={{ marginTop: '16px', marginBottom: '16px' }}
                />

                <Flex gap="3" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">ביטול</Button>
                    </Dialog.Close>
                    <Button onClick={handleSave}>שמור שינויים</Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

// --- Delete Dialog ---
interface DeleteConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

export const DeleteConfirmDialog = ({ open, onOpenChange, onConfirm }: DeleteConfirmDialogProps) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title color="red">מחיקת פוסט</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    האם אתה בטוח שברצונך למחוק את הפוסט הזה? פעולה זו היא בלתי הפיכה.
                </Dialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">ביטול</Button>
                    </Dialog.Close>
                    <Button color="red" variant="solid" onClick={() => { onConfirm(); onOpenChange(false); }}>
                        <TrashIcon /> מחק פוסט
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
