"use client";

import { useState } from 'react';
import { Dialog, Flex, Box, Text, Heading, Badge, Button, IconButton, TextField, Avatar, Grid, Separator } from '@radix-ui/themes';
import { Cross2Icon, StarIcon, StarFilledIcon, PaperPlaneIcon, Link2Icon, CalendarIcon } from '@radix-ui/react-icons';
import { usePortfolio, PortfolioItem } from '@/context/PortfolioContext';

interface PortfolioDetailsDialogProps {
    project: PortfolioItem | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onEdit: (id: number) => void;
}

export const PortfolioDetailsDialog = ({ project, open, onOpenChange, onEdit }: PortfolioDetailsDialogProps) => {
    const { addComment, addRating } = usePortfolio();
    const [commentText, setCommentText] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!project) return null;

    const allImages = [project.image, ...(project.images || [])].filter(Boolean);
    const displayImage = selectedImage || allImages[0];

    const handleAddComment = () => {
        if (commentText.trim()) {
            addComment(project.id, commentText);
            setCommentText("");
        }
    };

    const handleRate = (value: number) => {
        addRating(project.id, value);
    };

    // Calculate average rating
    const avgRating = project.ratings && project.ratings.length > 0
        ? (project.ratings.reduce((acc, curr) => acc + curr.value, 0) / project.ratings.length).toFixed(1)
        : "N/A";

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content style={{ maxWidth: 900, padding: 0, overflow: 'hidden' }}>
                <Flex direction={{ initial: 'column', md: 'row' }} style={{ height: '80vh', maxHeight: '800px' }}>

                    {/* Left Side: Media (Scrollable) */}
                    <Box style={{ flex: 1.5, backgroundColor: 'var(--gray-2)', overflowY: 'auto', padding: '24px' }}>
                        <Box mb="4" style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img
                                src={displayImage}
                                alt={project.title}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </Box>

                        {allImages.length > 1 && (
                            <Grid columns="4" gap="2">
                                {allImages.map((img, idx) => (
                                    <Box
                                        key={idx}
                                        style={{
                                            cursor: 'pointer',
                                            borderRadius: '6px',
                                            overflow: 'hidden',
                                            border: displayImage === img ? '2px solid var(--accent-9)' : '2px solid transparent',
                                            opacity: displayImage === img ? 1 : 0.7
                                        }}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '1/1' }} />
                                    </Box>
                                ))}
                            </Grid>
                        )}
                    </Box>

                    {/* Right Side: Details & Interaction */}
                    <Flex direction="column" style={{ flex: 1, borderLeft: '1px solid var(--gray-4)', backgroundColor: 'var(--color-background)' }}>

                        {/* Header */}
                        <Box p="4" style={{ borderBottom: '1px solid var(--gray-4)' }}>
                            <Flex justify="between" align="start" mb="2">
                                <Box>
                                    <Dialog.Title size="5" mb="1">{project.title}</Dialog.Title>
                                    <Badge color="indigo">{project.category}</Badge>
                                </Box>
                                <Dialog.Close>
                                    <IconButton variant="ghost" color="gray">
                                        <Cross2Icon />
                                    </IconButton>
                                </Dialog.Close>
                            </Flex>

                            <Flex gap="4" align="center" mt="2">
                                <Flex align="center" gap="1">
                                    <CalendarIcon width="14" height="14" />
                                    <Text size="1" color="gray">{project.date}</Text>
                                </Flex>
                                {project.link && (
                                    <Flex align="center" gap="1">
                                        <Link2Icon width="14" height="14" />
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'var(--accent-9)', textDecoration: 'none' }}>
                                            קרא עוד
                                        </a>
                                    </Flex>
                                )}
                            </Flex>
                        </Box>

                        {/* Content (Scrollable) */}
                        <Box p="4" style={{ flex: 1, overflowY: 'auto' }}>
                            <Text as="p" size="2" style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                                {project.description}
                            </Text>

                            <Separator my="4" size="4" />

                            <Flex align="center" justify="between" mb="4">
                                <Text weight="bold" size="2">דירוג ({avgRating})</Text>
                                <Flex gap="1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <IconButton
                                            key={star}
                                            variant="ghost"
                                            color="orange"
                                            size="1"
                                            onClick={() => handleRate(star)}
                                        >
                                            {star <= (project.ratings.reduce((acc, curr) => acc + curr.value, 0) / (project.ratings.length || 1)) ? <StarFilledIcon /> : <StarIcon />}
                                        </IconButton>
                                    ))}
                                </Flex>
                            </Flex>

                            <Box>
                                <Text weight="bold" size="2" mb="2">תגובות ({project.comments?.length || 0})</Text>
                                <Flex direction="column" gap="3">
                                    {project.comments && project.comments.map((comment) => (
                                        <Flex key={comment.id} gap="3" align="start">
                                            <Avatar size="1" fallback="U" radius="full" color="gray" />
                                            <Box style={{ backgroundColor: 'var(--gray-3)', padding: '8px 12px', borderRadius: '12px', flex: 1 }}>
                                                <Text size="2">{comment.text}</Text>
                                                <Text size="1" color="gray" style={{ display: 'block', marginTop: '4px' }}>
                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    ))}
                                    {(!project.comments || project.comments.length === 0) && (
                                        <Text size="1" color="gray" align="center" my="2">אין תגובות עדיין. היה הראשון להגיב!</Text>
                                    )}
                                </Flex>
                            </Box>
                        </Box>

                        {/* Footer: Add Comment & Actions */}
                        <Box p="3" style={{ borderTop: '1px solid var(--gray-4)', backgroundColor: 'var(--gray-1)' }}>
                            <Flex gap="2" mb="3">
                                <TextField.Root
                                    style={{ flex: 1 }}
                                    placeholder="כתוב תגובה..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                                />
                                <IconButton onClick={handleAddComment}>
                                    <PaperPlaneIcon />
                                </IconButton>
                            </Flex>

                            <Button variant="soft" color="blue" size="2" style={{ width: '100%' }} onClick={() => { onOpenChange(false); onEdit(project.id); }}>
                                ערוך פרויקט
                            </Button>
                        </Box>

                    </Flex>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
