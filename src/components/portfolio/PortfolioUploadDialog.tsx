"use client";

import { useState, useEffect } from 'react';
import { Dialog, Flex, Button, TextField, TextArea, Text, Grid, IconButton, Box, Badge } from '@radix-ui/themes';
import { PlusIcon, Cross2Icon, TrashIcon } from '@radix-ui/react-icons';
import { usePortfolio, PortfolioItem } from '@/context/PortfolioContext';

interface PortfolioUploadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editId?: number | null;
}

export const PortfolioUploadDialog = ({ open, onOpenChange, editId }: PortfolioUploadDialogProps) => {
    const { addProject, updateProject, getProject } = usePortfolio();

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(""); // Main Image
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [newGalleryImage, setNewGalleryImage] = useState("");
    const [date, setDate] = useState("");
    const [link, setLink] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load data if editing
    useEffect(() => {
        if (open && editId) {
            const project = getProject(editId);
            if (project) {
                setTitle(project.title);
                setDescription(project.description);
                setCategory(project.category);
                setImage(project.image);
                setGalleryImages(project.images || []);
                setDate(project.date || "");
                setLink(project.link || "");
            }
        } else if (open && !editId) {
            // Reset form
            setTitle("");
            setDescription("");
            setCategory("");
            setImage("");
            setGalleryImages([]);
            setNewGalleryImage("");
            setDate("");
            setLink("");
            setErrors({});
        }
    }, [open, editId, getProject]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!title.trim()) newErrors.title = "שם הפרויקט הוא שדה חובה";
        if (!description.trim()) newErrors.description = "תיאור הוא שדה חובה";
        if (!category.trim()) newErrors.category = "קטגוריה היא שדה חובה";
        if (!image.trim()) newErrors.image = "תמונה ראשית היא שדה חובה";
        if (!date.trim()) newErrors.date = "תאריך הוא שדה חובה";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        const projectData = {
            title,
            description,
            category,
            image,
            images: galleryImages,
            date,
            link
        };

        if (editId) {
            updateProject(editId, projectData);
        } else {
            addProject(projectData);
        }

        onOpenChange(false);
    };

    const addGalleryImage = () => {
        if (newGalleryImage.trim()) {
            setGalleryImages([...galleryImages, newGalleryImage.trim()]);
            setNewGalleryImage("");
        }
    };

    const removeGalleryImage = (index: number) => {
        const newImages = [...galleryImages];
        newImages.splice(index, 1);
        setGalleryImages(newImages);
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content style={{ maxWidth: 700 }}>
                <Dialog.Title>{editId ? 'עריכת פרויקט' : 'הוספת פרויקט חדש'}</Dialog.Title>
                <Dialog.Description size="2" mb="4" color="gray">
                    מלא את הפרטים הבאים כדי להוסיף את הפרויקט לתיק העבודות שלך.
                </Dialog.Description>

                <Flex direction="column" gap="4">
                    <Grid columns={{ initial: '1', sm: '2' }} gap="4">
                        <Box>
                            <Text as="div" size="2" mb="1" weight="bold">שם הפרויקט *</Text>
                            <TextField.Root
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="לדוגמה: עיצוב סלון מודרני"
                            />
                            {errors.title && <Text color="red" size="1">{errors.title}</Text>}
                        </Box>

                        <Box>
                            <Text as="div" size="2" mb="1" weight="bold">קטגוריה *</Text>
                            <TextField.Root
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="לדוגמה: עיצוב פנים"
                            />
                            {errors.category && <Text color="red" size="1">{errors.category}</Text>}
                        </Box>
                    </Grid>

                    <Grid columns={{ initial: '1', sm: '2' }} gap="4">
                        <Box>
                            <Text as="div" size="2" mb="1" weight="bold">תאריך ביצוע *</Text>
                            <TextField.Root
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            {errors.date && <Text color="red" size="1">{errors.date}</Text>}
                        </Box>

                        <Box>
                            <Text as="div" size="2" mb="1" weight="bold">קישור לפרויקט (אופציונלי)</Text>
                            <TextField.Root
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="https://..."
                            />
                        </Box>
                    </Grid>

                    <Box>
                        <Text as="div" size="2" mb="1" weight="bold">תמונה ראשית (כתובת URL) *</Text>
                        <TextField.Root
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.image && <Text color="red" size="1">{errors.image}</Text>}
                        {image && (
                            <Box mt="2" style={{ height: '100px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                                <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => (e.currentTarget.style.display = 'none')} />
                            </Box>
                        )}
                    </Box>

                    <Box>
                        <Text as="div" size="2" mb="1" weight="bold">תמונות נוספות לגלריה</Text>
                        <Flex gap="2" mb="2">
                            <TextField.Root
                                style={{ flex: 1 }}
                                value={newGalleryImage}
                                onChange={(e) => setNewGalleryImage(e.target.value)}
                                placeholder="הדבק קישור לתמונה ולחץ הוסף"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
                            />
                            <Button variant="soft" onClick={addGalleryImage} disabled={!newGalleryImage}>
                                <PlusIcon /> הוסף
                            </Button>
                        </Flex>

                        {galleryImages.length > 0 && (
                            <Flex gap="2" wrap="wrap">
                                {galleryImages.map((img, idx) => (
                                    <Box key={idx} style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--gray-5)' }}>
                                        <img src={img} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div
                                            onClick={() => removeGalleryImage(idx)}
                                            style={{
                                                position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
                                                backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                opacity: 0, transition: 'opacity 0.2s', cursor: 'pointer'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                                        >
                                            <TrashIcon color="white" />
                                        </div>
                                    </Box>
                                ))}
                            </Flex>
                        )}
                    </Box>

                    <Box>
                        <Text as="div" size="2" mb="1" weight="bold">תיאור הפרויקט *</Text>
                        <TextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="תאר את תהליך העבודה, המטרות והתוצאה..."
                            rows={4}
                        />
                        {errors.description && <Text color="red" size="1">{errors.description}</Text>}
                    </Box>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">ביטול</Button>
                        </Dialog.Close>
                        <Button onClick={handleSave}>{editId ? 'שמור שינויים' : 'צור פרויקט'}</Button>
                    </Flex>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
