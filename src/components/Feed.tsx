"use client";

import { useState } from "react";

import { Box, Card, Flex, Text, Avatar, TextArea, IconButton, Separator, Button, DropdownMenu } from "@radix-ui/themes";
import {
    ImageIcon, FaceIcon, PaperPlaneIcon, HeartIcon, ChatBubbleIcon,
    Share1Icon, DotsHorizontalIcon, HeartFilledIcon,
    ExclamationTriangleIcon, Link2Icon, EyeNoneIcon, Pencil1Icon, TrashIcon
} from "@radix-ui/react-icons";
import Image from "next/image";
import { ReplyComposer } from "./ReplyComposer";
import { ShareComposer } from "./ShareComposer";
import { ReportDialog, EditPostDialog, DeleteConfirmDialog } from "./feed/PostDialogs";

export const FeedHeader = () => {
    return (
        <Flex justify="between" align="center" mb="2" wrap="wrap" gap="2">
            <Text size={{ initial: "5", sm: "6" }} weight="bold">סוג הפיד</Text>
            <Flex gap="3">
                <Button variant="ghost" color="gray" style={{ fontWeight: 'normal' }}>הפופולארים ביותר</Button>
                <Button variant="ghost" color="gray" style={{ fontWeight: 'normal' }}>חברים</Button>
            </Flex>
        </Flex>
    );
};

export const FeedComposer = () => {
    return (
        <Card size="3" style={{ padding: '16px' }}>
            <Flex gap="3">
                <Avatar fallback="JD" radius="full" size="3" />
                <Box style={{ flexGrow: 1 }}>
                    <TextArea
                        placeholder="מה אתה חושב, יוחנן?"
                        variant="soft"
                        size="3"
                        style={{ height: '80px', resize: 'none' }}
                    />
                    <Flex justify="between" mt="4" align="center" wrap="wrap" gap="2">
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



export const PostCard = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(24);
    const [showReply, setShowReply] = useState(false);
    const [showShare, setShowShare] = useState(false);

    // Dialog States
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [replies, setReplies] = useState<string[]>([]);
    const [shares, setShares] = useState<string[]>([]);

    const [content, setContent] = useState("בדיוק סיימנו לשתול את הגינה החדשה! הקהילה מתגבשת בצורה יפהפייה 🌱 #גינהקהילתית #הקיבוץ");

    const handleLike = () => {
        if (isLiked) {
            setLikesCount(prev => prev - 1);
        } else {
            setLikesCount(prev => prev + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleReplyClick = () => {
        setShowReply(!showReply);
        setShowShare(false); // Close share if open
    };

    const handleShareClick = () => {
        setShowShare(!showShare);
        setShowReply(false); // Close reply if open
    };

    const handleSendReply = (message: string) => {
        setReplies([...replies, message]);
        setShowReply(false);
        // In a real app, you would send this to your backend
        console.log("Reply sent:", message);
    };

    const handleSendShare = (message: string) => {
        setShares([...shares, message]);
        setShowShare(false);
        // In a real app, you would send this to your backend
        console.log("Share sent:", message);
    };

    const handleAction = (action: string) => {
        if (action === 'copy') {
            alert("הקישור לפוסט הועתק ללוח"); // Use toast in real app
        } else if (action === 'report') {
            setIsReportOpen(true);
        } else if (action === 'hide') {
            if (confirm("האם להסתיר את הפוסט הזה מהפיד שלך?")) {
                alert("הפוסט הוסתר");
            }
        } else if (action === 'delete') {
            setIsDeleteOpen(true);
        } else if (action === 'edit') {
            setIsEditOpen(true);
        }
    };

    // Dialog Handlers
    const handleReportSubmit = (reason: string) => {
        console.log(`Reported for: ${reason}`);
        alert("תודה. הדיווח התקבל.");
    };

    const handleEditSave = (newContent: string) => {
        setContent(newContent);
        // alert("הפוסט עודכן בהצלחה!");
    };

    const handleDeleteConfirm = () => {
        // Here you would delete the post from the list/backend
        console.log("Deleting post...");
        alert("הפוסט נמחק בהצלחה.");
    };

    return (
        <Card size="1" style={{ overflow: 'hidden', padding: '16px' }}>
            {/* Header */}
            <Flex justify="between" align="center" style={{ direction: 'rtl' }}>
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

                <DropdownMenu.Root modal={false}>
                    <DropdownMenu.Trigger>
                        <IconButton variant="ghost" color="gray">
                            <DotsHorizontalIcon />
                        </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item color="red" onClick={() => handleAction('report')}>
                            <ExclamationTriangleIcon /> דווח
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onClick={() => handleAction('copy')}>
                            <Link2Icon /> העתק קישור
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onClick={() => handleAction('hide')}>
                            <EyeNoneIcon /> הסתר
                        </DropdownMenu.Item>

                        <DropdownMenu.Separator />

                        <DropdownMenu.Label>פעולות שלי</DropdownMenu.Label>
                        <DropdownMenu.Item onClick={() => handleAction('edit')}>
                            <Pencil1Icon /> ערוך
                        </DropdownMenu.Item>
                        <DropdownMenu.Item color="red" onClick={() => handleAction('delete')}>
                            <TrashIcon /> מחק
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </Flex>

            {/* Content */}
            <Box mt="3">
                <Text size="3" style={{ lineHeight: '1.5' }}>
                    {content}
                </Text>
            </Box>

            {/* Image Placeholder */}
            <Box mt="3" style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'var(--gray-4)', borderRadius: '12px' }}>
                {/* Real implementation would use Next.js Image */}
                <Flex align="center" justify="center" style={{ height: '100%' }}>
                    <Text color="gray">תמונת פוסט</Text>
                </Flex>
            </Box>

            {/* Footer */}
            <Box mt="3">
                <Flex justify="between" mb="3">
                    <Text size="1" color="gray">{likesCount} לייקים</Text>
                    <Text size="1" color="gray">5 תגובות</Text>
                </Flex>
                <Separator size="4" />
                <Flex justify="between" pt="2" gap="2">
                    <ButtonIconText
                        icon={isLiked ? <HeartFilledIcon color="var(--red-9)" width="18" height="18" /> : <HeartIcon width="18" height="18" />}
                        label="לייק"
                        onClick={handleLike}
                        isActive={isLiked}
                    />
                    <ButtonIconText
                        icon={<ChatBubbleIcon width="18" height="18" />}
                        label="תגובה"
                        onClick={handleReplyClick}
                        isActive={showReply}
                    />
                    <ButtonIconText
                        icon={<Share1Icon width="18" height="18" />}
                        label="שתף"
                        onClick={handleShareClick}
                        isActive={showShare}
                    />
                </Flex>
            </Box>
            {showReply && (
                <ReplyComposer
                    onSend={handleSendReply}
                    onCancel={() => setShowReply(false)}
                    replyTo="שרה כהן"
                />
            )}
            {showShare && (
                <ShareComposer
                    onSend={handleSendShare}
                    onCancel={() => setShowShare(false)}
                    sharedContent={content}
                    placeholder="מה אתה חושב על זה?"
                />
            )}

            {/* Dialogs */}
            <ReportDialog
                open={isReportOpen}
                onOpenChange={setIsReportOpen}
                onReport={handleReportSubmit}
            />
            <EditPostDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                initialContent={content}
                onSave={handleEditSave}
            />
            <DeleteConfirmDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={handleDeleteConfirm}
            />
        </Card>
    );
};
const ButtonIconText = ({ icon, label, onClick, isActive }: { icon: React.ReactNode, label: string, onClick?: () => void, isActive?: boolean }) => (
    <Button
        variant="ghost"
        color={isActive ? "red" : "gray"}
        style={{ cursor: 'pointer', flexGrow: 1, height: 'auto', padding: '8px' }}
        onClick={onClick}
    >
        <Flex gap="2" align="center">
            {icon}
            <Text size="2">{label}</Text>
        </Flex>
    </Button>
);
